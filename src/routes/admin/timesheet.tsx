import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  Search,
  RefreshCw,
  Plus,
  Minus,
  Clock,
  User,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Activity,
  Calendar,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  fetchAdminActivityLogs,
  fetchAdminTimesheet,
  type ActivityLog,
} from "@/lib/services/api";

export const Route = createFileRoute("/admin/timesheet")({
  head: () => ({
    meta: [{ title: "Time Sheet & Activity Logs | Vrindavan ERP" }],
  }),
  component: AdminTimesheetPage,
});

export function AdminTimesheetPage() {
  const [activeTab, setActiveTab] = useState<"activity" | "attendance">("activity");
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const itemsPerPage = 10;

  const loadData = async (page: number = 1) => {
    setLoading(true);
    try {
      if (activeTab === "activity") {
        const res = await fetchAdminActivityLogs(page);
        if (res && res.results) {
          setLogs(res.results);
          setTotalCount(res.count || res.results.length);
          setTotalPages(Math.max(1, Math.ceil((res.count || res.results.length) / itemsPerPage)));
        } else if (Array.isArray(res)) {
          setLogs(res);
          setTotalCount(res.length);
          setTotalPages(Math.max(1, Math.ceil(res.length / itemsPerPage)));
        }
      } else {
        const res = await fetchAdminTimesheet(selectedDate);
        if (Array.isArray(res)) {
          setAttendanceList(res);
        } else if (res?.results) {
          setAttendanceList(res.results);
        }
      }
    } catch (e) {
      console.error("Error fetching timesheet data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [activeTab, currentPage, selectedDate]);

  const toggleRow = (rowId: number) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const d = new Date(dateString);
      return isNaN(d.getTime()) ? dateString : d.toLocaleString();
    } catch {
      return dateString;
    }
  };

  const filteredLogs = search
    ? logs.filter((log) =>
        Object.values(log)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : logs;

  const filteredAttendance = search
    ? attendanceList.filter(
        (l) =>
          l.employee?.toLowerCase().includes(search.toLowerCase()) ||
          l.role?.toLowerCase().includes(search.toLowerCase())
      )
    : attendanceList;

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center size-8 rounded-lg bg-brand/10 text-brand font-bold text-sm">
              <CalendarDays className="size-4 text-brand" />
            </span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                Time Sheet &amp; Activity Audit
              </h1>
              <p className="text-xs text-gray-500">
                Live staff audit logs, IP tracking, and daily telecalling presence
              </p>
            </div>
          </div>
        </div>

        {/* View Tabs & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center border rounded-lg bg-gray-50 p-0.5 text-xs">
            <button
              onClick={() => {
                setActiveTab("activity");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "activity"
                  ? "bg-white text-brand shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Activity className="size-3.5" />
              Activity Logs
            </button>
            <button
              onClick={() => {
                setActiveTab("attendance");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "attendance"
                  ? "bg-white text-brand shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Clock className="size-3.5" />
              Punch Attendance
            </button>
          </div>

          {activeTab === "attendance" && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-8 px-2.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-brand"
            />
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => loadData(currentPage)}
            className="h-8 text-xs flex items-center gap-1.5 border-gray-200"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border border-gray-200 rounded-xl bg-white shadow-xs overflow-hidden w-full">
        {/* Search Header */}
        <div className="p-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={
                activeTab === "activity"
                  ? "Search by name, email, IP or action..."
                  : "Search staff name or role..."
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-8 text-xs bg-white border-gray-200"
            />
          </div>

          <div className="text-xs text-gray-500 font-medium">
            {activeTab === "activity" ? (
              <span>Showing {filteredLogs.length} activity records</span>
            ) : (
              <span>Showing {filteredAttendance.length} staff attendance records</span>
            )}
          </div>
        </div>

        {/* View 1: CrmAttendance2 Activity Logs Table */}
        {activeTab === "activity" && (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3 w-12">S.N.</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3 hidden md:table-cell">Email</th>
                  <th className="px-4 py-3 hidden md:table-cell">User Type</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Activity Type</th>
                  <th className="px-4 py-3 hidden lg:table-cell">IP Address</th>
                  <th className="px-4 py-3 text-right">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log, index) => (
                    <React.Fragment key={log.id || index}>
                      <tr className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-4 py-3 font-mono text-gray-500">
                          <div className="lg:hidden">
                            <button
                              type="button"
                              onClick={() => toggleRow(log.id)}
                              className="p-1 rounded hover:bg-gray-100 text-brand"
                            >
                              {expandedRowId === log.id ? (
                                <Minus className="size-3.5 text-rose-500" />
                              ) : (
                                <Plus className="size-3.5 text-emerald-600" />
                              )}
                            </button>
                          </div>
                          <div className="hidden lg:block">
                            {(currentPage - 1) * itemsPerPage + index + 1}.
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900">
                          {log.name || "N/A"}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-gray-600 font-mono text-[11px]">
                          {log.email}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                            {log.user_type || "User"}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="font-medium text-gray-800">
                            {log.activity_type}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell font-mono text-gray-500 text-[11px]">
                          {log.ip_address || "127.0.0.1"}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-500 font-mono text-[11px]">
                          {formatDate(log.created_date)}
                        </td>
                      </tr>

                      {/* Mobile Expandable Row */}
                      {expandedRowId === log.id && (
                        <tr className="lg:hidden bg-purple-50/20 border-b">
                          <td colSpan={7} className="p-3">
                            <div className="space-y-2 text-xs bg-white p-3 rounded-lg border border-gray-200">
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div>
                                  <span className="text-gray-500">Email:</span>{" "}
                                  <span className="font-semibold">{log.email}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">User Type:</span>{" "}
                                  <span className="font-semibold">{log.user_type}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Activity:</span>{" "}
                                  <span className="font-semibold">{log.activity_type}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">IP:</span>{" "}
                                  <span className="font-mono">{log.ip_address}</span>
                                </div>
                              </div>
                              {log.description && (
                                <div className="pt-2 border-t text-[11px]">
                                  <span className="text-gray-500 font-semibold block mb-0.5">
                                    Description:
                                  </span>
                                  <p className="text-gray-700">{log.description}</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="h-32 text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-400 gap-1.5">
                        <Activity className="size-6 text-gray-300" />
                        <span className="text-xs font-semibold text-gray-600">
                          No activity logs found
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Try clearing filters or search query
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* View 2: Staff Punch-in Attendance Table */}
        {activeTab === "attendance" && (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Employee Name</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-center">Punch In</th>
                  <th className="px-4 py-3 text-center">Punch Out</th>
                  <th className="px-4 py-3 text-center">Hours Worked</th>
                  <th className="px-4 py-3 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((l, index) => (
                    <tr key={l.id || index} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-900">{l.employee}</td>
                      <td className="px-4 py-3 text-gray-500">{l.role}</td>
                      <td className="px-4 py-3 text-center font-mono text-emerald-600 font-semibold">
                        {l.punch_in || "-"}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-gray-600">
                        {l.punch_out || "-"}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-gray-800">
                        {l.hours || "0h"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            l.status === "Present"
                              ? "bg-emerald-100 text-emerald-700"
                              : l.status === "Late"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {l.status || "Absent"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="h-32 text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-400 gap-1.5">
                        <Clock className="size-6 text-gray-300" />
                        <span className="text-xs font-semibold text-gray-600">
                          No attendance records found for this date
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {activeTab === "activity" && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
            <span className="text-[11px] text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-7 px-2 text-xs border-gray-200"
              >
                <ChevronLeft className="size-3.5 mr-0.5" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="h-7 px-2 text-xs border-gray-200"
              >
                Next <ChevronRight className="size-3.5 ml-0.5" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
