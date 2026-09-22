import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, PlusCircle, TrendingUp, Building2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/admin/marketing/linkedin")({
  head: () => ({
    meta: [{ title: "LinkedIn B2B Lead Gen | Vrindavan ERP" }],
  }),
  component: AdminLinkedinMarketingPage,
});

export function AdminLinkedinMarketingPage() {
  const campaigns = [
    { id: 1, name: "NRI Commercial Space Investment Campaign", leads: 64, ctr: "3.8%", cpl: "₹850", status: "Active" },
    { id: 2, name: "Corporate Retail Outlets - Mathura Expressway", leads: 48, ctr: "4.2%", cpl: "₹920", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Linkedin className="size-6 text-blue-700" />
          LinkedIn B2B &amp; Commercial Real Estate Marketing
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Target HNIs, NRIs, and institutional retail investors for commercial plots and showroom spaces.
        </p>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3 text-center">CTR</th>
                <th className="px-4 py-3 text-center font-bold">B2B Leads</th>
                <th className="px-4 py-3 text-center">Cost Per Lead</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/70">
                  <td className="px-4 py-3 font-bold text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-center text-blue-600 font-semibold">{c.ctr}</td>
                  <td className="px-4 py-3 text-center font-bold text-gray-900">{c.leads}</td>
                  <td className="px-4 py-3 text-center font-mono text-emerald-600 font-semibold">{c.cpl}</td>
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
      </Card>
    </div>
  );
}
