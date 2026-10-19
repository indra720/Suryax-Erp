import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  UsersRound,
  Mail,
  Phone,
  Building,
  Save,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/inventory/profile")({
  head: () => ({
    meta: [
      { title: "Inventory Custodian Profile | Vrindavan ERP" },
      { name: "description", content: "Inventory Manager credentials, unit quota allocation rights, and pricing policies." },
    ],
  }),
  component: InventoryProfilePage,
});

export function InventoryProfilePage() {
  const [profile, setProfile] = useState({
    name: "Vikram Singhania",
    designation: "Chief Property & Inventory Officer",
    email: "inventory@vrindavan.com",
    phone: "+91 98393 77110",
    maxHoldDurationHours: 48,
    managementQuotaUnits: 12,
    officeLocation: "Vrindavan Sales & Central Inventory HQ, Gomti Nagar, Lucknow",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inventory Officer Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <UsersRound className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventory Officer Profile</h1>
          <p className="text-xs text-text-secondary">Official inventory allocation authorities and policy thresholds.</p>
        </div>
      </div>

      <Card className="p-6 bg-card border border-border">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Full Name</Label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Designation</Label>
              <Input
                value={profile.designation}
                onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Phone</Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Standard Hold Auto-Expiry (Hours)</Label>
              <Input
                type="number"
                value={profile.maxHoldDurationHours}
                onChange={(e) => setProfile({ ...profile, maxHoldDurationHours: Number(e.target.value) })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Reserved Management Quota Units</Label>
              <Input
                type="number"
                value={profile.managementQuotaUnits}
                onChange={(e) => setProfile({ ...profile, managementQuotaUnits: Number(e.target.value) })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Inventory Central Office Location</Label>
              <Input
                value={profile.officeLocation}
                onChange={(e) => setProfile({ ...profile, officeLocation: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" size="sm" className="bg-brand text-white gap-1.5 text-xs">
              <Save className="size-3.5" /> Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
