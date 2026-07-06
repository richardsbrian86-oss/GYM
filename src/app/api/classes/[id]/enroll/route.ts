import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: classSessionId } = await params;
  const body = await request.json();
  const { memberId } = body as { memberId?: string };

  if (!memberId) {
    return NextResponse.json({ error: "memberId is required" }, { status: 400 });
  }

  const classSession = await prisma.classSession.findUnique({
    where: { id: classSessionId },
    include: {
      enrollments: { where: { status: "confirmed" } },
      waitlist: true,
    },
  });

  if (!classSession) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  const existing = await prisma.classEnrollment.findUnique({
    where: { memberId_classSessionId: { memberId, classSessionId } },
  });

  if (existing?.status === "confirmed") {
    return NextResponse.json({ error: "Already enrolled" }, { status: 409 });
  }

  const existingWaitlist = await prisma.waitlistEntry.findUnique({
    where: { memberId_classSessionId: { memberId, classSessionId } },
  });

  if (existingWaitlist) {
    return NextResponse.json({ error: "Already on waitlist" }, { status: 409 });
  }

  const enrolledCount = classSession.enrollments.length;

  if (enrolledCount < classSession.capacity) {
    await prisma.classEnrollment.upsert({
      where: { memberId_classSessionId: { memberId, classSessionId } },
      create: { memberId, classSessionId, status: "confirmed" },
      update: { status: "confirmed" },
    });

    return NextResponse.json({
      status: "enrolled",
      enrolled: enrolledCount + 1,
      capacity: classSession.capacity,
    });
  }

  const position = classSession.waitlist.length + 1;
  await prisma.waitlistEntry.create({
    data: { memberId, classSessionId, position },
  });

  return NextResponse.json({
    status: "waitlisted",
    position,
    capacity: classSession.capacity,
  });
}
