import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  UsersRound,
  Mail,
  Phone,
  Home,
  Save,
  CheckCircle,
  Download,
  Share2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Building,
  Car,
  Clock,
  Award,
  CreditCard,
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
      { title: "Homeowner Profile & KYC | Vrindavan Customer" },
      { name: "description", content: "Primary allottee records, co-applicant KYC, and property membership credentials." },
    ],
  }),
  component: CustomerProfilePage,
});

export function CustomerProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "property" | "kyc" | "activity">("overview");
  const [profile, setProfile] = useState(customerService.getProfile());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Homeowner Profile KYC saved successfully!");
  };

  const booked = profile.bookedUnit;

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#10184A] via-[#1A2550] to-[#1E3A8A] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Homeowner Allotment Kit PDF downloaded!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Allotment Kit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success("Profile link copied!");
              }}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Share2 className="size-3.5" /> Share
            </Button>
          </div>
        </div>

        {/* Floating Avatar & Profile Ribbon */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <div className="relative">
                <div className="size-28 sm:size-32 rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#60a5fa] p-1 shadow-2xl ring-4 ring-[#0B1240]">
                  <div className="size-full rounded-[14px] bg-[#10184A] flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                    AC
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 size-5 rounded-full bg-emerald-500 ring-4 ring-[#0B1240] flex items-center justify-center">
                  <span className="size-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {profile.buyerName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <Home className="size-3" /> Premium Homeowner
                  </span>
                </div>
                <p className="text-sm font-medium text-blue-200 mt-1">Co-Applicant: {profile.coApplicant}</p>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Building className="size-3.5 text-blue-300" /> Unit: {booked.unitNo} • {booked.tower} • {booked.projectName}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2 pb-1">
              <Button
                size="sm"
                onClick={() => setActiveTab("overview")}
                className="h-9 px-4 text-xs font-semibold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-lg shadow-blue-900/30 hover:opacity-95"
              >
                <Sparkles className="size-3.5 mr-1.5" /> Edit Homeowner Info
              </Button>
            </div>
          </div>

          {/* Key Homeowner Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-blue-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Home className="size-3.5 text-white" /> Apartment Allotted
              </span>
              <p className="text-xl font-extrabold text-white mt-1">Unit {booked.unitNo} (3 BHK)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-blue-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <CheckCircle className="size-3.5 text-emerald-400" /> Payments Cleared
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">60% (₹57.0 Lakh)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-blue-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Car className="size-3.5 text-purple-300" /> Allotted Parking
              </span>
              <p className="text-xl font-extrabold text-white mt-1">Bay B2-142 (Covered)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-blue-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="size-3.5 text-amber-400" /> Target Handover
              </span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">{booked.possessionTarget}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Homeowner Profile", icon: UsersRound },
          { id: "property", label: "Unit Specifications", icon: Home },
          { id: "kyc", label: "Statutory KYC & Loan", icon: ShieldCheck },
          { id: "activity", label: "Account Activity", icon: Clock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              activeTab === tab.id
                ? "bg-brand text-white shadow-md shadow-brand/20"
                : "text-text-secondary hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <tab.icon className="size-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand" /> Verified Buyer Status
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">Aadhaar & PAN Authenticated</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Biometric KYC Completed</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">HDFC Bank Home Loan Pre-Approved</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Sanctioned Limit: ₹75,00,000</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-xs text-text-secondary space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-text-muted" /> {profile.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-text-muted" /> {profile.phone}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border shadow-sm lg:col-span-2">
            <h3 className="text-sm font-bold text-foreground mb-4">Edit Personal & Address Details</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Primary Applicant Name</Label>
                  <Input
                    value={profile.buyerName}
                    onChange={(e) => setProfile({ ...profile, buyerName: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Co-Applicant Full Name</Label>
                  <Input
                    value={profile.coApplicant}
                    onChange={(e) => setProfile({ ...profile, coApplicant: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Registered Email Address</Label>
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Registered Phone Number</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
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
      )}

      {/* Tab 2: Property Specs */}
      {activeTab === "property" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Allotted Apartment Dimensions & Financials</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <span className="text-text-secondary">Carpet Area</span>
              <p className="text-sm font-bold text-foreground mt-0.5">{booked.carpetArea}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <span className="text-text-secondary">Super Built-Up Area</span>
              <p className="text-sm font-bold text-foreground mt-0.5">{booked.superBuiltUpArea}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/40 border border-border">
              <span className="text-text-secondary">Agreement Total</span>
              <p className="text-sm font-bold text-emerald-600 mt-0.5">₹{(booked.totalCost / 100000).toFixed(2)} Lakh</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: KYC */}
      {activeTab === "kyc" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Verified Identity Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <span className="text-text-secondary">PAN Card:</span>
              <p className="font-mono font-bold text-foreground mt-0.5">{profile.pan}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <span className="text-text-secondary">Aadhaar (Masked):</span>
              <p className="font-mono font-bold text-foreground mt-0.5">{profile.aadhar}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 4: Activity */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Homeowner Account History</h3>
          <div className="space-y-3">
            {[
              { time: "19 Apr 2026", act: "14th floor milestone installment payment of ₹14,25,000 received" },
              { time: "18 Apr 2026", act: "BBA Sale Agreement executed and digitally signed" },
              { time: "15 Apr 2026", act: "Demand Letter #4 issued for 10th floor slab completion" },
              { time: "05 Apr 2026", act: "Allotment Letter generated for Unit 1402 (Tower 3)" },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">{log.act}</p>
                  <span className="text-[11px] text-text-muted mt-0.5 block">{log.time}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Cleared
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
