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
    date: new Date().toISOString().slice(0, 10),
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
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              File Daily Progress Report (DPR)
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Submit end-of-day site engineering log, machinery health status, and project milestone updates.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Report Date</Label>
                <Input
                  type="date"
                  value={newDpr.date}
                  onChange={(e) => setNewDpr({ ...newDpr, date: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Work Accomplished Today</Label>
                <Input
                  placeholder="e.g. 16th floor column casting, plumbing shaft inspection, rebar binding completed"
                  value={newDpr.workDone}
                  onChange={(e) => setNewDpr({ ...newDpr, workDone: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Heavy Machinery & Crane Status</Label>
                  <Input
                    placeholder="e.g. Tower crane operational, 2 transit mixers active"
                    value={newDpr.machinery}
                    onChange={(e) => setNewDpr({ ...newDpr, machinery: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Hindrances / Delays (if any)</Label>
                  <Input
                    placeholder="e.g. Rain for 2 hours, cement delivery delayed 45m"
                    value={newDpr.hindrances}
                    onChange={(e) => setNewDpr({ ...newDpr, hindrances: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border shrink-0 gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Sign & Submit DPR
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
