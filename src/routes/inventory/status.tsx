import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ListChecks,
  CheckCircle,
  Clock,
  Building,
  Key,
} from "lucide-react";
import { Card } from "@/components/erp/ui";

export const Route = createFileRoute("/inventory/status")({
  head: () => ({
    meta: [
      { title: "Unit Lifecycle Status | Vrindavan Inventory" },
      { name: "description", content: "End-to-end unit transition from available to token, agreement, registry, and key handover." },
    ],
  }),
  component: InventoryStatusPage,
});

export function InventoryStatusPage() {
  const lifecycleStages = [
    { title: "Available in Inventory", count: 112, desc: "Listed for sale on broker portal and online booking.", color: "text-emerald-600 bg-emerald-500/10" },
    { title: "On Active Priority Hold", count: 26, desc: "Held by sales team or brokers with active countdown timers.", color: "text-amber-600 bg-amber-500/10" },
    { title: "Token Paid (BBA Pending)", count: 48, desc: "Earnest booking token received, legal agreement being drafted.", color: "text-purple-600 bg-purple-500/10" },
    { title: "BBA Executed & Active", count: 184, desc: "Bilateral agreement signed, milestone installments being paid.", color: "text-blue-600 bg-blue-500/10" },
    { title: "Deed Registered & Sealed", count: 92, desc: "Stamp duty paid at Sub-Registrar and sale deed executed.", color: "text-indigo-600 bg-indigo-500/10" },
    { title: "Possession Handed Over", count: 18, desc: "Final key handover completed and maintenance society inducted.", color: "text-teal-600 bg-teal-500/10" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <ListChecks className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Unit Lifecycle Status Overview
          </h1>
          <p className="text-xs text-text-secondary">
            Tracking 480 total units through each operational milestone from inventory listing to possession handover.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lifecycleStages.map((stage) => (
          <Card key={stage.title} className="p-5 bg-card border border-border space-y-3">
            <div className="flex items-start justify-between">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stage.color}`}>
                {stage.title}
              </span>
              <span className="text-2xl font-extrabold text-foreground">{stage.count}</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed pt-2 border-t border-border">
              {stage.desc}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
