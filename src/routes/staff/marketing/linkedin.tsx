import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Users, Briefcase, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/marketing/linkedin")({
  head: () => ({
    meta: [{ title: "LinkedIn B2B Marketing | Staff Portal" }],
  }),
  component: StaffLinkedinMarketingPage,
});

export function StaffLinkedinMarketingPage() {
  const campaigns = [
    { id: 1, name: "B2B Commercial Spaces & Corporate Offices", target: "C-Level, Investors (NCR)", leads: 38, quality: "High Value", status: "Active" },
    { id: 2, name: "NRI Investment in Vrindavan Real Estate", target: "Overseas Professionals (US, UAE)", leads: 52, quality: "Ultra HNI", status: "Active" },
    { id: 3, name: "Institutional Land Parcels", target: "Hospitality, Hospitals", leads: 12, quality: "Corporate", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="size-6 text-sky-700" />
            LinkedIn B2B & NRI Network
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Target high-net-worth individuals, NRIs, and institutional real estate investors.
          </p>
        </div>
        <Button
          onClick={() => toast.success("LinkedIn InMail sequence launched")}
          className="text-xs bg-sky-700 hover:bg-sky-800 text-white font-semibold flex items-center gap-1.5"
        >
          <PlusCircle className="size-4" />
          New InMail Sequence
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Target Reach</span>
          <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">28,400</div>
          <span className="text-[10px] text-sky-700 font-semibold">HNI & NRI Executives</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">InMail Response</span>
          <div className="text-xl sm:text-2xl font-extrabold text-blue-600 mt-1">34.2%</div>
          <span className="text-[10px] text-emerald-600 font-semibold">+8% Industry Benchmark</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">HNI Leads</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">102</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Min Ticket ₹50L+</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Pipeline Value</span>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-600 mt-1">₹8.4 Cr</div>
          <span className="text-[10px] text-purple-600 font-semibold">Under Negotiation</span>
        </Card>
      </div>

      <Card className="border rounded-xl">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">Active LinkedIn Investor Sequences</CardTitle>
          <CardDescription className="text-xs">Outreach targeted at NRI and corporate buyers</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-muted-foreground font-semibold">
                  <th className="pb-2">Campaign</th>
                  <th className="pb-2">Target Demographic</th>
                  <th className="pb-2">Leads</th>
                  <th className="pb-2">Lead Tier</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/40">
                    <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                    <td className="py-2.5 text-muted-foreground">{c.target}</td>
                    <td className="py-2.5 text-emerald-600 font-bold">{c.leads}</td>
                    <td className="py-2.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-800">
                        {c.quality}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
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
