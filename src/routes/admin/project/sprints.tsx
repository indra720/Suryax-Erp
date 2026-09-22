import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Plus, CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/project/sprints")({
  head: () => ({
    meta: [{ title: "Admin - Project Sprints | Vrindavan ERP" }],
  }),
  component: AdminProjectSprintsPage,
});

export function AdminProjectSprintsPage() {
  const sprints = [
    { id: 1, name: "Sprint 14: Phase-2 Boundary Wall & Security Cabins", project: "Vrindavan Greens Phase-2", start: "01 Mar 2026", end: "31 Mar 2026", tasks: 12, completed: 9, status: "Active" },
    { id: 2, name: "Sprint 15: Overhead Water Tank & Pump House", project: "Radha Enclave Commercial Hub", start: "15 Mar 2026", end: "15 Apr 2026", tasks: 8, completed: 3, status: "Active" },
    { id: 3, name: "Sprint 16: Club House Foundation & Swimming Pool Excavation", project: "Govardhan Royal City", start: "01 Apr 2026", end: "30 Apr 2026", tasks: 14, completed: 0, status: "Upcoming" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Clock className="size-6 text-brand" />
          Site Development Sprints
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Time-boxed development cycles for site grading, road networks, and infrastructure amenities.
        </p>
      </div>

      <div className="space-y-3">
        {sprints.map((s) => (
          <Card key={s.id} className="border rounded-xl bg-white shadow-xs p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-brand uppercase tracking-wider">{s.project}</span>
                <h3 className="text-sm font-bold text-gray-900 mt-0.5">{s.name}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>📅 {s.start} - {s.end}</span>
                  <span>📋 {s.completed} of {s.tasks} tasks completed</span>
                </div>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  s.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                }`}
              >
                {s.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
