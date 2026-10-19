import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { siteEngineerService, type TowerProgress } from "@/lib/services/site-engineer";

export const Route = createFileRoute("/site-engineer/progress")({
  head: () => ({
    meta: [
      { title: "Milestone & Tower Progress | Vrindavan Engineering" },
      { name: "description", content: "Civil construction phases, slab casting progress, and handover timelines." },
    ],
  }),
  component: SiteProgressPage,
});

export function SiteProgressPage() {
  const [towers] = useState<TowerProgress[]>(siteEngineerService.getTowers());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <BarChart3 className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tower Milestones & Civil Progress
          </h1>
          <p className="text-xs text-text-secondary">
            Structural completion status, target handover timelines, and active contractor tasks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {towers.map((t) => (
          <Card key={t.id} className="p-5 bg-card border border-border space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">{t.towerName}</h3>
                <p className="text-xs text-text-secondary">{t.projectName}</p>
              </div>
              <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20">
                {t.overallPercent}% Finished
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Floors Casted</span>
                <span className="font-bold text-foreground">
                  {t.floorsCasted} of {t.totalFloors} Floors
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4F20D8] to-[#6732F2]"
                  style={{ width: `${(t.floorsCasted / t.totalFloors) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 text-xs space-y-1">
              <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider block">
                Current Activity on Site
              </span>
              <p className="font-medium text-foreground">{t.currentActivity}</p>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5 text-text-muted" /> Target Handover: <strong className="text-foreground">{t.targetHandover}</strong>
              </span>
              <span className="font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                {t.structureStatus}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
