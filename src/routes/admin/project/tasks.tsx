import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckSquare, Plus, Clock, User, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/project/tasks")({
  head: () => ({
    meta: [{ title: "Admin - Project Tasks | Vrindavan ERP" }],
  }),
  component: AdminProjectTasksPage,
});

export function AdminProjectTasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Survey Plot Boundary Pegs for Sector B", assignee: "Pramod Civil Engg", priority: "High", due: "24 Mar 2026", status: "Done" },
    { id: 2, title: "Install 25 KVA Transformer at Gate 2", assignee: "Alok Electricals", priority: "High", due: "26 Mar 2026", status: "In Progress" },
    { id: 3, title: "Complete Paver Blocks on 30ft Internal Road", assignee: "Sunil Contractor", priority: "Medium", due: "29 Mar 2026", status: "In Progress" },
    { id: 4, title: "Landscaping Palm Trees & Grass Turf along Avenue", assignee: "Horticulture Team", priority: "Low", due: "05 Apr 2026", status: "To Do" },
  ]);

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <CheckSquare className="size-6 text-brand" />
          On-Site Construction &amp; Engineering Tasks
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Daily on-ground task management for engineers, survey teams, and infrastructure contractors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* To Do */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-bold text-gray-700 uppercase">To Do</span>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-bold">1</span>
          </div>
          {tasks.filter((t) => t.status === "To Do").map((t) => (
            <Card key={t.id} className="p-3 border rounded-xl bg-white shadow-xs">
              <h4 className="font-bold text-xs text-gray-900">{t.title}</h4>
              <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                <span>👤 {t.assignee}</span>
                <span>📅 {t.due}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* In Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-bold text-blue-700 uppercase">In Progress</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">2</span>
          </div>
          {tasks.filter((t) => t.status === "In Progress").map((t) => (
            <Card key={t.id} className="p-3 border rounded-xl bg-white shadow-xs border-l-4 border-l-blue-500">
              <h4 className="font-bold text-xs text-gray-900">{t.title}</h4>
              <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                <span>👤 {t.assignee}</span>
                <span>📅 {t.due}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Done */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-bold text-emerald-700 uppercase">Completed</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">1</span>
          </div>
          {tasks.filter((t) => t.status === "Done").map((t) => (
            <Card key={t.id} className="p-3 border rounded-xl bg-white shadow-xs border-l-4 border-l-emerald-500">
              <h4 className="font-bold text-xs text-gray-900 line-through text-gray-500">{t.title}</h4>
              <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                <span>👤 {t.assignee}</span>
                <span className="text-emerald-600 font-bold">Verified</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
