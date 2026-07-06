import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.waitlistEntry.deleteMany();
  await prisma.classEnrollment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.member.deleteMany();
  await prisma.classSession.deleteMany();
  await prisma.staffMember.deleteMany();
  await prisma.adminTask.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.revenueSnapshot.deleteMany();
  await prisma.attendanceSnapshot.deleteMany();
  await prisma.user.deleteMany();
  await prisma.gymSettings.deleteMany();

  await prisma.gymSettings.create({
    data: { name: "IronPulse Fitness", location: "Austin, TX" },
  });

  await prisma.user.create({
    data: {
      email: "admin@ironpulse.com",
      name: "Admin",
      passwordHash: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
  });

  const members = await Promise.all(
    [
      { name: "Sarah Chen", email: "sarah.c@email.com", plan: "Premium", status: "active", joinDate: "2024-03-15", lastVisit: "2026-06-27" },
      { name: "Marcus Johnson", email: "marcus.j@email.com", plan: "Basic", status: "active", joinDate: "2025-01-08", lastVisit: "2026-06-26" },
      { name: "Emily Rodriguez", email: "emily.r@email.com", plan: "Premium", status: "frozen", joinDate: "2023-11-22", lastVisit: "2026-05-10" },
      { name: "David Kim", email: "david.k@email.com", plan: "Elite", status: "active", joinDate: "2024-07-01", lastVisit: "2026-06-28" },
      { name: "Lisa Thompson", email: "lisa.t@email.com", plan: "Basic", status: "inactive", joinDate: "2025-06-14", lastVisit: "2026-04-02" },
      { name: "James Wilson", email: "james.w@email.com", plan: "Premium", status: "active", joinDate: "2024-09-30", lastVisit: "2026-06-28" },
    ].map((m) =>
      prisma.member.create({
        data: {
          ...m,
          joinDate: new Date(m.joinDate),
          lastVisit: new Date(m.lastVisit),
        },
      })
    )
  );

  const memberByName = Object.fromEntries(members.map((m) => [m.name, m]));

  await prisma.staffMember.createMany({
    data: [
      { name: "Coach Mike Torres", role: "Head Trainer", email: "mike@ironpulse.com", status: "on-duty" },
      { name: "Anna Park", role: "Yoga Instructor", email: "anna@ironpulse.com", status: "on-duty" },
      { name: "Chris Evans", role: "Front Desk", email: "chris@ironpulse.com", status: "on-duty" },
      { name: "Rachel Green", role: "Nutritionist", email: "rachel@ironpulse.com", status: "off-duty" },
      { name: "Tom Bradley", role: "Spin Instructor", email: "tom@ironpulse.com", status: "on-duty" },
    ],
  });

  await prisma.adminTask.createMany({
    data: [
      { title: "Renew equipment insurance", assignee: "Chris Evans", priority: "high", dueDate: new Date("2026-07-05"), status: "pending" },
      { title: "Update class waiver forms", assignee: "Coach Mike Torres", priority: "medium", dueDate: new Date("2026-07-10"), status: "in-progress" },
      { title: "Schedule quarterly staff training", assignee: "Rachel Green", priority: "medium", dueDate: new Date("2026-07-15"), status: "pending" },
      { title: "Inventory locker room supplies", assignee: "Chris Evans", priority: "low", dueDate: new Date("2026-07-20"), status: "pending" },
      { title: "Submit tax documents", assignee: "Admin", priority: "high", dueDate: new Date("2026-07-01"), status: "completed" },
      { title: "Review member feedback survey", assignee: "Anna Park", priority: "low", dueDate: new Date("2026-07-12"), status: "in-progress" },
    ],
  });

  await prisma.payment.createMany({
    data: [
      { externalId: "PAY-1042", memberId: memberByName["Sarah Chen"].id, amount: 89, type: "membership", status: "completed", date: new Date("2026-06-28"), method: "Visa ••4242" },
      { externalId: "PAY-1041", memberId: memberByName["David Kim"].id, amount: 149, type: "membership", status: "completed", date: new Date("2026-06-28"), method: "Amex ••1005" },
      { externalId: "PAY-1040", memberId: memberByName["Marcus Johnson"].id, amount: 49, type: "membership", status: "completed", date: new Date("2026-06-27"), method: "Mastercard ••8831" },
      { externalId: "PAY-1039", memberId: memberByName["James Wilson"].id, amount: 200, type: "personal-training", status: "completed", date: new Date("2026-06-27"), method: "Visa ••4242" },
      { externalId: "PAY-1038", memberId: memberByName["Lisa Thompson"].id, amount: 49, type: "membership", status: "failed", date: new Date("2026-06-26"), method: "Visa ••9912" },
      { externalId: "PAY-1037", memberId: memberByName["Emily Rodriguez"].id, amount: 120, type: "class-pack", status: "completed", date: new Date("2026-06-25"), method: "Apple Pay" },
      { externalId: "PAY-1036", memberId: memberByName["Sarah Chen"].id, amount: 35, type: "merchandise", status: "refunded", date: new Date("2026-06-24"), method: "Visa ••4242" },
      { externalId: "PAY-1035", memberId: memberByName["David Kim"].id, amount: 89, type: "membership", status: "pending", date: new Date("2026-06-28"), method: "Bank Transfer" },
    ],
  });

  const classes = await Promise.all(
    [
      { name: "HIIT Blast", instructor: "Coach Mike Torres", day: "Monday", startTime: "06:00", endTime: "06:45", capacity: 20, room: "Studio A", category: "Cardio", enrollCount: 18 },
      { name: "Power Yoga", instructor: "Anna Park", day: "Monday", startTime: "07:00", endTime: "08:00", capacity: 25, room: "Studio B", category: "Yoga", enrollCount: 22 },
      { name: "Spin Cycle", instructor: "Tom Bradley", day: "Monday", startTime: "12:00", endTime: "12:45", capacity: 30, room: "Cycle Room", category: "Cardio", enrollCount: 28 },
      { name: "Strength & Conditioning", instructor: "Coach Mike Torres", day: "Tuesday", startTime: "06:00", endTime: "07:00", capacity: 15, room: "Weight Floor", category: "Strength", enrollCount: 12 },
      { name: "Pilates Core", instructor: "Anna Park", day: "Tuesday", startTime: "09:00", endTime: "09:50", capacity: 18, room: "Studio B", category: "Flexibility", enrollCount: 14 },
      { name: "Boxing Fundamentals", instructor: "Coach Mike Torres", day: "Wednesday", startTime: "17:00", endTime: "18:00", capacity: 16, room: "Studio A", category: "Combat", enrollCount: 16 },
      { name: "Evening Spin", instructor: "Tom Bradley", day: "Wednesday", startTime: "18:30", endTime: "19:15", capacity: 30, room: "Cycle Room", category: "Cardio", enrollCount: 25 },
      { name: "Restorative Yoga", instructor: "Anna Park", day: "Thursday", startTime: "19:00", endTime: "20:00", capacity: 20, room: "Studio B", category: "Yoga", enrollCount: 11 },
      { name: "CrossFit WOD", instructor: "Coach Mike Torres", day: "Friday", startTime: "06:00", endTime: "07:00", capacity: 20, room: "Weight Floor", category: "Strength", enrollCount: 19 },
      { name: "Saturday Bootcamp", instructor: "Tom Bradley", day: "Saturday", startTime: "08:00", endTime: "09:00", capacity: 25, room: "Outdoor", category: "Cardio", enrollCount: 20 },
    ].map(({ enrollCount, ...cls }) => prisma.classSession.create({ data: cls }))
  );

  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    const enrollCount = [18, 22, 28, 12, 14, 16, 25, 11, 19, 20][i];
    const target = Math.min(enrollCount, cls.capacity);

    for (let j = 0; j < target; j++) {
      const member = members[j % members.length];
      await prisma.classEnrollment.upsert({
        where: {
          memberId_classSessionId: {
            memberId: member.id,
            classSessionId: cls.id,
          },
        },
        create: {
          memberId: member.id,
          classSessionId: cls.id,
          status: "confirmed",
        },
        update: { status: "confirmed" },
      });
    }

    if (enrollCount >= cls.capacity) {
      const waitlistMember = members[(target + 1) % members.length];
      await prisma.waitlistEntry.upsert({
        where: {
          memberId_classSessionId: {
            memberId: waitlistMember.id,
            classSessionId: cls.id,
          },
        },
        create: {
          memberId: waitlistMember.id,
          classSessionId: cls.id,
          position: 1,
        },
        update: { position: 1 },
      });
    }
  }

  await prisma.campaign.createMany({
    data: [
      { name: "Summer Shred Challenge", type: "email", status: "active", audience: 1247, sent: 1180, openRate: 42.3, clickRate: 12.8, startDate: new Date("2026-06-01") },
      { name: "New Member Welcome Series", type: "email", status: "active", audience: 340, sent: 340, openRate: 68.5, clickRate: 24.1, startDate: new Date("2026-01-01") },
      { name: "Class Reminder SMS", type: "sms", status: "active", audience: 890, sent: 2450, openRate: 95.2, clickRate: 8.4, startDate: new Date("2026-03-15") },
      { name: "Refer a Friend Promo", type: "social", status: "scheduled", audience: 5000, sent: 0, openRate: 0, clickRate: 0, startDate: new Date("2026-07-04") },
      { name: "Holiday Membership Sale", type: "email", status: "completed", audience: 1100, sent: 1100, openRate: 38.7, clickRate: 9.2, startDate: new Date("2025-12-01") },
      { name: "Personal Training Upsell", type: "email", status: "draft", audience: 420, sent: 0, openRate: 0, clickRate: 0, startDate: new Date("2026-07-15") },
    ],
  });

  await prisma.revenueSnapshot.createMany({
    data: [
      { month: "Jan", revenue: 72000 },
      { month: "Feb", revenue: 74500 },
      { month: "Mar", revenue: 76800 },
      { month: "Apr", revenue: 78200 },
      { month: "May", revenue: 83100 },
      { month: "Jun", revenue: 89420 },
    ],
  });

  await prisma.attendanceSnapshot.createMany({
    data: [
      { day: "Mon", count: 312 },
      { day: "Tue", count: 287 },
      { day: "Wed", count: 298 },
      { day: "Thu", count: 276 },
      { day: "Fri", count: 334 },
      { day: "Sat", count: 198 },
      { day: "Sun", count: 142 },
    ],
  });

  console.log("Database seeded successfully");
  console.log("Login: admin@ironpulse.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
