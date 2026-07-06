import { prisma } from "@/lib/db";

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export async function getGymInfo() {
  const [settings, memberCount, staffOnDuty, classCount, revenue] = await Promise.all([
    prisma.gymSettings.findFirst(),
    prisma.member.count({ where: { status: "active" } }),
    prisma.staffMember.count({ where: { status: "on-duty" } }),
    prisma.classSession.count(),
    prisma.payment.aggregate({
      where: { status: "completed", date: { gte: startOfMonth() } },
      _sum: { amount: true },
    }),
  ]);

  return {
    name: settings?.name ?? "IronPulse Fitness",
    location: settings?.location ?? "Austin, TX",
    members: memberCount,
    monthlyRevenue: revenue._sum.amount ?? 0,
    activeClasses: classCount,
    staffOnDuty,
  };
}

export async function getMembers() {
  return prisma.member.findMany({ orderBy: { name: "asc" } });
}

export async function getStaff() {
  return prisma.staffMember.findMany({ orderBy: { name: "asc" } });
}

export async function getAdminTasks() {
  return prisma.adminTask.findMany({ orderBy: { dueDate: "asc" } });
}

export async function getPayments() {
  return prisma.payment.findMany({
    include: { member: true },
    orderBy: { date: "desc" },
  });
}

export async function getClassSessions() {
  const sessions = await prisma.classSession.findMany({
    include: {
      enrollments: { where: { status: "confirmed" } },
      waitlist: { orderBy: { position: "asc" } },
    },
    orderBy: [{ day: "asc" }, { startTime: "asc" }],
  });

  return sessions.map((s) => ({
    id: s.id,
    name: s.name,
    instructor: s.instructor,
    day: s.day,
    startTime: s.startTime,
    endTime: s.endTime,
    capacity: s.capacity,
    enrolled: s.enrollments.length,
    waitlistCount: s.waitlist.length,
    room: s.room,
    category: s.category,
  }));
}

export async function getCampaigns() {
  return prisma.campaign.findMany({ orderBy: { startDate: "desc" } });
}

export async function getRevenueByMonth() {
  return prisma.revenueSnapshot.findMany({ orderBy: { month: "asc" } });
}

export async function getWeeklyAttendance() {
  return prisma.attendanceSnapshot.findMany();
}

function startOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}
