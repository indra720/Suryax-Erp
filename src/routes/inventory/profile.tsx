import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  Mail,
  Phone,
  Building,
  Save,
  CheckCircle,
  Download,
  Share2,
  Calendar,
  Award,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  Lock,
  Building2,
  KeyRound,
  Layers,
  TrendingUp,
  AlertTriangle,
  History,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/inventory/profile")({
  head: () => ({
    meta: [
      { title: "Inventory Custodian Profile | Vrindavan ERP" },
      { name: "description", content: "Chief Property & Inventory Officer credentials, unit quota allocation rights, and pricing policies." },
    ],
  }),
  component: InventoryProfilePage,
});

export function InventoryProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "quotas" | "safeguards" | "activity">("overview");

  const [profile, setProfile] = useState({
    name: "Vikram Singhania",
    title: "Chief Property & Inventory Officer",
    empId: "VRN-INV-001",
    email: "inventory@vrindavan.com",
    phone: "+91 98393 77110",
    maxHoldDurationHours: 48,
    managementQuotaUnits: 12,
    priceDeviationLimit: 5.0,
    officeLocation: "Vrindavan Central Inventory & Sales HQ, Gomti Nagar, Lucknow",
    joinedDate: "14 February 2020",
    bio: "Head of Residential & Commercial Property Portfolios, unit allocation matrices, automated hold-release lifecycles, and high-value penthouse quota approvals.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inventory Officer Profile & Policy Thresholds updated successfully!");
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Grand Hero Profile Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B1240]">
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-[#0B1536] via-[#0E2442] to-[#1E3A8A] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.35),transparent_60%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success("Inventory Custodian Charter & Audit Report downloaded!")}
              className="h-8 gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <Download className="size-3.5" /> Inventory Dossier
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
                <div className="size-28 sm:size-32 rounded-2xl bg-gradient-to-tr from-[#2563eb] to-[#0ea5e9] p-1 shadow-2xl ring-4 ring-[#0B1240]">
                  <div className="size-full rounded-[14px] bg-[#0B1536] flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                    VS
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <Boxes className="size-3" /> Master Unit Custodian
                  </span>
                </div>
                <p className="text-sm font-medium text-blue-200 mt-1">{profile.title}</p>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Building2 className="size-3.5 text-blue-300" /> Command ID: {profile.empId} • Level 4 Allocation Authority
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-2 pb-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-medium">
                <CheckCircle className="size-4" /> Live Unit Sync Active
              </div>
            </div>
          </div>

          {/* 4 Executive Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <Layers className="size-3.5 text-blue-400" /> Supervised Units
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">480 Total</p>
              <p className="text-[10px] text-blue-300 mt-0.5">Towers A, B, C, D & Villas</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="size-3.5 text-emerald-400" /> Occupancy Rate
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">76.7%</p>
              <p className="text-[10px] text-emerald-300 mt-0.5">368 Allocated / 112 Available</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-amber-400" /> Gross Portfolio Value
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">₹324.5 Cr</p>
              <p className="text-[10px] text-amber-300 mt-0.5">Under Active Governance</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                <Clock className="size-3.5 text-purple-400" /> Hold Auto-Release
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">48 Hours</p>
              <p className="text-[10px] text-purple-300 mt-0.5">Automated Lock Expiry</p>
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
          Inventory Officer Profile
        </button>
        <button
          onClick={() => setActiveTab("quotas")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "quotas"
              ? "bg-brand text-white shadow-md shadow-brand/20"
              : "text-text-secondary hover:text-foreground hover:bg-muted"
          }`}
        >
          Quotas & Allocation Authority
        </button>
        <button
          onClick={() => setActiveTab("safeguards")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "safeguards"
              ? "bg-brand text-white shadow-md shadow-brand/20"
              : "text-text-secondary hover:text-foreground hover:bg-muted"
          }`}
        >
          Hold Expiry & Safeguard Rules
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "activity"
              ? "bg-brand text-white shadow-md shadow-brand/20"
              : "text-text-secondary hover:text-foreground hover:bg-muted"
          }`}
        >
          Inventory Action Log
        </button>
      </div>

      {/* TAB 1: OVERVIEW & EDIT FORM */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Authority & Assignment Card */}
          <Card className="p-6 bg-card border border-border space-y-6">
            <div>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Boxes className="size-4 text-brand" /> Custodian Credentials
              </h2>
              <p className="text-xs text-text-secondary mt-1">Official inventory command authority and jurisdictions.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300">
                <p className="font-bold flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="size-3.5" /> Level 4 Supreme Authority
                </p>
                <p className="text-[11px] mt-1 text-text-secondary">
                  Full rights to lock, release, swap, and re-allocate residential units, commercial retail spaces, and penthouses.
                </p>
              </div>

              <div>
                <Label className="text-[11px] text-text-muted">Assigned Projects & Portfolio</Label>
                <div className="space-y-1.5 mt-1.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/60 text-xs">
                    <span className="font-medium text-foreground">Vrindavan Heights (Towers A-E)</span>
                    <span className="font-mono text-emerald-600 font-bold">320 Units</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/60 text-xs">
                    <span className="font-medium text-foreground">Palm Meadows Luxury Villas</span>
                    <span className="font-mono text-emerald-600 font-bold">60 Villas</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/60 text-xs">
                    <span className="font-medium text-foreground">Crown Business Hub & Plaza</span>
                    <span className="font-mono text-emerald-600 font-bold">100 Shops</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-[11px] text-text-muted">Direct Contact & Helpline</Label>
                <div className="space-y-2 mt-1.5 text-xs text-foreground">
                  <p className="flex items-center gap-2">
                    <Mail className="size-3.5 text-brand" /> {profile.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="size-3.5 text-brand" /> {profile.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="size-3.5 text-brand" /> Appointed on: {profile.joinedDate}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <Label className="text-[11px] text-text-muted">Central Inventory Command Office</Label>
                <p className="text-xs text-foreground mt-1 flex items-start gap-1.5">
                  <MapPin className="size-3.5 text-brand shrink-0 mt-0.5" />
                  {profile.officeLocation}
                </p>
              </div>
            </div>
          </Card>

          {/* Right Column: Profile & Allocation Policy Edit Form */}
          <Card className="lg:col-span-2 p-6 bg-card border border-border">
            <div className="mb-6">
              <h2 className="text-base font-bold text-foreground">Edit Custodian Profile & Policy Rules</h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Update officer information, unit hold auto-expiry timings, and quota limits.
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
                  <Label className="text-xs font-medium">Designation</Label>
                  <Input
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium">Email Address</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium">Hotline / Phone Number</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium">Standard Hold Auto-Expiry (Hours)</Label>
                  <Input
                    type="number"
                    value={profile.maxHoldDurationHours}
                    onChange={(e) => setProfile({ ...profile, maxHoldDurationHours: Number(e.target.value) })}
                    className="mt-1 h-9 text-xs"
                    min="1"
                    max="168"
                    required
                  />
                  <p className="text-[11px] text-text-muted mt-1">Locks auto-release if booking token not verified.</p>
                </div>

                <div>
                  <Label className="text-xs font-medium">Reserved Management Quota (Units)</Label>
                  <Input
                    type="number"
                    value={profile.managementQuotaUnits}
                    onChange={(e) => setProfile({ ...profile, managementQuotaUnits: Number(e.target.value) })}
                    className="mt-1 h-9 text-xs"
                    min="0"
                    max="50"
                    required
                  />
                  <p className="text-[11px] text-text-muted mt-1">Exclusive units held for board & promoter approvals.</p>
                </div>

                <div>
                  <Label className="text-xs font-medium">Max Discretionary Price Deviation (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={profile.priceDeviationLimit}
                    onChange={(e) => setProfile({ ...profile, priceDeviationLimit: Number(e.target.value) })}
                    className="mt-1 h-9 text-xs"
                    min="0"
                    max="10"
                    required
                  />
                  <p className="text-[11px] text-text-muted mt-1">Discretionary discount officer can grant without MD approval.</p>
                </div>

                <div>
                  <Label className="text-xs font-medium">Official Employee ID</Label>
                  <Input
                    value={profile.empId}
                    disabled
                    className="mt-1 h-9 text-xs bg-muted/50 cursor-not-allowed font-mono"
                  />
                  <p className="text-[11px] text-text-muted mt-1">Unique immutable identifier assigned by SuperAdmin.</p>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-xs font-medium">Central Office & Site Headquarters</Label>
                  <Input
                    value={profile.officeLocation}
                    onChange={(e) => setProfile({ ...profile, officeLocation: e.target.value })}
                    className="mt-1 h-9 text-xs"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="text-xs font-medium">Professional Bio & Scope of Authority</Label>
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
                  Last verified by SuperAdmin on <span className="font-semibold text-foreground">18 Oct 2026</span>
                </p>
                <Button type="submit" size="sm" className="bg-brand text-white gap-1.5 text-xs">
                  <Save className="size-3.5" /> Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* TAB 2: QUOTAS & ALLOCATION AUTHORITY */}
      {activeTab === "quotas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border border-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Award className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">Management & Promoter Quota</h3>
                <p className="text-xs text-text-secondary">Strictly reserved units requiring dual signature.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Quota Pool Cap</span>
                <span className="font-bold font-mono text-foreground">{profile.managementQuotaUnits} Units</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Currently Allocated</span>
                <span className="font-bold font-mono text-amber-600">8 Units</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary">Available in Quota</span>
                <span className="font-bold font-mono text-emerald-600">4 Units</span>
              </div>
              <div className="pt-2 border-t border-border/60 text-[11px] text-text-muted">
                Requires Chief Inventory Officer and Managing Director digital authorization before unit release to client.
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-foreground">Active Quota Units:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg border border-border bg-card">
                  <p className="font-bold text-foreground">Tower A - PH01</p>
                  <p className="text-[10px] text-text-muted">Penthouse • Reserved</p>
                </div>
                <div className="p-2 rounded-lg border border-border bg-card">
                  <p className="font-bold text-foreground">Tower B - PH02</p>
                  <p className="text-[10px] text-text-muted">Penthouse • Reserved</p>
                </div>
                <div className="p-2 rounded-lg border border-border bg-card">
                  <p className="font-bold text-foreground">Palm Villa #01</p>
                  <p className="text-[10px] text-text-muted">Corner Villa • Held</p>
                </div>
                <div className="p-2 rounded-lg border border-border bg-card">
                  <p className="font-bold text-foreground">Palm Villa #02</p>
                  <p className="text-[10px] text-text-muted">Club Facing • Available</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <KeyRound className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">Channel Partner (Broker) Hold Rules</h3>
                <p className="text-xs text-text-secondary">Broker allocation limitations & lock limits.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <p className="font-semibold text-foreground flex items-center justify-between">
                  <span>Concurrent Hold Ceiling</span>
                  <span className="text-brand font-bold">Max 2 Units / Broker</span>
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  Prevents single brokers from hoarding multiple prime inventory slots without client commitment.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <p className="font-semibold text-foreground flex items-center justify-between">
                  <span>Lock Expiry Warning Notification</span>
                  <span className="text-amber-600 font-bold">At 4 Hours Remaining</span>
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  Automated SMS & WhatsApp dispatch sent to broker and assigned sales manager prior to drop.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <p className="font-semibold text-foreground flex items-center justify-between">
                  <span>Unit Swap Facility</span>
                  <span className="text-emerald-600 font-bold">Within 7 Days</span>
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  Client may switch to identical or upgraded floor unit with zero cancellation charge.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: SAFEGUARD RULES & POLICIES */}
      {activeTab === "safeguards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border border-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">Overbooking Prevention Engine</h3>
                <p className="text-xs text-text-secondary">Zero-tolerance double allocation safeguards.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border">
                <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Atomic Database Locking</p>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Real-time transaction mutex ensures no two sales managers or brokers can simultaneously issue a hold request on the same unit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border">
                <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Mandatory Booking Token Gate</p>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    ₹1,00,000 token payment must be verified in the Accountant Portal before status transitions from Held to Booked.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border">
                <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">RERA Carpet Area Audit Guard</p>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Unit dimensions and carpet specifications locked to registered sanction drawings. Cannot be edited without legal review.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Sparkles className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">Price Override & Discount Matrix</h3>
                <p className="text-xs text-text-secondary">Governance over pricing adjustments.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-foreground">Inventory Officer Discretion</span>
                  <span className="font-mono text-brand font-bold">Up to {profile.priceDeviationLimit}%</span>
                </div>
                <p className="text-[11px] text-text-secondary">
                  Can be applied for spot payment commitments or volume bookings without senior escalation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-foreground">Sales Director Approval</span>
                  <span className="font-mono text-purple-600 font-bold">5.1% - 8.0%</span>
                </div>
                <p className="text-[11px] text-text-secondary">
                  Requires automated digital request sent to Sales Director with customer financial profile.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/40">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-foreground">Board / MD Special Sanction</span>
                  <span className="font-mono text-rose-600 font-bold">&gt; 8.0%</span>
                </div>
                <p className="text-[11px] text-text-secondary">
                  Special festive or institutional waivers requiring Chairman digital token signoff.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 4: AUDIT ACTIVITY LOG */}
      {activeTab === "activity" && (
        <Card className="p-6 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Inventory Action & Allocation Log</h3>
              <p className="text-xs text-text-secondary">Real-time audit trail of unit status modifications.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Activity log exported as CSV!")}
              className="text-xs h-8 gap-1.5"
            >
              <Download className="size-3.5" /> Export Log
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                unit: "Unit B-904 (3 BHK)",
                action: "Released from Expired Broker Hold",
                detail: "48-Hour window lapsed without token deposit; returned to general inventory pool.",
                time: "42 mins ago",
                user: "Automated Expiry Engine",
                badge: "Auto-Released",
                badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
              },
              {
                unit: "Unit E-PH02 (Penthouse)",
                action: "Management Quota Allocation Approved",
                detail: "Approved for VIP buyer with MD digital counter-signoff.",
                time: "3 hours ago",
                user: "Vikram Singhania",
                badge: "Approved",
                badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
              },
              {
                unit: "Palm Villa #14",
                action: "Spot Price Override Applied",
                detail: "2.5% milestone concession granted for full down payment commitment.",
                time: "Yesterday, 4:15 PM",
                user: "Vikram Singhania",
                badge: "Discounted",
                badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
              },
              {
                unit: "Tower C (18 Units)",
                action: "RERA Clearances Synced",
                detail: "Occupancy certification milestone uploaded; units opened for final registry.",
                time: "2 days ago",
                user: "Legal & Inventory Sync",
                badge: "Verified",
                badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
              },
              {
                unit: "Tower D Inventory",
                action: "Quarterly Stock Audit Completed",
                detail: "Physical site inspection reconciled with Accountant & CRM databases. 100% match.",
                time: "3 days ago",
                user: "Vikram Singhania",
                badge: "Audited",
                badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
              },
            ].map((log, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-foreground">{log.unit}</span>
                    <span className="text-[11px] font-medium text-text-secondary">• {log.action}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${log.badgeColor}`}>
                      {log.badge}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">{log.detail}</p>
                </div>
                <div className="text-left sm:text-right text-[11px] text-text-muted shrink-0">
                  <p className="font-medium text-foreground">{log.user}</p>
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
