import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  MessageSquare,
  Search,
  ArrowLeft,
  Calendar,
  FileDown,
  Loader2,
  type LucideIcon,
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
  fetchTeamLeaderAllLeadsByTag,
  exportTeamLeaderLeads,
} from "@/lib/services/team-leader";

interface TagReportViewProps {
  title: string;
  tag: string;
  exportStatus: string;
  description: string;
  icon: LucideIcon;
  badgeColor?: string;
}

export function TagReportView({
  title,
  tag,
  exportStatus,
  description,
  icon: Icon,
  badgeColor = "text-[#6732F2]",
}: TagReportViewProps) {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchTeamLeaderAllLeadsByTag(tag);
      setLeads(data.results || data || []);
    } catch (err: any) {
      toast.error(err.message || `Failed to load ${title}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tag]);

  const handleExport = async () => {
    try {
      await exportTeamLeaderLeads({ status: exportStatus });
      toast.success(`${title} exported successfully.`);
    } catch (err: any) {
      toast.error(err.message || "Export failed.");
    }
  };

  const filtered = leads.filter((l) =>
    ((l.name || "") + (l.call || "") + (l.status || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/team-leader">
            <Button variant="outline" size="icon" className="size-8">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <Icon className={`size-6 ${badgeColor}`} />
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">{description}</p>
          </div>
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
              Verified Records ({leads.length})
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Complete categorized leads matching this performance filter.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <Input
              placeholder="Search by customer or phone..."
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
                  <TableHead className="text-center w-20">Call</TableHead>
                  <TableHead className="text-center w-24">WhatsApp</TableHead>
                  <TableHead>Status Tag</TableHead>
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
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-xs text-gray-500">
                      No leads found under this status.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((lead, idx) => (
                    <TableRow key={lead.id || idx} className="text-xs hover:bg-gray-50/70">
                      <TableCell className="text-center font-medium">{idx + 1}.</TableCell>
                      <TableCell className="font-semibold text-gray-900">{lead.name}</TableCell>
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
                            href={`https://wa.me/91${lead.call || lead.phone}?text=${encodeURIComponent(`Hello ${lead.name}, connecting from Vrindavan Real Estate.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageSquare className="size-4" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {lead.status || title}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-gray-500">
                        {lead.updated_date
                          ? new Date(lead.updated_date).toLocaleString("en-GB")
                          : lead.created_date
                          ? new Date(lead.created_date).toLocaleString("en-GB")
                          : "N/A"}
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
