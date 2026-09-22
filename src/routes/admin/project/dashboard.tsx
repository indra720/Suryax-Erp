import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Presentation,
  FolderKanban,
  CheckCircle,
  Clock,
  Users,
  AlertCircle,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/admin/project/dashboard")({
  head: () => ({
    meta: [{ title: "Admin - PMS Project Dashboard | Vrindavan ERP" }],
  }),
  component: AdminPmsDashboardPage,
});

export function AdminPmsDashboardPage() {
  const stats = [
    { title: "Active Projects", count: 6, sub: "Real estate construction & infra", icon: FolderKanban, color: "text-brand", bg: "bg-purple-50" },
    { title: "Ongoing Sprints", count: 4, sub: "Phase-wise deliverables", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Project Milestones", count: 18, sub: "12 completed, 6 in progress", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Active Tasks", count: 42, sub: "8 pending review", icon: Layers, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Presentation className="size-6 text-brand" />
          PMS Project Management Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Track real estate township site development, engineering sprints, construction milestones, and task boards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.title} className="border rounded-xl shadow-xs bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600">{s.title}</span>
                  <div className={`p-2 rounded-lg ${s.bg}`}>
                    <Icon className={`size-4 ${s.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-900 mt-2">{s.count}</div>
                <p className="text-[10px] text-gray-500 mt-0.5">{s.sub}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border rounded-xl bg-white shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Current Infrastructure Sprints</h3>
            <Link to="/admin/project/sprints" className="text-xs text-brand font-semibold hover:underline flex items-center gap-1">
              View Sprints <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg border bg-gray-50/50">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Phase-2 Boundary Wall &amp; Grand Entrance</span>
                <span className="text-emerald-600">75% Complete</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Due: 31st March 2026</p>
            </div>
            <div className="p-3 rounded-lg border bg-gray-50/50">
              <div className="flex justify-between font-bold text-gray-800">
                <span>60ft Main Arterial Road Asphalt Paving</span>
                <span className="text-blue-600">40% Complete</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Due: 15th April 2026</p>
            </div>
          </div>
        </Card>

        <Card className="border rounded-xl bg-white shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Engineering &amp; Site Milestones</h3>
            <Link to="/admin/project/MileStone" className="text-xs text-brand font-semibold hover:underline flex items-center gap-1">
              View Milestones <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg border bg-gray-50/50">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Underground Drainage &amp; Water Sewer Lines</span>
                <span className="text-emerald-600 font-bold">Achieved</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Inspected &amp; passed on 15 March</p>
            </div>
            <div className="p-3 rounded-lg border bg-gray-50/50">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Electrification &amp; Solar Streetlighting Grid</span>
                <span className="text-amber-600 font-bold">In Progress</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Pole installation underway</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
