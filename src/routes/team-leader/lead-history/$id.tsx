import React, { useState, useEffect } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Search, Clock, History, Loader2 } from "lucide-react";
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
import { fetchTeamLeaderLeadHistory } from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/lead-history/$id")({
  head: () => ({
    meta: [
      { title: "Lead History & Timeline | Team Leader Portal" },
      { name: "description", content: "Inspect historical follow-up remarks and status transitions." },
    ],
  }),
  component: TeamLeaderLeadHistoryPage,
});

export function TeamLeaderLeadHistoryPage() {
  const { id: leadId } = Route.useParams();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadHistory() {
      if (!leadId) return;
      setLoading(true);
      try {
        const res = await fetchTeamLeaderLeadHistory(leadId);
        setData(res.results || res || []);
      } catch (err: any) {
        toast.error(err.message || "Failed to load lead history.");
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, [leadId]);

  const filteredHistory = data.filter((item) =>
    ((item.name || "") + (item.message || "") + (item.status || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => router.history.back()}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <History className="size-5 text-[#6732F2]" />
            Lead Follow-up History (Lead #{leadId})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Timeline audit trail of customer communication, status changes, and staff notes.
          </p>
        </div>
      </div>

      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-gray-900">Follow-up Logs</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Total historical interactions recorded for this prospect.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <Input
              placeholder="Search history remarks..."
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
                  <TableHead>Status</TableHead>
                  <TableHead>Remark / Notes</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={5} className="py-4 text-center">
                        <div className="h-6 bg-gray-100 animate-pulse rounded-md" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-28 text-center text-xs text-gray-500">
                      No follow-up history logged for this lead.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistory.map((item, idx) => (
                    <TableRow key={item.id || idx} className="text-xs hover:bg-gray-50/70">
                      <TableCell className="text-center font-medium">{idx + 1}.</TableCell>
                      <TableCell className="font-semibold text-gray-900">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 max-w-md truncate">
                        {item.message || "Follow-up logged"}
                      </TableCell>
                      <TableCell className="text-right font-mono text-gray-500">
                        {item.created_date ? new Date(item.created_date).toLocaleString("en-GB") : "N/A"}
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
