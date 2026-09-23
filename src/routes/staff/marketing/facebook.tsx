import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Users, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/marketing/facebook")({
  head: () => ({
    meta: [{ title: "Facebook Lead Ads | Staff Portal" }],
  }),
  component: StaffFacebookMarketingPage,
});

export function StaffFacebookMarketingPage() {
  const campaigns = [
    { id: 1, name: "Meta Lead Gen - 100-200 Gaj Plots", reach: 64000, leads: 284, cost_per_lead: "₹142", spend: "₹40,328", status: "Active" },
    { id: 2, name: "Carousel - Luxury Villa Elevations", reach: 38000, leads: 112, cost_per_lead: "₹189", spend: "₹21,168", status: "Active" },
    { id: 3, name: "Retargeting - Site Visit Drop-offs", reach: 14500, leads: 68, cost_per_lead: "₹115", spend: "₹7,820", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Megaphone className="size-6 text-blue-600" />
            Facebook & Instagram Lead Ads
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Meta Ads Manager sync for instant lead capture and auto-CRM assignment.
          </p>
        </div>
        <Button
          onClick={() => toast.success("Meta instant lead forms synced successfully")}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Sync Instant Forms
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Total Reach</span>
          <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">116.5K</div>
          <span className="text-[10px] text-blue-600 font-semibold">Meta Audience Network</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Form Submissions</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">464</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Verified Leads</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Avg Cost Per Lead</span>
          <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">₹149</div>
          <span className="text-[10px] text-emerald-600 font-semibold">-14% vs Industry</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Total Ad Spend</span>
          <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">₹69,316</div>
          <span className="text-[10px] text-muted-foreground">This Month</span>
        </Card>
      </div>

      <Card className="border rounded-xl">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">Active Meta Campaigns</CardTitle>
          <CardDescription className="text-xs">Instant Form submissions piped directly to staff</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-muted-foreground font-semibold">
                  <th className="pb-2">Campaign Name</th>
                  <th className="pb-2">Total Reach</th>
                  <th className="pb-2">Form Leads</th>
                  <th className="pb-2">CPL</th>
                  <th className="pb-2">Spend</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/40">
                    <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                    <td className="py-2.5 text-muted-foreground">{c.reach.toLocaleString()}</td>
                    <td className="py-2.5 text-emerald-600 font-bold">{c.leads}</td>
                    <td className="py-2.5 text-foreground">{c.cost_per_lead}</td>
                    <td className="py-2.5 text-muted-foreground">{c.spend}</td>
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
