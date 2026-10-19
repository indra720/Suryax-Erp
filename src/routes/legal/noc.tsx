import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileCheck,
  Building,
  CheckCircle,
  Calendar,
  Download,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { legalService, type NocClearance } from "@/lib/services/legal";
import { toast } from "sonner";

export const Route = createFileRoute("/legal/noc")({
  head: () => ({
    meta: [
      { title: "Statutory NOC & Clearances | Vrindavan Legal" },
      { name: "description", content: "Fire safety NOC, Airport Authority height clearance, environmental, and LDA sanctions." },
    ],
  }),
  component: LegalNocPage,
});

export function LegalNocPage() {
  const [nocs] = useState<NocClearance[]>(legalService.getNoc());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <FileCheck className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Statutory NOCs & Authority Clearances
          </h1>
          <p className="text-xs text-text-secondary">
            Government sanction letters, Fire NOC, Aviation clearance, SEIAA Environment impact approvals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nocs.map((n) => (
          <Card key={n.id} className="p-5 bg-card border border-border space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">{n.certificateName}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{n.issuingAuthority}</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle className="size-3" /> {n.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 text-xs space-y-1">
              <p className="font-mono text-[11px] text-brand">Sanction Ref: {n.clearanceNumber}</p>
              <p className="text-text-secondary">Project: <strong className="text-foreground">{n.project}</strong></p>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-secondary">
              <span>Valid Until: <strong className="text-foreground">{n.validUntil}</strong></span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success(`Sanction Certificate for ${n.certificateName} downloaded!`)}
                className="h-7 text-[11px]"
              >
                <Download className="size-3 mr-1" /> View Sanction
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
