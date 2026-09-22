import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, Plus, MapPin, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/project/all")({
  head: () => ({
    meta: [{ title: "Admin - All PMS Projects | Vrindavan ERP" }],
  }),
  component: AdminProjectsAllPage,
});

export function AdminProjectsAllPage() {
  const projects = [
    { id: 1, name: "Vrindavan Greens Phase-1", type: "Plotted Township", location: "NH-19 Mathura", units: 140, sold: 128, progress: "92%", status: "Near Completion" },
    { id: 2, name: "Vrindavan Greens Phase-2", type: "Residential Plots & Villas", location: "Chatikara Road", units: 210, sold: 135, progress: "64%", status: "Active Development" },
    { id: 3, name: "Radha Enclave Commercial Hub", type: "Commercial Shops & Offices", location: "Near Prem Mandir Corridor", units: 45, sold: 28, progress: "45%", status: "Foundation & Framing" },
    { id: 4, name: "Govardhan Royal City", type: "Gated Luxury Township", location: "Govardhan Parikrama Marg", units: 180, sold: 42, progress: "25%", status: "Roads & Utilities" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <FolderKanban className="size-6 text-brand" />
            Township &amp; Construction Projects
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Overview of all active development sites, plots available, and construction progress.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <Card key={p.id} className="border rounded-xl bg-white shadow-xs p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{p.name}</h3>
                <p className="text-xs text-brand font-semibold mt-0.5">{p.type}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                {p.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-gray-50 rounded-lg text-center text-xs">
              <div>
                <span className="text-gray-400 text-[10px]">Total Units</span>
                <p className="font-bold text-gray-800">{p.units}</p>
              </div>
              <div>
                <span className="text-gray-400 text-[10px]">Booked</span>
                <p className="font-bold text-blue-600">{p.sold}</p>
              </div>
              <div>
                <span className="text-gray-400 text-[10px]">Development</span>
                <p className="font-bold text-emerald-600">{p.progress}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
              <MapPin className="size-3.5 text-gray-400" />
              <span>{p.location}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
