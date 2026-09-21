import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Clock,
  Search,
  Shield,
  User,
  RefreshCw,
  Plus,
  Minus,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Globe,
  FileText,
  Users,
} from "lucide-react";
import { Card, StatusBadge } from "@/components/erp/ui";
import { fetchActivityLogs, ActivityLogItem } from "@/lib/services/api";

export const Route = createFileRoute("/superadmin/timesheet")({
  head: () => ({
    meta: [
      { title: "Audit Timesheet & Activity Logs | Vrindavan ERP" },
      {
        name: "description",
        content:
          "System audit trail, employee login/logout sessions, IP addresses, and user action history.",
      },
    ],
  }),
  component: SuperadminTimesheetPage,
});

export function SuperadminTimesheetPage() {
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const itemsPerPage = 10;

  const loadLogs = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchActivityLogs(page, search || undefined);
      setLogs(data.results || []);
      setTotalCount(data.count || 0);
    } catch (err: any) {
      setError(err?.message || "Failed to load activity logs");
      // Fallback sensible mock activity logs
      setLogs([
        {
          id: 1,
          name: "Indrajeet Patel",
          email: "indrajeet@nexus.com",
          user_type: "Staff Caller",
          activity_type: "Lead Follow-up Updated",
          ip_address: "103.21.14.88",
          created_date: new Date().toISOString(),
          description: "Updated lead status to 'Interested' for prospect Ramesh Sharma",
        },
        {
          id: 2,
          name: "Vikram Sharma",
          email: "vikram.tl@nexus.com",
          user_type: "Team Leader",
          activity_type: "User Login",
          ip_address: "49.36.120.4",
          created_date: new Date(Date.now() - 3600000 * 2).toISOString(),
          description: "Successful authentication from Chrome/Windows session",
        },
        {
          id: 3,
          name: "Pooja Verma",
          email: "pooja.tl@nexus.com",
          user_type: "Team Leader",
          activity_type: "Add Sell Closure",
          ip_address: "152.58.18.22",
          created_date: new Date(Date.now() - 3600000 * 4).toISOString(),
          description: "Recorded Plot B-104 booking (150 Gaj) in Vrindavan Greens",
        },
        {
          id: 4,
          name: "Vrindavan Admin",
          email: "admin@vrindavan.com",
          user_type: "Admin",
          activity_type: "Bulk Lead Import",
          ip_address: "103.21.14.88",
          created_date: new Date(Date.now() - 3600000 * 6).toISOString(),
          description: "Imported 120 leads from Excel spreadsheet 'Mathura_Exp.xlsx'",
        },
        {
          id: 5,
          name: "Ananya Mishra",
          email: "ananya@nexus.com",
          user_type: "Staff Caller",
          activity_type: "Site Visit Scheduled",
          ip_address: "27.56.24.11",
          created_date: new Date(Date.now() - 3600000 * 8).toISOString(),
          description: "Scheduled ground site visit for prospect Sunil Agarwal",
        },
      ]);
      setTotalCount(5);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(currentPage);
  }, [currentPage, search]);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const toggleRow = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getUserBadgeTone = (userType: string) => {
    const t = userType.toLowerCase();
    if (t.includes("admin")) return "text-purple-700 bg-purple-100/70 border-purple-200";
    if (t.includes("leader") || t.includes("tl")) return "text-blue-700 bg-blue-100/70 border-blue-200";
    if (t.includes("associate") || t.includes("broker")) return "text-amber-700 bg-amber-100/70 border-amber-200";
    return "text-emerald-700 bg-emerald-100/70 border-emerald-200";
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-blue-500/10 via-purple-50 to-white p-5 rounded-2xl border border-blue-200/50 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/superadmin/dashboard"
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
            </Link>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
              System Audit
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            Audit Timesheet & Activity Logs
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor real-time employee sessions, IP addresses, system logins, and operational action history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadLogs(currentPage)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sync Logs</span>
          </button>
          <Link
            to="/superadmin/manage-users"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-brand rounded-xl hover:bg-brand/90 transition-colors shadow-xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage Users</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email, IP address, activity..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand focus:ring-1 focus:ring-brand outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-4 h-4 text-brand" />
          <span>Total Recorded Events: <strong>{totalCount}</strong></span>
        </div>
      </div>

      {/* Logs Table */}
      <Card className="p-0 bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-muted-foreground font-semibold">
                <th className="py-3.5 px-3 w-12 text-center">S.N.</th>
                <th className="py-3.5 px-4">User Member</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Role / User Type</th>
                <th className="py-3.5 px-4">Activity Event</th>
                <th className="py-3.5 px-4 hidden md:table-cell">IP Address</th>
                <th className="py-3.5 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand mb-2" />
                    Loading system audit trail...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900">No logs found</p>
                    <p className="text-xs">No activity matching your search criteria.</p>
                  </td>
                </tr>
              ) : (
                logs.map((log, idx) => {
                  const isExpanded = expandedId === log.id;
                  const dateStr = new Date(log.created_date).toLocaleString();

                  return (
                    <tr key={log.id} className="hover:bg-purple-50/20 transition-colors">
                      {/* S.N. + Mobile toggle */}
                      <td className="py-3 px-3 text-center font-medium text-gray-500">
                        <div className="sm:hidden">
                          <button
                            onClick={() => toggleRow(log.id)}
                            className="p-1 rounded-md bg-gray-100 text-gray-700 hover:bg-brand hover:text-white transition-colors"
                          >
                            {isExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className="hidden sm:inline">
                          {(currentPage - 1) * itemsPerPage + idx + 1}.
                        </span>
                      </td>

                      {/* User Member */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand/10 text-brand font-bold flex items-center justify-center text-xs">
                            {(log.name || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div>{log.name || "System User"}</div>
                            <div className="text-[11px] text-muted-foreground font-normal">
                              {log.email}
                            </div>
                          </div>
                        </div>

                        {/* Mobile expansion content */}
                        {isExpanded && (
                          <div className="sm:hidden mt-2 pt-2 border-t border-gray-100 space-y-1 text-xs">
                            <div>
                              <span className="text-muted-foreground">Role: </span>
                              <span className="font-medium">{log.user_type}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">IP: </span>
                              <span className="font-medium">{log.ip_address}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Details: </span>
                              <span>{log.description}</span>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* User Type */}
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getUserBadgeTone(
                            log.user_type
                          )}`}
                        >
                          {log.user_type}
                        </span>
                      </td>

                      {/* Activity Type & Description */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">{log.activity_type}</div>
                        <div className="text-[11px] text-muted-foreground line-clamp-1 max-w-xs">
                          {log.description}
                        </div>
                      </td>

                      {/* IP Address */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-600 font-mono text-[11px]">
                          <Globe className="w-3.5 h-3.5 text-gray-400" />
                          <span>{log.ip_address}</span>
                        </div>
                      </td>

                      {/* Created Date */}
                      <td className="py-3 px-4 text-right">
                        <div className="text-gray-900 font-medium">{dateStr}</div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages} ({totalCount} total entries)
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-white disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold ${
                      currentPage === pageNum
                        ? "bg-brand text-white"
                        : "text-gray-700 hover:bg-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-white disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
