import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Search,
  PhoneCall,
  HardHat,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { siteEngineerService, type Contractor } from "@/lib/services/site-engineer";

export const Route = createFileRoute("/site-engineer/contractors")({
  head: () => ({
    meta: [
      { title: "Contractors & Labor Deployment | Vrindavan Engineering" },
      { name: "description", content: "Subcontractor agencies, trade headcounts, and daily labor muster roll." },
    ],
  }),
  component: SiteContractorsPage,
});

export function SiteContractorsPage() {
  const [contractors] = useState<Contractor[]>(siteEngineerService.getContractors());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <Users className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Contractors & Labor Attendance
          </h1>
          <p className="text-xs text-text-secondary">
            Daily manpower deployment across civil, plumbing, electrical, and aluminum fabrication trades.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contractors.map((c) => (
          <Card key={c.id} className="p-5 bg-card border border-border space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">{c.agencyName}</h3>
                <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded mt-1 inline-block">
                  {c.trade}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                {c.complianceStatus}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 text-xs text-text-secondary space-y-1">
              <p className="font-semibold text-foreground">Site Supervisor: {c.supervisorName}</p>
              <p className="flex items-center gap-1.5">
                <PhoneCall className="size-3 text-text-muted" /> {c.supervisorPhone}
              </p>
            </div>

            <div className="pt-2 border-t border-border grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-muted/30">
                <span className="text-[10px] text-text-secondary">Allocated</span>
                <p className="font-bold text-foreground mt-0.5">{c.allocatedWorkers} Workers</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <span className="text-[10px] text-emerald-700">Present Today</span>
                <p className="font-bold text-emerald-700 mt-0.5">{c.presentToday} Present</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-500/10">
                <span className="text-[10px] text-purple-700">Score</span>
                <p className="font-bold text-purple-700 mt-0.5">{c.performanceScore}%</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
