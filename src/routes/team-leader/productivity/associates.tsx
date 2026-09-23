import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { UsersRound, Calendar, Filter, Minus, Plus, RotateCw } from "lucide-react";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { fetchTeamLeaderFreelancerProductivity } from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/productivity/associates")({
  head: () => ({
    meta: [
      { title: "Associates Productivity Index | Team Leader Portal" },
      { name: "description", content: "Freelancer broker and field associate lead conversion benchmark." },
    ],
  }),
  component: TeamLeaderAssociatesProductivityPage,
});

export function TeamLeaderAssociatesProductivityPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchTeamLeaderFreelancerProductivity(
        startDate || undefined,
        endDate || undefined
      );
      setData(res.freelancer_data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load associate productivity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <UsersRound className="size-6 text-[#6732F2]" />
            Associates &amp; Freelancers Productivity
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Review performance ratios and lead generation output from channel partners and external associates.
          </p>
        </div>
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
        <CardHeader className="p-3 sm:p-4 border-b">
          <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
            Associates Calling Benchmark ({data.length})
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Conversion metrics recorded for channel partners and registered freelancer associates.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 text-[11px] font-semibold text-gray-600 uppercase">
                  <TableHead className="w-12 text-center">S.N.</TableHead>
                  <TableHead>Associate Name</TableHead>
                  <TableHead className="text-center font-bold">Total Calls</TableHead>
                  <TableHead className="text-center text-teal-600">Interested</TableHead>
                  <TableHead className="text-center text-emerald-600">Visits</TableHead>
                  <TableHead className="text-center hidden md:table-cell text-rose-600">Not Int.</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Other Loc.</TableHead>
                  <TableHead className="text-center hidden md:table-cell text-gray-500">Lost</TableHead>
                  <TableHead className="text-center font-bold text-teal-700">Interested %</TableHead>
                  <TableHead className="text-right font-bold text-emerald-700">Visit %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 2 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={10} className="py-4 text-center">
                        <div className="h-6 bg-gray-100 animate-pulse rounded-md" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center text-xs text-gray-500">
                      No associate productivity recorded for this date range.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, idx) => (
                    <React.Fragment key={row.id || idx}>
                      <TableRow className="text-xs hover:bg-gray-50/70">
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => toggleRow(row.id || idx)}
                              className="md:hidden p-1 text-gray-500"
                            >
                              {expandedRowId === (row.id || idx) ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                            </button>
                            <span>{idx + 1}.</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">{row.name}</TableCell>
                        <TableCell className="text-center font-extrabold text-gray-900">{row.total_calls}</TableCell>
                        <TableCell className="text-center font-bold text-teal-600">{row.interested}</TableCell>
                        <TableCell className="text-center font-bold text-emerald-600">{row.visit}</TableCell>
                        <TableCell className="text-center hidden md:table-cell text-rose-600">{row.not_interested}</TableCell>
                        <TableCell className="text-center hidden md:table-cell text-gray-700">{row.other_location}</TableCell>
                        <TableCell className="text-center hidden md:table-cell text-gray-500">{row.lost}</TableCell>
                        <TableCell className="text-center font-bold text-teal-700">
                          {row.interested_percentage}%
                        </TableCell>
                        <TableCell className="text-right font-bold text-emerald-700">
                          {row.visit_percentage}%
                        </TableCell>
                      </TableRow>

                      {expandedRowId === (row.id || idx) && (
                        <TableRow className="md:hidden bg-purple-50/20">
                          <TableCell colSpan={10} className="p-3">
                            <div className="grid grid-cols-3 gap-2 text-xs p-2 bg-white rounded border">
                              <div><span className="font-semibold">Not Int.:</span> {row.not_interested}</div>
                              <div><span className="font-semibold">Other Loc.:</span> {row.other_location}</div>
                              <div><span className="font-semibold">Lost:</span> {row.lost}</div>
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
