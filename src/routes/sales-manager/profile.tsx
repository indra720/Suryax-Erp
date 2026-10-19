import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  UsersRound,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Save,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-manager/profile")({
  head: () => ({
    meta: [
      { title: "Sales Director Profile | Vrindavan ERP" },
      { name: "description", content: "Executive sales credentials and territory settings." },
    ],
  }),
  component: SalesProfilePage,
});

export function SalesProfilePage() {
  const [profile, setProfile] = useState({
    name: "Rajesh Malhotra",
    designation: "Director of Sales & Business Development",
    email: "salesmgr@vrindavan.com",
    phone: "+91 98390 11001",
    territory: "Lucknow Urban & Shaheed Path Corridor",
    officeLocation: "Vrindavan Corporate Tower, Vibhuti Khand, Gomti Nagar",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Sales Manager Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <UsersRound className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Sales Executive Profile</h1>
          <p className="text-xs text-text-secondary">Official executive credentials and regional territory configuration.</p>
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
            <div className="md:col-span-2">
              <Label className="text-xs">Assigned Sales Territory</Label>
              <Input
                value={profile.territory}
                onChange={(e) => setProfile({ ...profile, territory: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Regional Office Location</Label>
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
