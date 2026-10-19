import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  IndianRupee,
  Calendar,
  FileText,
  Camera,
  MessageSquare,
  Sparkles,
  PhoneCall,
  CheckCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { customerService } from "@/lib/services/customer";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/dashboard")({
  head: () => ({
    meta: [
      { title: "My Home Portal | Vrindavan Real Estate" },
      { name: "description", content: "Customer portal for booking progress, installment payment schedule, and site updates." },
    ],
  }),
  component: CustomerDashboardPage,
});

export function CustomerDashboardPage() {
  const [profile] = useState(customerService.getProfile());
  const [schedule] = useState(customerService.getSchedule());
  const [milestones] = useState(customerService.getMilestones());
  const [documents] = useState(customerService.getDocuments());

  const booked = profile.bookedUnit;
  const paidPct = Math.round((booked.amountPaid / booked.totalCost) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Hero Banner */}
      <Card className="p-6 bg-gradient-to-r from-[#10184A] via-[#1A1860] to-[#2B1B75] text-white border-0 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-300">
              Welcome to Your Dream Home
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
              Hello, {profile.buyerName}
            </h1>
            <p className="text-xs text-purple-200 mt-1">
              Unit: <strong className="text-white">{booked.unitNo}</strong> • {booked.tower} • {booked.projectName}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/15">
                Target Possession: <strong>{booked.possessionTarget}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                Slab Casting 74% Complete
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <Link to="/customer/pay-online">
              <Button size="sm" className="h-10 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold gap-1.5 shadow-md">
                <IndianRupee className="size-4" /> Pay Next Installment
              </Button>
            </Link>
            <Link to="/customer/updates">
              <Button size="sm" variant="outline" className="h-10 px-4 border-white/20 text-white hover:bg-white/10 gap-1.5">
                <Camera className="size-4" /> Live Site Feed
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border border-border">
          <span className="text-xs font-medium text-text-secondary">Agreement Cost</span>
          <p className="text-xl font-bold text-foreground mt-1">
            ₹{(booked.totalCost / 100000).toFixed(2)} Lakh
          </p>
          <span className="text-[11px] text-text-muted mt-1 block">Super Area: {booked.superBuiltUpArea}</span>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <span className="text-xs font-medium text-text-secondary">Total Amount Paid</span>
          <p className="text-xl font-bold text-emerald-600 mt-1">
            ₹{(booked.amountPaid / 100000).toFixed(2)} Lakh
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">{paidPct}% Cleared</span>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <span className="text-xs font-medium text-text-secondary">Balance Due</span>
          <p className="text-xl font-bold text-foreground mt-1">
            ₹{(booked.balanceDue / 100000).toFixed(2)} Lakh
          </p>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 block">Construction Linked</span>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <span className="text-xs font-medium text-text-secondary">Relationship Manager</span>
          <p className="text-base font-bold text-foreground mt-1">{profile.relationshipManager.name}</p>
          <a
            href={`tel:${profile.relationshipManager.phone}`}
            className="text-[11px] text-brand hover:underline font-medium mt-1 flex items-center gap-1"
          >
            <PhoneCall className="size-3" /> {profile.relationshipManager.phone}
          </a>
        </Card>
      </div>

      {/* Two Columns: Payment Milestones & Latest Construction Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Payment Milestones Schedule</h3>
              <p className="text-xs text-text-secondary">Construction-linked installment progress</p>
            </div>
            <Link to="/customer/schedule" className="text-xs text-brand hover:underline font-medium">
              View Schedule
            </Link>
          </div>

          <div className="space-y-3">
            {schedule.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-foreground">{s.milestoneName}</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Due Date: {s.dueDate} • Share: {s.stagePercentage}%
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-foreground block">
                    ₹{(s.amountDue / 100000).toFixed(2)}L
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                      s.status === "Paid"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : s.status === "Due Now"
                        ? "bg-rose-500/10 text-rose-600"
                        : "bg-muted text-text-muted"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Live Site Construction Updates</h3>
              <p className="text-xs text-text-secondary">Latest photography and milestone verifications</p>
            </div>
            <Link to="/customer/updates" className="text-xs text-brand hover:underline font-medium">
              Full Gallery
            </Link>
          </div>

          <div className="space-y-3">
            {milestones.slice(0, 2).map((m) => (
              <div key={m.id} className="p-3 rounded-xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-foreground">{m.milestoneTitle}</h4>
                  <span className="text-[10px] text-text-muted">{m.updateDate}</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">{m.description}</p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="font-semibold text-brand">Milestone: {m.progressPercentage}% Complete</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
