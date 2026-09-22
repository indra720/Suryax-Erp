import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Flag, Calendar, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/admin/project/MileStone")({
  head: () => ({
    meta: [{ title: "Admin - Project Milestones | Vrindavan ERP" }],
  }),
  component: AdminProjectMilestonesPage,
});

export function AdminProjectMilestonesPage() {
  const milestones = [
    { id: 1, title: "Land Acquisition & Revenue Registry Clearance", project: "Vrindavan Greens Phase-2", date: "15 Jan 2026", status: "Completed", progress: "100%" },
    { id: 2, title: "Township Layout Approval & RERA Sanction", project: "Vrindavan Greens Phase-2", date: "10 Feb 2026", status: "Completed", progress: "100%" },
    { id: 3, title: "Underground Drainage & Water Piping", project: "Vrindavan Greens Phase-2", date: "28 Mar 2026", status: "In Progress", progress: "85%" },
    { id: 4, title: "60ft Main Arterial Road Asphalt Paving", project: "Vrindavan Greens Phase-2", date: "25 Apr 2026", status: "Pending", progress: "30%" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Flag className="size-6 text-brand" />
          Township Engineering Milestones
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Track high-level project milestones, regulatory approvals, and structural deliveries.
        </p>
      </div>

      <div className="space-y-3">
        {milestones.map((m) => (
          <Card key={m.id} className="border rounded-xl bg-white shadow-xs p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${m.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-brand"}`}>
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand uppercase">{m.project}</span>
                  <h3 className="text-sm font-bold text-gray-900">{m.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Target Completion: {m.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-700 font-mono">{m.progress}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    m.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {m.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
