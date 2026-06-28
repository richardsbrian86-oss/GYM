import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, AlertTriangle, Clock, Download } from "lucide-react";
import { payments, revenueByMonth } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BarChart } from "@/components/charts/bar-chart";

export default function PaymentsPage() {
  const completed = payments.filter((p) => p.status === "completed");
  const failed = payments.filter((p) => p.status === "failed");
  const pending = payments.filter((p) => p.status === "pending");
  const totalCollected = completed.reduce((sum, p) => sum + p.amount, 0);

  const byType = payments.reduce(
    (acc, p) => {
      if (p.status === "completed") acc[p.type] = (acc[p.type] || 0) + p.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <Header
        title="Payments"
        description="Track revenue, transactions, and billing."
        action={{ label: "Record Payment" }}
      />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Collected This Month"
            value={formatCurrency(totalCollected)}
            change="+7.6% vs last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-emerald-100 text-emerald-600"
          />
          <StatCard
            title="Transactions"
            value={String(payments.length)}
            change={`${completed.length} completed`}
            changeType="neutral"
            icon={TrendingUp}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Failed Payments"
            value={String(failed.length)}
            change="Requires follow-up"
            changeType={failed.length > 0 ? "negative" : "positive"}
            icon={AlertTriangle}
            iconColor="bg-red-100 text-red-600"
          />
          <StatCard
            title="Pending"
            value={String(pending.length)}
            change={formatCurrency(pending.reduce((s, p) => s + p.amount, 0))}
            changeType="neutral"
            icon={Clock}
            iconColor="bg-amber-100 text-amber-600"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={revenueByMonth.map((m) => ({ label: m.month, value: m.revenue }))}
                formatValue={formatCurrency}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(byType).map(([type, amount]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm capitalize text-zinc-600">{type.replace("-", " ")}</span>
                  <span className="text-sm font-semibold text-zinc-900">{formatCurrency(amount)}</span>
                </div>
              ))}
              <div className="border-t border-zinc-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-900">Total</span>
                  <span className="text-sm font-bold text-zinc-900">{formatCurrency(totalCollected)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Member</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Method</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-3 text-sm font-mono text-zinc-500">{payment.id}</td>
                    <td className="px-6 py-3 text-sm font-medium text-zinc-900">{payment.member}</td>
                    <td className="px-6 py-3 text-sm capitalize text-zinc-600">
                      {payment.type.replace("-", " ")}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-zinc-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-3 text-sm text-zinc-500">{payment.method}</td>
                    <td className="px-6 py-3 text-sm text-zinc-500">{formatDate(payment.date)}</td>
                    <td className="px-6 py-3">
                      <Badge
                        variant={
                          payment.status === "completed"
                            ? "success"
                            : payment.status === "failed"
                              ? "danger"
                              : payment.status === "refunded"
                                ? "info"
                                : "warning"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
