import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/team-leader/marketing/facebook")({
  head: () => ({
    meta: [{ title: "Facebook & Instagram Lead Ads | Team Leader Portal" }],
  }),
  component: TeamLeaderFacebookMarketingPage,
});

export function TeamLeaderFacebookMarketingPage() {
  const campaigns = [
    { id: 1, name: "Vrindavan Elite Villas Instant Form Ad", reach: 64200, leads: 284, cpl: "₹210", formType: "Instant Lead Gen", status: "Active" },
    { id: 2, name: "Affordable Plots ₹15 Lakhs Carousel Ad", reach: 52100, leads: 215, cpl: "₹185", formType: "Instant Lead Gen", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Megaphone className="size-6 text-indigo-600" />
            Facebook &amp; Instagram Lead Ads
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time Meta Instant Form leads routed straight into your telecalling pipeline.
          </p>
        </div>
        <Button
          onClick={() => toast.success("Meta Lead Ads sync configured")}
          className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5"
        >
          <PlusCircle className="size-4" />
          Create Meta Campaign
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Total Meta Reach</span>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">116.3K</div>
          <span className="text-[10px] text-indigo-600 font-semibold">Jaipur + NCR Area</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Instant Form Leads</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">499</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Auto-Synced</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Average CPL</span>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-600 mt-1">₹198</div>
          <span className="text-[10px] text-purple-600 font-semibold">Cost Efficient</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Site Visits Booked</span>
          <div className="text-xl sm:text-2xl font-extrabold text-[#6732F2] mt-1">54</div>
          <span className="text-[10px] text-[#6732F2] font-semibold">10.8% Visit Ratio</span>
        </Card>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 border-b">
          <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
            Active Meta Ad Sets
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Inbound leads captured through Meta Instant Lead Forms.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Campaign Name</th>
                  <th className="px-4 py-3 text-center">People Reached</th>
                  <th className="px-4 py-3 text-center">Leads Captured</th>
                  <th className="px-4 py-3 text-center">Avg CPL</th>
                  <th className="px-4 py-3 text-center">Format</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/70">
                    <td className="px-4 py-3 font-bold text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-center font-bold">{c.reach.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-extrabold">{c.leads}</td>
                    <td className="px-4 py-3 text-center font-mono text-gray-700">{c.cpl}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{c.formType}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
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
