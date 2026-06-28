"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  Megaphone,
  Dumbbell,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { gymInfo } from "@/lib/mock-data";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/admin", label: "Admin", icon: Users },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
];

const bottomItems = [
  { href: "#", label: "Settings", icon: Settings },
  { href: "#", label: "Help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col bg-zinc-950 text-zinc-300">
      <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600">
          <Dumbbell className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{gymInfo.name}</p>
          <p className="text-xs text-zinc-500">{gymInfo.location}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
          Main Menu
        </p>
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange-600/10 text-orange-400"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-orange-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 px-3 py-4">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-zinc-300"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-red-400">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
