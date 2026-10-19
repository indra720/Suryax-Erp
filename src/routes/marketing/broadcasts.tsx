import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Send,
  Plus,
  MessageSquare,
  Mail,
  Smartphone,
  CheckCircle,
  Clock,
  Eye,
  Download,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/broadcasts")({
  head: () => ({
    meta: [
      { title: "Broadcast Marketing (Email/SMS/WA) | Vrindavan Marketing" },
      { name: "description", content: "Direct outreach campaigns via WhatsApp, SMS and Email." },
    ],
  }),
  component: BroadcastsPage,
});

export function BroadcastsPage() {
  const [broadcasts, setBroadcasts] = useState([
    { id: "BC-101", name: "Weekend Site Visit Free Cab Invitation", channel: "WhatsApp", recipients: 4200, delivered: 4120, read: 3480, responseRate: "14.2%", date: "2026-04-16", status: "Completed" },
    { id: "BC-102", name: "Gomti Nagar Commercial Tower Price Revision Notice", channel: "Email", recipients: 8500, delivered: 8320, read: 2940, responseRate: "6.8%", date: "2026-04-14", status: "Completed" },
    { id: "BC-103", name: "Flash SMS: Akshaya Tritiya Booking Benefits Ending", channel: "SMS", recipients: 12000, delivered: 11840, read: 7200, responseRate: "4.1%", date: "2026-04-12", status: "Completed" },
    { id: "BC-104", name: "Vrindavan Grandeur Tower A RERA Approval Update", channel: "WhatsApp", recipients: 3100, delivered: 3080, read: 2890, responseRate: "18.5%", date: "2026-04-10", status: "Completed" },
  ]);

  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    channel: "WhatsApp",
    targetGroup: "Hot Leads (Interested)",
    message: "",
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please enter broadcast name");
      return;
    }
    const item = {
      id: `BC-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      channel: formData.channel,
      recipients: 2500,
      delivered: 2500,
      read: 0,
      responseRate: "0%",
      date: "2026-04-19",
      status: "In Progress",
    };
    setBroadcasts([item, ...broadcasts]);
    toast.success("Broadcast dispatched to queue!");
    setModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Send className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Direct Broadcasts (WhatsApp, Email & SMS)
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            High-deliverability direct messaging, lead nurturing workflows, and real-time read rate telemetry.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setModal(true)}
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> New Broadcast Campaign
        </Button>
      </div>

      {/* Broadcast Performance Table */}
      <Card className="p-5 bg-card border border-border shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Broadcast Campaign History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Campaign Name</th>
                <th className="py-2.5 px-3 font-semibold">Channel</th>
                <th className="py-2.5 px-3 font-semibold">Audience</th>
                <th className="py-2.5 px-3 font-semibold">Delivered</th>
                <th className="py-2.5 px-3 font-semibold">Read Rate</th>
                <th className="py-2.5 px-3 font-semibold">Response Rate</th>
                <th className="py-2.5 px-3 font-semibold">Date Sent</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {broadcasts.map((b) => (
                <tr key={b.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-foreground block">{b.name}</span>
                    <span className="text-[10.5px] text-text-muted">{b.id}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {b.channel}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{b.recipients.toLocaleString()} Leads</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">{b.delivered.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">{b.read.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-bold text-brand">{b.responseRate}</td>
                  <td className="py-2.5 px-3 text-text-muted">{b.date}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="max-w-md bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Send className="size-4 text-brand" /> Launch Broadcast
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSend} className="space-y-3 py-2 text-xs">
            <div>
              <Label className="text-xs">Broadcast Title</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-8 text-xs mt-1"
                placeholder="e.g. Special Villa Invitation"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Channel</Label>
                <Select
                  value={formData.channel}
                  onValueChange={(val) => setFormData({ ...formData, channel: val })}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp Official</SelectItem>
                    <SelectItem value="SMS">Promotional SMS</SelectItem>
                    <SelectItem value="Email">Email Newsletter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Target Segment</Label>
                <Select
                  value={formData.targetGroup}
                  onValueChange={(val) => setFormData({ ...formData, targetGroup: val })}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hot Leads (Interested)">Hot Leads (Interested)</SelectItem>
                    <SelectItem value="Past Site Visitors">Past Site Visitors</SelectItem>
                    <SelectItem value="All Unconverted Leads">All Unconverted Leads</SelectItem>
                    <SelectItem value="Channel Partner Network">Channel Partner Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-xs">Message Template Copy</Label>
              <Textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Namaste {{name}}, Special invitation from Vrindavan Developers..."
                className="text-xs mt-1"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Queue & Send
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
