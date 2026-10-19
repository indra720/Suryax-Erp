import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Target,
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  Sparkles,
  Link2,
  CheckCircle,
  Copy,
} from "lucide-react";
import { initialLeadSources } from "@/lib/services/marketing";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/lead-sources")({
  head: () => ({
    meta: [
      { title: "Lead Sources & Tracking | Vrindavan Marketing" },
      { name: "description", content: "Channel attribution, UTM tracking and source efficiency." },
    ],
  }),
  component: LeadSourcesPage,
});

export function LeadSourcesPage() {
  const [sources, setSources] = useState([
    { id: "SRC-01", name: "Google Search (High Intent)", category: "Search Ads", leads: 980, cpl: 460, visits: 142, bookings: 38, conversion: "3.8%", status: "Active" },
    { id: "SRC-02", name: "Meta Lead Forms (Instagram/FB)", category: "Social Ads", leads: 750, cpl: 380, visits: 94, bookings: 21, conversion: "2.8%", status: "Active" },
    { id: "SRC-03", name: "99acres Premium Showcase", category: "Property Portal", leads: 340, cpl: 410, visits: 52, bookings: 12, conversion: "3.5%", status: "Active" },
    { id: "SRC-04", name: "MagicBricks Platinum Listing", category: "Property Portal", leads: 220, cpl: 430, visits: 38, bookings: 9, conversion: "4.1%", status: "Active" },
    { id: "SRC-05", name: "WhatsApp Broadcast Opt-in", category: "Direct Messaging", leads: 340, cpl: 180, visits: 68, bookings: 16, conversion: "4.7%", status: "Active" },
    { id: "SRC-06", name: "Channel Partner / Broker Referrals", category: "Network", leads: 180, cpl: 0, visits: 86, bookings: 24, conversion: "13.3%", status: "Active" },
    { id: "SRC-07", name: "Direct Site Office Walk-in", category: "Direct", leads: 120, cpl: 0, visits: 120, bookings: 18, conversion: "15.0%", status: "Active" },
  ]);

  const [search, setSearch] = useState("");
  const [utmModal, setUtmModal] = useState(false);
  const [utmData, setUtmData] = useState({
    campaignName: "akshaya-tritiya-2026",
    source: "google",
    medium: "cpc",
    targetUrl: "https://vrindavanerp.com/projects/vrindavan-heights",
  });

  const generatedUrl = `${utmData.targetUrl}?utm_source=${utmData.source}&utm_medium=${utmData.medium}&utm_campaign=${utmData.campaignName}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast.success("UTM tracking URL copied to clipboard!");
  };

  const filtered = sources.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Target className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Lead Sources & Attribution
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Multi-touch channel attribution, CPL breakdown, and instant UTM campaign tracking generator.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exported Lead Sources (CSV)")}
            className="h-9 gap-1.5 text-xs"
          >
            <Download className="size-3.5" /> Export Data
          </Button>
          <Button
            size="sm"
            onClick={() => setUtmModal(true)}
            className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
          >
            <Link2 className="size-3.5" /> UTM Link Builder
          </Button>
        </div>
      </div>

      {/* Sources Table */}
      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Attribution Channel Performance</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Source Name</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Total Leads</th>
                <th className="py-2.5 px-3 font-semibold">Cost Per Lead (CPL)</th>
                <th className="py-2.5 px-3 font-semibold">Site Visits</th>
                <th className="py-2.5 px-3 font-semibold">Confirmed Bookings</th>
                <th className="py-2.5 px-3 font-semibold">Conversion Rate</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 font-semibold">{s.name}</td>
                  <td className="py-2.5 px-3 text-text-secondary">{s.category}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">{s.leads}</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">
                    {s.cpl > 0 ? `₹${s.cpl}` : "Organic / Free"}
                  </td>
                  <td className="py-2.5 px-3">{s.visits}</td>
                  <td className="py-2.5 px-3 font-bold text-brand">{s.bookings}</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-600">{s.conversion}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* UTM Builder Dialog */}
      <Dialog open={utmModal} onOpenChange={setUtmModal}>
        <DialogContent className="max-w-md bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Link2 className="size-4 text-brand" /> UTM Campaign URL Generator
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div>
              <Label className="text-xs">Destination Page URL</Label>
              <Input
                value={utmData.targetUrl}
                onChange={(e) => setUtmData({ ...utmData, targetUrl: e.target.value })}
                className="h-8 text-xs mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Campaign Source</Label>
                <Input
                  value={utmData.source}
                  onChange={(e) => setUtmData({ ...utmData, source: e.target.value })}
                  className="h-8 text-xs mt-1"
                  placeholder="e.g. google, meta, 99acres"
                />
              </div>
              <div>
                <Label className="text-xs">Campaign Medium</Label>
                <Input
                  value={utmData.medium}
                  onChange={(e) => setUtmData({ ...utmData, medium: e.target.value })}
                  className="h-8 text-xs mt-1"
                  placeholder="e.g. cpc, banner, email"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Campaign Name</Label>
              <Input
                value={utmData.campaignName}
                onChange={(e) => setUtmData({ ...utmData, campaignName: e.target.value })}
                className="h-8 text-xs mt-1"
              />
            </div>

            <div className="p-3 bg-muted rounded-md border border-border">
              <span className="text-[11px] font-semibold text-text-secondary block mb-1">Generated Tracking Link:</span>
              <p className="text-[11px] font-mono break-all text-brand select-all">{generatedUrl}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setUtmModal(false)}>
              Close
            </Button>
            <Button size="sm" onClick={copyUrl} className="bg-brand text-white gap-1.5">
              <Copy className="size-3.5" /> Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
