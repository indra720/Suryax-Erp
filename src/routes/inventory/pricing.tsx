import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IndianRupee,
  Building,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { inventoryService, type PricingSlab } from "@/lib/services/inventory";

export const Route = createFileRoute("/inventory/pricing")({
  head: () => ({
    meta: [
      { title: "Price List & Slabs | Vrindavan Inventory" },
      { name: "description", content: "Base selling price (BSP), floor rise charges, PLC, and club membership rates." },
    ],
  }),
  component: InventoryPricingPage,
});

export function InventoryPricingPage() {
  const [slabs] = useState<PricingSlab[]>(inventoryService.getPricingSlabs());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <IndianRupee className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Price List & Commercial Slabs
          </h1>
          <p className="text-xs text-text-secondary">
            Base Selling Price (BSP) per sq.ft, Floor Rise Charges (FRC), Preferential Location Charges (PLC), and parking fees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slabs.map((s) => (
          <Card key={s.id} className="p-5 bg-card border border-border space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">{s.unitType}</h3>
                <span className="text-xs font-extrabold text-brand mt-0.5 block">
                  BSP: ₹{s.baseRatePerSqFt} / sq.ft
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-text-secondary font-medium">Approx All-In Cost</span>
                <p className="text-sm font-extrabold text-emerald-600">
                  ₹{(s.sampleCost / 100000).toFixed(1)} Lakh
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-border py-2.5">
              <div>
                <span className="text-text-secondary">Floor Rise (FRC):</span>
                <p className="font-semibold text-foreground">₹{s.floorRiseRate} / sq.ft / floor</p>
              </div>
              <div>
                <span className="text-text-secondary">Park Facing PLC:</span>
                <p className="font-semibold text-foreground">+ ₹{s.parkFacingPlc} / sq.ft</p>
              </div>
              <div>
                <span className="text-text-secondary">Corner View PLC:</span>
                <p className="font-semibold text-foreground">+ ₹{s.cornerPlc} / sq.ft</p>
              </div>
              <div>
                <span className="text-text-secondary">Covered Car Parking:</span>
                <p className="font-semibold text-foreground">₹{(s.coveredCarParking / 1000).toFixed(0)}k</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-text-secondary">
              <span>Clubhouse Fee: <strong>₹{(s.clubMembershipFee / 1000).toFixed(0)}k</strong></span>
              <span className="text-emerald-600 font-semibold">Taxes & GST: 5% Extra</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
