import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Globe, PlusCircle, TrendingUp, Search, MousePointerClick, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/marketing/google")({
  head: () => ({
    meta: [{ title: "Google Ads Campaigns | Vrindavan ERP" }],
  }),
  component: AdminGoogleMarketingPage,
});

export function AdminGoogleMarketingPage() {
  const campaigns = [
    { id: 1, name: "Vrindavan Luxury Plots Search Ads", clicks: 3420, impressions: 45000, ctr: "7.6%", cpc: "₹18.4", cost: "₹62,928", leads: 184 },
    { id: 2, name: "Mathura Highway Villa Display Network", clicks: 2190, impressions: 82000, ctr: "2.6%", cpc: "₹11.2", cost: "₹24,528", leads: 92 },
    { id: 3, name: "NRI Vrindavan Temple Corridor Brand", clicks: 1450, impressions: 31000, ctr: "4.6%", cpc: "₹24.0", cost: "₹34,800", leads: 112 },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Globe className="size-6 text-blue-600" />
          Google Ads &amp; Search Engine Marketing
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Track Google Search, Performance Max &amp; YouTube ad conversions into CRM leads.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border rounded-xl p-3.5 bg-white shadow-xs">
          <span className="text-xs font-bold text-gray-500">Total Ad Spend</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">₹1,22,256</div>
          <span className="text-[10px] text-gray-500">Past 30 days</span>
        </Card>
        <Card className="border rounded-xl p-3.5 bg-white shadow-xs">
          <span className="text-xs font-bold text-gray-500">Inbound Leads</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">388</div>
          <span className="text-[10px] text-emerald-600 font-semibold">₹315 Avg CPL</span>
        </Card>
        <Card className="border rounded-xl p-3.5 bg-white shadow-xs">
          <span className="text-xs font-bold text-gray-500">Total Ad Clicks</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">7,060</div>
          <span className="text-[10px] text-emerald-600">5.2% Avg CTR</span>
        </Card>
        <Card className="border rounded-xl p-3.5 bg-white shadow-xs">
          <span className="text-xs font-bold text-gray-500">Confirmed Sales</span>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">14 Units</div>
          <span className="text-[10px] text-purple-600 font-semibold">ROAS: 18.5x</span>
        </Card>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Campaign Name</th>
                <th className="px-4 py-3 text-center">Impressions</th>
                <th className="px-4 py-3 text-center">Clicks</th>
                <th className="px-4 py-3 text-center">CTR</th>
                <th className="px-4 py-3 text-center">Cost</th>
                <th className="px-4 py-3 text-center font-bold">Leads Generated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/70">
                  <td className="px-4 py-3 font-bold text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{c.impressions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center font-bold text-gray-800">{c.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-blue-600 font-semibold">{c.ctr}</td>
                  <td className="px-4 py-3 text-center font-mono font-semibold text-gray-700">{c.cost}</td>
                  <td className="px-4 py-3 text-center font-bold text-emerald-600">{c.leads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
