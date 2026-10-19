import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  UsersRound,
  Mail,
  Phone,
  Building,
  Key,
  Save,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/profile")({
  head: () => ({
    meta: [
      { title: "Accountant Profile & Signing Authority | Vrindavan Accounts" },
      { name: "description", content: "Chief accountant credentials and statutory signing authorities." },
    ],
  }),
  component: AccountantProfilePage,
});

export function AccountantProfilePage() {
  const [profile, setProfile] = useState({
    name: "Sunil Agnihotri",
    title: "Chief Financial Officer & Head of Accounts",
    email: "accounts@vrindavan.com",
    phone: "+91 94150 22910",
    department: "Finance & Accounts",
    branch: "Corporate Head Office, Gomti Nagar",
    signingLimit: "₹50,00,000",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Accountant profile credentials updated!");
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <UsersRound className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Accountant Profile & Authority
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage your statutory signing limits, digital signature certificates (DSC) and bank API credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 bg-card border border-border shadow-sm flex flex-col items-center text-center">
          <div className="size-20 rounded-full bg-gradient-to-tr from-brand to-violet-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            SA
          </div>
          <h2 className="text-base font-bold text-foreground mt-3">{profile.name}</h2>
          <span className="text-xs text-brand font-semibold">{profile.title}</span>
          <span className="mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Authorized Signatory
          </span>

          <div className="w-full mt-6 pt-4 border-t border-border space-y-2 text-xs text-left">
            <div className="flex items-center gap-2 text-text-secondary">
              <Mail className="size-3.5 text-brand" /> {profile.email}
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Phone className="size-3.5 text-brand" /> {profile.phone}
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <ShieldCheck className="size-3.5 text-emerald-600" /> Limit: {profile.signingLimit}
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border shadow-sm md:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-4">Accountant Workspace Details</h2>
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
                <Label className="text-xs">Designation</Label>
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

            <div>
              <Label className="text-xs">Cheque & RTGS Signing Authority Limit</Label>
              <Input
                value={profile.signingLimit}
                onChange={(e) => setProfile({ ...profile, signingLimit: e.target.value })}
                className="h-8 text-xs mt-1"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" size="sm" className="bg-brand text-white gap-1.5">
                <Save className="size-3.5" /> Save Credentials
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
