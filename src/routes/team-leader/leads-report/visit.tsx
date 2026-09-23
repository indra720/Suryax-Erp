import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Eye,
  Phone,
  MessageSquare,
  Search,
  FileDown,
  Calendar,
  Building2,
  User,
} from "lucide-react";
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
import {
  fetchTeamLeaderVisitLeads,
  exportTeamLeaderLeads,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/leads-report/visit")({
  head: () => ({
    meta: [
      { title: "Site Visits Scheduled | Team Leader Portal" },
      { name: "description", content: "Site visits booked by staff telecallers across Vrindavan projects." },
    ],
  }),
  component: TeamLeaderVisitsReportPage,
});

export function TeamLeaderVisitsReportPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchTeamLeaderVisitLeads();
      setLeads(data.items || data.results || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load visit leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExport = async () => {
    try {
      await exportTeamLeaderLeads({
        status: "visit_leads",
      });
      toast.success("Site visits exported successfully.");
    } catch (err: any) {
      toast.error(err.message || "Export failed.");
    }
  };

  const filtered = leads.filter((l) =>
    ((l.name || "") + (l.phone || "") + (l.project || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Eye className="size-6 text-green-600" />
            Project Site Visits Report
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Prospects booked for on-site physical property inspections and showroom walkthroughs.
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

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 pb-2 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
              Site Visits List ({leads.length})
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Scheduled customer inspections with project and assigned telecaller details.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <Input
              placeholder="Search by customer or project..."
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
                  <TableHead>Project Target</TableHead>
                  <TableHead>Visit Date</TableHead>
                  <TableHead>Assigned Staff</TableHead>
                  <TableHead className="text-center w-20">Call</TableHead>
                  <TableHead className="text-center w-24">WhatsApp</TableHead>
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
                      No site visits recorded in this period.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((lead, idx) => (
                    <TableRow key={lead.id || idx} className="text-xs hover:bg-gray-50/70">
                      <TableCell className="text-center font-medium">{idx + 1}.</TableCell>
                      <TableCell className="font-semibold text-gray-900">{lead.name}</TableCell>
                      <TableCell className="text-gray-700">
                        {lead.project || "Vrindavan Phase-2"}
                      </TableCell>
                      <TableCell className="font-mono text-emerald-700">
                        {lead.visit_date || "Today"}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {lead.staff_name || "Neha Sharma"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="size-7 text-blue-600" asChild>
                          <a href={`tel:${lead.phone}`} title="Call Now">
                            <Phone className="size-4" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="size-7 text-emerald-600" asChild>
                          <a
                            href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(`Hello ${lead.name}, confirming your scheduled site visit with Vrindavan Real Estate.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageSquare className="size-4" />
                          </a>
                        </Button>
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
