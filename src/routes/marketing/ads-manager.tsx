import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  RefreshCw,
  Plus,
  Play,
  Pause,
  ArrowUpRight,
  Sliders,
  DollarSign,
  TrendingUp,
  Target,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/ads-manager")({
  head: () => ({
    meta: [
      { title: "Ads Manager (Google, Meta, 99acres) | Vrindavan Marketing" },
      { name: "description", content: "Cross-platform ad operations and live bidding telemetry." },
    ],
  }),
  component: AdsManagerPage,
});

export function AdsManagerPage() {
  const [adSets, setAdSets] = useState([
    {
      id: "AD-01",
      name: "Search - Vrindavan Heights Luxury Flats",
      platform: "Google Ads",
      dailyBudget: 12000,
      spendMTD: 284000,
      impressions: 142000,
      clicks: 8400,
      ctr: "5.9%",
      cpl: 410,
      leads: 692,
      active: true,
    },
    {
      id: "AD-02",
      name: "Meta Lead Gen - 4BHK Forest Villas Video",
      platform: "Meta (FB/IG)",
      dailyBudget: 9500,
      spendMTD: 245000,
      impressions: 280000,
      clicks: 12100,
      ctr: "4.3%",
      cpl: 380,
      leads: 645,
      active: true,
    },
    {
      id: "AD-03",
      name: "99acres Banner & Top Slot - Gomti Nagar",
      platform: "99acres",
      dailyBudget: 6000,
      spendMTD: 165000,
      impressions: 89000,
      clicks: 4200,
      ctr: "4.7%",
      cpl: 343,
      leads: 480,
      active: true,
    },
    {
      id: "AD-04",
      name: "MagicBricks Featured Project Spotlight",
      platform: "MagicBricks",
      dailyBudget: 5000,
      spendMTD: 130000,
      impressions: 64000,
      clicks: 3100,
      ctr: "4.8%",
      cpl: 420,
      leads: 310,
      active: false,
    },
    {
      id: "AD-05",
      name: "LinkedIn InMail B2B Commercial Real Estate",
      platform: "LinkedIn",
      dailyBudget: 8000,
      spendMTD: 210000,
      impressions: 45000,
      clicks: 1800,
      ctr: "4.0%",
      cpl: 673,
      leads: 312,
      active: true,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newAdSet, setNewAdSet] = useState({
    name: "",
    platform: "Google Ads",
    dailyBudget: 8000,
    targetAudience: "HNIs in Lucknow & NCR (Age 32-58)",
    objective: "Lead Generation",
    targetCpl: 450,
  });

  const toggleAd = (id: string) => {
    setAdSets(adSets.map((ad) => (ad.id === id ? { ...ad, active: !ad.active } : ad)));
    toast.success("Ad set status updated");
  };

  const handleCreateAdSet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdSet.name) {
      toast.error("Please enter ad set name");
      return;
    }
    const created = {
      id: `AD-0${adSets.length + 1}`,
      name: newAdSet.name,
      platform: newAdSet.platform,
      dailyBudget: Number(newAdSet.dailyBudget),
      spendMTD: 0,
      impressions: 0,
      clicks: 0,
      ctr: "0.0%",
      cpl: Number(newAdSet.targetCpl),
      leads: 0,
      active: true,
    };
    setAdSets([created, ...adSets]);
    toast.success(`Ad Set "${created.name}" launched on ${created.platform}!`);
    setModalOpen(false);
    setNewAdSet({
      name: "",
      platform: "Google Ads",
      dailyBudget: 8000,
      targetAudience: "HNIs in Lucknow & NCR (Age 32-58)",
      objective: "Lead Generation",
      targetCpl: 450,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <BarChart3 className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Cross-Platform Ads Manager
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Unified bidding, budget allocation and real-time impression telemetry across Google,
            Meta, 99acres and MagicBricks.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Connected Ad Accounts refreshed")}
            className="flex-1 sm:flex-none h-9 gap-1.5 text-xs rounded-xl justify-center"
          >
            <RefreshCw className="size-3.5" /> Sync Accounts
          </Button>
          <Button
            size="sm"
            onClick={() => setModalOpen(true)}
            className="flex-1 sm:flex-none h-9 gap-1.5 text-xs bg-brand text-white shadow-sm rounded-xl justify-center"
          >
            <Plus className="size-3.5" /> Create Ad Set
          </Button>
        </div>
      </div>

      {/* Network Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        <Card className="p-3.5 sm:p-4 bg-card border border-border">
          <span className="text-xs text-text-secondary font-medium">Google Ads Account</span>
          <p className="text-lg sm:text-xl font-bold text-foreground mt-1">₹2,84,000 Spent</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live & Optimizing
          </span>
        </Card>

        <Card className="p-3.5 sm:p-4 bg-card border border-border">
          <span className="text-xs text-text-secondary font-medium">Meta Ads (FB/IG)</span>
          <p className="text-lg sm:text-xl font-bold text-foreground mt-1">₹2,45,000 Spent</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> 645 Leads
          </span>
        </Card>

        <Card className="p-3.5 sm:p-4 bg-card border border-border">
          <span className="text-xs text-text-secondary font-medium">99acres Developer Suite</span>
          <p className="text-lg sm:text-xl font-bold text-foreground mt-1">₹1,65,000 Spent</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> High Intent Verified
          </span>
        </Card>

        <Card className="p-3.5 sm:p-4 bg-card border border-border">
          <span className="text-xs text-text-secondary font-medium">MagicBricks Portal</span>
          <p className="text-lg sm:text-xl font-bold text-foreground mt-1">₹1,30,000 Spent</p>
          <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
            <span className="size-1.5 rounded-full bg-amber-500" /> Slot Renewal Due
          </span>
        </Card>
      </div>

      {/* Ad Sets Table */}
      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-xs sm:text-sm font-semibold text-foreground">Active Paid Ad Sets</h2>
          <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
        </div>
        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left min-w-[950px] whitespace-nowrap">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Status</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Ad Set Name</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Platform</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Daily Budget</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Spend MTD</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Impressions</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Clicks</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">CTR</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Leads</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Avg CPL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {adSets.map((ad) => (
                <tr key={ad.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <button
                      onClick={() => toggleAd(ad.id)}
                      className={`size-6 rounded-full flex items-center justify-center transition-colors ${
                        ad.active
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-muted text-text-muted hover:bg-muted/80"
                      }`}
                      title={ad.active ? "Pause Ad Set" : "Resume Ad Set"}
                    >
                      {ad.active ? (
                        <Play className="size-3 fill-current" />
                      ) : (
                        <Pause className="size-3 fill-current" />
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className="font-semibold block">{ad.name}</span>
                    <span className="text-[10px] text-text-muted">{ad.id}</span>
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {ad.platform}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    ₹{ad.dailyBudget.toLocaleString()}/day
                  </td>
                  <td className="py-3 px-3.5 text-text-secondary whitespace-nowrap">
                    ₹{ad.spendMTD.toLocaleString()}
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    {ad.impressions.toLocaleString()}
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">{ad.clicks.toLocaleString()}</td>
                  <td className="py-3 px-3.5 font-semibold text-emerald-600 whitespace-nowrap">
                    {ad.ctr}
                  </td>
                  <td className="py-3 px-3.5 font-bold text-foreground whitespace-nowrap">
                    {ad.leads}
                  </td>
                  <td className="py-3 px-3.5 font-bold text-brand whitespace-nowrap">₹{ad.cpl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Ad Set Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <BarChart3 className="size-5 text-brand" /> Create New Advertising Set
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateAdSet} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Ad Set Name</Label>
                <Input
                  required
                  placeholder="e.g. Meta Reels - NRI Luxury Villa Campaign"
                  value={newAdSet.name}
                  onChange={(e) => setNewAdSet({ ...newAdSet, name: e.target.value })}
                  className="h-10 text-xs sm:text-sm rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                    Advertising Network
                  </Label>
                  <Select
                    value={newAdSet.platform}
                    onValueChange={(val) => setNewAdSet({ ...newAdSet, platform: val })}
                  >
                    <SelectTrigger className="h-10 text-xs sm:text-sm rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Google Ads">Google Search / Display</SelectItem>
                      <SelectItem value="Meta (FB/IG)">Meta (Facebook / Instagram)</SelectItem>
                      <SelectItem value="99acres">99acres Developer Suite</SelectItem>
                      <SelectItem value="MagicBricks">MagicBricks Verified</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn InMail B2B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                    Campaign Objective
                  </Label>
                  <Select
                    value={newAdSet.objective}
                    onValueChange={(val) => setNewAdSet({ ...newAdSet, objective: val })}
                  >
                    <SelectTrigger className="h-10 text-xs sm:text-sm rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lead Generation">Instant Lead Forms</SelectItem>
                      <SelectItem value="Website Visits">Landing Page Clicks</SelectItem>
                      <SelectItem value="Site Visit Booking">Site Visit Drive</SelectItem>
                      <SelectItem value="Brand Awareness">Video Views / Reach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                    Daily Budget Limit (₹)
                  </Label>
                  <Input
                    type="number"
                    min={1000}
                    step={500}
                    required
                    value={newAdSet.dailyBudget}
                    onChange={(e) =>
                      setNewAdSet({ ...newAdSet, dailyBudget: Number(e.target.value) })
                    }
                    className="h-10 text-xs sm:text-sm rounded-xl"
                  />
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                    Target CPL Ceiling (₹)
                  </Label>
                  <Input
                    type="number"
                    value={newAdSet.targetCpl}
                    onChange={(e) =>
                      setNewAdSet({ ...newAdSet, targetCpl: Number(e.target.value) })
                    }
                    className="h-10 text-xs sm:text-sm rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                  Target Geo & Demographics
                </Label>
                <Input
                  value={newAdSet.targetAudience}
                  onChange={(e) => setNewAdSet({ ...newAdSet, targetAudience: e.target.value })}
                  className="h-10 text-xs sm:text-sm rounded-xl"
                  placeholder="e.g. Lucknow, Kanpur, Delhi NCR (Income > ₹25L/yr)"
                />
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)} className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto">
                Deploy Ad Set
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
