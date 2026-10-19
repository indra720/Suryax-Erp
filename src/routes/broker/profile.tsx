import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Save,
  CheckCircle,
  FileText,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/broker/profile")({
  head: () => ({
    meta: [
      { title: "Channel Partner Profile | Vrindavan ERP" },
      { name: "description", content: "Broker firm credentials, RERA certificate, and banking information." },
    ],
  }),
  component: BrokerProfilePage,
});

export function BrokerProfilePage() {
  const [profile, setProfile] = useState({
    firmName: "Apex Realtors & Realty Advisors LLP",
    contactPerson: "Mr. Deepak Narain",
    email: "broker@vrindavan.com",
    phone: "+91 98391 88220",
    reraNo: "UPRERAAGT20220912",
    gstin: "09AAACA1234B1Z5",
    pan: "AAACA1234B",
    bankName: "HDFC Bank Ltd",
    accountNumber: "50200039281928",
    ifsc: "HDFC0000128",
    tier: "Platinum Partner (3.25%)",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Channel Partner profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Channel Partner Profile</h1>
          <p className="text-xs text-text-secondary">Official brokerage registration and bank payout parameters.</p>
        </div>
      </div>

      <Card className="p-6 bg-card border border-border">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Agency / Firm Name</Label>
              <Input
                value={profile.firmName}
                onChange={(e) => setProfile({ ...profile, firmName: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Primary Contact Person</Label>
              <Input
                value={profile.contactPerson}
                onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Email Address</Label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Phone Number</Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">RERA Agent Registration Number</Label>
              <Input
                value={profile.reraNo}
                onChange={(e) => setProfile({ ...profile, reraNo: e.target.value })}
                className="mt-1 h-9 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">GSTIN</Label>
              <Input
                value={profile.gstin}
                onChange={(e) => setProfile({ ...profile, gstin: e.target.value })}
                className="mt-1 h-9 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Bank Name & Branch</Label>
              <Input
                value={profile.bankName}
                onChange={(e) => setProfile({ ...profile, bankName: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Bank Account Number</Label>
              <Input
                value={profile.accountNumber}
                onChange={(e) => setProfile({ ...profile, accountNumber: e.target.value })}
                className="mt-1 h-9 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">IFSC Code</Label>
              <Input
                value={profile.ifsc}
                onChange={(e) => setProfile({ ...profile, ifsc: e.target.value })}
                className="mt-1 h-9 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Partner Tier Status</Label>
              <Input value={profile.tier} disabled className="mt-1 h-9 text-xs bg-muted" />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" size="sm" className="bg-brand text-white gap-1.5 text-xs">
              <Save className="size-3.5" /> Save Profile
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
