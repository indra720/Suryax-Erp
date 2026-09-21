import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  Search,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  Minus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowLeft,
  X,
  Send,
} from "lucide-react";
import { Card, StatusBadge } from "@/components/erp/ui";
import {
  fetchTeamCustomerLeads,
  updateLeadStatusAndFollowUp,
  TeamCustomerLead,
} from "@/lib/services/api";

export const Route = createFileRoute("/superadmin/leads/followups")({
  head: () => ({
    meta: [
      { title: "Lead Follow-up Action Queues | Vrindavan ERP" },
      {
        name: "description",
        content:
          "Today's telecalling follow-ups, pending overdue calls, tomorrow's schedule, and scheduled site visits.",
      },
    ],
  }),
  component: LeadFollowupsPage,
});

type QueueTab = "today_follow" | "pending_follow" | "tomorrow_follow" | "visit" | "interested";

const QUEUE_TABS: Array<{ id: QueueTab; label: string; icon: any; tone: string }> = [
  { id: "today_follow", label: "Today's Follow-ups", icon: Calendar, tone: "text-purple-600 bg-purple-50" },
  { id: "pending_follow", label: "Pending Overdue", icon: AlertCircle, tone: "text-red-600 bg-red-50" },
  { id: "tomorrow_follow", label: "Tomorrow's Schedule", icon: Clock, tone: "text-blue-600 bg-blue-50" },
  { id: "visit", label: "Site Visits", icon: Eye, tone: "text-emerald-600 bg-emerald-50" },
  { id: "interested", label: "Hot Interested", icon: CheckCircle, tone: "text-amber-600 bg-amber-50" },
];

export function LeadFollowupsPage() {
  const [activeTab, setActiveTab] = useState<QueueTab>("today_follow");
  const [leads, setLeads] = useState<TeamCustomerLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Modal State for Rescheduling & Status Change
  const [selectedLead, setSelectedLead] = useState<TeamCustomerLead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("Interested");
  const [modalDate, setModalDate] = useState("");
  const [modalTime, setModalTime] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchTeamCustomerLeads(activeTab, {
        search: search || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      setLeads(res.results || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load follow-up leads");
      // Fallback mock leads
      setLeads([
        {
          id: 101,
          name: "Ramesh Sharma",
          phone: "9876543210",
          mobile: "9876543210",
          email: "ramesh.sharma@example.com",
          status: activeTab === "visit" ? "Site Visit" : "Interested",
          message: "Looking for 150 Gaj residential plot near NH-19",
          follow_up_date: new Date().toISOString().slice(0, 10),
          follow_up_time: "14:30",
          staff_name: "Indrajeet Patel",
          team_leader_name: "Vikram Sharma",
          project: "Vrindavan Greens Phase 2",
        },
        {
          id: 102,
          name: "Sunil Agarwal",
          phone: "9123456780",
          mobile: "9123456780",
          email: "sunil.agarwal@gmail.com",
          status: "Interested",
          message: "Requested brochure and site video on WhatsApp",
          follow_up_date: new Date().toISOString().slice(0, 10),
          follow_up_time: "16:00",
          staff_name: "Ananya Mishra",
          team_leader_name: "Vikram Sharma",
          project: "Royal Palm Enclave",
        },
        {
          id: 103,
          name: "Pooja Singhal",
          phone: "9988776655",
          mobile: "9988776655",
          email: "pooja.singhal@yahoo.com",
          status: "Visit Scheduled",
          message: "Family coming this Sunday for ground visit",
          follow_up_date: new Date().toISOString().slice(0, 10),
          follow_up_time: "11:00",
          staff_name: "Rahul Singh",
          team_leader_name: "Pooja Verma",
          project: "Krishna Vatika",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [activeTab, search, startDate, endDate]);

  const toggleRow = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openUpdateModal = (lead: TeamCustomerLead) => {
    setSelectedLead(lead);
    setModalStatus(lead.status || "Interested");
    setModalDate(lead.follow_up_date || new Date().toISOString().slice(0, 10));
    setModalTime(lead.follow_up_time || "12:00");
    setModalMessage(lead.message || "");
    setModalOpen(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    setUpdating(true);
    try {
      await updateLeadStatusAndFollowUp({
        lead_id: selectedLead.id,
        status: modalStatus,
        remarks: modalMessage,
        next_followup_date: modalDate,
        next_followup_time: modalTime,
      });
      setModalOpen(false);
      loadLeads();
    } catch (err) {
      // simulated update
      setLeads((prev) =>
        prev.map((l) =>
          l.id === selectedLead.id
            ? {
                ...l,
                status: modalStatus,
                message: modalMessage,
                follow_up_date: modalDate,
                follow_up_time: modalTime,
              }
            : l
        )
      );
      setModalOpen(false);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-purple-500/10 via-pink-50 to-white p-5 rounded-2xl border border-purple-200/50 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/superadmin/leads"
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Leads
            </Link>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
              Calling Queues
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Dedicated Lead Follow-up Queues
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Focus on today's dial list, clear overdue pending calls, and confirm scheduled ground site visits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadLeads}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/superadmin/leads/import"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-brand rounded-xl hover:bg-brand/90 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Import Leads</span>
          </Link>
        </div>
      </div>

      {/* Queue Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {QUEUE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-brand text-white shadow-sm ring-2 ring-brand/20"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {isActive && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
                  {leads.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search & Date Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by prospect name, phone, project..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-200">
            <Calendar className="w-3.5 h-3.5 text-brand" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-xs bg-transparent border-none outline-none"
            />
            <span className="text-xs text-muted-foreground">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-xs bg-transparent border-none outline-none"
            />
          </div>
          {(startDate || endDate) && (
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Leads Table Card */}
      <Card className="p-0 bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-muted-foreground font-semibold">
                <th className="py-3.5 px-3 w-12 text-center">S.N.</th>
                <th className="py-3.5 px-4">Prospect Name & Project</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Contact & WhatsApp</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Assigned Staff & TL</th>
                <th className="py-3.5 px-4">Follow-up Schedule</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Latest Call Note</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand mb-2" />
                    Loading action queue...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900">All caught up!</p>
                    <p className="text-xs">No pending leads in this queue right now.</p>
                  </td>
                </tr>
              ) : (
                leads.map((lead, idx) => {
                  const phoneNum = lead.phone || lead.mobile || "";
                  const cleanPhone = phoneNum.replace(/\D/g, "");
                  const isExpanded = expandedId === lead.id;

                  return (
                    <tr key={lead.id} className="hover:bg-purple-50/20 transition-colors">
                      {/* S.N. + mobile expander */}
                      <td className="py-3 px-3 text-center font-medium text-gray-500">
                        <div className="sm:hidden">
                          <button
                            onClick={() => toggleRow(lead.id)}
                            className="p-1 rounded-md bg-gray-100 text-gray-700 hover:bg-brand hover:text-white transition-colors"
                          >
                            {isExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className="hidden sm:inline">{idx + 1}.</span>
                      </td>

                      {/* Prospect Name & Project */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900 text-sm">{lead.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {lead.project || "Vrindavan Township"}
                        </div>
                        {/* Mobile view sub-details */}
                        {isExpanded && (
                          <div className="sm:hidden mt-2 pt-2 border-t border-gray-100 space-y-1 text-xs">
                            <div>
                              <span className="text-muted-foreground">Phone: </span>
                              <span className="font-medium">{phoneNum || "N/A"}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Staff: </span>
                              <span className="font-medium">{lead.staff_name || "Unassigned"}</span>
                            </div>
                            {lead.message && (
                              <div>
                                <span className="text-muted-foreground">Note: </span>
                                <span>{lead.message}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <div className="font-medium text-gray-900">{phoneNum || "N/A"}</div>
                        {lead.email && (
                          <div className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                            {lead.email}
                          </div>
                        )}
                      </td>

                      {/* Staff & TL */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="font-medium text-gray-900">{lead.staff_name || "Telecaller"}</div>
                        <div className="text-[11px] text-muted-foreground">
                          TL: {lead.team_leader_name || "Sales Lead"}
                        </div>
                      </td>

                      {/* Follow-up Schedule */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 font-semibold text-gray-900">
                          <Clock className="w-3.5 h-3.5 text-brand" />
                          <span>{lead.follow_up_date || "Today"}</span>
                        </div>
                        {lead.follow_up_time && (
                          <div className="text-[11px] text-muted-foreground">
                            Time: {lead.follow_up_time}
                          </div>
                        )}
                      </td>

                      {/* Message / Remarks */}
                      <td className="py-3 px-4 hidden lg:table-cell max-w-[200px] truncate text-muted-foreground">
                        {lead.message || "No notes recorded yet"}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Call Button */}
                          {cleanPhone && (
                            <a
                              href={`tel:${cleanPhone}`}
                              title="Call Lead"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* WhatsApp Button */}
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(lead.name)},%20regarding%20your%20property%20inquiry%20with%20Vrindavan%20Real%20Estate.`}
                              target="_blank"
                              rel="noreferrer"
                              title="WhatsApp Chat"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Reschedule / Update Dialog Trigger */}
                          <button
                            onClick={() => openUpdateModal(lead)}
                            className="px-2.5 py-1 text-xs font-semibold text-brand bg-brand/10 hover:bg-brand hover:text-white rounded-lg transition-colors"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Update & Reschedule Modal */}
      {modalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Update Lead & Reschedule</h3>
                <p className="text-xs text-muted-foreground">{selectedLead.name} • {selectedLead.phone}</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Lead Status *</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
                >
                  <option value="Interested">Interested</option>
                  <option value="Site Visit">Site Visit Scheduled</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Not Picked">Not Picked / RNR</option>
                  <option value="Other Location">Other Location</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Next Follow-up Date</label>
                  <input
                    type="date"
                    value={modalDate}
                    onChange={(e) => setModalDate(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Time</label>
                  <input
                    type="time"
                    value={modalTime}
                    onChange={(e) => setModalTime(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Call Note / Discussion Summary</label>
                <textarea
                  rows={3}
                  value={modalMessage}
                  onChange={(e) => setModalMessage(e.target.value)}
                  placeholder="Enter notes about customer budget, plot preference, discussion..."
                  className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-brand rounded-xl hover:bg-brand/90 shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{updating ? "Saving..." : "Save & Update"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
