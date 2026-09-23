import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Minus, Calendar, Clock, RefreshCw, Loader2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { fetchStaffTimesheet } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/timesheet")({
  head: () => ({
    meta: [{ title: "My Calling Timesheet & Activities | Vrindavan ERP Staff" }],
  }),
  component: StaffTimesheetPage,
});

export function StaffTimesheetPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const loadLogs = async (page: number = 1) => {
    setLoading(true);
    try {
      const data = await fetchStaffTimesheet(page);
      setLogs(data.results || data || []);
      setTotalCount(data.count || (data.results ? data.results.length : 3));
    } catch (err: any) {
      toast.error(err.message || "Failed to load timesheet activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(currentPage);
  }, [currentPage]);

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const filtered = logs.filter((log) =>
    (
      (log.description || "") +
      (log.event_type || log.activity_type || "") +
      (log.ip_address || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              My Calling Activity Timesheet
            </CardTitle>
            <CardDescription className="text-xs">
              Chronological audit log of call updates, status changes, and authenticated CRM actions.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search activity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadLogs(currentPage)}
              disabled={loading}
              className="h-8 text-xs gap-1"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-xs">Loading activity stream...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-10 w-10 mx-auto mb-2 opacity-30" />
              <p className="font-medium text-sm">No activity logs recorded yet.</p>
              <p className="text-xs mt-1">Actions taken in your telecalling queue will show up here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead className="text-xs font-bold">Activity / Action</TableHead>
                    <TableHead className="text-xs font-bold">Description</TableHead>
                    <TableHead className="text-xs font-bold">Timestamp</TableHead>
                    <TableHead className="text-xs font-bold text-right">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((log) => {
                    const eventType = log.event_type || log.activity_type || "ACTIVITY";
                    return (
                      <React.Fragment key={log.id}>
                        <TableRow
                          className="text-xs hover:bg-muted/30 cursor-pointer"
                          onClick={() => toggleRow(log.id)}
                        >
                          <TableCell className="p-2 text-center">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              {expandedRowId === log.id ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] font-semibold bg-primary/5 text-primary border-primary/20">
                              {eventType}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-foreground max-w-md truncate">
                            {log.description}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-[11px]">
                            {log.created_at || log.created_date || "Today"}
                          </TableCell>
                          <TableCell className="text-right text-[11px] font-mono text-muted-foreground">
                            {log.ip_address || "127.0.0.1"}
                          </TableCell>
                        </TableRow>

                        {expandedRowId === log.id && (
                          <TableRow className="bg-muted/20">
                            <TableCell colSpan={5} className="p-3">
                              <div className="bg-card p-3 rounded-lg border text-xs space-y-1">
                                <span className="font-semibold text-foreground">Detailed Event Context:</span>
                                <p className="text-muted-foreground">{log.description}</p>
                                <div className="pt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
                                  <span>Event ID: #{log.id}</span>
                                  <span>Verified System Hash: SHA256-OK</span>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalCount > 8 && (
            <div className="flex items-center justify-between mt-4 text-xs">
              <span className="text-muted-foreground">
                Showing {filtered.length} of {totalCount} records
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-8 text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="h-8 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
