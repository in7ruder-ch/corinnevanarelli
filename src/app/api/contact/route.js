// src/app/api/contact/route.js
import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabaseService";
import { getTransport } from "@/lib/mailer";

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

    // Rate limit: 3 attempts / 10 min per IP or email
    const supabase = getSupabaseService();
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

    await supabase.from("contact_throttle").insert({ ip, email });

    const { transporter } = await getTransport();
    const FROM = process.env.EMAIL_FROM || "Corinne Vanarelli <noreply@corinnevanarelli.ch>";
    const TO = process.env.EMAIL_TO || process.env.EMAIL_USER;

    // Internal notification
    await transporter.sendMail({
      from: FROM,
      to: TO,
      subject: `Neue Kontaktanfrage von ${vorname} ${name}`,
      text: [`Neue Nachricht vom Kontaktformular:`, `Vorname: ${vorname}`, `Name: ${name}`, `Email: ${email}`, ``, nachricht].join("\n"),
      html: `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111"><p><strong>Neue Nachricht vom Kontaktformular</strong></p><ul><li><strong>Vorname:</strong> ${vorname}</li><li><strong>Name:</strong> ${name}</li><li><strong>Email:</strong> ${email}</li></ul><p>${nachricht.replace(/\n/g, "<br/>")}</p></div>`,
      replyTo: `${vorname} ${name} <${email}>`,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Bestätigung – Ihre Nachricht ist eingegangen",
      text: `Danke, wir haben deine Nachricht erhalten und melden uns bald.\n\nDeine Nachricht:\n${nachricht}`,
      html: `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111"><p>Danke, wir haben deine Nachricht erhalten und melden uns bald.</p><hr/><p><em>Deine Nachricht:</em></p><p>${nachricht.replace(/\n/g, "<br/>")}</p></div>`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[/api/contact] error:", e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR", message: e.message }, { status: 500 });
  }
}