import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  MapPin,
  Download,
  Share2,
  IndianRupee,
  CheckCircle,
  Sparkles,
  FileText,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { brokerService, type BrokerProject } from "@/lib/services/broker";
import { toast } from "sonner";

export const Route = createFileRoute("/broker/properties")({
  head: () => ({
    meta: [
      { title: "Property Catalog & Commission Slabs | Vrindavan Broker" },
      { name: "description", content: "Active project portfolio, brokerage percentage, and client brochures." },
    ],
  }),
  component: BrokerPropertiesPage,
});

export function BrokerPropertiesPage() {
  const [projects] = useState<BrokerProject[]>(brokerService.getProjects());

  const handleDownloadBrochure = (projectName: string) => {
    toast.success(`Official High-Resolution Brochure for ${projectName} downloaded!`);
  };

  const handleShare = (projectName: string) => {
    navigator.clipboard?.writeText(window.location.origin + `/projects`);
    toast.success(`Shareable brochure link for ${projectName} copied to clipboard!`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Building2 className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Property Catalog & Project Slabs
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Verified RERA projects, brokerage payouts, and buyer presentation brochures.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <Card key={proj.id} className="p-5 bg-card border border-border flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground">{proj.name}</h3>
                  <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3 text-text-muted" /> {proj.location}
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-text-secondary border border-border">
                  {proj.reraNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-2.5 rounded-xl bg-muted/40">
                  <span className="text-[10px] text-text-secondary font-medium">Starting Price</span>
                  <p className="text-sm font-bold text-foreground mt-0.5">{proj.priceRange}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-500/10">
                  <span className="text-[10px] text-purple-700 font-medium">Base Brokerage</span>
                  <p className="text-sm font-extrabold text-purple-700 mt-0.5">{proj.baseCommission}</p>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Limited Time Incentive
                </span>
                <p className="text-xs font-semibold text-emerald-800 mt-0.5">{proj.promotionalIncentive}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs font-medium text-text-secondary">
                <span className="font-bold text-foreground">{proj.unitsAvailable} Units</span> Available
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare(proj.name)}
                  className="h-8 gap-1.5 text-xs"
                >
                  <Share2 className="size-3.5" /> Share
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownloadBrochure(proj.name)}
                  className="h-8 gap-1.5 text-xs bg-brand text-white"
                >
                  <Download className="size-3.5" /> Brochure PDF
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
