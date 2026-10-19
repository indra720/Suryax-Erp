import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Camera,
  Calendar,
  CheckCircle,
  Building,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { customerService, type ConstructionMilestoneUpdate } from "@/lib/services/customer";

export const Route = createFileRoute("/customer/updates")({
  head: () => ({
    meta: [
      { title: "Live Construction Feed | Vrindavan Customer" },
      { name: "description", content: "Site progress updates, high-res photos, and milestone progress for your tower." },
    ],
  }),
  component: CustomerUpdatesPage,
});

export function CustomerUpdatesPage() {
  const [milestones] = useState<ConstructionMilestoneUpdate[]>(customerService.getMilestones());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <Camera className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Live Construction Progress Feed
          </h1>
          <p className="text-xs text-text-secondary">
            Verified updates from Chief Site Engineers on your tower and apartment floor.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {milestones.map((m) => (
          <Card key={m.id} className="p-5 bg-card border border-border space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">{m.milestoneTitle}</h3>
                <span className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                  <Calendar className="size-3" /> Updated on: {m.updateDate}
                </span>
              </div>
              <span className="text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
                {m.progressPercentage}% Finished
              </span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">{m.description}</p>

            <div className="h-44 rounded-xl bg-muted/60 border border-border flex items-center justify-center relative overflow-hidden">
              <Camera className="size-10 text-text-muted/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                <span className="text-xs font-semibold text-white">Tower 3 • Inspection Snapshot</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
