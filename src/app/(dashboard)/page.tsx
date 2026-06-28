import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevenueChart, AttendanceChart } from "@/components/charts/bar-chart";
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  gymInfo,
  payments,
  classSessions,
  adminTasks,
  campaigns,
} from "@/lib/mock-data";
import { formatCurrency, formatTime } from "@/lib/utils";

export default function OverviewPage() {
  const todayClasses = classSessions.filter((c) => c.day === "Monday");
  const pendingTasks = adminTasks.filter((t) => t.status !== "completed");
  const recentPayments = payments.slice(0, 5);
  const activeCampaigns = campaigns.filter((c) => c.status === "active");

  return (
    <>
      <Header
        title="Dashboard"
        description={`Welcome back — here's what's happening at ${gymInfo.name} today.`}
      />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Members"
            value={gymInfo.members.toLocaleString()}
            change="+12% from last month"
            changeType="positive"
            icon={Users}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(gymInfo.monthlyRevenue)}
            change="+7.6% from last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-emerald-100 text-emerald-600"
          />
          <StatCard
            title="Active Classes"
            value={String(gymInfo.activeClasses)}
            change="6 classes today"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-orange-100 text-orange-600"
          />
          <StatCard
            title="Check-ins Today"
            value="187"
            change="+23 vs yesterday"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-purple-100 text-purple-600"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceChart />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today&apos;s Classes</CardTitle>
              <Link href="/schedule" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{cls.name}</p>
                    <p className="text-xs text-zinc-500">
                      {formatTime(cls.startTime)} · {cls.instructor}
                    </p>
                  </div>
                  <Badge variant={cls.enrolled >= cls.capacity ? "danger" : "success"}>
                    {cls.enrolled}/{cls.capacity}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Tasks</CardTitle>
              <Link href="/admin" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-start justify-between rounded-lg border border-zinc-100 p-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{task.title}</p>
                    <p className="text-xs text-zinc-500">{task.assignee}</p>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high"
                        ? "danger"
                        : task.priority === "medium"
                          ? "warning"
                          : "default"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Payments</CardTitle>
              <Link href="/payments" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{payment.member}</p>
                    <p className="text-xs text-zinc-500">{payment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-zinc-900">{formatCurrency(payment.amount)}</p>
                    <Badge
                      variant={
                        payment.status === "completed"
                          ? "success"
                          : payment.status === "failed"
                            ? "danger"
                            : "warning"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Marketing Campaigns</CardTitle>
            <Link
              href="/marketing"
              className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Manage campaigns <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="rounded-lg border border-zinc-100 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-900">{campaign.name}</p>
                    <Badge variant="accent">{campaign.type}</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-zinc-900">{campaign.openRate}%</p>
                      <p className="text-xs text-zinc-500">Open Rate</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-zinc-900">{campaign.clickRate}%</p>
                      <p className="text-xs text-zinc-500">Click Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
