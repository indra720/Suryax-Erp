import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/team-leader/marketing/linkedin")({
  head: () => ({
    meta: [{ title: "LinkedIn B2B Commercial & NRI Lead Ads | Team Leader Portal" }],
  }),
  component: TeamLeaderLinkedInMarketingPage,
});

export function TeamLeaderLinkedInMarketingPage() {
  const campaigns = [
    { id: 1, name: "NRI Commercial Space Investment Showcase", impressions: 24500, clicks: 1420, leads: 58, cpl: "₹820", status: "Active" },
    { id: 2, name: "Vrindavan High-Street Retail Outlets Ad", impressions: 18200, clicks: 980, leads: 42, cpl: "₹910", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Briefcase className="size-6 text-sky-700" />
            LinkedIn B2B &amp; Commercial Leads
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Target high net-worth professionals, corporate investors, and NRI commercial real estate buyers.
          </p>
        </div>
        <Button
          onClick={() => toast.success("LinkedIn Campaign created")}
          className="text-xs bg-sky-700 hover:bg-sky-800 text-white font-semibold flex items-center gap-1.5"
        >
          <PlusCircle className="size-4" />
          Create B2B Ad
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">B2B Impressions</span>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">42.7K</div>
          <span className="text-[10px] text-sky-700 font-semibold">C-Suite &amp; NRIs</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Form Submissions</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">100</div>
          <span className="text-[10px] text-emerald-600 font-semibold">High Ticket</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Commercial Inquiries</span>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-600 mt-1">36</div>
          <span className="text-[10px] text-purple-600 font-semibold">Retail &amp; Office</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Deal Pipeline</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1">₹8.5 Cr</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Projected Closure</span>
        </Card>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 border-b">
          <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
            Active LinkedIn Sponsored Inquiries
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Corporate lead generation tracked via LinkedIn Campaign Manager.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Campaign Target</th>
                  <th className="px-4 py-3 text-center">Impressions</th>
                  <th className="px-4 py-3 text-center">Clicks</th>
                  <th className="px-4 py-3 text-center">Inquiries</th>
                  <th className="px-4 py-3 text-center">Avg CPL</th>
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
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
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
