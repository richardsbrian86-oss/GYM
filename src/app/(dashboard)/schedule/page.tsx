import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Plus } from "lucide-react";
import { classSessions, daysOfWeek } from "@/lib/mock-data";
import { formatTime } from "@/lib/utils";

export default function SchedulePage() {
  const totalEnrolled = classSessions.reduce((sum, c) => sum + c.enrolled, 0);
  const totalCapacity = classSessions.reduce((sum, c) => sum + c.capacity, 0);
  const fullClasses = classSessions.filter((c) => c.enrolled >= c.capacity).length;
  const avgFill = Math.round((totalEnrolled / totalCapacity) * 100);

  const categories = [...new Set(classSessions.map((c) => c.category))];

  return (
    <>
      <Header
        title="Class Schedule"
        description="Manage classes, instructors, and room assignments."
        action={{ label: "Add Class" }}
      />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Classes"
            value={String(classSessions.length)}
            change={`${categories.length} categories`}
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-orange-100 text-orange-600"
          />
          <StatCard
            title="Total Enrolled"
            value={String(totalEnrolled)}
            change={`${avgFill}% avg capacity`}
            changeType="positive"
            icon={Users}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Full Classes"
            value={String(fullClasses)}
            change="Waitlist available"
            changeType={fullClasses > 0 ? "negative" : "neutral"}
            icon={MapPin}
            iconColor="bg-red-100 text-red-600"
          />
          <StatCard
            title="Rooms in Use"
            value="4"
            change="Studio A, B, Cycle, Outdoor"
            changeType="neutral"
            icon={MapPin}
            iconColor="bg-emerald-100 text-emerald-600"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge key={cat} variant="accent">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          {daysOfWeek.map((day) => {
            const dayClasses = classSessions.filter((c) => c.day === day);
            if (dayClasses.length === 0) return null;

            return (
              <Card key={day}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{day}</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                    Add class
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {dayClasses.map((cls) => {
                      const fillPercent = Math.round((cls.enrolled / cls.capacity) * 100);
                      const isFull = cls.enrolled >= cls.capacity;

                      return (
                        <div
                          key={cls.id}
                          className="rounded-lg border border-zinc-200 p-4 transition-shadow hover:shadow-md"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-zinc-900">{cls.name}</p>
                              <p className="mt-0.5 text-sm text-zinc-500">{cls.instructor}</p>
                            </div>
                            <Badge variant="accent">{cls.category}</Badge>
                          </div>
                          <div className="mt-3 space-y-1.5 text-sm text-zinc-600">
                            <p>
                              {formatTime(cls.startTime)} – {formatTime(cls.endTime)}
                            </p>
                            <p>{cls.room}</p>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className={isFull ? "font-medium text-red-600" : "text-zinc-500"}>
                                {cls.enrolled}/{cls.capacity} enrolled
                              </span>
                              <span className="text-zinc-400">{fillPercent}%</span>
                            </div>
                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  isFull ? "bg-red-500" : fillPercent > 80 ? "bg-amber-500" : "bg-emerald-500"
                                }`}
                                style={{ width: `${fillPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
