import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-orange-100 text-orange-600",
}: StatCardProps) {
  const changeColors = {
    positive: "text-emerald-600",
    negative: "text-red-600",
    neutral: "text-zinc-500",
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{value}</p>
          {change && (
            <p className={cn("mt-1 text-sm font-medium", changeColors[changeType])}>
              {change}
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-3", iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
