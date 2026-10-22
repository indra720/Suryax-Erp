import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  HelpCircle,
  Send,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { customerService, type CustomerTicket } from "@/lib/services/customer";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/support")({
  head: () => ({
    meta: [
      { title: "Customer Care & Service Desk | Vrindavan Customer" },
      { name: "description", content: "Raise service requests, modification inquiries, and loan disbursement assistance." },
    ],
  }),
  component: CustomerSupportPage,
});

export function CustomerSupportPage() {
  const [tickets, setTickets] = useState<CustomerTicket[]>(customerService.getTickets());
  const [modalOpen, setModalOpen] = useState(false);

  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "Payment Query" as CustomerTicket["category"],
    priority: "Medium" as CustomerTicket["priority"],
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject) {
      toast.error("Please enter request subject");
      return;
    }
    const created: CustomerTicket = {
      id: `TCK-${Date.now().toString().slice(-3)}`,
      ticketCode: `REQ-VRN-${Date.now().toString().slice(-4)}`,
      subject: newTicket.subject,
      category: newTicket.category,
      priority: newTicket.priority,
      status: "Open",
      createdOn: new Date().toISOString().slice(0, 10),
      lastReply: "Ticket assigned to your Relationship Manager Rajesh Malhotra.",
    };
    setTickets([created, ...tickets]);
    toast.success(`Service ticket ${created.ticketCode} raised successfully!`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <MessageSquare className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Customer Support & Grievance Desk
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Interior modifications, bank loan tranche inquiries, and possession snag lists.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Raise New Request
        </Button>
      </div>

      <div className="space-y-3">
        {tickets.map((t) => (
          <Card key={t.id} className="p-5 bg-card border border-border space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-brand font-bold">{t.ticketCode}</span>
                <h3 className="text-sm font-bold text-foreground mt-0.5">{t.subject}</h3>
                <span className="text-[10px] text-text-muted mt-0.5 block">
                  Category: {t.category} • Created: {t.createdOn}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  t.status === "Resolved"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-blue-500/10 text-blue-600"
                }`}
              >
                {t.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 text-xs text-text-secondary">
              <p className="font-semibold text-foreground">Support Response:</p>
              <p className="mt-0.5">{t.lastReply}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Ticket Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              Raise New Customer Service Ticket
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Submit your query, construction customization request, or payment clarification to your relationship manager.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Request Subject / Query</Label>
                <Input
                  placeholder="e.g. Request for electrical socket repositioning in master bedroom"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  required
                />
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Category</Label>
                <Input
                  placeholder="e.g. Construction / Payment / Legal / Handover"
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as any })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                />
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
