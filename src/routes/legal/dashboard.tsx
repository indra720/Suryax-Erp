import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Plus,
  RefreshCw,
  FolderOpen,
  Award,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { legalService } from "@/lib/services/legal";
import { toast } from "sonner";

export const Route = createFileRoute("/legal/dashboard")({
  head: () => ({
    meta: [
      { title: "Legal & Documentation Portal | Vrindavan ERP" },
      { name: "description", content: "Sale agreements, registry execution, RERA compliance, and document vault." },
    ],
  }),
  component: LegalDashboardPage,
});

export function LegalDashboardPage() {
  const [kpis] = useState(legalService.getKpi());
  const [agreements] = useState(legalService.getAgreements());
  const [registries] = useState(legalService.getRegistry());
  const [nocs] = useState(legalService.getNoc());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <FileText className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Legal & Compliance Dashboard
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Builder Buyer Agreements (BBA), Sub-Registrar stamp deeds, RERA quarterly certifications, and parent land deeds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/legal/agreements">
            <Button size="sm" className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm">
              <Plus className="size-3.5" /> Draft BBA Agreement
            </Button>
          </Link>
          <Link to="/legal/vault">
            <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs">
              <FolderOpen className="size-3.5" /> Legal Vault
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Agreements Drafted</span>
            <span className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <FileText className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.totalAgreementsDrafted}</span>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">{kpis.agreementsSigned} Signed & Sealed</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Pending Registry</span>
            <span className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Clock className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.pendingRegistryCount} Units</span>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">Challans Generated</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">RERA Compliance</span>
            <span className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.reraComplianceScore}</span>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">Escrow Audits Up to Date</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Active Clearances</span>
            <span className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <CheckCircle className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.activeClearancesCount} NOCs</span>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">{kpis.litigationCasesCount} Litigations (Clear Title)</p>
          </div>
        </Card>
      </div>

      {/* Two Columns: Recent Agreements & Registry Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Recent BBA Agreements</h3>
            <Link to="/legal/agreements" className="text-xs text-brand hover:underline font-medium">
              View All ({agreements.length})
            </Link>
          </div>
          <div className="space-y-3">
            {agreements.map((a) => (
              <div
                key={a.id}
                className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-foreground">{a.customerName}</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    {a.projectName} • {a.unitNo}
                  </p>
                  <span className="font-mono text-[10px] text-text-muted">{a.agreementNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-foreground block">
                    ₹{(a.agreementValue / 100000).toFixed(1)}L
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                      a.draftStatus === "Signed & Executed"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-blue-500/10 text-blue-600"
                    }`}
                  >
                    {a.draftStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Sub-Registrar Registry Docket</h3>
            <Link to="/legal/registry" className="text-xs text-brand hover:underline font-medium">
              View Registries
            </Link>
          </div>
          <div className="space-y-3">
            {registries.map((r) => (
              <div
                key={r.id}
                className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-foreground">{r.buyerName}</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    {r.unitNumber} • {r.projectName}
                  </p>
                  <span className="text-[10px] text-text-muted">{r.subRegistrarOffice}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-brand block">
                    Stamp: ₹{(r.challanAmount / 1000).toFixed(0)}k
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 inline-block mt-1">
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
