import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
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

export const Route = createFileRoute("/legal/profile")({
  head: () => ({
    meta: [
      { title: "Legal Counsel Profile | Vrindavan ERP" },
      { name: "description", content: "Chief Legal Advisor credentials, Bar Council registration, and law panel details." },
    ],
  }),
  component: LegalProfilePage,
});

export function LegalProfilePage() {
  const [profile, setProfile] = useState({
    name: "Adv. Sudhir Dixit",
    designation: "Head of Legal Affairs & RERA Compliance",
    email: "legal@vrindavan.com",
    phone: "+91 98390 55660",
    barCouncilNo: "UP/2004/7712",
    courtJurisdiction: "Allahabad High Court (Lucknow Bench)",
    officeAddress: "Legal Cell, Vrindavan Corporate Headquarters, Gomti Nagar, Lucknow",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Legal Counsel Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Legal Counsel Profile</h1>
          <p className="text-xs text-text-secondary">Official Bar Council enrollment and legal department administration.</p>
        </div>
      </div>

      <Card className="p-6 bg-card border border-border">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Advocate Full Name</Label>
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
              <Label className="text-xs">Official Email</Label>
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
              <Label className="text-xs">Bar Council Enrollment Number</Label>
              <Input
                value={profile.barCouncilNo}
                onChange={(e) => setProfile({ ...profile, barCouncilNo: e.target.value })}
                className="mt-1 h-9 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Court / Legal Jurisdiction</Label>
              <Input
                value={profile.courtJurisdiction}
                onChange={(e) => setProfile({ ...profile, courtJurisdiction: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Legal Cell Chambers Address</Label>
              <Input
                value={profile.officeAddress}
                onChange={(e) => setProfile({ ...profile, officeAddress: e.target.value })}
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
