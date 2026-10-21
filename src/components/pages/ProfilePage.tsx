import React, { useState } from "react";
import { toast } from "sonner";
import {
  ShieldAlert,
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
  KeyRound,
  Users,
  Activity,
  Server,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "security" | "governance" | "activity">("overview");

  const [profile, setProfile] = useState({
    name: "Dr. Indrajeet Suryavanshi",
    title: "Chief Executive Officer & Root Super Administrator",
    empId: "VRN-ADM-001",
    email: "admin@suryax.in",
    phone: "+91 98290 12345",
    location: "Corporate Apex, Vrindavan Tower, Lucknow & Jaipur",
    joinedDate: "12 Jan 2024",
    bio: "Supreme Administrator overseeing 8 operational divisions: Marketing, Accounting & Finance, Sales Management, Broker CRM, Construction & Site Engineering, Legal Regulatory, Client Portal, and Real-Time Inventory.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) {
      toast.error("Full name is required");
      return;
    }
    const digits = profile.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      toast.error("Phone number must be a valid 10-digit mobile number");
      return;
    }
    toast.success("Super Administrator Profile updated successfully!");
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#0B1240] via-[#1E1B4B] to-[#4F20D8] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.35),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Executive System Dossier & Access Keys exported!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Executive Dossier
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <ShieldAlert className="size-3" /> Root Super Administrator
                  </span>
                </div>
                <p className="text-sm font-medium text-purple-200 mt-1">{profile.title}</p>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Building className="size-3.5 text-purple-300" /> Apex Identifier: {profile.empId} • Supreme System Clearance
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2 pb-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-medium">
                <CheckCircle className="size-4" /> Full Enterprise Privileges
              </div>
            </div>
          </div>

          {/* 4 Executive Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <Layers className="size-3.5 text-purple-400" /> Governed Portals
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">8 Active</p>
              <p className="text-[10px] text-purple-300 mt-0.5">End-to-End Enterprise Sync</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-emerald-400" /> Portfolio Pipeline
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">₹1,240 Cr</p>
              <p className="text-[10px] text-emerald-300 mt-0.5">Across 4 Mega Townships</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <Users className="size-3.5 text-blue-400" /> Active System Users
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">128 Staff</p>
              <p className="text-[10px] text-blue-300 mt-0.5">Engineers, Sales & Legal</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <Server className="size-3.5 text-amber-400" /> System Uptime
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">99.98%</p>
              <p className="text-[10px] text-amber-300 mt-0.5">RERA & SOC-2 Compliant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "overview"
              ? "bg-brand text-white shadow-md shadow-brand/20"
              : "text-text-secondary hover:text-foreground hover:bg-muted"
          }`}
        >
          Administrator Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "security"
              ? "bg-brand text-white shadow-md shadow-brand/20"
              : "text-text-secondary hover:text-foreground hover:bg-muted"
          }`}
        >
          Root Security & 2FA
        </button>
        <button
          onClick={() => setActiveTab("governance")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "governance"
              ? "bg-brand text-white shadow-md shadow-brand/20"
              : "text-text-secondary hover:text-foreground hover:bg-muted"
          }`}
        >
          System Governance & Roles
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "activity"
              ? "bg-brand text-white shadow-md shadow-brand/20"
              : "text-text-secondary hover:text-foreground hover:bg-muted"
          }`}
        >
          Audit Trail & Activity
        </button>
      </div>

      {/* TAB 1: OVERVIEW & FORM */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Authority Card */}
          <Card className="p-6 bg-card border border-border space-y-6">
            <div>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand" /> Executive Apex Authority
              </h2>
              <p className="text-xs text-text-secondary mt-1">Super Administrator privileges & master jurisdiction.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300">
                <p className="font-bold flex items-center gap-1.5 text-xs">
                  <Award className="size-3.5" /> Supreme Operational Clearance
                </p>
                <p className="text-[11px] mt-1 text-text-secondary">
                  Authorized to override price deviation ceilings, sign executive resolutions, re-assign portal custodians, and grant cryptographic DSC credentials.
                </p>
              </div>

              <div>
                <Label className="text-[11px] text-text-muted">Primary Enterprise Channels</Label>
                <div className="space-y-2 mt-1.5 text-xs text-foreground">
                  <p className="flex items-center gap-2">
                    <Mail className="size-3.5 text-brand" /> {profile.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="size-3.5 text-brand" /> {profile.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="size-3.5 text-brand" /> Root Provisioned: {profile.joinedDate}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <Label className="text-[11px] text-text-muted">Principal Corporate Apex Headquarters</Label>
                <p className="text-xs text-foreground mt-1 flex items-start gap-1.5">
                  <Building className="size-3.5 text-brand shrink-0 mt-0.5" />
                  {profile.location}
                </p>
              </div>
            </div>
          </Card>

          {/* Right Column: Edit Profile Form */}
          <Card className="lg:col-span-2 p-6 bg-card border border-border">
            <div className="mb-6">
              <h2 className="text-base font-bold text-foreground">Edit Super Administrator Profile</h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Update executive master identity and institutional notification channels.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium">Full Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium">Designation / Executive Title</Label>
                  <Input
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium">Primary Enterprise Email</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium">Secure Direct Phone (10 digits)</Label>
                  <Input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="text-xs font-medium">Corporate Headquarters Location</Label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="text-xs font-medium">Executive Mandate & Bio</Label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-xs outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <p className="text-xs text-text-muted">
                  Apex Session authenticated with Hardware Token (FIDO2/WebAuthn).
                </p>
                <Button type="submit" size="sm" className="bg-brand text-white gap-1.5 text-xs">
                  <Save className="size-3.5" /> Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* TAB 2: ROOT SECURITY */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border border-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Lock className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">Multi-Factor Cryptographic 2FA</h3>
                <p className="text-xs text-text-secondary">Hardware key & biometric authentication status.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <p className="font-semibold text-foreground flex items-center justify-between">
                  <span>YubiKey FIDO2 Security Key</span>
                  <span className="text-emerald-600 font-bold">Enforced & Active</span>
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  Physical cryptographic hardware dongle required for database modifications and permission escalations.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <p className="font-semibold text-foreground flex items-center justify-between">
                  <span>Session Lifetime Limit</span>
                  <span className="text-purple-600 font-bold">8 Hours (Idle 30m)</span>
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  Automatic session invalidation and IP pinning across corporate VPN connections.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <p className="font-semibold text-foreground flex items-center justify-between">
                  <span>SSL / TLS 1.3 Strict Transport</span>
                  <span className="text-emerald-600 font-bold">256-bit AES Enforced</span>
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  All REST endpoints and WebSocket channels encrypted end-to-end.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <KeyRound className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">API Master Keys & Webhooks</h3>
                <p className="text-xs text-text-secondary">External banking & WhatsApp gateway access keys.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-foreground">HDFC Bank Virtual Account Webhook</span>
                  <span className="font-mono text-emerald-600 font-bold">Connected</span>
                </div>
                <p className="text-[11px] text-text-secondary font-mono">
                  whsec_live_99834*********************
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-foreground">Meta Cloud WhatsApp API Key</span>
                  <span className="font-mono text-emerald-600 font-bold">Connected</span>
                </div>
                <p className="text-[11px] text-text-secondary font-mono">
                  EAAXk9*******************************
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-foreground">UPRERA Public Registry API</span>
                  <span className="font-mono text-emerald-600 font-bold">Synced</span>
                </div>
                <p className="text-[11px] text-text-secondary font-mono">
                  uprera_sync_auth_token_live_2026
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: SYSTEM GOVERNANCE */}
      {activeTab === "governance" && (
        <Card className="p-6 bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">8 Operational Portal Governance Matrix</h3>
              <p className="text-xs text-text-secondary">Departmental head assignments and authority delegation.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Role access matrix exported as PDF!")}
              className="text-xs h-8 gap-1.5"
            >
              <Download className="size-3.5" /> Export Matrix
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              { portal: "Marketing Portal", lead: "Rohan Mehra", role: "CMO", status: "Active", link: "/marketing" },
              { portal: "Accountant Portal", lead: "CA Rajesh Sharma", role: "CFO", status: "Active", link: "/accountant" },
              { portal: "Sales Manager Portal", lead: "Arjun Verma", role: "VP Sales", status: "Active", link: "/sales-manager" },
              { portal: "Broker CRM Portal", lead: "Shree Real Estate", role: "Platinum Broker", status: "Active", link: "/broker" },
              { portal: "Site Engineer Portal", lead: "Er. Rameshwar Nath", role: "Chief Project Eng.", status: "Active", link: "/site-engineer" },
              { portal: "Legal & RERA Portal", lead: "Adv. Sudhir Dixit", role: "Head Regulatory", status: "Active", link: "/legal" },
              { portal: "Customer Portal", lead: "Ananya Deshmukh", role: "Homeowner", status: "Active", link: "/customer" },
              { portal: "Inventory Portal", lead: "Vikram Singhania", role: "Property Officer", status: "Active", link: "/inventory" },
            ].map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-border bg-muted/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{p.portal}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                    {p.status}
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary">{p.lead} • {p.role}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: AUDIT ACTIVITY */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Apex Executive Audit Trail</h3>
              <p className="text-xs text-text-secondary">Chronological record of high-level administrative decisions.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Apex audit logs exported!")}
              className="text-xs h-8 gap-1.5"
            >
              <Download className="size-3.5" /> Export Audit Log
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                action: "Approved High-Value Booking BK1024",
                detail: "Penthouse E-PH02 confirmed at ₹85 Lakh with Accountant payment voucher.",
                time: "45 mins ago",
                badge: "Approved",
                badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
              },
              {
                action: "Provisioned New Construction Phase - Urban Crown Phase 2",
                detail: "Assigned Er. Rameshwar Nath as site lead with ₹12 Cr civil budget line.",
                time: "3 hours ago",
                badge: "Provisioned",
                badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
              },
              {
                action: "Updated Privilege Broker Commission Slabs",
                detail: "Platinum Broker tier adjusted to 3.25% for Palm Meadows phase.",
                time: "Yesterday, 6:30 PM",
                badge: "Updated",
                badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
              },
              {
                action: "Exported Full Fiscal Leads & Conversion Audit (CSV)",
                detail: "Signed with SHA-256 digital stamp for board quarterly meeting.",
                time: "2 days ago",
                badge: "Exported",
                badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
              },
              {
                action: "RERA Regulatory Compliance Certification Verified",
                detail: "Quarterly UP-RERA progress disclosure uploaded and synced.",
                time: "3 days ago",
                badge: "Compliant",
                badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
              },
            ].map((log, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-foreground">{log.action}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${log.badgeColor}`}>
                      {log.badge}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">{log.detail}</p>
                </div>
                <div className="text-left sm:text-right text-[11px] text-text-muted shrink-0">
                  <p>{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
