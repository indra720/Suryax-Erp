import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Search, ChevronLeft, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { fetchTeamLeaderTimesheet } from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/timesheet")({
  head: () => ({
    meta: [
      { title: "Team Activity Time Sheet & Audit Logs | Team Leader Portal" },
      { name: "description", content: "Review staff system logs, calling timestamps, and daily attendance." },
    ],
  }),
  component: TeamLeaderTimesheetPage,
});

export function TeamLeaderTimesheetPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const loadLogs = async (p = page) => {
    setLoading(true);
    try {
      const data = await fetchTeamLeaderTimesheet(p);
      setLogs(data.logs || []);
      setTotalPages(data.total_pages || 1);
    } catch (err: any) {
      toast.error(err.message || "Failed to load timesheet logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(page);
  }, [page]);

  const filteredLogs = logs.filter((l) =>
    ((l.name || "") + (l.description || "") + (l.activity_type || "") + (l.email || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <CalendarDays className="size-6 text-[#6732F2]" />
            Team Time Sheet &amp; Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time activity logs, call dispatch timestamps, and telecaller system events.
          </p>
        </div>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 pb-2 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
              Audit Event Stream
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Complete chronological audit trail for your team.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <Input
              placeholder="Search by staff name or action..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Activity Action</TableHead>
                  <TableHead>Role Type</TableHead>
                  <TableHead className="hidden md:table-cell">IP Address</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={6} className="py-4 text-center">
                        <div className="h-6 bg-gray-100 animate-pulse rounded-md" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-xs text-gray-500">
                      No activity logs recorded.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log, idx) => (
                    <TableRow key={log.id || idx} className="text-xs hover:bg-gray-50/70">
                      <TableCell className="text-center font-medium">{(page - 1) * 10 + idx + 1}.</TableCell>
                      <TableCell className="font-semibold text-gray-900">
                        {log.name || "Staff Member"}{" "}
                        <span className="text-[11px] text-gray-500 font-normal block">{log.email}</span>
                      </TableCell>
                      <TableCell className="text-gray-800 font-medium">
                        {log.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {log.user_type || "Staff"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-gray-500 text-[11px]">
                        {log.ip_address || "127.0.0.1"}
                      </TableCell>
                      <TableCell className="text-right font-mono text-gray-500">
                        {log.created_date ? new Date(log.created_date).toLocaleString("en-GB") : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-3 border-t flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-7 text-xs flex items-center gap-1"
              >
                <ChevronLeft className="size-3.5" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-7 text-xs flex items-center gap-1"
              >
                Next <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
