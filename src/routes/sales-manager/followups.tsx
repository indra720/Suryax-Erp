import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  PhoneCall,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  Search,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { salesManagerService, type UrgentFollowup } from "@/lib/services/sales-manager";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-manager/followups")({
  head: () => ({
    meta: [
      { title: "Urgent Follow-ups Queue | Vrindavan Sales" },
      { name: "description", content: "High priority callbacks, site visit followups, and pending negotiations." },
    ],
  }),
  component: SalesFollowupsPage,
});

export function SalesFollowupsPage() {
  const [followups, setFollowups] = useState<UrgentFollowup[]>(salesManagerService.getFollowups());

  const markComplete = (id: string) => {
    setFollowups(followups.map((f) => (f.id === id ? { ...f, status: "Done" } : f)));
    toast.success("Follow-up action logged as complete!");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Clock className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Urgent Follow-up Queue
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Time-sensitive customer callbacks and token collection checkpoints.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {followups.map((f) => (
          <Card
            key={f.id}
            className={`p-4 bg-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              f.status === "Done" ? "opacity-60" : ""
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-foreground">{f.clientName}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    f.priority === "High" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"
                  }`}
                >
                  {f.priority} Priority
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600">
                  {f.actionType}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Project: <span className="font-semibold text-foreground">{f.project}</span> • Contact: {f.phone}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5 flex items-center gap-1">
                <Clock className="size-3 text-amber-500" /> Deadline: {f.dueTime}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {f.status !== "Done" ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success(`Call started with ${f.clientName}`)}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <PhoneCall className="size-3.5" /> Call Now
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => markComplete(f.id)}
                    className="h-8 gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle className="size-3.5" /> Mark Done
                  </Button>
                </>
              ) : (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="size-4" /> Completed
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
