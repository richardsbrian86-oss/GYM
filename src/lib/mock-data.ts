export interface Member {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: "active" | "inactive" | "frozen";
  joinDate: string;
  lastVisit: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "on-duty" | "off-duty";
}

export interface AdminTask {
  id: string;
  title: string;
  assignee: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

export interface Payment {
  id: string;
  member: string;
  amount: number;
  type: "membership" | "class-pack" | "personal-training" | "merchandise";
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  method: string;
}

export interface ClassSession {
  id: string;
  name: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
  room: string;
  category: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: "email" | "sms" | "social";
  status: "active" | "draft" | "completed" | "scheduled";
  audience: number;
  sent: number;
  openRate: number;
  clickRate: number;
  startDate: string;
}

export const gymInfo = {
  name: "IronPulse Fitness",
  location: "Austin, TX",
  members: 1247,
  monthlyRevenue: 89420,
  activeClasses: 42,
  staffOnDuty: 8,
};

export const members: Member[] = [
  { id: "1", name: "Sarah Chen", email: "sarah.c@email.com", plan: "Premium", status: "active", joinDate: "2024-03-15", lastVisit: "2026-06-27" },
  { id: "2", name: "Marcus Johnson", email: "marcus.j@email.com", plan: "Basic", status: "active", joinDate: "2025-01-08", lastVisit: "2026-06-26" },
  { id: "3", name: "Emily Rodriguez", email: "emily.r@email.com", plan: "Premium", status: "frozen", joinDate: "2023-11-22", lastVisit: "2026-05-10" },
  { id: "4", name: "David Kim", email: "david.k@email.com", plan: "Elite", status: "active", joinDate: "2024-07-01", lastVisit: "2026-06-28" },
  { id: "5", name: "Lisa Thompson", email: "lisa.t@email.com", plan: "Basic", status: "inactive", joinDate: "2025-06-14", lastVisit: "2026-04-02" },
  { id: "6", name: "James Wilson", email: "james.w@email.com", plan: "Premium", status: "active", joinDate: "2024-09-30", lastVisit: "2026-06-28" },
];

export const staff: StaffMember[] = [
  { id: "1", name: "Coach Mike Torres", role: "Head Trainer", email: "mike@ironpulse.com", status: "on-duty" },
  { id: "2", name: "Anna Park", role: "Yoga Instructor", email: "anna@ironpulse.com", status: "on-duty" },
  { id: "3", name: "Chris Evans", role: "Front Desk", email: "chris@ironpulse.com", status: "on-duty" },
  { id: "4", name: "Rachel Green", role: "Nutritionist", email: "rachel@ironpulse.com", status: "off-duty" },
  { id: "5", name: "Tom Bradley", role: "Spin Instructor", email: "tom@ironpulse.com", status: "on-duty" },
];

export const adminTasks: AdminTask[] = [
  { id: "1", title: "Renew equipment insurance", assignee: "Chris Evans", priority: "high", dueDate: "2026-07-05", status: "pending" },
  { id: "2", title: "Update class waiver forms", assignee: "Coach Mike Torres", priority: "medium", dueDate: "2026-07-10", status: "in-progress" },
  { id: "3", title: "Schedule quarterly staff training", assignee: "Rachel Green", priority: "medium", dueDate: "2026-07-15", status: "pending" },
  { id: "4", title: "Inventory locker room supplies", assignee: "Chris Evans", priority: "low", dueDate: "2026-07-20", status: "pending" },
  { id: "5", title: "Submit tax documents", assignee: "Admin", priority: "high", dueDate: "2026-07-01", status: "completed" },
  { id: "6", title: "Review member feedback survey", assignee: "Anna Park", priority: "low", dueDate: "2026-07-12", status: "in-progress" },
];

export const payments: Payment[] = [
  { id: "PAY-1042", member: "Sarah Chen", amount: 89, type: "membership", status: "completed", date: "2026-06-28", method: "Visa ••4242" },
  { id: "PAY-1041", member: "David Kim", amount: 149, type: "membership", status: "completed", date: "2026-06-28", method: "Amex ••1005" },
  { id: "PAY-1040", member: "Marcus Johnson", amount: 49, type: "membership", status: "completed", date: "2026-06-27", method: "Mastercard ••8831" },
  { id: "PAY-1039", member: "James Wilson", amount: 200, type: "personal-training", status: "completed", date: "2026-06-27", method: "Visa ••4242" },
  { id: "PAY-1038", member: "Lisa Thompson", amount: 49, type: "membership", status: "failed", date: "2026-06-26", method: "Visa ••9912" },
  { id: "PAY-1037", member: "Emily Rodriguez", amount: 120, type: "class-pack", status: "completed", date: "2026-06-25", method: "Apple Pay" },
  { id: "PAY-1036", member: "Sarah Chen", amount: 35, type: "merchandise", status: "refunded", date: "2026-06-24", method: "Visa ••4242" },
  { id: "PAY-1035", member: "David Kim", amount: 89, type: "membership", status: "pending", date: "2026-06-28", method: "Bank Transfer" },
];

export const classSessions: ClassSession[] = [
  { id: "1", name: "HIIT Blast", instructor: "Coach Mike Torres", day: "Monday", startTime: "06:00", endTime: "06:45", capacity: 20, enrolled: 18, room: "Studio A", category: "Cardio" },
  { id: "2", name: "Power Yoga", instructor: "Anna Park", day: "Monday", startTime: "07:00", endTime: "08:00", capacity: 25, enrolled: 22, room: "Studio B", category: "Yoga" },
  { id: "3", name: "Spin Cycle", instructor: "Tom Bradley", day: "Monday", startTime: "12:00", endTime: "12:45", capacity: 30, enrolled: 28, room: "Cycle Room", category: "Cardio" },
  { id: "4", name: "Strength & Conditioning", instructor: "Coach Mike Torres", day: "Tuesday", startTime: "06:00", endTime: "07:00", capacity: 15, enrolled: 12, room: "Weight Floor", category: "Strength" },
  { id: "5", name: "Pilates Core", instructor: "Anna Park", day: "Tuesday", startTime: "09:00", endTime: "09:50", capacity: 18, enrolled: 14, room: "Studio B", category: "Flexibility" },
  { id: "6", name: "Boxing Fundamentals", instructor: "Coach Mike Torres", day: "Wednesday", startTime: "17:00", endTime: "18:00", capacity: 16, enrolled: 16, room: "Studio A", category: "Combat" },
  { id: "7", name: "Evening Spin", instructor: "Tom Bradley", day: "Wednesday", startTime: "18:30", endTime: "19:15", capacity: 30, enrolled: 25, room: "Cycle Room", category: "Cardio" },
  { id: "8", name: "Restorative Yoga", instructor: "Anna Park", day: "Thursday", startTime: "19:00", endTime: "20:00", capacity: 20, enrolled: 11, room: "Studio B", category: "Yoga" },
  { id: "9", name: "CrossFit WOD", instructor: "Coach Mike Torres", day: "Friday", startTime: "06:00", endTime: "07:00", capacity: 20, enrolled: 19, room: "Weight Floor", category: "Strength" },
  { id: "10", name: "Saturday Bootcamp", instructor: "Tom Bradley", day: "Saturday", startTime: "08:00", endTime: "09:00", capacity: 25, enrolled: 20, room: "Outdoor", category: "Cardio" },
];

export const campaigns: Campaign[] = [
  { id: "1", name: "Summer Shred Challenge", type: "email", status: "active", audience: 1247, sent: 1180, openRate: 42.3, clickRate: 12.8, startDate: "2026-06-01" },
  { id: "2", name: "New Member Welcome Series", type: "email", status: "active", audience: 340, sent: 340, openRate: 68.5, clickRate: 24.1, startDate: "2026-01-01" },
  { id: "3", name: "Class Reminder SMS", type: "sms", status: "active", audience: 890, sent: 2450, openRate: 95.2, clickRate: 8.4, startDate: "2026-03-15" },
  { id: "4", name: "Refer a Friend Promo", type: "social", status: "scheduled", audience: 5000, sent: 0, openRate: 0, clickRate: 0, startDate: "2026-07-04" },
  { id: "5", name: "Holiday Membership Sale", type: "email", status: "completed", audience: 1100, sent: 1100, openRate: 38.7, clickRate: 9.2, startDate: "2025-12-01" },
  { id: "6", name: "Personal Training Upsell", type: "email", status: "draft", audience: 420, sent: 0, openRate: 0, clickRate: 0, startDate: "2026-07-15" },
];

export const revenueByMonth = [
  { month: "Jan", revenue: 72000 },
  { month: "Feb", revenue: 74500 },
  { month: "Mar", revenue: 76800 },
  { month: "Apr", revenue: 78200 },
  { month: "May", revenue: 83100 },
  { month: "Jun", revenue: 89420 },
];

export const weeklyAttendance = [
  { day: "Mon", count: 312 },
  { day: "Tue", count: 287 },
  { day: "Wed", count: 298 },
  { day: "Thu", count: 276 },
  { day: "Fri", count: 334 },
  { day: "Sat", count: 198 },
  { day: "Sun", count: 142 },
];

export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
