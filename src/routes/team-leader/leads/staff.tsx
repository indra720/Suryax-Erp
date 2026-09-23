import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileDown,
  Phone,
  MessageSquare,
  Search,
  ArrowLeft,
  Calendar,
  Filter,
  User,
  Minus,
  Plus,
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
  fetchTeamLeaderStaffLeadsReportByTag,
  exportTeamLeaderLeads,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/leads/staff")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search["id"] === "string" ? (search["id"] as string) : "1",
  }),
  head: () => ({
    meta: [
      { title: "Staff Calling Leads by Tag | Team Leader Portal" },
      { name: "description", content: "Filter and export staff leads categorized by response tags." },
    ],
  }),
  component: TeamLeaderStaffLeadsPage,
});

export function TeamLeaderStaffLeadsPage() {
  const { id: staffId } = Route.useSearch();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("Intrested");
  const [exportSelectedTag, setExportSelectedTag] = useState("Intrested");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const tags = ["Intrested", "Not Interested", "Other Location", "Lost", "Visit"];

  const loadStaffLeads = async () => {
    if (!staffId) return;
    setLoading(true);
    try {
      const data = await fetchTeamLeaderStaffLeadsReportByTag(Number(staffId), selectedTag);
      setLeads(data.results || data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load staff leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaffLeads();
  }, [staffId, selectedTag]);

  const handleExport = async () => {
    if (!staffId) return;
    try {
      const payload: { staff_id?: string; status: string; start_date?: string; end_date?: string } = {
        staff_id: staffId,
        status: exportSelectedTag,
      };
      if (startDate) payload.start_date = startDate;
      if (endDate) payload.end_date = endDate;
      await exportTeamLeaderLeads(payload);
      toast.success("Staff leads exported successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to export staff leads.");
    }
  };

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/team-leader">
            <Button variant="outline" size="icon" className="size-8">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              Staff Leads (Staff #{staffId})
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Inspect calls and export verified customer leads for this specific telecaller.
            </p>
          </div>
        </div>
      </div>

      {/* Export & Filter Card */}
      <Card className="border rounded-xl bg-white shadow-xs">
        <CardContent className="p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-600">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-600">End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-600">Status Tag</Label>
              <Select value={exportSelectedTag} onValueChange={setExportSelectedTag}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select Status Tag" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((t) => (
                    <SelectItem key={t} value={t} className="text-xs">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button
                onClick={handleExport}
                size="sm"
                className="h-9 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-1.5 w-full"
              >
                <FileDown className="size-3.5" />
                Export Leads (Excel)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tag Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {tags.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={selectedTag === t ? "default" : "outline"}
            onClick={() => setSelectedTag(t)}
            className={cn(
              "h-8 text-xs font-semibold shrink-0",
              selectedTag === t && "bg-[#6732F2] hover:bg-[#5524cf] text-white"
            )}
          >
            {t}
          </Button>
        ))}
      </div>

      {/* Staff Leads Table */}
      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 border-b">
          <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
            {selectedTag} Leads ({leads.length})
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Customer inquiries logged by staff #{staffId} tagged as {selectedTag}.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 text-[11px] font-semibold text-gray-600 uppercase">
                  <TableHead className="w-12 text-center">S.N.</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead className="hidden md:table-cell">Contact Phone</TableHead>
                  <TableHead>Tag Status</TableHead>
                  <TableHead className="text-center w-20">Call</TableHead>
                  <TableHead className="text-center w-24">WhatsApp</TableHead>
                  <TableHead className="hidden lg:table-cell">Date Logged</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={7} className="py-4 text-center">
                        <div className="h-6 bg-gray-100 animate-pulse rounded-md" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-28 text-center text-xs text-gray-500">
                      No leads tagged as "{selectedTag}" for this staff member.
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead, idx) => (
                    <React.Fragment key={lead.id || idx}>
                      <TableRow className="text-xs hover:bg-gray-50/70">
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => toggleRow(lead.id || idx)}
                              className="lg:hidden p-1 text-gray-500"
                            >
                              {expandedRowId === (lead.id || idx) ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                            </button>
                            <span>{idx + 1}.</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">
                          {lead.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-gray-600">
                          {lead.phone || lead.call || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px]">
                            {lead.status || selectedTag}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" className="size-7 text-blue-600" asChild>
                            <a href={`tel:${lead.phone || lead.call}`}>
                              <Phone className="size-4" />
                            </a>
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" className="size-7 text-emerald-600" asChild>
                            <a
                              href={`https://wa.me/91${lead.phone || lead.call}?text=${encodeURIComponent(`Hello ${lead.name}, greetings from Vrindavan Real Estate.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageSquare className="size-4" />
                            </a>
                          </Button>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-gray-500 font-mono">
                          {lead.created_date ? new Date(lead.created_date).toLocaleDateString("en-GB") : "N/A"}
                        </TableCell>
                      </TableRow>

                      {expandedRowId === (lead.id || idx) && (
                        <TableRow className="lg:hidden bg-purple-50/20">
                          <TableCell colSpan={7} className="p-3">
                            <div className="text-xs space-y-1 p-2 bg-white rounded border">
                              <div><span className="font-semibold">Phone:</span> {lead.phone || lead.call}</div>
                              <div><span className="font-semibold">Remarks:</span> {lead.remark || lead.message || "No notes"}</div>
                              <div><span className="font-semibold">Created:</span> {lead.created_date || "N/A"}</div>
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
    </div>
  );
}
