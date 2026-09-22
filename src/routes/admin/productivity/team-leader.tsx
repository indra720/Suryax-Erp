import React, { useEffect, useState } from "react";
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

export const Route = createFileRoute("/admin/productivity/team-leader")({
  head: () => ({
    meta: [{ title: "Admin - Team Leader Productivity | Vrindavan ERP" }],
  }),
  component: ProductivityTeamLeaderPage,
});

export function ProductivityTeamLeaderPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const [teamLeaderData, setTeamLeaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      const data: any = await apiRequest("/accounts/api/admin/team-leader-report/");
      const uniqueAdminsMap = new Map();
      data.team_leaders_list?.forEach((item: any) => {
        if (item.admin && item.admin.id) {
          uniqueAdminsMap.set(item.admin.id, item.admin);
        }
      });
      const uniqueAdmins = Array.from(uniqueAdminsMap.values());
      setAdmins(uniqueAdmins);
    } catch {
      // Fallback demo admins
      setAdmins([
        { id: 1, name: "Admin Branch 1", email: "admin1@vrindavan.com" },
        { id: 2, name: "Admin Branch 2", email: "admin2@vrindavan.com" },
      ]);
    }
  };

  const fetchTeamLeaderData = async (
    adminId?: string,
    start?: Date | undefined,
    end?: Date | undefined
  ) => {
    const formattedStartDate = start ? format(start, "yyyy-MM-dd") : undefined;
    const formattedEndDate = end ? format(end, "yyyy-MM-dd") : undefined;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (adminId && adminId !== "all-admins") {
        params.append("admin", adminId);
      }
      if (formattedStartDate) params.append("start_date", formattedStartDate);
      if (formattedEndDate) params.append("end_date", formattedEndDate);

      const qStr = params.toString() ? `?${params.toString()}` : "";
      const data: any = await apiRequest(`/accounts/api/productivity/team-leader-report/${qStr}`);
      if (data && (data.staff_data || data.team_leader_data)) {
        setTeamLeaderData({
          ...data,
          staff_data: data.staff_data || data.team_leader_data,
        });
      } else {
        setTeamLeaderData({
          staff_data: [],
          total_all_calls: 0,
          total_all_interested: 0,
          total_all_visit: 0,
          total_all_not_interested: 0,
          total_all_other_location: 0,
          total_all_lost: 0,
        });
      }
    } catch {
      // Fallback matching Screenshot 1 empty state or default structure
      setTeamLeaderData({
        staff_data: [],
        total_all_calls: 0,
        total_all_interested: 0,
        total_all_visit: 0,
        total_all_not_interested: 0,
        total_all_other_location: 0,
        total_all_lost: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchTeamLeaderData(selectedAdmin, startDate, endDate);
  }, []);

  const handleAdminChange = (value: string) => {
    setSelectedAdmin(value);
  };

  const handleApplyFilter = () => {
    fetchTeamLeaderData(selectedAdmin, startDate, endDate);
  };

  const handleClearFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedAdmin("");
    fetchTeamLeaderData("", undefined, undefined);
  };

  const toggleRow = (rowId: number) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const staffData = teamLeaderData?.staff_data || [];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <BarChart3 className="size-6 text-brand" />
          Productivity Index
        </h1>
      </div>

      {/* Filter Card matching Screenshot 1 */}
      <Card className="shadow-sm border rounded-2xl bg-white">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="admin-select" className="text-xs font-semibold text-gray-700">
                TeamLeader
              </Label>
              <Select value={selectedAdmin} onValueChange={handleAdminChange}>
                <SelectTrigger id="admin-select" className="h-10 text-xs bg-white">
                  <SelectValue placeholder="Select Admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-admins">All TeamLeader</SelectItem>
                  {admins.map((admin) => (
                    <SelectItem key={admin.id} value={admin.id.toString()}>
                      {admin.name || admin.email}
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

      {/* Table Card matching Screenshot 1 */}
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
                      Loading team leader productivity data...
                    </TableCell>
                  </TableRow>
                ) : staffData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-28 text-center text-xs text-gray-400 font-medium">
                      No matching records found
                    </TableCell>
                  </TableRow>
                ) : (
                  staffData.map((row: any, i: number) => (
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
                          {row.interested_percentage ?? 0}%
                        </TableCell>
                        <TableCell className="text-xs font-medium text-right text-gray-900">
                          {row.visit_percentage ?? 0}%
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
                              <div className="flex justify-between p-1.5 bg-white border rounded">
                                <span className="text-gray-500">Interested %:</span>
                                <span className="font-semibold">{row.interested_percentage ?? 0}%</span>
                              </div>
                              <div className="flex justify-between p-1.5 bg-white border rounded">
                                <span className="text-gray-500">Visit %:</span>
                                <span className="font-semibold">{row.visit_percentage ?? 0}%</span>
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
                    {teamLeaderData?.total_all_calls || 0}
                  </TableCell>
                  <TableCell className="hidden md:table-cell py-3 text-emerald-700">
                    {teamLeaderData?.total_all_interested || 0}
                  </TableCell>
                  <TableCell className="hidden md:table-cell py-3 text-teal-700">
                    {teamLeaderData?.total_all_visit || 0}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-3 text-rose-600">
                    {teamLeaderData?.total_all_not_interested || 0}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-3 text-amber-600">
                    {teamLeaderData?.total_all_other_location || 0}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-3 text-gray-600">
                    {teamLeaderData?.total_all_lost || 0}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell py-3">
                    {teamLeaderData?.total_all_calls > 0
                      ? Math.round(
                          (teamLeaderData.total_all_interested / teamLeaderData.total_all_calls) * 100
                        )
                      : 0}
                    %
                  </TableCell>
                  <TableCell className="text-right py-3">
                    {teamLeaderData?.total_all_calls > 0
                      ? Math.round(
                          (teamLeaderData.total_all_visit / teamLeaderData.total_all_calls) * 100
                        )
                      : 0}
                    %
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

export default ProductivityTeamLeaderPage;
