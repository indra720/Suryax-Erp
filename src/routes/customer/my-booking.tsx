import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Home,
  Building,
  CheckCircle,
  Calendar,
  Car,
  Compass,
  Layers,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { customerService } from "@/lib/services/customer";

export const Route = createFileRoute("/customer/my-booking")({
  head: () => ({
    meta: [
      { title: "My Unit & Booking Specs | Vrindavan Customer" },
      { name: "description", content: "Apartment specifications, floor layout, carpet area, and parking allocation." },
    ],
  }),
  component: CustomerMyBookingPage,
});

export function CustomerMyBookingPage() {
  const [profile] = useState(customerService.getProfile());
  const unit = profile.bookedUnit;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <Home className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Unit & Allotment Specifications
          </h1>
          <p className="text-xs text-text-secondary">
            Architectural floor plan dimensions, allotted parking bay, and facing orientation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-5 bg-card border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Building className="size-4 text-brand" /> Residence Details
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Project Name:</span>
              <strong className="text-foreground">{unit.projectName}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Tower & Floor:</span>
              <strong className="text-foreground">{unit.tower} • {unit.floor}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Unit Number:</span>
              <strong className="text-brand font-mono text-sm">{unit.unitNo}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Apartment Type:</span>
              <strong className="text-foreground">{unit.unitType}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Facing & View:</span>
              <strong className="text-foreground">{unit.facing}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Car Parking Bay:</span>
              <strong className="text-foreground flex items-center gap-1">
                <Car className="size-3.5 text-brand" /> {unit.allottedParking}
              </strong>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Layers className="size-4 text-brand" /> Area & Financial Agreement
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">RERA Carpet Area:</span>
              <strong className="text-foreground">{unit.carpetArea}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Super Built-Up Area:</span>
              <strong className="text-foreground">{unit.superBuiltUpArea}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Total Agreement Cost:</span>
              <strong className="text-foreground text-sm font-bold">
                ₹{(unit.totalCost / 100000).toFixed(2)} Lakh
              </strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Allotment Date:</span>
              <strong className="text-foreground">{unit.allotmentDate}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary">Target Possession Date:</span>
              <strong className="text-emerald-600 font-bold">{unit.possessionTarget}</strong>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
