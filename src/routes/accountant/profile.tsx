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
  Award,
  Download,
  Share2,
  CheckCircle,
  Clock,
  IndianRupee,
  Calculator,
  Lock,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/profile")({
  head: () => ({
    meta: [
      { title: "Chief Accountant & Financial Controller Profile | Vrindavan ERP" },
      { name: "description", content: "Statutory treasury signing authority, ICAI fellowship, and escrow audit credentials." },
    ],
  }),
  component: AccountantProfilePage,
});

export function AccountantProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "authority" | "security" | "activity">("overview");

  const [profile, setProfile] = useState({
    name: "CA Sunil Agnihotri",
    title: "Chief Financial Officer & Head of Treasury",
    empId: "VRN-FIN-001",
    email: "accounts@vrindavan.com",
    phone: "+91 94150 22910",
    icaiMemberNo: "FCA-088192",
    department: "Corporate Treasury, Escrow Audits & Statutory Taxes",
    officeLocation: "Vrindavan Financial Centre, 8th Floor, Gomti Nagar, Lucknow",
    signingLimit: "₹50,00,000 per voucher",
    gstinOfficer: "09AAACA1234B1Z5 (UP State Nodal)",
    joinedDate: "10 January 2021",
    bio: "Fellow Chartered Accountant overseeing RERA designated project escrow accounts, multi-bank treasury disbursements, GST filing compliance, and vendor book reconciliation.",
  });

  const [dscStatus, setDscStatus] = useState("Valid (Class 3 DSC Active)");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Chief Accountant Profile credentials saved!");
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#10184A] via-[#1E1B4B] to-[#4F20D8] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.3),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Statutory Signing Authority Certificate downloaded!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Signing Certificate
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
                <div className="size-28 sm:size-32 rounded-2xl bg-gradient-to-tr from-[#10b981] to-[#4F20D8] p-1 shadow-2xl ring-4 ring-[#0B1240]">
                  <div className="size-full rounded-[14px] bg-[#10184A] flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                    SA
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
                    <CheckCircle className="size-3" /> Fellow Chartered Accountant (ICAI)
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
                <Sparkles className="size-3.5 mr-1.5" /> Edit Financial Dossier
              </Button>
            </div>
          </div>

          {/* Key Financial Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <IndianRupee className="size-3.5 text-emerald-400" /> Reconciled MTD
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">₹28.45 Cr</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <ShieldCheck className="size-3.5 text-purple-300" /> Statutory Signing Cap
              </span>
              <p className="text-xl font-extrabold text-white mt-1">₹50.00 Lakh</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Calculator className="size-3.5 text-blue-400" /> GST Compliance
              </span>
              <p className="text-xl font-extrabold text-blue-400 mt-1">100% On-Time</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center sm:text-left">
              <span className="text-[11px] text-purple-200 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Award className="size-3.5 text-amber-400" /> Escrow Discrepancies
              </span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">0 (Nil Audit Note)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Executive Profile", icon: UsersRound },
          { id: "authority", label: "Statutory Signing & Banking", icon: Landmark },
          { id: "security", label: "DSC & Security", icon: ShieldCheck },
          { id: "activity", label: "Audit Log History", icon: Clock },
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
              <Award className="size-4 text-brand" /> Statutory Accreditations
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">Institute of Chartered Accountants of India</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Membership: {profile.icaiMemberNo}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">UP RERA Designated Escrow Officer</p>
                <p className="text-[11px] text-text-secondary mt-0.5">Form 3 CA Certificate Signatory</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-bold text-foreground">State GST Nodal Officer</p>
                <p className="text-[11px] text-text-secondary mt-0.5">GSTIN: {profile.gstinOfficer}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border shadow-sm lg:col-span-2">
            <h3 className="text-sm font-bold text-foreground mb-4">Edit Financial Officer Credentials</h3>
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
                  <Label className="text-xs">Corporate Title</Label>
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
                  <Label className="text-xs">Department & Responsibility</Label>
                  <Input
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
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
                  <Save className="size-3.5" /> Save Credentials
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Tab 2: Statutory Signing & Banking */}
      {activeTab === "authority" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Treasury & Bank Authorizations</h3>
          <p className="text-xs text-text-secondary">
            Board-approved banking signing limits and escrow operational mandate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">HDFC Bank Escrow Pool Account</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Dual Signatory Active
                </span>
              </div>
              <p className="font-mono text-xs text-text-secondary">A/c: 50200088192837 • IFSC: HDFC0000128</p>
              <p className="text-[11px] text-text-muted">Single Sign Cap: Up to ₹50,00,000 | Joint Cap: Unlimited</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">State Bank of India (SBI) Project Account</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Active Operative
                </span>
              </div>
              <p className="font-mono text-xs text-text-secondary">A/c: 38819283719 • IFSC: SBIN0001248</p>
              <p className="text-[11px] text-text-muted">Vendor & Contractor Real-Time RTGS Signatory</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: DSC & Security */}
      {activeTab === "security" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Digital Signature Certificate (DSC)</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Class 3 Signing Certificate for MCA, GST portal, and RERA e-filings.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
              {dscStatus}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-text-secondary space-y-1">
            <p>Issuer: <strong>eMudhra Consumer Services CA</strong></p>
            <p>Serial Number: <strong className="font-mono text-[11px]">7F-A9-81-22-38-09-12-88</strong></p>
            <p>Expiry Date: <strong>14 March 2028 (Valid)</strong></p>
          </div>
        </Card>
      )}

      {/* Tab 4: Audit Log */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Statutory Accounting Audit Trail</h3>
          <div className="space-y-3">
            {[
              { time: "Today, 03:15 PM", action: "Approved Vendor Contractor payment of ₹18,40,000 to Larsen Infra" },
              { time: "Yesterday, 04:30 PM", action: "Filed GSTR-3B monthly return and generated acknowledgment" },
              { time: "18 Apr 2026, 01:10 PM", action: "Signed Form 3 CA Escrow Certificate for Vrindavan Heights Q4" },
              { time: "16 Apr 2026, 10:00 AM", action: "Reconciled HDFC Escrow account with 38 customer booking receipts" },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">{log.action}</p>
                  <span className="text-[11px] text-text-muted mt-0.5 block">{log.time}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Audit Passed
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
