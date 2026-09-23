import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/marketing/whatsapp")({
  head: () => ({
    meta: [{ title: "WhatsApp Marketing Campaigns | Staff Portal" }],
  }),
  component: StaffWhatsappMarketingPage,
});

export function StaffWhatsappMarketingPage() {
  const campaigns = [
    { id: 1, name: "Vrindavan Phase-3 Launch Broadcast", sent: 2450, delivered: 2380, read: 1890, replies: 215, date: "2026-03-18", status: "Completed" },
    { id: 2, name: "Weekend Site Visit Shuttle Invite", sent: 1800, delivered: 1740, read: 1420, replies: 182, date: "2026-03-21", status: "Completed" },
    { id: 3, name: "Navratri Booking Special Discount", sent: 3200, delivered: 3100, read: 2450, replies: 280, date: "2026-03-22", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MessageSquare className="size-6 text-emerald-600" />
            WhatsApp Marketing
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Launch verified WhatsApp broadcasts, plot brochures, and customer follow-up blasts.
          </p>
        </div>
        <Button
          onClick={() => toast.success("Broadcast composer opened")}
          className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5"
        >
          <PlusCircle className="size-4" />
          Create Broadcast
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Total Sent</span>
          <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">7,450</div>
          <span className="text-[10px] text-emerald-600 font-semibold">97.8% Delivery</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Read Receipts</span>
          <div className="text-xl sm:text-2xl font-extrabold text-blue-600 mt-1">5,760</div>
          <span className="text-[10px] text-blue-600 font-semibold">77.3% Open Rate</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Inquiries Received</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">677</div>
          <span className="text-[10px] text-emerald-600 font-semibold">High Intent</span>
        </Card>
        <Card className="border rounded-xl p-3 bg-card shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground">Plot Bookings</span>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-600 mt-1">24</div>
          <span className="text-[10px] text-purple-600 font-semibold">Direct Attribution</span>
        </Card>
      </div>

      <Card className="border rounded-xl">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">Recent WhatsApp Outreaches</CardTitle>
          <CardDescription className="text-xs">Campaigns sent to verified buyer lists</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-muted-foreground font-semibold">
                  <th className="pb-2">Campaign Name</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Sent</th>
                  <th className="pb-2">Delivered</th>
                  <th className="pb-2">Replies</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/40">
                    <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                    <td className="py-2.5 text-muted-foreground">{c.date}</td>
                    <td className="py-2.5 text-foreground">{c.sent.toLocaleString()}</td>
                    <td className="py-2.5 text-emerald-600 font-medium">{c.delivered.toLocaleString()}</td>
                    <td className="py-2.5 text-blue-600 font-medium">{c.replies}</td>
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
