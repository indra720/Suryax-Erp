import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle,
  Calendar,
  Building,
  Search,
  FileCheck,
  Clock,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { legalService, type RegistryRecord } from "@/lib/services/legal";
import { toast } from "sonner";

export const Route = createFileRoute("/legal/registry")({
  head: () => ({
    meta: [
      { title: "Sub-Registrar Registry & Deeds | Vrindavan Legal" },
      { name: "description", content: "Conveyance deed appointments, stamp duty challans, and mutation tracking." },
    ],
  }),
  component: LegalRegistryPage,
});

export function LegalRegistryPage() {
  const [registries] = useState<RegistryRecord[]>(legalService.getRegistry());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <CheckCircle className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Sub-Registrar Registry & Conveyance Deeds
          </h1>
          <p className="text-xs text-text-secondary">
            Stamp duty treasury payments, registrar slot appointments, and revenue khatauni mutation.
          </p>
        </div>
      </div>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Docket Ref</th>
                <th className="py-3 px-4">Purchaser Name</th>
                <th className="py-3 px-4">Unit & Project</th>
                <th className="py-3 px-4">Sub-Registrar Office</th>
                <th className="py-3 px-4">Slot Date</th>
                <th className="py-3 px-4">Stamp Duty Paid</th>
                <th className="py-3 px-4">Lawyer</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {registries.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand">{r.docketNo}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{r.buyerName}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{r.unitNumber}</p>
                    <p className="text-[11px] text-text-muted">{r.projectName}</p>
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary">{r.subRegistrarOffice}</td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{r.appointmentDate}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600">
                    ₹{(r.challanAmount / 1000).toFixed(0)}k
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary">{r.advocateInCharge}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === "Khatauni Mutation Done"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : r.status === "Deed Registered & Sealed"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-purple-500/10 text-purple-600"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
