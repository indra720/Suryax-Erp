import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Globe, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/marketing/google")({
  head: () => ({
    meta: [{ title: "Google Ads Campaigns | Staff Portal" }],
  }),
  component: StaffGoogleMarketingPage,
});

export function StaffGoogleMarketingPage() {
  const campaigns = [
    { id: 1, name: "Search - Vrindavan Greens Plots", impressions: 45200, clicks: 3120, leads: 142, cpc: "₹18.40", status: "Active" },
    { id: 2, name: "Performance Max - Luxury Villas", impressions: 89000, clicks: 4210, leads: 198, cpc: "₹24.10", status: "Active" },
    { id: 3, name: "Display - Gated Community Vrindavan", impressions: 120000, clicks: 2450, leads: 64, cpc: "₹8.20", status: "Paused" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Globe className="size-6 text-blue-600" />
            Google Ads Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Search, Display, and Performance Max campaigns driving inbound leads.
          </p>
        </div>
        <Button
          onClick={() => toast.info("Google Ads sync updated.")}
          variant="outline"
          className="text-xs font-semibold"
        >
          Sync Campaign Data
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Total Impressions</span>
          <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">254.2K</div>
          <span className="text-[10px] text-emerald-600 font-semibold">+18.4% WoW</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Total Clicks</span>
          <div className="text-xl sm:text-2xl font-extrabold text-blue-600 mt-1">9,780</div>
          <span className="text-[10px] text-blue-600 font-semibold">3.85% Avg CTR</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Inbound Leads</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">404</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Avg CPL ₹182</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Monthly Ad Spend</span>
          <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">₹73,500</div>
          <span className="text-[10px] text-muted-foreground">Budget: ₹90,000</span>
        </Card>
      </div>

      <Card className="border rounded-xl">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">Live Google Ad Campaigns</CardTitle>
          <CardDescription className="text-xs">Real-time stats from connected Google Ads accounts</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-muted-foreground font-semibold">
                  <th className="pb-2">Campaign</th>
                  <th className="pb-2">Impressions</th>
                  <th className="pb-2">Clicks</th>
                  <th className="pb-2">Leads</th>
                  <th className="pb-2">Avg CPC</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/40">
                    <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                    <td className="py-2.5 text-muted-foreground">{c.impressions.toLocaleString()}</td>
                    <td className="py-2.5 text-foreground">{c.clicks.toLocaleString()}</td>
                    <td className="py-2.5 text-emerald-600 font-bold">{c.leads}</td>
                    <td className="py-2.5 text-muted-foreground">{c.cpc}</td>
                    <td className="py-2.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        c.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
