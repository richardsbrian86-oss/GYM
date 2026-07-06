import sgMail from "@sendgrid/mail";

export function isSendGridConfigured(): boolean {
  return Boolean(process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL);
}

export async function sendEmailCampaign(params: {
  to: string[];
  subject: string;
  html: string;
}): Promise<{ sent: number; mode: "live" | "demo" }> {
  if (!isSendGridConfigured()) {
    console.log("[demo] Email campaign:", params.subject, "to", params.to.length, "recipients");
    return { sent: params.to.length, mode: "demo" };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const from = process.env.SENDGRID_FROM_EMAIL!;

  await sgMail.send({
    to: params.to,
    from,
    subject: params.subject,
    html: params.html,
    isMultiple: true,
  });

  return { sent: params.to.length, mode: "live" };
}
