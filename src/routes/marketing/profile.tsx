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
  Award,
  Globe,
  Share2,
  Download,
  CheckCircle,
  Clock,
  TrendingUp,
  Megaphone,
  Lock,
  Smartphone,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/profile")({
  head: () => ({
    meta: [
      { title: "Marketing Director Profile | Vrindavan ERP" },
      { name: "description", content: "Executive CMO credentials, ad platform authorities, and campaign management dossier." },
    ],
  }),
  component: MarketingProfilePage,
});

export function MarketingProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "credentials" | "security" | "activity">("overview");

  const [profile, setProfile] = useState({
    name: "Vikram Malhotra",
    title: "Chief Marketing Officer (CMO)",
    empId: "VRN-MKT-001",
    email: "marketing@vrindavan.com",
    phone: "+91 98100 44210",
    department: "Marketing, Growth & Digital Acquisitions",
    officeLocation: "Vrindavan Corporate Headquarters, 9th Floor, Gomti Nagar, Lucknow",
    joinedDate: "15 August 2022",
    metaAccountId: "act_9918237412984",
    googleAdsId: "772-192-8819",
    monthlyBudgetLimit: "₹45,00,000",
    bio: "Driving brand equity, digital acquisition, and omnichannel media campaigns for Vrindavan luxury high-rises and integrated villa townships across North India.",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Executive Marketing Profile saved successfully!");
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        {/* Decorative architectural background & gradient glow */}
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#10184A] via-[#2A1B7A] to-[#4F20D8] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,50,242,0.4),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Executive Dossier PDF exported!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Export Dossier
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
                <div className="size-28 sm:size-32 rounded-2xl bg-gradient-to-tr from-[#331fa3] to-[#6732F2] p-1 shadow-2xl ring-4 ring-[#0B1240]">
                  <div className="size-full rounded-[14px] bg-[#10184A] flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                    VM
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 size-5 rounded-full bg-emerald-500 ring-4 ring-[#0B1240] flex items-center justify-center">
                  <span className="size-2 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {profile.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle className="size-3" /> Verified CMO
                  </span>
                </div>
                <p className="text-sm font-medium text-purple-200 mt-1">{profile.title}</p>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Building className="size-3.5 text-purple-300" /> {profile.department} • {profile.empId}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2 pb-1">
              <Button
                size="sm"
                onClick={() => setActiveTab("overview")}
                className="h-9 px-4 text-xs font-semibold bg-gradient-to-r from-[#4F20D8] to-[#6732F2] text-white shadow-lg shadow-purple-900/30 hover:opacity-95"
              >
                <Sparkles className="size-3.5 mr-1.5" /> Edit Profile
              </Button>
            </div>
          </div>

          {/* Key Executive Impact Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Megaphone className="size-3.5 text-purple-300" /> Active Campaigns
              </span>
              <p className="text-xl font-extrabold text-white mt-1">14 Running</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <TrendingUp className="size-3.5 text-emerald-400" /> Leads MTD
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">4,820 High-Intent</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Layers className="size-3.5 text-purple-300" /> Ad Budget Managed
              </span>
              <p className="text-xl font-extrabold text-white mt-1">₹45 Lakh / mo</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Award className="size-3.5 text-amber-400" /> Lead Quality SLA
              </span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">98.4% Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Executive Profile", icon: UsersRound },
          { id: "credentials", label: "Ad Platform Access", icon: Globe },
          { id: "security", label: "Security & 2FA", icon: ShieldCheck },
          { id: "activity", label: "Recent Operations Log", icon: Clock },
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

      {/* Tab 1: Executive Profile Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Award className="size-4 text-brand" /> Executive Accreditations
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">Google Premier Partner Lead</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Certified Search, Display & Video 360</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">Meta Certified Marketing Leader</p>
                <p className="text-[11px] text-text-secondary mt-0.5">High-Value Real Estate Lead Gen Specialist</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">UP RERA Marketing Compliance Lead</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Statutory Ad Disclosure Certified</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-xs text-text-secondary space-y-2">
              <p className="flex items-center gap-2">
                <Calendar className="size-3.5 text-text-muted" /> Tenure: Since {profile.joinedDate}
              </p>
              <p className="flex items-center gap-2">
                <Building className="size-3.5 text-text-muted" /> {profile.officeLocation}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border shadow-sm lg:col-span-2">
            <h3 className="text-sm font-bold text-foreground mb-4">Edit Marketing Profile Dossier</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Full Legal Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Corporate Job Title</Label>
                  <Input
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Corporate Email</Label>
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
                <div className="sm:col-span-2">
                  <Label className="text-xs">Department & Division</Label>
                  <Input
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Executive Biography & Vision</Label>
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
                  <Save className="size-3.5" /> Save Profile Credentials
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Tab 2: Connected Ad Platforms */}
      {activeTab === "credentials" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Connected Ad Accounts & API Channels</h3>
          <p className="text-xs text-text-secondary">
            Live programmatic API connections authenticated under this executive profile.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">Meta Business Manager (FB/IG)</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Connected
                </span>
              </div>
              <p className="font-mono text-xs text-text-secondary">{profile.metaAccountId}</p>
              <p className="text-[11px] text-text-muted">Role: Admin & Financial Editor • Lucknow Region</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">Google Ads MCC Manager</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Connected
                </span>
              </div>
              <p className="font-mono text-xs text-text-secondary">{profile.googleAdsId}</p>
              <p className="text-[11px] text-text-muted">Role: Standard Executive Access • Search & YouTube</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">99acres Developer Suite API</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Active Sync
                </span>
              </div>
              <p className="font-mono text-xs text-text-secondary">KEY: 99AC-VRN-882190-LIVE</p>
              <p className="text-[11px] text-text-muted">Direct Lead Webhook & Telemetry</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">WhatsApp Cloud Business API</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Verified Green Tick
                </span>
              </div>
              <p className="font-mono text-xs text-text-secondary">WABA ID: 10928371928371</p>
              <p className="text-[11px] text-text-muted">Template Approval & Broadcast Dispatch</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Security & 2FA */}
      {activeTab === "security" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Two-Factor Authentication (2FA)</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Mandatory biometric or authenticator app authentication for ad budget approvals.
              </p>
            </div>
            <Button
              size="sm"
              variant={twoFactorEnabled ? "default" : "outline"}
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                toast.success(`2FA has been ${!twoFactorEnabled ? "enabled" : "disabled"}`);
              }}
              className="text-xs h-8"
            >
              {twoFactorEnabled ? "Enabled (Active)" : "Disabled"}
            </Button>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-xs font-bold text-foreground">Active Login Sessions</h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Smartphone className="size-4 text-brand" /> Chrome on macOS • Lucknow, India
                  </p>
                  <p className="text-[11px] text-text-secondary mt-0.5">IP: 103.212.14.92 • Current Session</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Active Now
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 4: Recent Operations Log */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Executive Marketing Operations Log</h3>
          <div className="space-y-3">
            {[
              { time: "Today, 02:45 PM", action: "Approved ad set budget hike of ₹12,000/day on Meta Video Campaign" },
              { time: "Yesterday, 05:20 PM", action: "Uploaded 4K Drone elevation video creative for Tower A" },
              { time: "18 Apr 2026, 11:30 AM", action: "Dispatched WhatsApp Broadcast to 3,400 Gomti Nagar HNI leads" },
              { time: "17 Apr 2026, 04:15 PM", action: "Reconciled CPL performance metrics across 99acres and Google Ads" },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">{log.action}</p>
                  <span className="text-[11px] text-text-muted mt-0.5 block">{log.time}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Success
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
