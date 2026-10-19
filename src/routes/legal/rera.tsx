import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Calendar,
  CheckCircle,
  FileCheck,
  Clock,
  Download,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { legalService, type ReraFiling } from "@/lib/services/legal";
import { toast } from "sonner";

export const Route = createFileRoute("/legal/rera")({
  head: () => ({
    meta: [
      { title: "RERA Compliance & Filings | Vrindavan Legal" },
      { name: "description", content: "Quarterly progress reports (QPR), CA escrow certificates, and RERA registration." },
    ],
  }),
  component: LegalReraPage,
});

export function LegalReraPage() {
  const [filings] = useState<ReraFiling[]>(legalService.getRera());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            RERA Quarterly Filings & Escrow Compliance
          </h1>
          <p className="text-xs text-text-secondary">
            Statutory submission of Form 1 (Architect), Form 2 (Engineer), and Form 3 (CA Escrow Audit) to UP RERA.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filings.map((f) => (
          <Card key={f.id} className="p-5 bg-card border border-border space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">{f.project}</h3>
                <span className="font-mono text-[10px] text-text-secondary mt-0.5 block">{f.reraRegistrationNo}</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  f.filingStatus === "Compliant & Acknowledged"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-amber-500/10 text-amber-600"
                }`}
              >
                {f.filingStatus}
              </span>
            </div>

            <div className="space-y-2 text-xs border-t border-b border-border py-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Quarter:</span>
                <span className="font-bold text-foreground">{f.quarterPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">CA Escrow Certificate:</span>
                <span className="font-medium text-emerald-600">{f.caEscrowCertificate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Architect Certificate:</span>
                <span className="font-medium text-emerald-600">{f.architectProgressCert}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Engineer Certificate:</span>
                <span className="font-medium text-emerald-600">{f.engineerProgressCert}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Submitted: {f.submittedOn}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success(`RERA Acknowledgment downloaded!`)}
                className="h-7 text-[11px]"
              >
                <Download className="size-3 mr-1" /> PDF
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
