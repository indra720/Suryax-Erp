import React, { useEffect, useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Filter, X, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { apiRequest } from "@/lib/services/api";

export const Route = createFileRoute("/admin/productivity/associates")({
  head: () => ({
    meta: [{ title: "Admin - Associates Productivity | Vrindavan ERP" }],
  }),
  component: ProductivityAssociatesPage,
});

export function ProductivityAssociatesPage() {
  const [teamLeaders, setTeamLeaders] = useState<any[]>([]);
  const [selectedTeamLeader, setSelectedTeamLeader] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const [associatesData, setAssociatesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTeamLeaders = async () => {
    try {
      const data: any = await apiRequest("/accounts/api/admin/team-leader-report/");
      setTeamLeaders(data.team_leaders_list || []);
    } catch {
      setTeamLeaders([
        { id: 1, name: "Neha Patel" },
        { id: 2, name: "Vikas Singh" },
      ]);
    }
  };

  const fetchAssociatesData = async (
    filterStartDate?: Date | undefined,
    filterEndDate?: Date | undefined
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedTeamLeader && selectedTeamLeader !== "all-team-leaders") {
        params.append("team_leader", selectedTeamLeader);
      }
      const formattedStartDate = filterStartDate ? format(filterStartDate, "yyyy-MM-dd") : undefined;
      const formattedEndDate = filterEndDate ? format(filterEndDate, "yyyy-MM-dd") : undefined;

      if (formattedStartDate) params.append("start_date", formattedStartDate);
      if (formattedEndDate) params.append("end_date", formattedEndDate);

      const qStr = params.toString() ? `?${params.toString()}` : "";
      const data: any = await apiRequest(`/accounts/api/productivity/freelancer-report/${qStr}`);
      setAssociatesData(data);
    } catch {
      setAssociatesData({
        team_leader_data: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamLeaders();
    fetchAssociatesData(startDate, endDate);
  }, []);

  const handleApplyFilter = () => {
    fetchAssociatesData(startDate, endDate);
  };

  const handleClearFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedTeamLeader("");
    fetchAssociatesData(undefined, undefined);
  };

  const toggleRow = (rowId: number) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const list = associatesData?.team_leader_data || [];

  const totals = useMemo(() => {
    const res = {
      calls: 0,
      interested: 0,
      visit: 0,
      not_interested: 0,
      other_location: 0,
      lost: 0,
    };
    list.forEach((item: any) => {
      res.calls += item.total_calls || 0;
      res.interested += item.interested || 0;
      res.visit += item.visit || 0;
      res.not_interested += item.not_interested || 0;
      res.other_location += item.other_location || 0;
      res.lost += item.lost || 0;
    });
    return res;
  }, [list]);

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <BarChart3 className="size-6 text-brand" />
          Productivity Index
        </h1>
      </div>

      {/* Filter Card */}
      <Card className="shadow-sm border rounded-2xl bg-white">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="tl-select" className="text-xs font-semibold text-gray-700">
                TeamLeader
              </Label>
              <Select value={selectedTeamLeader} onValueChange={setSelectedTeamLeader}>
                <SelectTrigger id="tl-select" className="h-10 text-xs bg-white">
                  <SelectValue placeholder="Select TeamLeader" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-team-leaders">All TeamLeader</SelectItem>
                  {teamLeaders.map((tl) => (
                    <SelectItem key={tl.id} value={tl.id.toString()}>
                      {tl.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="start-date" className="text-xs font-semibold text-gray-700">
                Start Date
              </Label>
              <DatePicker date={startDate} setDate={setStartDate} placeholder="Pick a date" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="end-date" className="text-xs font-semibold text-gray-700">
                End Date
              </Label>
              <DatePicker date={endDate} setDate={setEndDate} placeholder="Pick a date" />
            </div>

            <div className="flex gap-2">
              <Button
                className="w-full flex items-center justify-center gap-2 h-10 bg-brand hover:bg-brand-dark text-white font-semibold text-xs rounded-lg shadow-sm"
                onClick={handleApplyFilter}
              >
                <Filter className="h-4 w-4" />
                Apply Filter
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-10 border-gray-300 text-gray-700 hover:bg-gray-50 text-xs rounded-lg font-medium"
                onClick={handleClearFilter}
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card className="shadow-sm border rounded-2xl bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/75 border-b text-gray-700">
                  <TableHead className="w-16 font-bold text-xs">S.N.</TableHead>
                  <TableHead className="font-bold text-xs">Name</TableHead>
                  <TableHead className="font-bold text-xs hidden md:table-cell">Total Calls</TableHead>
                  <TableHead className="font-bold text-xs hidden md:table-cell">Interested</TableHead>
                  <TableHead className="font-bold text-xs hidden md:table-cell">Visit</TableHead>
                  <TableHead className="font-bold text-xs hidden lg:table-cell">Not Interested</TableHead>
                  <TableHead className="font-bold text-xs hidden lg:table-cell">Other Location</TableHead>
                  <TableHead className="font-bold text-xs hidden lg:table-cell">Lost</TableHead>
                  <TableHead className="font-bold text-xs hidden lg:table-cell">Interested %</TableHead>
                  <TableHead className="font-bold text-xs text-right">Visit %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-28 text-center text-xs text-gray-400">
                      Loading associates productivity data...
                    </TableCell>
                  </TableRow>
                ) : list.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-28 text-center text-xs text-gray-400 font-medium">
                      No matching records found
                    </TableCell>
                  </TableRow>
                ) : (
                  list.map((row: any, i: number) => (
                    <React.Fragment key={row.id || i}>
                      <TableRow className="hover:bg-gray-50/60 transition-colors">
                        <TableCell className="text-xs font-semibold text-gray-600">
                          <div className="lg:hidden">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-brand h-6 w-6"
                              onClick={() => toggleRow(row.id || i)}
                            >
                              {expandedRowId === (row.id || i) ? (
                                <Minus className="h-3.5 w-3.5" />
                              ) : (
                                <Plus className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </div>
                          <div className="hidden lg:block">{i + 1}.</div>
                        </TableCell>
                        <TableCell className="text-xs font-semibold text-gray-900">
                          {row.name}
                        </TableCell>
                        <TableCell className="text-xs text-gray-700 hidden md:table-cell">
                          {row.total_calls ?? 0}
                        </TableCell>
                        <TableCell className="text-xs text-emerald-600 font-semibold hidden md:table-cell">
                          {row.interested ?? 0}
                        </TableCell>
                        <TableCell className="text-xs text-teal-600 font-semibold hidden md:table-cell">
                          {row.visit ?? 0}
                        </TableCell>
                        <TableCell className="text-xs text-rose-500 hidden lg:table-cell">
                          {row.not_interested ?? 0}
                        </TableCell>
                        <TableCell className="text-xs text-amber-600 hidden lg:table-cell">
                          {row.other_location ?? 0}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500 hidden lg:table-cell">
                          {row.lost ?? 0}
                        </TableCell>
                        <TableCell className="text-xs font-medium text-gray-700 hidden lg:table-cell">
                          {row.total_calls > 0 ? Math.round((row.interested / row.total_calls) * 100) : 0}%
                        </TableCell>
                        <TableCell className="text-xs font-medium text-right text-gray-900">
                          {row.total_calls > 0 ? Math.round((row.visit / row.total_calls) * 100) : 0}%
                        </TableCell>
                      </TableRow>

                      {expandedRowId === (row.id || i) && (
                        <TableRow className="lg:hidden bg-gray-50/50">
                          <TableCell colSpan={10} className="p-3">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex justify-between p-1.5 bg-white border rounded">
                                <span className="text-gray-500">Total Calls:</span>
                                <span className="font-semibold">{row.total_calls ?? 0}</span>
                              </div>
                              <div className="flex justify-between p-1.5 bg-white border rounded">
                                <span className="text-gray-500">Interested:</span>
                                <span className="font-semibold text-emerald-600">{row.interested ?? 0}</span>
                              </div>
                              <div className="flex justify-between p-1.5 bg-white border rounded">
                                <span className="text-gray-500">Visit:</span>
                                <span className="font-semibold text-teal-600">{row.visit ?? 0}</span>
                              </div>
                              <div className="flex justify-between p-1.5 bg-white border rounded">
                                <span className="text-gray-500">Not Interested:</span>
                                <span className="font-semibold text-rose-600">{row.not_interested ?? 0}</span>
                              </div>
                              <div className="flex justify-between p-1.5 bg-white border rounded">
                                <span className="text-gray-500">Other Location:</span>
                                <span className="font-semibold text-amber-600">{row.other_location ?? 0}</span>
                              </div>
                              <div className="flex justify-between p-1.5 bg-white border rounded">
                                <span className="text-gray-500">Lost:</span>
                                <span className="font-semibold">{row.lost ?? 0}</span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>

              <TableFooter>
                <TableRow className="bg-gray-100/80 font-bold text-xs text-gray-900 border-t">
                  <TableCell colSpan={2} className="py-3">Total</TableCell>
                  <TableCell className="hidden md:table-cell py-3">
                    {totals.calls}
                  </TableCell>
                  <TableCell className="hidden md:table-cell py-3 text-emerald-700">
                    {totals.interested}
                  </TableCell>
                  <TableCell className="hidden md:table-cell py-3 text-teal-700">
                    {totals.visit}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-3 text-rose-600">
                    {totals.not_interested}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-3 text-amber-600">
                    {totals.other_location}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-3 text-gray-600">
                    {totals.lost}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-3">
                    {totals.calls > 0 ? Math.round((totals.interested / totals.calls) * 100) : 0}%
                  </TableCell>
                  <TableCell className="text-right py-3">
                    {totals.calls > 0 ? Math.round((totals.visit / totals.calls) * 100) : 0}%
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductivityAssociatesPage;
