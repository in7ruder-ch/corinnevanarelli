// src/app/api/contact/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getTransport } from "@/lib/mailer";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_ANON_KEY");
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}

function validate(body) {
  const { vorname, name, email, nachricht } = body || {};
  if (
    !vorname || !name || !email || !nachricht ||
    typeof vorname !== "string" ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof nachricht !== "string"
  ) {
    return "Alle Felder (Vorname, Name, Email, Nachricht) sind erforderlich.";
  }
  const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRe.test(email)) return "Ungültige Email-Adresse.";
  // límites básicos para evitar abusos
  if (vorname.length > 100 || name.length > 100) return "Name ist zu lang.";
  if (email.length > 200) return "Email ist zu lang.";
  if (nachricht.length > 5000) return "Nachricht ist zu lang.";
  return null;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const err = validate(body);
    if (err) {
      return NextResponse.json({ ok: false, error: err }, { status: 400 });
    }

    const { vorname, name, email, nachricht } = body;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Rate limit: 3 intentos / 10 min por IP o email
    const supabase = getSupabase();
    const windowStart = new Date(Date.now() - 10 * 60 * 1000).toISOString();

    const { data: recent, error: throttleErr } = await supabase
      .from("contact_throttle")
      .select("id")
      .gte("created_at", windowStart)
      .or(`ip.eq.${ip},email.eq.${email}`);

    if (!throttleErr && Array.isArray(recent) && recent.length >= 3) {
      return NextResponse.json(
        { ok: false, error: "Zu viele Anfragen, bitte in 10 Minuten erneut versuchen." },
        { status: 429 }
      );
    }

    // Registrar intento
    await supabase.from("contact_throttle").insert({ ip, email });

    // Envíos de email (usa Gmail/Workspace vía mailer.js)
    const { transporter } = await getTransport();

    const FROM = process.env.EMAIL_FROM || "Corinne Vanarelli <noreply@corinnevanarelli.ch>";
    const TO = process.env.EMAIL_TO || process.env.EMAIL_USER; // fallback por si acaso

    // 1) Notificación interna
    const adminSubject = `Neue Kontaktanfrage von ${vorname} ${name}`;
    const adminText = [
      `Neue Nachricht vom Kontaktformular:`,
      `Vorname: ${vorname}`,
      `Name: ${name}`,
      `Email: ${email}`,
      ``,
      nachricht,
    ].join("\n");
    const adminHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111">
        <p><strong>Neue Nachricht vom Kontaktformular</strong></p>
        <ul>
          <li><strong>Vorname:</strong> ${vorname}</li>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <p>${nachricht.replace(/\n/g, "<br/>")}</p>
      </div>
    `;
    await transporter.sendMail({
      from: FROM,
      to: TO,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
      replyTo: `${vorname} ${name} <${email}>`,
    });

    // 2) Auto-reply al usuario
    const userSubject = "Bestätigung – Ihre Nachricht ist eingegangen";
    const userText = `Danke, wir haben deine Nachricht erhalten und melden uns bald.\n\nDeine Nachricht:\n${nachricht}`;
    const userHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111">
        <p>Danke, wir haben deine Nachricht erhalten und melden uns bald.</p>
        <hr/>
        <p><em>Deine Nachricht:</em></p>
        <p>${nachricht.replace(/\n/g, "<br/>")}</p>
      </div>
    `;
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: userSubject,
      text: userText,
      html: userHtml,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[/api/contact] error:", e);
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR", message: e.message },
      { status: 500 }
    );
  }
}
