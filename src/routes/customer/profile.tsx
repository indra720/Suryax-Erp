import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  UsersRound,
  Mail,
  Phone,
  Home,
  Save,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { customerService } from "@/lib/services/customer";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/profile")({
  head: () => ({
    meta: [
      { title: "My Customer Profile | Vrindavan ERP" },
      { name: "description", content: "Primary buyer KYC details, co-applicant information, and communication address." },
    ],
  }),
  component: CustomerProfilePage,
});

export function CustomerProfilePage() {
  const [profile, setProfile] = useState(customerService.getProfile());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile KYC details saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <UsersRound className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Buyer KYC Profile</h1>
          <p className="text-xs text-text-secondary">Official registry details and co-applicant records.</p>
        </div>
      </div>

      <Card className="p-6 bg-card border border-border">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Primary Applicant Name</Label>
              <Input
                value={profile.buyerName}
                onChange={(e) => setProfile({ ...profile, buyerName: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Co-Applicant Name</Label>
              <Input
                value={profile.coApplicant}
                onChange={(e) => setProfile({ ...profile, coApplicant: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Registered Email</Label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Registered Phone</Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">PAN Number</Label>
              <Input
                value={profile.pan}
                onChange={(e) => setProfile({ ...profile, pan: e.target.value })}
                className="mt-1 h-9 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Aadhaar (Masked)</Label>
              <Input value={profile.aadhar} disabled className="mt-1 h-9 text-xs font-mono bg-muted" />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Permanent Residential Address</Label>
              <Input
                value={profile.currentAddress}
                onChange={(e) => setProfile({ ...profile, currentAddress: e.target.value })}
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
