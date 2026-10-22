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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <Target className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Lead Sources & Attribution
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Multi-touch channel attribution, CPL breakdown, and instant UTM campaign tracking generator.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exported Lead Sources (CSV)")}
            className="flex-1 sm:flex-none h-9 px-3 gap-1.5 text-xs rounded-xl justify-center"
          >
            <Download className="size-3.5" /> Export Data
          </Button>
          <Button
            size="sm"
            onClick={() => setUtmModal(true)}
            className="flex-1 sm:flex-none h-9 px-3.5 gap-1.5 text-xs bg-brand hover:bg-brand/90 text-white rounded-xl shadow-sm justify-center"
          >
            <Link2 className="size-3.5" /> UTM Link Builder
          </Button>
        </div>
      </div>

      {/* Sources Table */}
      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h2 className="text-xs sm:text-sm font-semibold text-foreground">Attribution Channel Performance</h2>
            <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8.5 sm:h-9 text-xs rounded-xl"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[950px] whitespace-nowrap">
            <thead className="bg-muted/70 text-text-secondary uppercase tracking-wider text-[11px] font-semibold border-b border-border">
              <tr>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Source Name</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Category</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Total Leads</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Cost Per Lead (CPL)</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Site Visits</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Confirmed Bookings</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Conversion Rate</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground whitespace-nowrap">{s.name}</td>
                  <td className="py-3 px-4 text-text-secondary whitespace-nowrap">{s.category}</td>
                  <td className="py-3 px-4 font-bold text-foreground whitespace-nowrap text-right">{s.leads.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold whitespace-nowrap text-right">
                    {s.cpl > 0 ? `₹${s.cpl}` : "Organic / Free"}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">{s.visits.toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold text-brand whitespace-nowrap text-right">{s.bookings}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-600 whitespace-nowrap text-right">{s.conversion}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-center">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
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
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <span className="p-2 rounded-xl bg-brand/10 text-brand">
                <Link2 className="size-5" />
              </span>
              UTM Campaign URL Generator
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Create trackable URLs with custom parameters for digital campaigns, affiliates, and social media.
            </p>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
            <div>
              <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Destination Page URL</Label>
              <Input
                value={utmData.targetUrl}
                onChange={(e) => setUtmData({ ...utmData, targetUrl: e.target.value })}
                className="h-10 sm:h-11 text-sm rounded-xl"
                placeholder="https://vrindavanerp.com/projects/vrindavan-heights"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Campaign Source</Label>
                <Input
                  value={utmData.source}
                  onChange={(e) => setUtmData({ ...utmData, source: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. google, meta, 99acres"
                />
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Campaign Medium</Label>
                <Input
                  value={utmData.medium}
                  onChange={(e) => setUtmData({ ...utmData, medium: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. cpc, banner, email"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Campaign Name</Label>
              <Input
                value={utmData.campaignName}
                onChange={(e) => setUtmData({ ...utmData, campaignName: e.target.value })}
                className="h-10 sm:h-11 text-sm rounded-xl"
                placeholder="e.g. akshaya-tritiya-2026"
              />
            </div>

            <div className="p-4 bg-muted/60 rounded-xl border border-border">
              <span className="text-xs font-semibold text-text-secondary block mb-1.5">Generated Tracking Link:</span>
              <p className="text-xs sm:text-sm font-mono break-all text-brand select-all bg-card p-3 rounded-lg border border-border/80">{generatedUrl}</p>
            </div>
          </div>

          <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
            <Button variant="outline" size="default" onClick={() => setUtmModal(false)} className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
              Close
            </Button>
            <Button size="default" onClick={copyUrl} className="bg-brand hover:bg-brand/90 text-white gap-2 rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto">
              <Copy className="size-4" /> Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
