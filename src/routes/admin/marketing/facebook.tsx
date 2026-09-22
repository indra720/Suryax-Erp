import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Facebook, PlusCircle, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/admin/marketing/facebook")({
  head: () => ({
    meta: [{ title: "Facebook Lead Ads | Vrindavan ERP" }],
  }),
  component: AdminFacebookMarketingPage,
});

export function AdminFacebookMarketingPage() {
  const forms = [
    { id: 1, name: "Meta Instant Form - Vrindavan Villas", leads: 412, syncStatus: "Connected & Active", cpl: "₹185", date: "Today" },
    { id: 2, name: "Instagram Carousel - Plot Booking 500 Sq.Yd", leads: 268, syncStatus: "Connected & Active", cpl: "₹220", date: "Yesterday" },
    { id: 3, name: "Retargeting Form - Site Visit Attendees", leads: 95, syncStatus: "Connected & Active", cpl: "₹140", date: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Facebook className="size-6 text-blue-600" />
          Facebook &amp; Instagram Meta Lead Ads
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Real-time webhook synchronization for Meta Instant Lead generation forms into branch telecallers.
        </p>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Instant Form / Ad Campaign</th>
                <th className="px-4 py-3 text-center font-bold">Leads Synced</th>
                <th className="px-4 py-3 text-center">Cost Per Lead (CPL)</th>
                <th className="px-4 py-3 text-center">Webhook Status</th>
                <th className="px-4 py-3">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {forms.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50/70">
                  <td className="px-4 py-3 font-bold text-gray-900">{f.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">{f.leads}</td>
                  <td className="px-4 py-3 text-center font-mono text-emerald-600 font-semibold">{f.cpl}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      <CheckCircle className="size-3" />
                      {f.syncStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono">{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
