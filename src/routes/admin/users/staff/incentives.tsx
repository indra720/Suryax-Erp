import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Award,
  Calendar,
  DollarSign,
  Download,
  Filter,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchAdminStaffIncentive } from "@/lib/services/api";

export const Route = createFileRoute("/admin/users/staff/incentives")({
  head: () => ({
    meta: [{ title: "Staff Incentive Calculation | Vrindavan ERP" }],
  }),
  component: AdminStaffIncentivesPage,
});

export function AdminStaffIncentivesPage() {
  const [incentives, setIncentives] = useState<any[]>([]);
  const [totalPayout, setTotalPayout] = useState(130000);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminStaffIncentive(undefined, year, month);
      if (res?.incentives) {
        setIncentives(res.incentives);
        if (res.total_payout) setTotalPayout(res.total_payout);
      } else if (Array.isArray(res)) {
        setIncentives(res);
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to load staff incentives.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [year, month]);

  const filteredIncentives = incentives.filter((item) =>
    item.staff_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin/users/staff" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <Award className="size-6 text-brand" />
              Telecalling Performance Incentives
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 ml-6">
            Incentive slabs, point calculation &amp; payout approvals based on confirmed plot bookings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" className="text-xs bg-brand hover:bg-brand-dark text-white font-semibold">
            <CheckCircle2 className="size-3.5 mr-1" />
            Approve All Payouts
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border rounded-xl p-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs">
          <span className="text-xs font-semibold text-amber-100">Total Incentive Pool</span>
          <div className="text-2xl font-black mt-1">₹{totalPayout.toLocaleString()}</div>
          <p className="text-[10px] text-amber-100 mt-1">Calculated for {month}/{year}</p>
        </Card>

        <Card className="border rounded-xl p-4 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Incentive Slab Rate</span>
          <div className="text-2xl font-bold text-gray-800 mt-1">₹10,000 / Plot</div>
          <p className="text-[10px] text-emerald-600 mt-1">+₹5,000 bonus on 4+ bookings</p>
        </Card>

        <Card className="border rounded-xl p-4 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Eligible Callers</span>
          <div className="text-2xl font-bold text-brand mt-1">{incentives.length} Staff</div>
          <p className="text-[10px] text-gray-500 mt-1">Achieved minimum sales target</p>
        </Card>
      </div>

      {/* Table */}
      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="relative w-72">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Telecaller Staff</th>
                <th className="px-4 py-3 text-center">Plots Booked</th>
                <th className="px-4 py-3 text-center">Reward Points</th>
                <th className="px-4 py-3 text-right">Incentive Amount</th>
                <th className="px-4 py-3 text-center">Approval Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    Loading incentives...
                  </td>
                </tr>
              ) : filteredIncentives.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    No incentives recorded for this period.
                  </td>
                </tr>
              ) : (
                filteredIncentives.map((row) => (
                  <tr key={row.staff_id} className="hover:bg-gray-50/70">
                    <td className="px-4 py-3 font-bold text-gray-900">{row.staff_name}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600">{row.plots_booked}</td>
                    <td className="px-4 py-3 text-center font-bold text-purple-600">{row.points} pts</td>
                    <td className="px-4 py-3 text-right font-mono font-extrabold text-emerald-600 text-sm">
                      ₹{row.incentive_amount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : row.status === "Approved"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-brand hover:text-brand-dark">
                        View Deals
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
