import { revenueByMonth, weeklyAttendance } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  formatValue?: (v: number) => string;
}

export function BarChart({ data, color = "bg-orange-500", formatValue }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex h-48 items-end gap-2">
      {data.map((item) => {
        const height = max > 0 ? (item.value / max) * 100 : 0;
        return (
          <div key={item.label} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end">
              <div
                className={`w-full rounded-t-md ${color} transition-all group-hover:opacity-80`}
                style={{ height: `${height}%`, minHeight: height > 0 ? "4px" : "0" }}
              />
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {formatValue ? formatValue(item.value) : item.value}
              </div>
            </div>
            <span className="text-xs font-medium text-zinc-500">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function RevenueChart() {
  return (
    <BarChart
      data={revenueByMonth.map((m) => ({ label: m.month, value: m.revenue }))}
      formatValue={formatCurrency}
    />
  );
}

export function AttendanceChart() {
  return (
    <BarChart
      data={weeklyAttendance.map((d) => ({ label: d.day, value: d.count }))}
      color="bg-emerald-500"
    />
  );
}
