import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  PlusCircle,
  Send,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/marketing/whatsapp")({
  head: () => ({
    meta: [{ title: "WhatsApp Marketing Campaigns | Vrindavan ERP" }],
  }),
  component: AdminWhatsappMarketingPage,
});

export function AdminWhatsappMarketingPage() {
  const campaigns = [
    { id: 1, name: "Vrindavan Phase-3 Launch Offer", sent: 2450, delivered: 2380, read: 1890, replies: 215, date: "2026-03-18", status: "Completed" },
    { id: 2, name: "Weekend Free Site Visit Shuttle", sent: 1800, delivered: 1740, read: 1420, replies: 182, date: "2026-03-21", status: "Completed" },
    { id: 3, name: "Navratri Special Booking Discount", sent: 3200, delivered: 3100, read: 2450, replies: 280, date: "2026-03-22", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <MessageCircle className="size-6 text-emerald-600" />
            WhatsApp Marketing &amp; Broadcast
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Launch verified Meta WhatsApp Cloud broadcasts, brochures, and site visit invites.
          </p>
        </div>
        <Button
          onClick={() => toast.success("Campaign composer opened")}
          className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5"
        >
          <PlusCircle className="size-4" />
          Create Broadcast
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border rounded-xl p-3.5 bg-white shadow-xs">
          <span className="text-xs font-bold text-gray-500">Total Sent</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">7,450</div>
          <span className="text-[10px] text-emerald-600">97.8% Delivery</span>
        </Card>
        <Card className="border rounded-xl p-3.5 bg-white shadow-xs">
          <span className="text-xs font-bold text-gray-500">Read Receipts</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">5,760</div>
          <span className="text-[10px] text-blue-600">77.3% Open Rate</span>
        </Card>
        <Card className="border rounded-xl p-3.5 bg-white shadow-xs">
          <span className="text-xs font-bold text-gray-500">Direct Inquiries</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">677</div>
          <span className="text-[10px] text-emerald-600">High Intent</span>
        </Card>
        <Card className="border rounded-xl p-3.5 bg-white shadow-xs">
          <span className="text-xs font-bold text-gray-500">Bookings Converted</span>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">21</div>
          <span className="text-[10px] text-purple-600">₹4.8 Cr Value</span>
        </Card>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Campaign Name</th>
                <th className="px-4 py-3 text-center">Audience Sent</th>
                <th className="px-4 py-3 text-center">Delivered</th>
                <th className="px-4 py-3 text-center">Read</th>
                <th className="px-4 py-3 text-center">Replies</th>
                <th className="px-4 py-3">Broadcast Date</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/70">
                  <td className="px-4 py-3 font-bold text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-center font-bold">{c.sent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-emerald-600 font-semibold">{c.delivered.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-blue-600 font-semibold">{c.read.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-purple-600 font-bold">{c.replies}</td>
                  <td className="px-4 py-3 font-mono text-gray-500">{c.date}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
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
