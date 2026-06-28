import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, ClipboardList, AlertCircle, Plus } from "lucide-react";
import { members, staff, adminTasks } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function AdminPage() {
  const activeMembers = members.filter((m) => m.status === "active").length;
  const onDutyStaff = staff.filter((s) => s.status === "on-duty").length;
  const pendingTasks = adminTasks.filter((t) => t.status !== "completed").length;
  const highPriority = adminTasks.filter((t) => t.priority === "high" && t.status !== "completed").length;

  return (
    <>
      <Header
        title="Admin"
        description="Manage members, staff, and operational tasks."
        action={{ label: "Add Member" }}
      />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Active Members"
            value={String(activeMembers)}
            change={`${members.length} total members`}
            changeType="neutral"
            icon={Users}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Staff On Duty"
            value={`${onDutyStaff}/${staff.length}`}
            change="4 instructors available"
            changeType="neutral"
            icon={UserCheck}
            iconColor="bg-emerald-100 text-emerald-600"
          />
          <StatCard
            title="Open Tasks"
            value={String(pendingTasks)}
            change="Across all departments"
            changeType="neutral"
            icon={ClipboardList}
            iconColor="bg-orange-100 text-orange-600"
          />
          <StatCard
            title="High Priority"
            value={String(highPriority)}
            change="Requires attention"
            changeType={highPriority > 0 ? "negative" : "positive"}
            icon={AlertCircle}
            iconColor="bg-red-100 text-red-600"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Members</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Plan</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Visit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-3">
                        <p className="text-sm font-medium text-zinc-900">{member.name}</p>
                        <p className="text-xs text-zinc-500">{member.email}</p>
                      </td>
                      <td className="px-6 py-3 text-sm text-zinc-600">{member.plan}</td>
                      <td className="px-6 py-3">
                        <Badge
                          variant={
                            member.status === "active"
                              ? "success"
                              : member.status === "frozen"
                                ? "warning"
                                : "default"
                          }
                        >
                          {member.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 text-sm text-zinc-500">{formatDate(member.lastVisit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Staff</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {staff.map((person) => (
                    <tr key={person.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-3">
                        <p className="text-sm font-medium text-zinc-900">{person.name}</p>
                        <p className="text-xs text-zinc-500">{person.email}</p>
                      </td>
                      <td className="px-6 py-3 text-sm text-zinc-600">{person.role}</td>
                      <td className="px-6 py-3">
                        <Badge variant={person.status === "on-duty" ? "success" : "default"}>
                          {person.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Admin Tasks</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  <th className="px-6 py-3">Task</th>
                  <th className="px-6 py-3">Assignee</th>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {adminTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-3 text-sm font-medium text-zinc-900">{task.title}</td>
                    <td className="px-6 py-3 text-sm text-zinc-600">{task.assignee}</td>
                    <td className="px-6 py-3">
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
                    </td>
                    <td className="px-6 py-3 text-sm text-zinc-500">{formatDate(task.dueDate)}</td>
                    <td className="px-6 py-3">
                      <Badge
                        variant={
                          task.status === "completed"
                            ? "success"
                            : task.status === "in-progress"
                              ? "info"
                              : "default"
                        }
                      >
                        {task.status}
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
