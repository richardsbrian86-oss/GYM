"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LaunchCampaignButtonProps {
  campaignId: string;
  campaignName: string;
  type: string;
}

export function LaunchCampaignButton({
  campaignId,
  campaignName,
  type,
}: LaunchCampaignButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleLaunch() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/marketing/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campaignId,
        subject: campaignName,
        message: `Check out our latest offer from IronPulse Fitness!`,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setResult(data.error ?? "Failed to send");
      return;
    }

    setResult(`Sent to ${data.sent} recipients (${data.mode} mode)`);
  }

  return (
    <div>
      <Button size="sm" className="flex-1 w-full" onClick={handleLaunch} disabled={loading}>
        {loading ? "Sending..." : type === "sms" ? "Send SMS" : "Launch"}
      </Button>
      {result && <p className="mt-2 text-xs text-emerald-600">{result}</p>}
    </div>
  );
}
