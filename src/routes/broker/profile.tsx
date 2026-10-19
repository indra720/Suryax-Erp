import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Save,
  CheckCircle,
  Download,
  Share2,
  Calendar,
  Wallet,
  Award,
  IndianRupee,
  Clock,
  Sparkles,
  Landmark,
  Building,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/broker/profile")({
  head: () => ({
    meta: [
      { title: "Channel Partner Privilege Profile | Vrindavan ERP" },
      { name: "description", content: "Official RERA certified broker agency dossier, commission tier, and bank accounts." },
    ],
  }),
  component: BrokerProfilePage,
});

export function BrokerProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "banking" | "tier" | "activity">("overview");

  const [profile, setProfile] = useState({
    firmName: "Apex Realtors & Realty Advisors LLP",
    contactPerson: "Mr. Deepak Narain",
    empId: "VRN-CP-088",
    email: "broker@vrindavan.com",
    phone: "+91 98391 88220",
    reraNo: "UPRERAAGT20220912",
    gstin: "09AAACA1234B1Z5",
    pan: "AAACA1234B",
    bankName: "HDFC Bank Ltd",
    accountNumber: "50200039281928",
    ifsc: "HDFC0000128",
    tier: "Platinum Channel Partner (3.25%)",
    registeredSince: "12 March 2022",
    officeAddress: "402, Shalimar Titanium, Vibhuti Khand, Gomti Nagar, Lucknow",
    bio: "Premier real estate advisory firm delivering high-velocity NRI & domestic investor transactions across prime residential and retail developments.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Channel Partner profile updated successfully!");
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#10184A] via-[#1B355A] to-[#2563EB] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.3),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("RERA Channel Partner Certificate downloaded!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Partner Certificate
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
                <div className="size-28 sm:size-32 rounded-2xl bg-gradient-to-tr from-[#06b6d4] to-[#2563eb] p-1 shadow-2xl ring-4 ring-[#0B1240]">
                  <div className="size-full rounded-[14px] bg-[#10184A] flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                    AR
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 size-5 rounded-full bg-emerald-500 ring-4 ring-[#0B1240] flex items-center justify-center">
                  <span className="size-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {profile.firmName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <ShieldCheck className="size-3" /> UPRERA Certified Agency
                  </span>
                </div>
                <p className="text-sm font-medium text-cyan-200 mt-1">Lead Principal: {profile.contactPerson}</p>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Building className="size-3.5 text-cyan-300" /> RERA Reg: {profile.reraNo} • ID: {profile.empId}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2 pb-1">
              <Button
                size="sm"
                onClick={() => setActiveTab("overview")}
                className="h-9 px-4 text-xs font-semibold bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white shadow-lg shadow-cyan-900/30 hover:opacity-95"
              >
                <Sparkles className="size-3.5 mr-1.5" /> Edit Partner Profile
              </Button>
            </div>
          </div>

          {/* Key Channel Partner Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-cyan-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Wallet className="size-3.5 text-emerald-400" /> Wallet Balance
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">₹8,40,000</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-cyan-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Award className="size-3.5 text-cyan-300" /> Partner Tier
              </span>
              <p className="text-xl font-extrabold text-white mt-1">Platinum (3.25%)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-cyan-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <IndianRupee className="size-3.5 text-white" /> Lifetime Brokerage
              </span>
              <p className="text-xl font-extrabold text-white mt-1">₹38.50 Lakh</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-cyan-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Building2 className="size-3.5 text-amber-400" /> Deals Closed
              </span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">9 Properties</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Agency Dossier", icon: Building2 },
          { id: "banking", label: "Bank Account & KYC", icon: Landmark },
          { id: "tier", label: "Privilege Tier Benefits", icon: Award },
          { id: "activity", label: "Commission Ledger Log", icon: Clock },
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

      {/* Tab 1: Agency Dossier */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand" /> Verified Credentials
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">UP RERA Registered Agent</p>
                <p className="text-[11px] text-text-secondary mt-0.5 font-mono">{profile.reraNo}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">GSTIN Verified</p>
                <p className="text-[11px] text-text-secondary mt-0.5 font-mono">{profile.gstin}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">Permanent Account Number (PAN)</p>
                <p className="text-[11px] text-text-secondary mt-0.5 font-mono">{profile.pan}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-xs text-text-secondary space-y-2">
              <p className="flex items-center gap-2">
                <Calendar className="size-3.5 text-text-muted" /> Partner Since: {profile.registeredSince}
              </p>
              <p className="flex items-center gap-2">
                <Building className="size-3.5 text-text-muted" /> {profile.officeAddress}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border shadow-sm lg:col-span-2">
            <h3 className="text-sm font-bold text-foreground mb-4">Edit Channel Partner Profile</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Agency / Entity Name</Label>
                  <Input
                    value={profile.firmName}
                    onChange={(e) => setProfile({ ...profile, firmName: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Principal Designated Partner</Label>
                  <Input
                    value={profile.contactPerson}
                    onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
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
                  <Label className="text-xs">Official Phone</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Corporate Office Address</Label>
                  <Input
                    value={profile.officeAddress}
                    onChange={(e) => setProfile({ ...profile, officeAddress: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Agency Profile & Investor Reach</Label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-xs text-foreground outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border flex justify-end">
                <Button type="submit" size="sm" className="bg-brand text-white gap-1.5 text-xs">
                  <Save className="size-3.5" /> Save Partner Profile
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Tab 2: Banking & KYC */}
      {activeTab === "banking" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Verified Bank Account for Payouts</h3>
          <p className="text-xs text-text-secondary">
            Bank account verified for instant NEFT/RTGS brokerage disbursements with 5% Sec 194H TDS.
          </p>

          <div className="p-4 rounded-xl bg-muted/40 border border-border max-w-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                <Landmark className="size-4 text-brand" /> {profile.bankName} • Current Account
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>
            <p className="font-mono text-xs text-text-secondary">A/c: {profile.accountNumber}</p>
            <p className="font-mono text-xs text-text-secondary">IFSC: {profile.ifsc} • Hazratganj Branch</p>
          </div>
        </Card>
      )}

      {/* Tab 3: Privilege Tier */}
      {activeTab === "tier" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Platinum Partner Privilege Slab (3.25%)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <span className="text-[10px] font-bold text-text-secondary uppercase">Silver Tier</span>
              <p className="text-base font-bold text-foreground mt-1">2.50% Brokerage</p>
              <p className="text-[11px] text-text-muted mt-1">Standard 1-3 Bookings</p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <span className="text-[10px] font-bold text-cyan-700 uppercase">Your Active Tier: Platinum</span>
              <p className="text-base font-extrabold text-cyan-700 mt-1">3.25% Brokerage</p>
              <p className="text-[11px] text-cyan-800 mt-1">4-10 Bookings + VIP Site Cab Escort</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <span className="text-[10px] font-bold text-purple-700 uppercase">Elite Diamond Tier</span>
              <p className="text-base font-extrabold text-purple-700 mt-1">3.50% Brokerage</p>
              <p className="text-[11px] text-purple-800 mt-1">1 more deal to unlock</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 4: Ledger Activity */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Recent Brokerage Payouts & Credits</h3>
          <div className="space-y-3">
            {[
              { time: "14 Apr 2026", desc: "Commission ₹4,56,000 net credited for Shop G-12 (Manoj K. Chawla)" },
              { time: "10 Apr 2026", desc: "Bank Payout ₹5,70,000 disbursed via RTGS (UTR: HDFCR520260410091823)" },
              { time: "05 Apr 2026", desc: "Commission ₹6,94,688 net credited for Villa 09 (Gaurav Mehrotra)" },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">{log.desc}</p>
                  <span className="text-[11px] text-text-muted mt-0.5 block">{log.time}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Processed
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
