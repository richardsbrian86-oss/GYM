"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface EnrollButtonProps {
  classId: string;
  memberId: string;
  isFull: boolean;
  waitlistCount: number;
}

export function EnrollButton({ classId, memberId, isFull, waitlistCount }: EnrollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleEnroll() {
    setLoading(true);
    setMessage("");

    const res = await fetch(`/api/classes/${classId}/enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error ?? "Enrollment failed");
      return;
    }

    if (data.status === "waitlisted") {
      setMessage(`Waitlisted (#${data.position})`);
    } else {
      setMessage("Enrolled!");
    }

    router.refresh();
  }

  return (
    <div className="mt-3 border-t border-zinc-100 pt-3">
      <Button
        variant={isFull ? "outline" : "primary"}
        size="sm"
        className="w-full"
        onClick={handleEnroll}
        disabled={loading}
      >
        {loading ? "Processing..." : isFull ? "Join Waitlist" : "Enroll Member"}
      </Button>
      {waitlistCount > 0 && (
        <p className="mt-1 text-center text-xs text-zinc-400">
          {waitlistCount} on waitlist
        </p>
      )}
      {message && (
        <p className="mt-1 text-center text-xs font-medium text-orange-600">{message}</p>
      )}
    </div>
  );
}
