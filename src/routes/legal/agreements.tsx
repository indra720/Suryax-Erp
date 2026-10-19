import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Search,
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  IndianRupee,
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
import { legalService, type LegalAgreement } from "@/lib/services/legal";
import { toast } from "sonner";

export const Route = createFileRoute("/legal/agreements")({
  head: () => ({
    meta: [
      { title: "Sale Agreements (BBA) | Vrindavan Legal" },
      { name: "description", content: "Builder Buyer Agreements drafting, e-stamp verification, and execution." },
    ],
  }),
  component: LegalAgreementsPage,
});

export function LegalAgreementsPage() {
  const [agreements, setAgreements] = useState<LegalAgreement[]>(legalService.getAgreements());
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [newAgr, setNewAgr] = useState({
    customerName: "",
    customerPhone: "",
    projectName: "Vrindavan Heights",
    unitNo: "Tower 3, Unit 1502",
    agreementValue: 9500000,
    stampDutyAmount: 665000,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgr.customerName) {
      toast.error("Please enter customer name");
      return;
    }
    const created: LegalAgreement = {
      id: `AGR-2026-${Date.now().toString().slice(-3)}`,
      agreementNo: `BBA/VRN/${Date.now().toString().slice(-4)}`,
      customerName: newAgr.customerName,
      customerPhone: newAgr.customerPhone || "+91 98390 XXXXX",
      projectName: newAgr.projectName,
      unitNo: newAgr.unitNo,
      agreementValue: Number(newAgr.agreementValue),
      stampDutyAmount: Number(newAgr.stampDutyAmount),
      eStampNumber: "IN-UP" + Math.floor(100000000000 + Math.random() * 900000000000) + "U",
      draftStatus: "Draft Prepared",
      assignedAdvocate: "Adv. Sudhir Dixit",
      executionDate: new Date().toISOString().split("T")[0],
    };
    setAgreements([created, ...agreements]);
    toast.success(`BBA Agreement draft generated for ${created.customerName}!`);
    setModalOpen(false);
  };

  const filtered = agreements.filter(
    (a) =>
      a.customerName.toLowerCase().includes(search.toLowerCase()) ||
      a.agreementNo.toLowerCase().includes(search.toLowerCase()) ||
      a.unitNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <FileText className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Builder Buyer Agreements (BBA)
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Statutory RERA-compliant sale agreement drafting, non-judicial stamp papers, and bilateral execution.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Draft New BBA
        </Button>
      </div>

      <Card className="p-3 bg-card border border-border flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search by customer, agreement code, or unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <div className="text-xs text-text-secondary font-medium">
          Total Drafted: <span className="font-bold text-foreground">{agreements.length}</span>
        </div>
      </Card>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Agreement Ref</th>
                <th className="py-3 px-4">Customer & Contact</th>
                <th className="py-3 px-4">Project & Unit</th>
                <th className="py-3 px-4">Value (INR)</th>
                <th className="py-3 px-4">Stamp Paper Ref</th>
                <th className="py-3 px-4">Lawyer In Charge</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand">{a.agreementNo}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-foreground">{a.customerName}</p>
                    <p className="text-[11px] text-text-secondary">{a.customerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{a.projectName}</p>
                    <p className="text-[11px] text-text-muted">{a.unitNo}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    ₹{(a.agreementValue / 100000).toFixed(1)} Lakh
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-text-secondary">
                    {a.eStampNumber}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{a.assignedAdvocate}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        a.draftStatus === "Signed & Executed"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-blue-500/10 text-blue-600"
                      }`}
                    >
                      {a.draftStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.success(`Draft PDF for ${a.agreementNo} downloaded!`)}
                      className="h-7 px-2 gap-1 text-[11px]"
                    >
                      <Download className="size-3" /> Draft
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Draft Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Generate Builder Buyer Agreement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Customer Legal Name</Label>
              <Input
                placeholder="Full Name as per PAN card"
                value={newAgr.customerName}
                onChange={(e) => setNewAgr({ ...newAgr, customerName: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Project</Label>
                <Input
                  value={newAgr.projectName}
                  onChange={(e) => setNewAgr({ ...newAgr, projectName: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Unit Number</Label>
                <Input
                  value={newAgr.unitNo}
                  onChange={(e) => setNewAgr({ ...newAgr, unitNo: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Agreement Total (INR)</Label>
                <Input
                  type="number"
                  value={newAgr.agreementValue}
                  onChange={(e) => setNewAgr({ ...newAgr, agreementValue: Number(e.target.value) })}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Stamp Duty (7% approx)</Label>
                <Input
                  type="number"
                  value={newAgr.stampDutyAmount}
                  onChange={(e) => setNewAgr({ ...newAgr, stampDutyAmount: Number(e.target.value) })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Generate Draft
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
