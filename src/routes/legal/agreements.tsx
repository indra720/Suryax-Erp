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
    if (!newAgr.customerName.trim()) {
      toast.error("Please enter customer name");
      return;
    }
    if (newAgr.customerPhone && !/^[6-9]\d{9}$/.test(newAgr.customerPhone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (newAgr.agreementValue <= 0) {
      toast.error("Agreement value must be greater than zero");
      return;
    }
    const created: LegalAgreement = {
      id: `AGR-2026-${Date.now().toString().slice(-3)}`,
      agreementNo: `BBA/VRN/${Date.now().toString().slice(-4)}`,
      customerName: newAgr.customerName,
      customerPhone: newAgr.customerPhone || "+91 98390 12345",
      projectName: newAgr.projectName,
      unitNo: newAgr.unitNo,
      agreementValue: Number(newAgr.agreementValue),
      stampDutyAmount: Number(newAgr.stampDutyAmount),
      eStampNumber: "IN-UP" + Math.floor(100000000000 + Math.random() * 900000000000) + "U",
      draftStatus: "Draft Prepared",
      assignedAdvocate: "Adv. Sudhir Dixit",
      executionDate: new Date().toISOString().slice(0, 10),
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
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[900px] whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Agreement Ref</th>
                <th className="py-3 px-4 whitespace-nowrap">Customer & Contact</th>
                <th className="py-3 px-4 whitespace-nowrap">Project & Unit</th>
                <th className="py-3 px-4 whitespace-nowrap">Value (INR)</th>
                <th className="py-3 px-4 whitespace-nowrap">Stamp Paper Ref</th>
                <th className="py-3 px-4 whitespace-nowrap">Lawyer In Charge</th>
                <th className="py-3 px-4 whitespace-nowrap">Status</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand whitespace-nowrap">{a.agreementNo}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-bold text-foreground">{a.customerName}</p>
                    <p className="text-[11px] text-text-secondary">{a.customerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-semibold text-foreground">{a.projectName}</p>
                    <p className="text-[11px] text-text-muted">{a.unitNo}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground whitespace-nowrap">
                    ₹{(a.agreementValue / 100000).toFixed(1)} Lakh
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-text-secondary whitespace-nowrap">
                    {a.eStampNumber}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-foreground whitespace-nowrap">{a.assignedAdvocate}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
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
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
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
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              Generate Builder Buyer Agreement (BBA)
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Draft official RERA compliant agreement for unit allotment with stamp duty calculation.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Customer Legal Name</Label>
                  <Input
                    placeholder="Full Name as per PAN"
                    value={newAgr.customerName}
                    onChange={(e) => setNewAgr({ ...newAgr, customerName: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Customer Mobile (10 digits)</Label>
                  <Input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={newAgr.customerPhone}
                    onChange={(e) =>
                      setNewAgr({
                        ...newAgr,
                        customerPhone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Project</Label>
                  <Input
                    placeholder="e.g. Vrindavan Heights"
                    value={newAgr.projectName}
                    onChange={(e) => setNewAgr({ ...newAgr, projectName: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Unit Number</Label>
                  <Input
                    placeholder="e.g. B-1204"
                    value={newAgr.unitNo}
                    onChange={(e) => setNewAgr({ ...newAgr, unitNo: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Agreement Total (₹ INR)</Label>
                  <Input
                    type="number"
                    value={newAgr.agreementValue}
                    onChange={(e) => setNewAgr({ ...newAgr, agreementValue: Number(e.target.value) })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Stamp Duty (7% approx ₹)</Label>
                  <Input
                    type="number"
                    value={newAgr.stampDutyAmount}
                    onChange={(e) => setNewAgr({ ...newAgr, stampDutyAmount: Number(e.target.value) })}
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
                Generate Draft
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
