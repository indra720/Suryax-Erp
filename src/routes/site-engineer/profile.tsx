import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  HardHat,
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

export const Route = createFileRoute("/site-engineer/profile")({
  head: () => ({
    meta: [
      { title: "Site Chief Engineer Profile | Vrindavan ERP" },
      { name: "description", content: "Site engineering credentials, structural license, and project allocations." },
    ],
  }),
  component: SiteEngineerProfilePage,
});

export function SiteEngineerProfilePage() {
  const [profile, setProfile] = useState({
    name: "Er. Indrajeet Verma",
    designation: "Chief Resident Civil & Structural Engineer",
    email: "engineer@vrindavan.com",
    phone: "+91 98392 44550",
    councilLicense: "IEI/CIVIL/2018/88912",
    assignedProject: "Vrindavan Heights (Towers A, B, C & Clubhouse)",
    siteOffice: "Site Project Office, Sector 8, Shaheed Path, Lucknow",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Site Engineer Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <HardHat className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Site Resident Engineer Profile</h1>
          <p className="text-xs text-text-secondary">Official civil engineer licensure and site camp assignment.</p>
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
              <Label className="text-xs">Engineering Designation</Label>
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
              <Label className="text-xs">Contact Phone</Label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Institution / Council License Reg.</Label>
              <Input
                value={profile.councilLicense}
                onChange={(e) => setProfile({ ...profile, councilLicense: e.target.value })}
                className="mt-1 h-9 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Assigned Project</Label>
              <Input
                value={profile.assignedProject}
                onChange={(e) => setProfile({ ...profile, assignedProject: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Site Camp Office Address</Label>
              <Input
                value={profile.siteOffice}
                onChange={(e) => setProfile({ ...profile, siteOffice: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" size="sm" className="bg-brand text-white gap-1.5 text-xs">
              <Save className="size-3.5" /> Save Credentials
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
