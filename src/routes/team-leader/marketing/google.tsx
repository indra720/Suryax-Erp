import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Globe, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/team-leader/marketing/google")({
  head: () => ({
    meta: [{ title: "Google Search & Performance Max Ads | Team Leader Portal" }],
  }),
  component: TeamLeaderGoogleMarketingPage,
});

export function TeamLeaderGoogleMarketingPage() {
  const campaigns = [
    { id: 1, name: "Jaipur Plots Near Ring Road Search Ad", clicks: 4210, impressions: 48900, leads: 182, cpl: "₹340", status: "Active" },
    { id: 2, name: "Vrindavan Greens Luxury Villas P-Max", clicks: 3100, impressions: 38200, leads: 145, cpl: "₹420", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Globe className="size-6 text-blue-600" />
            Google Ads &amp; Search Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real estate buyer intent ads across Google Search, Maps, and YouTube.
          </p>
        </div>
        <Button
          onClick={() => toast.success("Google Ad composer launched")}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5"
        >
          <PlusCircle className="size-4" />
          Create Ad Campaign
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Total Impressions</span>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">87.1K</div>
          <span className="text-[10px] text-blue-600 font-semibold">High Visibility</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Clicks Generated</span>
          <div className="text-xl sm:text-2xl font-extrabold text-blue-600 mt-1">7,310</div>
          <span className="text-[10px] text-blue-600 font-semibold">8.4% CTR</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Inbound Leads</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">327</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Verified Phones</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Avg Cost Per Lead</span>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-600 mt-1">₹375</div>
          <span className="text-[10px] text-purple-600 font-semibold">Optimized Target</span>
        </Card>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 border-b">
          <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
            Active Google Ads Sets
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Performance metrics tracked through Google Ads API webhooks.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Ad Campaign</th>
                  <th className="px-4 py-3 text-center">Impressions</th>
                  <th className="px-4 py-3 text-center">Clicks</th>
                  <th className="px-4 py-3 text-center">Leads Generated</th>
                  <th className="px-4 py-3 text-center">Avg. CPL</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/70">
                    <td className="px-4 py-3 font-bold text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-center font-bold">{c.impressions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center text-blue-600 font-semibold">{c.clicks.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-extrabold">{c.leads}</td>
                    <td className="px-4 py-3 text-center font-mono text-gray-700">{c.cpl}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
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
