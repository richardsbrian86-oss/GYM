import twilio from "twilio";

export function isTwilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER
  );
}

export async function sendSmsCampaign(params: {
  to: string[];
  body: string;
}): Promise<{ sent: number; mode: "live" | "demo" }> {
  if (!isTwilioConfigured()) {
    console.log("[demo] SMS campaign to", params.to.length, "recipients:", params.body.slice(0, 50));
    return { sent: params.to.length, mode: "demo" };
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );
  const from = process.env.TWILIO_PHONE_NUMBER!;

  let sent = 0;
  for (const phone of params.to) {
    await client.messages.create({ to: phone, from, body: params.body });
    sent++;
  }

  return { sent, mode: "live" };
}
