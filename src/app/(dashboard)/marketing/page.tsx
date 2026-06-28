import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, Mail, MousePointerClick, Eye, Plus } from "lucide-react";
import { campaigns } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function MarketingPage() {
  const active = campaigns.filter((c) => c.status === "active");
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
  const avgOpenRate =
    active.length > 0
      ? (active.reduce((sum, c) => sum + c.openRate, 0) / active.length).toFixed(1)
      : "0";
  const avgClickRate =
    active.length > 0
      ? (active.reduce((sum, c) => sum + c.clickRate, 0) / active.length).toFixed(1)
      : "0";

  const statusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success" as const;
      case "scheduled":
        return "info" as const;
      case "completed":
        return "default" as const;
      default:
        return "warning" as const;
    }
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "email":
        return "📧";
      case "sms":
        return "💬";
      case "social":
        return "📱";
      default:
        return "📣";
    }
  };

  return (
    <>
      <Header
        title="Marketing"
        description="Run campaigns, track engagement, and grow your membership."
        action={{ label: "New Campaign" }}
      />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Active Campaigns"
            value={String(active.length)}
            change={`${campaigns.length} total campaigns`}
            changeType="neutral"
            icon={Megaphone}
            iconColor="bg-orange-100 text-orange-600"
          />
          <StatCard
            title="Messages Sent"
            value={totalSent.toLocaleString()}
            change="All time"
            changeType="neutral"
            icon={Mail}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Avg Open Rate"
            value={`${avgOpenRate}%`}
            change="Across active campaigns"
            changeType="positive"
            icon={Eye}
            iconColor="bg-emerald-100 text-emerald-600"
          />
          <StatCard
            title="Avg Click Rate"
            value={`${avgClickRate}%`}
            change="Across active campaigns"
            changeType="positive"
            icon={MousePointerClick}
            iconColor="bg-purple-100 text-purple-600"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{typeIcon(campaign.type)}</span>
                    <div>
                      <CardTitle className="text-sm">{campaign.name}</CardTitle>
                      <p className="mt-0.5 text-xs capitalize text-zinc-500">{campaign.type} campaign</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant(campaign.status)}>{campaign.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-zinc-50 p-3 text-center">
                    <p className="text-lg font-bold text-zinc-900">
                      {campaign.audience.toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-500">Audience</p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-3 text-center">
                    <p className="text-lg font-bold text-zinc-900">
                      {campaign.sent.toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-500">Sent</p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-3 text-center">
                    <p className="text-lg font-bold text-emerald-600">{campaign.openRate}%</p>
                    <p className="text-xs text-zinc-500">Open Rate</p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-3 text-center">
                    <p className="text-lg font-bold text-blue-600">{campaign.clickRate}%</p>
                    <p className="text-xs text-zinc-500">Click Rate</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-zinc-400">
                  Started {formatDate(campaign.startDate)}
                </p>
                <div className="mt-auto flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Report
                  </Button>
                  {campaign.status === "draft" && (
                    <Button size="sm" className="flex-1">
                      Launch
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="flex items-center justify-center border-2 border-dashed border-zinc-200 bg-zinc-50/50">
            <div className="p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Plus className="h-6 w-6 text-orange-600" />
              </div>
              <p className="mt-4 text-sm font-medium text-zinc-900">Create New Campaign</p>
              <p className="mt-1 text-xs text-zinc-500">
                Email, SMS, or social media
              </p>
              <Button size="sm" className="mt-4">
                Get Started
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
