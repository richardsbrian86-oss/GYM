import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendEmailCampaign } from "@/lib/marketing/email";
import { sendSmsCampaign } from "@/lib/marketing/sms";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { campaignId, subject, message } = body as {
    campaignId?: string;
    subject?: string;
    message?: string;
  };

  if (!campaignId || !message) {
    return NextResponse.json(
      { error: "campaignId and message are required" },
      { status: 400 }
    );
  }

  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const members = await prisma.member.findMany({
    where: { status: "active" },
    select: { email: true, name: true },
  });

  let result: { sent: number; mode: "live" | "demo" };

  if (campaign.type === "sms") {
    const phones = members.map((m) => m.email.replace("@", "+1@"));
    result = await sendSmsCampaign({ to: phones, body: message });
  } else {
    result = await sendEmailCampaign({
      to: members.map((m) => m.email),
      subject: subject ?? campaign.name,
      html: `<p>${message}</p>`,
    });
  }

  await prisma.campaign.update({
    where: { id: campaignId },
    data: {
      sent: campaign.sent + result.sent,
      status: campaign.status === "draft" ? "active" : campaign.status,
    },
  });

  return NextResponse.json({
    success: true,
    ...result,
    campaign: campaign.name,
  });
}
