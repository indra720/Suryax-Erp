import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Plus,
  Calendar,
  Sun,
  Clock,
  CheckCircle,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { siteEngineerService, type DailyReport } from "@/lib/services/site-engineer";
import { toast } from "sonner";

export const Route = createFileRoute("/site-engineer/daily-reports")({
  head: () => ({
    meta: [
      { title: "Daily Progress Reports (DPR) | Vrindavan Engineering" },
      { name: "description", content: "Site daily logs, machinery utilization, and engineer signoffs." },
    ],
  }),
  component: SiteDailyReportsPage,
});

export function SiteDailyReportsPage() {
  const [reports, setReports] = useState<DailyReport[]>(siteEngineerService.getDailyReports());
  const [modalOpen, setModalOpen] = useState(false);

  const [newDpr, setNewDpr] = useState({
    date: new Date().toISOString().split("T")[0],
    shift: "Morning (08:00 - 17:00)" as DailyReport["shift"],
    weather: "Clear & Sunny (36°C)" as DailyReport["weatherCondition"],
    workDone: "",
    machinery: "2x Tower Cranes, 1x Batching Plant",
    hindrances: "None",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDpr.workDone) {
      toast.error("Please enter tasks completed");
      return;
    }
    const created: DailyReport = {
      id: `DPR-${Date.now().toString().slice(-4)}`,
      dprCode: `DPR/HGT/2026/${Date.now().toString().slice(-4)}`,
      reportDate: newDpr.date,
      weatherCondition: newDpr.weather,
      shift: newDpr.shift,
      majorWorkDone: newDpr.workDone,
      machineryActive: newDpr.machinery,
      hindrances: newDpr.hindrances,
      engineerSignoff: "Er. Indrajeet Verma (Lead Site Engineer)",
      status: "Approved",
    };
    setReports([created, ...reports]);
    toast.success(`Daily Progress Report ${created.dprCode} logged and signed off!`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <FileText className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Daily Progress Reports (DPR)
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Daily logs of civil casting, equipment uptime, site conditions, and statutory engineering signoffs.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Submit Today's DPR
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((r) => (
          <Card key={r.id} className="p-5 bg-card border border-border space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-brand">{r.dprCode}</span>
                <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-2">
                  <Calendar className="size-3.5 text-text-muted" /> Date: {r.reportDate} • Shift: {r.shift}
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto">
                <CheckCircle className="size-3" /> {r.status} & Certified
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-text-secondary font-medium">Major Work Executed:</span>
                <p className="text-foreground mt-0.5 leading-relaxed">{r.majorWorkDone}</p>
              </div>
              <div>
                <span className="text-text-secondary font-medium">Machinery & Plants Active:</span>
                <p className="text-foreground mt-0.5">{r.machineryActive}</p>
              </div>
              <div>
                <span className="text-text-secondary font-medium">Hindrances / Weather:</span>
                <p className="text-text-muted mt-0.5">{r.hindrances} ({r.weatherCondition})</p>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-text-secondary">
              <span>Signoff: <strong className="text-foreground">{r.engineerSignoff}</strong></span>
              <span className="text-brand font-semibold cursor-pointer hover:underline">Download DPR PDF</span>
            </div>
          </Card>
        ))}
      </div>

      {/* DPR Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>File Daily Progress Report (DPR)</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Report Date</Label>
              <Input
                type="date"
                value={newDpr.date}
                onChange={(e) => setNewDpr({ ...newDpr, date: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Work Accomplished Today</Label>
              <Input
                placeholder="e.g. 16th floor column casting, plumbing shaft inspection"
                value={newDpr.workDone}
                onChange={(e) => setNewDpr({ ...newDpr, workDone: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs">Heavy Machinery & Crane Status</Label>
              <Input
                value={newDpr.machinery}
                onChange={(e) => setNewDpr({ ...newDpr, machinery: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Hindrances / Delays (if any)</Label>
              <Input
                value={newDpr.hindrances}
                onChange={(e) => setNewDpr({ ...newDpr, hindrances: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Sign & Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
