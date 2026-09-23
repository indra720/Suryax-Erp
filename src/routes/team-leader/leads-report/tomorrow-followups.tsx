import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Phone,
  MessageSquare,
  Search,
  FileDown,
  Filter,
  RotateCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  getTeamCustomersByTag,
  exportTeamLeaderLeads,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/leads-report/tomorrow-followups")({
  head: () => ({
    meta: [
      { title: "Tomorrow Follow-ups Queue | Team Leader Portal" },
      { name: "description", content: "Prospects queued for upcoming follow-up calls tomorrow." },
    ],
  }),
  component: TeamLeaderTomorrowFollowupsPage,
});

export function TeamLeaderTomorrowFollowupsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getTeamCustomersByTag(
        "tommorrow_follow",
        startDate || undefined,
        endDate || undefined
      );
      setLeads(data.leads || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load tomorrow followups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExport = async () => {
    try {
      const payload: { status: string; start_date?: string; end_date?: string } = {
        status: "tomorrow_followups",
      };
      if (startDate) payload.start_date = startDate;
      if (endDate) payload.end_date = endDate;
      await exportTeamLeaderLeads(payload);
      toast.success("Tomorrow follow-up leads exported successfully.");
    } catch (err: any) {
      toast.error(err.message || "Export failed.");
    }
  };

  const filtered = leads.filter((l) =>
    ((l.name || "") + (l.call || "") + (l.message || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <CalendarDays className="size-6 text-blue-600" />
            Tomorrow Follow-ups Queue
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Prospects booked for callbacks, detailed cost sheets, and site visit scheduling tomorrow.
          </p>
        </div>
        <Button
          onClick={handleExport}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5"
        >
          <FileDown className="size-3.5" />
          Export Excel
        </Button>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="space-y-1 flex-1">
              <Label className="text-xs font-semibold text-gray-600">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1 flex-1">
              <Label className="text-xs font-semibold text-gray-600">End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={loadData}
                disabled={loading}
                size="sm"
                className="h-9 text-xs bg-[#6732F2] hover:bg-[#5524cf] text-white flex items-center gap-1.5"
              >
                <Filter className="size-3.5" /> Filter
              </Button>
              <Button
                onClick={() => { setStartDate(""); setEndDate(""); loadData(); }}
                disabled={loading}
                variant="outline"
                size="sm"
                className="h-9 text-xs flex items-center gap-1.5"
              >
                <RotateCw className="size-3.5" /> Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 pb-2 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
              Tomorrow Follow-ups ({leads.length})
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Upcoming scheduled calls for tomorrow's telecalling shifts.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <Input
              placeholder="Search by customer name or phone..."
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
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center w-20">Call</TableHead>
                  <TableHead className="text-center w-24">WhatsApp</TableHead>
                  <TableHead className="hidden md:table-cell">Remarks</TableHead>
                  <TableHead className="text-right">History</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={8} className="py-4 text-center">
                        <div className="h-6 bg-gray-100 animate-pulse rounded-md" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-xs text-gray-500">
                      No follow-ups queued for tomorrow.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((lead, idx) => (
                    <TableRow key={lead.id || idx} className="text-xs hover:bg-gray-50/70">
                      <TableCell className="text-center font-medium">{idx + 1}.</TableCell>
                      <TableCell className="font-semibold text-gray-900">{lead.name}</TableCell>
                      <TableCell className="font-mono text-blue-700">
                        {lead.follow_up_date || "Tomorrow"}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-[10px]">
                          Tomorrow Scheduled
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="size-7 text-blue-600" asChild>
                          <a href={`tel:${lead.call || lead.phone}`} title="Call">
                            <Phone className="size-4" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="size-7 text-emerald-600" asChild>
                          <a
                            href={`https://wa.me/91${lead.call || lead.phone}?text=${encodeURIComponent(`Hello ${lead.name}, connecting regarding your scheduled discussion with Vrindavan Real Estate.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageSquare className="size-4" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-600 max-w-xs truncate">
                        {lead.message || "Scheduled discussion tomorrow"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to="/team-leader/lead-history/$id" params={{ id: String(lead.id || 1) }}>
                          <Button variant="link" size="sm" className="p-0 text-xs font-semibold text-[#6732F2]">
                            History
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
