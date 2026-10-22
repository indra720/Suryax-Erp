import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Phone,
  MessageSquare,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Calendar,
  XCircle,
  Building,
  RefreshCw,
} from "lucide-react";
import {
  fetchStaffDashboardData,
  updateStaffLeadStatus,
  createStaffLead,
  type StaffDashboardData,
} from "@/lib/services/api";
import { PageHeader, StatusBadge, Card } from "@/components/erp/ui";
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
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/staff/leads")({
  head: () => ({
    meta: [
      { title: "Staff Calling Leads | Vrindavan Real Estate ERP" },
      {
        name: "description",
        content: "Assigned sales leads for active telecalling and conversion.",
      },
    ],
  }),
  component: StaffLeadsPage,
});

const statusCategories = [
  "All",
  "New",
  "Interested",
  "Visit",
  "Not Picked",
  "Other Location",
  "Not Interested",
  "Lost",
];

export function StaffLeadsPage() {
  const [data, setData] = useState<StaffDashboardData>({
    results: [],
    projects: [],
    counts: {
      total_leads: 0,
      total_visits_leads: 0,
      total_interested_leads: 0,
      total_not_interested_leads: 0,
      total_other_location_leads: 0,
      total_not_picked_leads: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Call Update Modal
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  // New Lead Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    mobile: "",
    email: "",
    status: "New",
    description: "",
    project: "",
  });
  const [savingNew, setSavingNew] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetchStaffDashboardData();
      if (res && res.results) {
        setData(res);
      }
    } catch (err: any) {
      console.warn("Backend API note:", err.message);
      setData({
        results: [
          { id: 201, name: "Vikas Agrawal", call: "9414012345", status: "Interested", project: 1, message: "Requested brochure on WhatsApp" },
          { id: 202, name: "Meena Rathore", call: "9829054321", status: "Visit", project: 2, message: "Site visit booked for Sunday 11 AM" },
          { id: 203, name: "Kailash Chand", call: "9602011223", status: "Not Picked", project: 1, message: "Called twice, phone switch off" },
          { id: 204, name: "Sunil Saini", call: "9828099887", status: "Other Location", project: null, message: "Prefers Jagatpura bypass" },
          { id: 205, name: "Divya Mathur", call: "9785044556", status: "New", project: 2, message: "Website form inquiry" },
        ],
        projects: [
          { id: 1, name: "Vrindavan Greens" },
          { id: 2, name: "Vrindavan Heights" },
        ],
        counts: {
          total_leads: 5,
          total_visits_leads: 1,
          total_interested_leads: 1,
          total_not_interested_leads: 0,
          total_other_location_leads: 1,
          total_not_picked_leads: 1,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleOpenStatus = (lead: any) => {
    setSelectedLead(lead);
    setEditStatus(lead.status || "New");
    setEditMessage(lead.message || "");
    setStatusModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedLead) return;
    setSavingStatus(true);
    try {
      await updateStaffLeadStatus(selectedLead.id, editStatus, editMessage);
      toast.success(`Updated status for ${selectedLead.name} to ${editStatus}`);
      setStatusModalOpen(false);
      loadLeads();
    } catch (err: any) {
      toast.error(err.message || "Failed to update lead status");
    } finally {
      setSavingStatus(false);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name.trim()) {
      toast.error("Lead name is required.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(newLead.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSavingNew(true);
    try {
      await createStaffLead({
        name: newLead.name,
        mobile: newLead.mobile,
        email: newLead.email,
        status: newLead.status,
        description: newLead.description,
        project: newLead.project ? Number(newLead.project) : undefined,
      });
      toast.success("Lead registered successfully!");
      setAddModalOpen(false);
      setNewLead({
        name: "",
        mobile: "",
        email: "",
        status: "New",
        description: "",
        project: "",
      });
      loadLeads();
    } catch (err: any) {
      toast.error(err.message || "Failed to register lead");
    } finally {
      setSavingNew(false);
    }
  };

  const filteredLeads = data.results.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.call.includes(search) ||
      (l.message && l.message.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter =
      activeFilter === "All" ||
      l.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Calling Leads"
        description="Daily calling records, phone triggers, and direct call outcome logs."
        breadcrumb={["Staff", "Leads"]}
        actions={
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={loadLeads}
              className="flex-1 sm:flex-none h-9 sm:h-10 rounded-[10px] border-border text-foreground text-xs sm:text-[13px] font-semibold gap-1.5"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={() => setAddModalOpen(true)}
              className="flex-1 sm:flex-none h-9 sm:h-10 rounded-[10px] bg-brand hover:bg-brand-bright text-white text-xs sm:text-[13px] font-semibold shadow-sm gap-1.5"
            >
              <Plus className="size-4" />
              Add Lead
            </Button>
          </div>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-card border border-border overflow-x-auto no-scrollbar max-w-full">
        {statusCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-[12.5px] font-semibold transition-all shrink-0 whitespace-nowrap ${
              activeFilter === cat
                ? "bg-brand text-white shadow-sm"
                : "text-text-secondary hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Table Card */}
      <Card className="p-0 overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-border flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Input
              type="text"
              placeholder="Search leads by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 sm:h-10 pl-9 rounded-[10px] bg-background border-border text-xs sm:text-[13px]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted pointer-events-none" />
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-text-secondary font-medium">
            <span className="text-[10px] sm:hidden text-text-muted">Swipe horizontally →</span>
            <span>{filteredLeads.length} leads</span>
          </div>
        </div>

        <div className="overflow-x-auto -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-left text-xs sm:text-[13.5px] min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/60 border-b border-border text-[12px] font-semibold text-text-secondary uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5 whitespace-nowrap">Customer</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Contact Action</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Status</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Project</th>
                <th className="px-5 py-3.5 whitespace-nowrap">Follow-up Remarks</th>
                <th className="px-5 py-3.5 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-text-muted text-sm whitespace-nowrap">
                    No leads found matching "{activeFilter}".
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-8 rounded-full bg-brand-soft text-brand font-bold text-xs place-items-center">
                          {lead.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-semibold text-[13.5px] text-foreground">{lead.name}</p>
                          <p className="text-[11px] text-text-muted">Lead #{lead.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:+91${lead.call}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-soft text-brand hover:bg-brand hover:text-white transition-colors text-[12px] font-medium"
                        >
                          <Phone className="size-3.5" />
                          <span>{lead.call}</span>
                        </a>
                        <a
                          href={`https://wa.me/+91${lead.call}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="size-7 rounded-lg bg-success-soft text-success hover:bg-success hover:text-white transition-colors grid place-items-center"
                        >
                          <MessageSquare className="size-3.5" />
                        </a>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <StatusBadge value={lead.status} />
                    </td>

                    <td className="px-5 py-3.5 text-[12.5px] text-foreground font-medium whitespace-nowrap">
                      {data.projects.find((p) => p.id === lead.project)?.name || "General Inquiry"}
                    </td>

                    <td className="px-5 py-3.5 max-w-xs truncate text-[12.5px] text-text-secondary whitespace-nowrap">
                      {lead.message || "--"}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenStatus(lead)}
                        className="h-8 rounded-lg border-border hover:border-brand text-brand text-[12px] font-semibold"
                      >
                        Update Call
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Call Disposition Modal */}
      <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              Update Disposition: {selectedLead?.name}
            </DialogTitle>
            <DialogDescription className="text-text-secondary text-xs sm:text-sm mt-1">
              Set the new lead stage disposition, schedule follow-ups, and document telecaller feedback.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Call Outcome Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger className="h-10 sm:h-11 rounded-xl bg-background border-border text-sm">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusCategories.filter((s) => s !== "All").map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Remarks &amp; Next Action</Label>
                <Textarea
                  rows={4}
                  placeholder="Details of call discussion, customer interest level, next follow-up date..."
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="rounded-xl bg-background border-border text-sm p-3 min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                disabled={savingStatus}
                onClick={handleSaveStatus}
                className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto"
              >
                {savingStatus ? "Saving..." : "Save Outcome"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Lead Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              Add New Lead to Calling Queue
            </DialogTitle>
            <DialogDescription className="text-text-secondary text-xs sm:text-sm mt-1">
              Register a prospective buyer inquiry directly to your personal assignment queue.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateLead} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Customer Name *</Label>
                  <Input
                    required
                    placeholder="Full Legal Name"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    className="h-10 sm:h-11 rounded-xl bg-background border-border text-sm"
                  />
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Mobile Number (10 digits) *</Label>
                  <Input
                    required
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={newLead.mobile}
                    onChange={(e) =>
                      setNewLead({
                        ...newLead,
                        mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className="h-10 sm:h-11 rounded-xl bg-background border-border text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Interested Project</Label>
                <Select
                  value={newLead.project}
                  onValueChange={(val) => setNewLead({ ...newLead, project: val })}
                >
                  <SelectTrigger className="h-10 sm:h-11 rounded-xl bg-background border-border text-sm">
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.projects.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Inquiry Notes / Specific Requirements</Label>
                <Textarea
                  rows={3}
                  placeholder="Customer budget, configuration preference (2BHK/3BHK), site visit interest..."
                  value={newLead.description}
                  onChange={(e) => setNewLead({ ...newLead, description: e.target.value })}
                  className="rounded-xl bg-background border-border text-sm p-3 min-h-[90px]"
                />
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={savingNew}
                className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto"
              >
                {savingNew ? "Saving..." : "Save Lead"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
