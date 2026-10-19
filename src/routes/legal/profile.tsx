import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Mail,
  Phone,
  Building,
  Save,
  CheckCircle,
  Download,
  Share2,
  Calendar,
  Award,
  Scale,
  FileCheck,
  Clock,
  Sparkles,
  MapPin,
  Lock,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/legal/profile")({
  head: () => ({
    meta: [
      { title: "Legal Counsel & Regulatory Head Profile | Vrindavan ERP" },
      { name: "description", content: "Chief Legal Advisor credentials, Bar Council enrollment, and statutory clearances." },
    ],
  }),
  component: LegalProfilePage,
});

export function LegalProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "bar" | "statutory" | "activity">("overview");

  const [profile, setProfile] = useState({
    name: "Adv. Sudhir Dixit",
    title: "Chief Legal Counsel & Head of Regulatory Compliance",
    empId: "VRN-LGL-001",
    email: "legal@vrindavan.com",
    phone: "+91 98390 55660",
    barCouncilNo: "UP/2004/7712",
    courtJurisdiction: "Allahabad High Court (Lucknow Bench)",
    officeAddress: "Legal Cell Chambers, 10th Floor, Vrindavan Corporate Tower, Gomti Nagar, Lucknow",
    joinedDate: "08 July 2018",
    bio: "Senior Advocate specializing in Real Estate Regulatory Authority (RERA) law, Section 143 UP ZALR land revenue conversion, bilateral Builder Buyer Agreement (BBA) drafting, and Sub-Registrar stamp deeds.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Legal Counsel credentials saved successfully!");
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#10184A] via-[#1E1B4B] to-[#3B1F8E] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.3),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Bar Council Certification Dossier downloaded!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Bar Credentials
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
                <div className="size-28 sm:size-32 rounded-2xl bg-gradient-to-tr from-[#9333ea] to-[#4F20D8] p-1 shadow-2xl ring-4 ring-[#0B1240]">
                  <div className="size-full rounded-[14px] bg-[#10184A] flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                    SD
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <ShieldCheck className="size-3" /> High Court Advocate
                  </span>
                </div>
                <p className="text-sm font-medium text-purple-200 mt-1">{profile.title}</p>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Building className="size-3.5 text-purple-300" /> Bar: {profile.barCouncilNo} • {profile.empId}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2 pb-1">
              <Button
                size="sm"
                onClick={() => setActiveTab("overview")}
                className="h-9 px-4 text-xs font-semibold bg-gradient-to-r from-[#4F20D8] to-[#9333ea] text-white shadow-lg shadow-purple-900/30 hover:opacity-95"
              >
                <Sparkles className="size-3.5 mr-1.5" /> Edit Legal Dossier
              </Button>
            </div>
          </div>

          {/* Key Legal Impact Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <FileCheck className="size-3.5 text-emerald-400" /> BBA Agreements Executed
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">248 Drafted</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <ShieldCheck className="size-3.5 text-purple-300" /> RERA Compliance
              </span>
              <p className="text-xl font-extrabold text-white mt-1">100% Certified</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Award className="size-3.5 text-white" /> Statutory Clearances
              </span>
              <p className="text-xl font-extrabold text-white mt-1">14 Active NOCs</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <CheckCircle className="size-3.5 text-emerald-400" /> Land Litigation Status
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">0 (Clear Title)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Counsel Dossier", icon: ShieldCheck },
          { id: "bar", label: "Bar Council & Jurisdiction", icon: Scale },
          { id: "statutory", label: "Statutory Clearances", icon: FileCheck },
          { id: "activity", label: "Execution & Registry Log", icon: Clock },
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

      {/* Tab 1: Counsel Dossier */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Award className="size-4 text-brand" /> Standing & Accreditations
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">Bar Council of Uttar Pradesh</p>
                <p className="text-[11px] text-text-secondary mt-0.5 font-mono">{profile.barCouncilNo}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">High Court Bar Association Lucknow</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Life Member • Real Estate Bench</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border text-xs text-text-secondary space-y-2">
              <p className="flex items-center gap-2">
                <Calendar className="size-3.5 text-text-muted" /> Tenure: Joined {profile.joinedDate}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-text-muted" /> {profile.officeAddress}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border shadow-sm lg:col-span-2">
            <h3 className="text-sm font-bold text-foreground mb-4">Edit Legal Counsel Profile</h3>
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
                  <Label className="text-xs">Official Designation</Label>
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
                  <Label className="text-xs">Contact Phone</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Chambers & Court Address</Label>
                  <Input
                    value={profile.officeAddress}
                    onChange={(e) => setProfile({ ...profile, officeAddress: e.target.value })}
                    className="mt-1 h-9 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs">Professional Profile & Expertise</Label>
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
                  <Save className="size-3.5" /> Save Counsel Profile
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Tab 2: Bar Council */}
      {activeTab === "bar" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Court Jurisdiction & Enrolment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <span className="font-bold text-xs text-foreground">High Court of Judicature at Allahabad</span>
              <p className="text-xs text-text-secondary">Lucknow Bench • Writ, Property Title & Arbitration</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                Enrolled Advocate
              </span>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <span className="font-bold text-xs text-foreground">Sub-Registrar Sadar & Mohanlalganj</span>
              <p className="text-xs text-text-secondary">Authorised Conveyancing Attorney on behalf of Vrindavan Promoters</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                Power of Attorney Active
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Clearances */}
      {activeTab === "statutory" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Statutory Regulatory Approvals in Custody</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
              <span>Fire Safety Provisional & Final Clearance NOC</span>
              <span className="font-bold text-emerald-600">Valid till Jun 2027</span>
            </div>
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
              <span>Airport Authority of India (AAI) 110m Height Clearance</span>
              <span className="font-bold text-emerald-600">Valid till Nov 2031</span>
            </div>
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
              <span>SEIAA State Environmental Impact Clearance</span>
              <span className="font-bold text-emerald-600">Valid till Aug 2030</span>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 4: Activity */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Recent Legal Actions & Conveyances</h3>
          <div className="space-y-3">
            {[
              { time: "18 Apr 2026", act: "Executed BBA for Unit 1402 (Amitabh Chaturvedi) with verified e-Stamp" },
              { time: "16 Apr 2026", act: "Executed Sale Deed at Sub-Registrar Sadar for Shop G-12 (Manish Agarwal)" },
              { time: "14 Apr 2026", act: "Submitted Q3 Compliance Return to UP RERA Authority" },
              { time: "10 Apr 2026", act: "Completed 30-year search title opinion for Sector 9 expansion parcel" },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">{log.act}</p>
                  <span className="text-[11px] text-text-muted mt-0.5 block">{log.time}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Executed
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
