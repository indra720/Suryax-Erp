import React, { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  Search,
  Phone,
  MessageSquare,
  PlusCircle,
  FolderOpen,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  MapPin,
  PhoneOff,
  Minus,
  Plus,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  fetchTeamLeaderLeads,
  addTeamLeaderLead,
  TeamLeaderLead,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/leads/")({
  head: () => ({
    meta: [
      { title: "Team Leads Pipeline | Team Leader Portal" },
      { name: "description", content: "Team leader leads management and telecalling queue." },
    ],
  }),
  component: TeamLeaderLeadsPage,
});

const initialNewLead = {
  name: "",
  status: "Interested",
  mobile: "",
  email: "",
  description: "",
};

export function TeamLeaderLeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<TeamLeaderLead[]>([]);
  const [staffList, setStaffList] = useState<{ id: number; name: string }[]>([]);
  const [aggregates, setAggregates] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState(initialNewLead);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTeamLeaderLeads();
      setLeads(data.staff_name || []);
      setStaffList(data.staff_list || []);
      setAggregates(data.aggregates || {});
    } catch (err: any) {
      setError(err.message || "Failed to load leads");
      toast.error(err.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const getStatusBadge = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("interested")) return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">{status}</Badge>;
    if (s.includes("visit")) return <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-[10px]">{status}</Badge>;
    if (s.includes("not interested")) return <Badge className="bg-rose-100 text-rose-800 border-rose-300 text-[10px]">{status}</Badge>;
    if (s.includes("location")) return <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px]">{status}</Badge>;
    return <Badge variant="outline" className="text-[10px]">{status}</Badge>;
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name.trim()) {
      toast.error("Lead name is required.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(newLeadData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsSubmitting(true);
    try {
      await addTeamLeaderLead(newLeadData);
      toast.success(`${newLeadData.name} has been added successfully.`);
      setIsAddLeadOpen(false);
      setNewLeadData(initialNewLead);
      loadLeads();
    } catch (err: any) {
      toast.error(err.message || "Failed to add lead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      (l.name && l.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.phone && l.phone.includes(searchQuery))
  );

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <FolderOpen className="size-5 sm:size-6 text-[#6732F2] shrink-0" />
            Team Leads Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 sm:line-clamp-none">
            Assigned customer calling queue, instant WhatsApp outreach, and lead categorization.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            onClick={() => setIsAddLeadOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-[#331fa3] to-[#6732F2] hover:opacity-95 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="size-4" />
            Add New Lead
          </Button>
        </div>
      </div>

      {/* Aggregate Filter Bar */}
      <Card className="border rounded-xl bg-white shadow-xs">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            <span className="text-xs font-semibold text-gray-600 shrink-0">Quick Filters:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1">
              <Select onValueChange={(val) => val && navigate({ to: `/team-leader/leads/staff`, search: { id: val } })}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Assigned Staff" />
                </SelectTrigger>
                <SelectContent>
                  {staffList.map((st) => (
                    <SelectItem key={st.id} value={String(st.id)} className="text-xs">
                      {st.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(val) => val && navigate({ to: val as any })}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Leads By Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/team-leader/reports/interested" className="text-xs">Interested Leads</SelectItem>
                  <SelectItem value="/team-leader/reports/visit" className="text-xs">Site Visits</SelectItem>
                  <SelectItem value="/team-leader/reports/not-interested" className="text-xs">Not Interested</SelectItem>
                  <SelectItem value="/team-leader/reports/other-location" className="text-xs">Other Location</SelectItem>
                  <SelectItem value="/team-leader/reports/lost-leads" className="text-xs">Lost Leads</SelectItem>
                </SelectContent>
              </Select>

              <Link to="/team-leader/reports/interested" className="block">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/50 justify-between">
                  <span>Interested</span>
                  <Badge variant="secondary" className="text-[10px] px-1 py-0">{aggregates.total_interested_leads || 0}</Badge>
                </Button>
              </Link>

              <Link to="/team-leader/reports/lost-leads" className="block">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs text-gray-700 bg-gray-50/50 hover:bg-gray-100/50 justify-between">
                  <span>Lost Leads</span>
                  <Badge variant="secondary" className="text-[10px] px-1 py-0">{aggregates.total_lost_leads || 0}</Badge>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 pb-2 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-gray-900">Calling Leads Pipeline</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Directly call or WhatsApp interested prospects.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <Input
              placeholder="Search leads by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 text-[11px] font-semibold text-gray-600 uppercase">
                  <TableHead className="w-12 text-center">S.N.</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-center w-20">Call</TableHead>
                  <TableHead className="text-center w-24">WhatsApp</TableHead>
                  <TableHead className="text-right">History</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={6} className="py-4 text-center">
                        <div className="h-6 bg-gray-100 animate-pulse rounded-md" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-28 text-center text-xs text-gray-500">
                      No leads found in this queue.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead, idx) => (
                    <React.Fragment key={lead.id}>
                      <TableRow className="text-xs hover:bg-gray-50/70">
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => toggleRow(lead.id)}
                              className="lg:hidden p-1 text-gray-500"
                            >
                              {expandedRowId === lead.id ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                            </button>
                            <span>{idx + 1}.</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">
                          {lead.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {getStatusBadge(lead.status)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" className="size-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                            <a href={`tel:${lead.phone}`} title={`Call ${lead.name}`}>
                              <Phone className="size-4" />
                            </a>
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" className="size-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" asChild>
                            <a
                              href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(`Hello ${lead.name}, greetings from Vrindavan Real Estate.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="size-4" />
                            </a>
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to="/team-leader/lead-history/$id" params={{ id: String(lead.id) }}>
                            <Button variant="link" size="sm" className="p-0 h-auto text-xs font-semibold text-[#6732F2]">
                              History
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>

                      {/* Expandable details on mobile */}
                      {expandedRowId === lead.id && (
                        <TableRow className="lg:hidden bg-purple-50/20">
                          <TableCell colSpan={6} className="p-3">
                            <div className="flex flex-col gap-2 text-xs border rounded-lg p-2.5 bg-white">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-500">Status:</span>
                                {getStatusBadge(lead.status)}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-500">Phone:</span>
                                <span className="font-mono text-gray-900">{lead.phone}</span>
                              </div>
                              <div className="pt-2 border-t flex justify-end">
                                <Link to="/team-leader/lead-history/$id" params={{ id: String(lead.id) }}>
                                  <Button variant="outline" size="sm" className="text-xs h-7">
                                    View Full Timeline History
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add New Lead Dialog */}
      <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              Add New Calling Lead
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
              Enter customer contact information to assign to telecallers and register immediate stage.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Customer Name *</Label>
                  <Input
                    name="name"
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Status *</Label>
                  <Select
                    value={newLeadData.status}
                    onValueChange={(val) => setNewLeadData({ ...newLeadData, status: val })}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Interested">Interested</SelectItem>
                      <SelectItem value="Visit">Visit</SelectItem>
                      <SelectItem value="Not Interested">Not Interested</SelectItem>
                      <SelectItem value="Other Location">Other Location</SelectItem>
                      <SelectItem value="Not Picked">Not Picked</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Mobile Number (10 digits) *</Label>
                  <Input
                    type="tel"
                    name="mobile"
                    maxLength={10}
                    value={newLeadData.mobile}
                    onChange={(e) =>
                      setNewLeadData({
                        ...newLeadData,
                        mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    placeholder="10-digit mobile"
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    placeholder="customer@gmail.com"
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Remarks / Specific Requirement</Label>
                <Textarea
                  name="description"
                  value={newLeadData.description}
                  onChange={(e) => setNewLeadData({ ...newLeadData, description: e.target.value })}
                  placeholder="e.g. Inquiring for 150 gaj plot near sector-5, site visit ready this Sunday"
                  className="rounded-xl text-sm p-3 min-h-[90px]"
                />
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setIsAddLeadOpen(false)} className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto"
              >
                {isSubmitting ? "Creating Lead..." : "Save Lead"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
