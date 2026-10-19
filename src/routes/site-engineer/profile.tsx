import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  HardHat,
  Mail,
  Phone,
  Building,
  Save,
  CheckCircle,
  Download,
  Share2,
  Calendar,
  ShieldCheck,
  Award,
  Layers,
  Clock,
  Sparkles,
  MapPin,
  Boxes,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/site-engineer/profile")({
  head: () => ({
    meta: [
      { title: "Resident Chief Engineer Profile | Vrindavan ERP" },
      { name: "description", content: "Civil & structural engineering license, site camp command, and safety certifications." },
    ],
  }),
  component: SiteEngineerProfilePage,
});

export function SiteEngineerProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "licensure" | "safety" | "activity">("overview");

  const [profile, setProfile] = useState({
    name: "Er. Indrajeet Verma",
    title: "Chief Resident Civil & Structural Engineer",
    empId: "VRN-ENG-001",
    email: "engineer@vrindavan.com",
    phone: "+91 98392 44550",
    councilLicense: "IEI/CIVIL/CHARTERED/2018/88912",
    assignedProject: "Vrindavan Heights (Towers A, B, C & Clubhouse)",
    siteOffice: "Site Project Camp, Sector 8, Shaheed Path, Lucknow",
    joinedDate: "14 February 2019",
    safetyRecord: "485 Accident-Free Days",
    totalConcretePoured: "48,200 m³ Lifetime",
    bio: "Lead Chartered Civil Engineer managing structural RCC slab casting, post-tensioned beam vetting, concrete cube laboratory testing, and contractor labor safety across high-rise campuses.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Site Chief Engineer credentials saved!");
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#10184A] via-[#352515] to-[#D97706] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.3),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Chartered Engineering License PDF downloaded!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Engineering License
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
                <div className="size-28 sm:size-32 rounded-2xl bg-gradient-to-tr from-[#d97706] to-[#f59e0b] p-1 shadow-2xl ring-4 ring-[#0B1240]">
                  <div className="size-full rounded-[14px] bg-[#10184A] flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                    IV
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
                    <HardHat className="size-3" /> Chartered Civil Engineer
                  </span>
                </div>
                <p className="text-sm font-medium text-amber-200 mt-1">{profile.title}</p>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Building className="size-3.5 text-amber-300" /> {profile.assignedProject} • {profile.empId}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2 pb-1">
              <Button
                size="sm"
                onClick={() => setActiveTab("overview")}
                className="h-9 px-4 text-xs font-semibold bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-white shadow-lg shadow-amber-900/30 hover:opacity-95"
              >
                <Sparkles className="size-3.5 mr-1.5" /> Edit Engineer Profile
              </Button>
            </div>
          </div>

          {/* Key Engineering Impact Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-amber-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <ShieldCheck className="size-3.5 text-emerald-400" /> Safety Record
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">485 Zero-Accident Days</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-amber-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Building className="size-3.5 text-amber-300" /> Concrete Poured MTD
              </span>
              <p className="text-xl font-extrabold text-white mt-1">1,850 m³ (M35)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-amber-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Layers className="size-3.5 text-white" /> Active High-Rise Towers
              </span>
              <p className="text-xl font-extrabold text-white mt-1">4 Towers (72 Floors)</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-amber-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Award className="size-3.5 text-amber-400" /> QA / QC Test Score
              </span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">98.2% Cube Pass</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Engineer Profile", icon: HardHat },
          { id: "licensure", label: "Charter & Accreditations", icon: Award },
          { id: "safety", label: "Site Camp & Safety Mandate", icon: ShieldCheck },
          { id: "activity", label: "Technical Signoff Log", icon: Clock },
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
              <Award className="size-4 text-brand" /> Engineering Charter
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">The Institution of Engineers (India)</p>
                <p className="text-[11px] text-text-secondary mt-0.5 font-mono">{profile.councilLicense}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">UP RERA Form 2 Competent Engineer</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Authorised Structural Certifier</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-xs text-text-secondary space-y-2">
              <p className="flex items-center gap-2">
                <Calendar className="size-3.5 text-text-muted" /> Service: Joined {profile.joinedDate}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-text-muted" /> {profile.siteOffice}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border shadow-sm lg:col-span-2">
            <h3 className="text-sm font-bold text-foreground mb-4">Edit Engineer Credentials</h3>
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
                  <Label className="text-xs">Technical Designation</Label>
                  <Input
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
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
                  <Label className="text-xs">Site Contact Phone</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Assigned Project & Towers</Label>
                  <Input
                    value={profile.assignedProject}
                    onChange={(e) => setProfile({ ...profile, assignedProject: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Site Camp Office Address</Label>
                  <Input
                    value={profile.siteOffice}
                    onChange={(e) => setProfile({ ...profile, siteOffice: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Engineering Bio & Civil Experience</Label>
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
                  <Save className="size-3.5" /> Save Engineer Profile
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Tab 2: Licensure */}
      {activeTab === "licensure" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Chartered Civil Engineering Accreditations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <span className="font-bold text-xs text-foreground">Structural Audit & Seismic Vetting Authority</span>
              <p className="text-xs text-text-secondary">Certified to execute up to Zone IV seismic structural casting audits.</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                Active & Certified
              </span>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <span className="font-bold text-xs text-foreground">Concrete Cube Testing Laboratory Vetting</span>
              <p className="text-xs text-text-secondary">Direct supervision of on-site NABL accredited compression testing plant.</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                NABL Compliant
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Safety */}
      {activeTab === "safety" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Site Safety, PPE & Heavy Machinery Protocols</h3>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <span className="text-xs font-bold text-emerald-700">Zero Incident Safety Record: 485 Days</span>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Mandatory morning safety toolbox talks conducted at 07:45 AM daily for all 412 labor workers. Tower crane inspection certified weekly.
            </p>
          </div>
        </Card>
      )}

      {/* Tab 4: Activity Log */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Technical Inspection & Signoff Log</h3>
          <div className="space-y-3">
            {[
              { time: "Today, 11:30 AM", act: "Signed off 16th floor column casting verification for Tower A" },
              { time: "Yesterday, 04:00 PM", act: "Certified 28-day cube strength of 38.4 MPa (Target: 35 MPa M35 Grade)" },
              { time: "18 Apr 2026, 09:30 AM", act: "Approved material indent for 2,450 bags of OPC 53 UltraTech Cement" },
              { time: "16 Apr 2026, 05:00 PM", act: "Signed RERA Form 2 Milestone Certificate for 14th floor casting completion" },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">{log.act}</p>
                  <span className="text-[11px] text-text-muted mt-0.5 block">{log.time}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Certified
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
