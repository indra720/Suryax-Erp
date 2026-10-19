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
  Trophy,
  Target,
  IndianRupee,
  Award,
  Sparkles,
  Download,
  Share2,
  Calendar,
  Clock,
  Briefcase,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-manager/profile")({
  head: () => ({
    meta: [
      { title: "Sales Director Profile & Hierarchy | Vrindavan ERP" },
      { name: "description", content: "Executive sales director credentials, territory command, and incentive structure." },
    ],
  }),
  component: SalesProfilePage,
});

export function SalesProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "territory" | "incentives" | "activity">("overview");

  const [profile, setProfile] = useState({
    name: "Rajesh Malhotra",
    title: "Senior Director of Sales & Business Development",
    empId: "VRN-SLS-001",
    email: "salesmgr@vrindavan.com",
    phone: "+91 98390 11001",
    territory: "Shaheed Path & Gomti Nagar Extn Luxury Corridor",
    officeLocation: "Vrindavan Sales Experience Gallery, Shaheed Path, Lucknow",
    teamSize: "16 Sales Executives & Assistant Managers",
    quotaAttainment: "109% (Q1 2026)",
    joinedDate: "05 May 2020",
    bio: "Heading high-value residential luxury sales, HNI customer relationship management, and commercial floor investments for Vrindavan Real Estate portfolio.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Sales Director Profile updated successfully!");
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#10184A] via-[#351A88] to-[#4F20D8] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.3),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Executive Sales Performance Dossier downloaded!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Performance Dossier
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
                <div className="size-28 sm:size-32 rounded-2xl bg-gradient-to-tr from-[#f59e0b] to-[#6732F2] p-1 shadow-2xl ring-4 ring-[#0B1240]">
                  <div className="size-full rounded-[14px] bg-[#10184A] flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                    RM
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Trophy className="size-3" /> Top Sales Closer 2026
                  </span>
                </div>
                <p className="text-sm font-medium text-purple-200 mt-1">{profile.title}</p>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Building className="size-3.5 text-purple-300" /> {profile.territory} • {profile.empId}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2 pb-1">
              <Button
                size="sm"
                onClick={() => setActiveTab("overview")}
                className="h-9 px-4 text-xs font-semibold bg-gradient-to-r from-[#4F20D8] to-[#6732F2] text-white shadow-lg shadow-purple-900/30 hover:opacity-95"
              >
                <Sparkles className="size-3.5 mr-1.5" /> Edit Sales Profile
              </Button>
            </div>
          </div>

          {/* Key Sales Impact Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <IndianRupee className="size-3.5 text-emerald-400" /> Closed Revenue MTD
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">₹9.85 Cr</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Target className="size-3.5 text-purple-300" /> Target Attainment
              </span>
              <p className="text-xl font-extrabold text-white mt-1">109% (Quota Exceeded)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Trophy className="size-3.5 text-amber-400" /> Units Booked MTD
              </span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">12 Premium Units</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <TrendingUp className="size-3.5 text-blue-400" /> Win Ratio
              </span>
              <p className="text-xl font-extrabold text-blue-400 mt-1">25.0% Conversion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Executive Profile", icon: UsersRound },
          { id: "territory", label: "Territory & Command", icon: MapPin },
          { id: "incentives", label: "Incentive Slabs & Tier", icon: Award },
          { id: "activity", label: "Deal Closure Timeline", icon: Clock },
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

      {/* Tab 1: Executive Profile */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Award className="size-4 text-brand" /> Leadership Recognition
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">Chairman's Circle of Excellence</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Consecutive 4-Quarter Target Overachiever</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">Shaheed Path Flagship In-Charge</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Direct command of 3 active residential towers</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-xs text-text-secondary space-y-2">
              <p className="flex items-center gap-2">
                <Calendar className="size-3.5 text-text-muted" /> Tenure: Joined {profile.joinedDate}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-text-muted" /> {profile.officeLocation}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border shadow-sm lg:col-span-2">
            <h3 className="text-sm font-bold text-foreground mb-4">Edit Sales Director Dossier</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
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
                <div className="sm:col-span-2">
                  <Label className="text-xs">Assigned Territory & Corridor</Label>
                  <Input
                    value={profile.territory}
                    onChange={(e) => setProfile({ ...profile, territory: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Executive Biography</Label>
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
                  <Save className="size-3.5" /> Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Tab 2: Territory Command */}
      {activeTab === "territory" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Assigned Sales Jurisdiction & Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <span className="font-bold text-xs text-foreground">Vrindavan Heights (Flagship Project)</span>
              <p className="text-xs text-text-secondary">Shaheed Path Corridor • 280 Total Luxury Units</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                Direct Lead Allocation Authority
              </span>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <span className="font-bold text-xs text-foreground">Vrindavan Commercial Plaza</span>
              <p className="text-xs text-text-secondary">Vibhuti Khand, Gomti Nagar • 60 Retail Units</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                HNI Investor Portfolio
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Incentive Slabs */}
      {activeTab === "incentives" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Director Commission & Incentive Slabs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <span className="text-[10px] font-bold text-text-secondary uppercase">Base Target Quota</span>
              <p className="text-base font-bold text-foreground mt-1">₹9.00 Cr / month</p>
              <p className="text-[11px] text-emerald-600 mt-1 font-semibold">Attained: ₹9.85 Cr (109%)</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Monthly Incentive Earned</span>
              <p className="text-base font-extrabold text-emerald-700 mt-1">₹2,45,000</p>
              <p className="text-[11px] text-emerald-800 mt-1">Approved for Payroll Sync</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <span className="text-[10px] font-bold text-purple-700 uppercase">Annual Super Bonus Tier</span>
              <p className="text-base font-extrabold text-purple-700 mt-1">Diamond Club</p>
              <p className="text-[11px] text-purple-800 mt-1">+ International Retreat 2026</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 4: Closure Activity Log */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Recent High-Value Deal Closures</h3>
          <div className="space-y-3">
            {[
              { time: "18 Apr 2026", deal: "Closed 3 BHK Premium Unit 1402 (₹95.0 Lakh) with Amitabh Chaturvedi" },
              { time: "15 Apr 2026", deal: "Accompanied HNI Site Visit with Col. Sanjeev Rawat at Tower C Penthouse" },
              { time: "12 Apr 2026", deal: "Closed Villa 09 (₹2.25 Cr) at Vrindavan Green Valley with Gaurav Mehrotra" },
              { time: "10 Apr 2026", deal: "Conducted Weekly Sales Team Performance Review with 16 Sales Execs" },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">{log.deal}</p>
                  <span className="text-[11px] text-text-muted mt-0.5 block">{log.time}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
