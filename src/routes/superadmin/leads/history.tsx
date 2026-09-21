import React, { useState, useEffect } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  History,
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Send,
  MessageSquare,
  Phone,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
} from "lucide-react";
import {
  fetchLeadHistoryTimeline,
  changeLeadStatus,
  fetchSuperuserCompanyLeads,
  type LeadHistoryItem,
  type CompanyLeadItem,
} from "@/lib/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HistorySearch {
  id?: string | undefined;
}

export const Route = createFileRoute("/superadmin/leads/history")({
  validateSearch: (search: Record<string, unknown>): HistorySearch => {
    const rawId = search["id"];
    return {
      id: typeof rawId === "string" ? rawId : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Lead Activity Timeline | Vrindavan Real Estate ERP" },
      {
        name: "description",
        content: "Chronological interaction history, call notes, and pipeline status logs.",
      },
    ],
  }),
  component: SuperadminLeadHistoryPage,
});

const statusOptions = [
  "New",
  "Contacted",
  "Interested",
  "Visit",
  "Follow Up",
  "Not Picked",
  "Other Location",
  "Not Interested",
  "Lost",
];

export function SuperadminLeadHistoryPage() {
  const search = useSearch({ from: "/superadmin/leads/history" });
  const [allLeads, setAllLeads] = useState<CompanyLeadItem[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string>(search.id || "");
  const [currentLead, setCurrentLead] = useState<CompanyLeadItem | null>(null);

  const [historyEvents, setHistoryEvents] = useState<LeadHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittingNote, setSubmittingNote] = useState(false);

  // New Note / Status Update Form
  const [newStatus, setNewStatus] = useState("Interested");
  const [newNote, setNewNote] = useState("");
  const [followDate, setFollowDate] = useState("");
  const [followTime, setFollowTime] = useState("");

  // Load leads list for selector
  useEffect(() => {
    const loadAllLeads = async () => {
      try {
        const data = await fetchSuperuserCompanyLeads();
        if (Array.isArray(data) && data.length > 0) {
          setAllLeads(data);
          if (!selectedLeadId && data[0]) {
            setSelectedLeadId(String(data[0].id));
          }
          return;
        }
      } catch (e) {
        console.warn("Could not load leads for history page:", e);
      }

      // Demonstration fallback leads
      const fallbackList: CompanyLeadItem[] = [
        {
          id: 101,
          name: "Aarav Sharma",
          mobile: "9829012345",
          call: "9829012345",
          email: "aarav.sharma@example.com",
          status: "Interested",
          source: "Google",
          assigned_to: "Pooja Verma",
          created_at: "2026-09-18T10:30:00Z",
          description: "Interested in 200 Gaj plot in Vrindavan Gardens Phase 1.",
        },
        {
          id: 102,
          name: "Saanvi Patel",
          mobile: "9876543211",
          call: "9876543211",
          email: "saanvi.patel@gmail.com",
          status: "Visit",
          source: "FaceBook",
          assigned_to: "Sunita Sharma",
          created_at: "2026-09-17T14:20:00Z",
          description: "Site visit scheduled for upcoming Sunday with family.",
        },
        {
          id: 103,
          name: "Vihaan Singh",
          mobile: "9829045678",
          call: "9829045678",
          email: "vihaan.singh@yahoo.com",
          status: "Follow Up",
          source: "IT Team",
          assigned_to: "Rahul Mathur",
          created_at: "2026-09-16T11:15:00Z",
          description: "Requested brochure and pricing breakdown for Radha Enclave.",
        },
      ];
      setAllLeads(fallbackList);
      if (!selectedLeadId && fallbackList[0]) {
        setSelectedLeadId(String(fallbackList[0].id));
      }
    };
    loadAllLeads();
  }, []);

  // Sync selected lead and load timeline
  useEffect(() => {
    if (!selectedLeadId) return;

    const found = allLeads.find((l) => String(l.id) === String(selectedLeadId));
    if (found) {
      setCurrentLead(found);
      setNewStatus(found.status || "Interested");
    }

    const loadTimeline = async () => {
      setLoading(true);
      try {
        const timeline = await fetchLeadHistoryTimeline(selectedLeadId);
        if (Array.isArray(timeline) && timeline.length > 0) {
          setHistoryEvents(timeline);
        } else {
          // Provide representative baseline events
          setHistoryEvents([
            {
              id: 1,
              lead_id: Number(selectedLeadId),
              status: found?.status || "New",
              name: found?.name || "Prospect",
              message: found?.description || "Inquiry received and lead registered in system.",
              created_date: found?.created_at || "2026-09-18T10:00:00Z",
              updated_by: found?.assigned_to || "Admin Desk",
            },
            {
              id: 2,
              lead_id: Number(selectedLeadId),
              status: "Contacted",
              name: found?.name || "Prospect",
              message: "Initial telecall completed. Sent brochure on WhatsApp.",
              created_date: "2026-09-18T11:30:00Z",
              updated_by: found?.assigned_to || "Staff Caller",
            },
            {
              id: 3,
              lead_id: Number(selectedLeadId),
              status: found?.status || "Interested",
              name: found?.name || "Prospect",
              message: "Client reviewed layout. Requested rate quotes for 150 Gaj & 200 Gaj plots.",
              created_date: "2026-09-19T09:15:00Z",
              updated_by: found?.assigned_to || "Staff Caller",
            },
          ]);
        }
      } catch (e) {
        toast.error("Failed to load timeline events");
      } finally {
        setLoading(false);
      }
    };

    loadTimeline();
  }, [selectedLeadId, allLeads]);

  // Submit Note / Call Update
  const handleAddNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) {
      toast.error("Please enter call remarks or notes.");
      return;
    }

    setSubmittingNote(true);
    try {
      const payload: {
        status: string;
        message?: string | undefined;
        followDate?: string | undefined;
        followTime?: string | undefined;
      } = {
        status: newStatus,
        message: newNote.trim(),
      };
      if (followDate) payload.followDate = followDate;
      if (followTime) payload.followTime = followTime;

      await changeLeadStatus(selectedLeadId, payload);

      toast.success("Timeline updated successfully!");

      // Prepend new event locally
      const newEvent: LeadHistoryItem = {
        id: Date.now(),
        lead_id: Number(selectedLeadId),
        status: newStatus,
        name: currentLead?.name || "Lead",
        message: newNote.trim(),
        created_date: new Date().toISOString(),
        updated_by: "Superadmin",
      };

      setHistoryEvents((prev) => [newEvent, ...prev]);
      setNewNote("");
      setFollowDate("");
      setFollowTime("");

      // Update current lead status badge
      if (currentLead) {
        setCurrentLead({ ...currentLead, status: newStatus });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to append timeline event");
    } finally {
      setSubmittingNote(false);
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/70 p-5 rounded-2xl shadow-card">
        <div className="flex items-center gap-3">
          <Link to="/superadmin/leads">
            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-xl border-border/80 hover:bg-brand-soft hover:text-brand"
            >
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Lead Activity Timeline
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              Review comprehensive communication history, caller notes, and status milestones.
            </p>
          </div>
        </div>

        {/* Lead Switcher Dropdown */}
        <div className="w-full sm:w-64">
          <Select value={selectedLeadId} onValueChange={setSelectedLeadId}>
            <SelectTrigger className="h-10 rounded-xl bg-background border-border text-xs">
              <SelectValue placeholder="Select Lead to View" />
            </SelectTrigger>
            <SelectContent>
              {allLeads.map((ld) => (
                <SelectItem key={ld.id} value={String(ld.id)}>
                  {ld.name} ({ld.mobile || ld.call || "No Phone"})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lead Profile Header Card */}
      {currentLead && (
        <div className="bg-card border border-border/70 rounded-2xl p-5 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="size-12 rounded-2xl bg-brand-soft text-brand font-extrabold flex items-center justify-center text-base border border-brand/20 shadow-sm">
              {currentLead.name ? currentLead.name.charAt(0).toUpperCase() : "L"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">{currentLead.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-soft text-brand border border-brand/20">
                  {currentLead.status || "New"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary mt-1">
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="size-3 text-text-muted" />
                  {currentLead.mobile || currentLead.call || "N/A"}
                </span>
                {currentLead.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="size-3 text-text-muted" />
                    {currentLead.email}
                  </span>
                )}
                <span className="text-text-muted">
                  Assigned: <strong>{currentLead.assigned_to || "Unassigned"}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {currentLead.mobile && (
              <>
                <a
                  href={`tel:${currentLead.mobile}`}
                  className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-semibold"
                >
                  <Phone className="size-3.5" />
                  Call
                </a>
                <a
                  href={`https://wa.me/91${currentLead.mobile.replace(/\D/g, "")}?text=Hello%20${currentLead.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-semibold"
                >
                  <MessageSquare className="size-3.5" />
                  WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {/* Grid: Timeline Stream & Add Note Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timeline Events Stream */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-border/70 rounded-2xl shadow-card bg-card overflow-hidden">
            <CardHeader className="p-4 sm:p-5 border-b border-border/60 bg-muted/10 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <History className="size-4 text-brand" />
                  Interaction &amp; Call Timeline
                </CardTitle>
                <CardDescription className="text-xs text-text-secondary">
                  Complete activity history for this lead.
                </CardDescription>
              </div>
              <span className="text-xs font-bold text-brand bg-brand-soft px-2.5 py-1 rounded-lg">
                {historyEvents.length} Logs
              </span>
            </CardHeader>

            <CardContent className="p-5 sm:p-6">
              {loading ? (
                <div className="py-12 text-center text-text-secondary">
                  <RefreshCw className="size-6 animate-spin mx-auto mb-2 text-brand" />
                  Loading timeline history...
                </div>
              ) : historyEvents.length === 0 ? (
                <div className="py-12 text-center text-text-muted text-xs">
                  No interactions recorded yet. Use the form on the right to log your first call.
                </div>
              ) : (
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/80">
                  {historyEvents.map((evt, idx) => (
                    <div key={evt.id || idx} className="relative group">
                      {/* Timeline Node Pin */}
                      <div className="absolute -left-6 top-1.5 size-4 rounded-full bg-brand border-2 border-background ring-4 ring-brand-soft shadow-sm" />

                      <div className="bg-muted/30 hover:bg-muted/50 transition-colors p-4 rounded-2xl border border-border/70 shadow-sm space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-brand-soft text-brand">
                              {evt.status}
                            </span>
                            {evt.updated_by && (
                              <span className="text-[11px] text-text-muted">
                                by <strong className="text-foreground">{evt.updated_by}</strong>
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">
                            <Clock className="size-3" />
                            {evt.created_date
                              ? new Date(evt.created_date).toLocaleString()
                              : "Just now"}
                          </span>
                        </div>

                        <p className="text-xs text-foreground leading-relaxed">
                          {evt.message || "Status milestone updated."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Add Call Note / Follow-up Update Form */}
        <div className="space-y-4">
          <Card className="border border-border/70 rounded-2xl shadow-card bg-card overflow-hidden">
            <CardHeader className="p-4 sm:p-5 border-b border-border/60 bg-muted/10">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Send className="size-4 text-brand" />
                Log Call / Add Update
              </CardTitle>
              <CardDescription className="text-xs text-text-secondary">
                Record new interaction notes and update pipeline stage.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleAddNoteSubmit} className="p-4 sm:p-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">New Pipeline Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="h-10 rounded-xl bg-background border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Next Follow-Up Date</Label>
                <Input
                  type="date"
                  value={followDate}
                  onChange={(e) => setFollowDate(e.target.value)}
                  className="h-10 rounded-xl bg-background border-border text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Follow-Up Time</Label>
                <Input
                  type="time"
                  value={followTime}
                  onChange={(e) => setFollowTime(e.target.value)}
                  className="h-10 rounded-xl bg-background border-border text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Interaction Remarks *</Label>
                <Textarea
                  required
                  placeholder="Record summary of conversation, client reactions, objections, or plot preferences..."
                  rows={4}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="rounded-xl bg-background border-border text-xs resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submittingNote || !newNote.trim()}
                className="w-full bg-brand hover:bg-brand-bright text-white rounded-xl text-xs h-10 font-semibold shadow-sm"
              >
                {submittingNote ? (
                  <>
                    <RefreshCw className="size-3.5 mr-1.5 animate-spin" />
                    Recording Note...
                  </>
                ) : (
                  <>
                    <Send className="size-3.5 mr-1.5" />
                    Save Activity Log
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default SuperadminLeadHistoryPage;
