import nodemailer from "nodemailer";

function hasSmtpEnv() {
  return !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS;
}

async function getTransport() {
  if (hasSmtpEnv()) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || "false") === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    return { transporter, isEthereal: false };
  }
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  return { transporter, isEthereal: true };
}

function formatDateCH(iso) {
  const dt = new Date(iso);
  return dt.toLocaleString("de-CH", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Zurich",
  });
}

// Helpers ICS (usamos UTC para máxima compatibilidad)
function toIcsUtc(dt) {
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d = String(dt.getUTCDate()).padStart(2, "0");
  const hh = String(dt.getUTCHours()).padStart(2, "0");
  const mm = String(dt.getUTCMinutes()).padStart(2, "0");
  const ss = String(dt.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

function buildIcs({ booking, service }) {
  const start = new Date(booking.start_at);
  const durationMin = Number(service.duration_min || 60);
  const end = new Date(start.getTime() + durationMin * 60000);

  const dtstamp = toIcsUtc(new Date());
  const dtstart = toIcsUtc(start);
  const dtend = toIcsUtc(end);

  const uid = `${booking.id}@corinnevanarelli.ch`;
  const summary = `Buchung – ${service.title_de || booking.service_id}`;
  const description = [
    `Service: ${service.title_de || booking.service_id}`,
    `Datum/Zeit (CH): ${formatDateCH(booking.start_at)}`,
    `Dauer: ${durationMin} Min`,
    `Betrag: CHF ${Number(service.price_chf || 0).toFixed(2)}`
  ].join("\\n");

  // Si tenés dirección física, podés completar LOCATION:
  const location = process.env.MAIL_LOCATION || "";

  return [
    "BEGIN:VCALENDAR",
    "METHOD:REQUEST",
    "PRODID:-//Corinne Vanarelli//Booking//DE",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    location ? `LOCATION:${location}` : null,
    // Opcional: Attendee y Organizer
    `ORGANIZER;CN=Corinne Vanarelli:mailto:no-reply@corinnevanarelli.ch`,
    booking.customer_email
      ? `ATTENDEE;CN=${booking.customer_name || "Gast"};RSVP=TRUE:mailto:${booking.customer_email}`
      : null,
    "END:VEVENT",
    "END:VCALENDAR"
  ].filter(Boolean).join("\r\n");
}

export async function sendBookingPaidEmail({ booking, service }) {
  const { transporter, isEthereal } = await getTransport();

  const from =
    process.env.MAIL_FROM || "Corinne Vanarelli <no-reply@corinnevanarelli.ch>";
  const to = booking.customer_email;
  const bcc = process.env.MAIL_BCC || undefined;

  const when = formatDateCH(booking.start_at);
  const subject = `Buchungsbestätigung – ${service.title_de || booking.service_id} am ${when}`;

  const text = [
    `Liebe/r ${booking.customer_name || ""}`.trim(),
    "",
    `Deine Buchung ist bestätigt:`,
    `• Service: ${service.title_de || booking.service_id}`,
    `• Datum/Zeit: ${when}`,
    `• Dauer: ${service.duration_min || ""} Min`,
    `• Betrag: CHF ${Number(service.price_chf || 0).toFixed(2)}`,
    "",
    `Du kannst den Termin mit der angehängten Datei (.ics) zu deinem Kalender hinzufügen.`,
    "",
    `Danke und bis bald,`,
    `Corinne`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#111">
      <p>Liebe/r ${booking.customer_name || ""}</p>
      <p>Deine Buchung ist <strong>bestätigt</strong>:</p>
      <ul>
        <li><strong>Service:</strong> ${service.title_de || booking.service_id}</li>
        <li><strong>Datum/Zeit:</strong> ${when}</li>
        <li><strong>Dauer:</strong> ${service.duration_min || ""} Min</li>
        <li><strong>Betrag:</strong> CHF ${Number(service.price_chf || 0).toFixed(2)}</li>
      </ul>
      <p>Füge den Termin zu deinem Kalender hinzu (siehe Anhang <code>.ics</code>).</p>
      <p>Danke und bis bald,<br/>Corinne</p>
    </div>
  `;

  const icsContent = buildIcs({ booking, service });

  const info = await transporter.sendMail({
    from, to, bcc, subject, text, html,
    attachments: [
      {
        filename: "booking.ics",
        content: icsContent,
        contentType: "text/calendar; charset=UTF-8; method=REQUEST",
      }
    ]
  });

  let previewUrl = null;
  if (isEthereal) {
    previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("📧 Ethereal preview:", previewUrl);
  }
  return { messageId: info.messageId, previewUrl };
}
