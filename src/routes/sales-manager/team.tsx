import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Search,
  Plus,
  PhoneCall,
  Mail,
  Award,
  TrendingUp,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { salesManagerService, type SalesTeamMember } from "@/lib/services/sales-manager";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-manager/team")({
  head: () => ({
    meta: [
      { title: "Sales Team & Performance | Vrindavan Sales" },
      { name: "description", content: "Management roster and conversion metrics for sales representatives." },
    ],
  }),
  component: SalesTeamPage,
});

export function SalesTeamPage() {
  const [team] = useState<SalesTeamMember[]>(salesManagerService.getTeam());
  const [search, setSearch] = useState("");

  const filtered = team.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Users className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Sales Team Roster & Performance
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Individual sales executive lead allocations, visit activity, and conversion ratios.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => toast.success("Lead assignment distribution optimized")}
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <TrendingUp className="size-3.5" /> Rebalance Leads
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((member) => (
          <Card key={member.id} className="p-5 bg-card border border-border flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">{member.name}</h3>
                  <p className="text-[11px] text-text-secondary mt-0.5">{member.designation}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : member.status === "On Site Visit"
                      ? "bg-blue-500/10 text-blue-600"
                      : "bg-muted text-text-muted"
                  }`}
                >
                  {member.status}
                </span>
              </div>

              <div className="space-y-1.5 mt-3 text-xs text-text-secondary">
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="size-3 text-text-muted" /> {member.email}
                </p>
                <p className="flex items-center gap-1.5">
                  <PhoneCall className="size-3 text-text-muted" /> {member.phone}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border grid grid-cols-3 gap-1.5 text-center">
              <div className="p-1.5 rounded-lg bg-muted/40">
                <span className="text-[10px] text-text-secondary">Visits</span>
                <p className="text-xs font-bold text-foreground">{member.visitsDoneMTD}</p>
              </div>
              <div className="p-1.5 rounded-lg bg-muted/40">
                <span className="text-[10px] text-text-secondary">Closed</span>
                <p className="text-xs font-bold text-foreground">{member.dealsWonMTD}</p>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-500/10">
                <span className="text-[10px] text-emerald-700">Win Rate</span>
                <p className="text-xs font-bold text-emerald-700">{member.conversionRatio}%</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
