import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Target,
  Trophy,
  IndianRupee,
  TrendingUp,
  Award,
  Sparkles,
  Users,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { salesManagerService, type SalesTarget } from "@/lib/services/sales-manager";

export const Route = createFileRoute("/sales-manager/targets")({
  head: () => ({
    meta: [
      { title: "Sales Targets & Incentives | Vrindavan Sales" },
      { name: "description", content: "Executive quotas, achievement telemetry, and commission bonus slabs." },
    ],
  }),
  component: SalesTargetsPage,
});

export function SalesTargetsPage() {
  const [targets] = useState<SalesTarget[]>(salesManagerService.getTargets());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Target className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Sales Quotas & Incentive Slabs
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Monthly unit benchmarks, revenue targets, and accrued sales bonuses.
          </p>
        </div>

        <div className="text-xs font-semibold text-brand bg-brand/10 px-3 py-1.5 rounded-lg border border-brand/20">
          Target Cycle: April 2026 (Active)
        </div>
      </div>

      {/* Target Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {targets.map((t) => (
          <Card key={t.id} className="p-5 bg-card border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="size-10 rounded-full bg-gradient-to-r from-[#4F20D8] to-[#6732F2] text-white font-bold text-xs flex items-center justify-center">
                  {t.avatar}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{t.repName}</h3>
                  <p className="text-[11px] text-text-secondary">Sales Executive • Vrindavan Projects</p>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  t.completionPercentage >= 100
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                    : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                }`}
              >
                {t.completionPercentage}% Achieved
              </span>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-text-secondary">Revenue Realized</span>
                <span className="text-foreground font-bold">
                  ₹{(t.achievedValue / 10000000).toFixed(2)} Cr / ₹{(t.monthlyTargetValue / 10000000).toFixed(2)} Cr
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4F20D8] to-[#6732F2]"
                  style={{ width: `${Math.min(t.completionPercentage, 100)}%` }}
                />
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border text-center">
              <div className="p-2 rounded-lg bg-muted/40">
                <span className="text-[10px] text-text-secondary font-medium">Units Sold</span>
                <p className="text-xs font-bold text-foreground mt-0.5">
                  {t.achievedUnits} / {t.monthlyTargetUnits}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-muted/40">
                <span className="text-[10px] text-text-secondary font-medium">Visits Done</span>
                <p className="text-xs font-bold text-foreground mt-0.5">
                  {t.achievedVisits} / {t.visitsTarget}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <span className="text-[10px] text-emerald-700 font-medium">Incentive</span>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  ₹{(t.incentiveEarned / 1000).toFixed(0)}k
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
