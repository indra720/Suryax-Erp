import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  UsersRound,
  Mail,
  Phone,
  Shield,
  Building,
  Key,
  Save,
  Bell,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/profile")({
  head: () => ({
    meta: [
      { title: "Marketing Profile & Settings | Vrindavan Marketing" },
      { name: "description", content: "Marketing Director profile and account settings." },
    ],
  }),
  component: MarketingProfilePage,
});

export function MarketingProfilePage() {
  const [profile, setProfile] = useState({
    name: "Vikram Malhotra",
    title: "Chief Marketing Officer (CMO)",
    email: "marketing@vrindavan.com",
    phone: "+91 98100 44210",
    department: "Marketing & Growth",
    branch: "Corporate Head Office, Gomti Nagar",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Marketing profile preferences saved!");
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <UsersRound className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Marketing Profile & Workspace
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage your personal profile, notification thresholds and connected ad accounts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 bg-card border border-border shadow-sm flex flex-col items-center text-center">
          <div className="size-20 rounded-full bg-gradient-to-tr from-brand to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            VM
          </div>
          <h2 className="text-base font-bold text-foreground mt-3">{profile.name}</h2>
          <span className="text-xs text-brand font-semibold">{profile.title}</span>
          <span className="mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active Marketing Head
          </span>

          <div className="w-full mt-6 pt-4 border-t border-border space-y-2 text-xs text-left">
            <div className="flex items-center gap-2 text-text-secondary">
              <Mail className="size-3.5 text-brand" /> {profile.email}
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Phone className="size-3.5 text-brand" /> {profile.phone}
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Building className="size-3.5 text-brand" /> {profile.branch}
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border shadow-sm md:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-4">Edit Profile Credentials</h2>
          <form onSubmit={handleSave} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Full Name</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Job Title</Label>
                <Input
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Email Address</Label>
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Phone</Label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" size="sm" className="bg-brand text-white gap-1.5">
                <Save className="size-3.5" /> Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
