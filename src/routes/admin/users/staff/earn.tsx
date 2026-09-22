import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DollarSign,
  Calendar,
  Award,
  Users,
  Search,
  Filter,
  ArrowLeft,
  Download,
  IndianRupee,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/users/staff/earn")({
  head: () => ({
    meta: [{ title: "Staff Earnings Report | Vrindavan ERP" }],
  }),
  component: AdminStaffEarnPage,
});

export function AdminStaffEarnPage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-03");
  const [searchQuery, setSearchQuery] = useState("");

  const earnings = [
    { id: 1, staff: "Neha Patel", role: "Telecaller", baseSalary: 22000, bookings: 4, commission: 45000, total: 67000, status: "Paid" },
    { id: 2, staff: "Vikas Singh", role: "Telecaller", baseSalary: 20000, bookings: 3, commission: 30000, total: 50000, status: "Pending" },
    { id: 3, staff: "Ananya Gupta", role: "Telecaller", baseSalary: 24000, bookings: 5, commission: 55000, total: 79000, status: "Paid" },
    { id: 4, staff: "Prakash Verma", role: "Telecaller", baseSalary: 18000, bookings: 1, commission: 10000, total: 28000, status: "Processing" },
  ];

  const totalPayout = earnings.reduce((sum, e) => sum + e.total, 0);

  const filteredEarnings = earnings.filter((e) =>
    e.staff.toLowerCase().includes(searchQuery.toLowerCase())
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
              <IndianRupee className="size-6 text-brand" />
              Staff Monthly Earnings Report
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 ml-6">
            Detailed breakdown of telecaller base compensation and verified booking commissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="h-9 text-xs w-40"
          />
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
            <Download className="size-3.5" />
            Export Payroll
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border rounded-xl p-4 bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-xs">
          <span className="text-xs font-semibold text-purple-200">Total Monthly Payroll</span>
          <div className="text-2xl font-black mt-1 text-yellow-300">₹{totalPayout.toLocaleString()}</div>
          <p className="text-[10px] text-purple-200 mt-1">Includes basic + sales bonuses</p>
        </Card>

        <Card className="border rounded-xl p-4 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Total Plots Closed</span>
          <div className="text-2xl font-bold text-gray-800 mt-1">13 Units</div>
          <p className="text-[10px] text-emerald-600 mt-1">+3 units vs last month</p>
        </Card>

        <Card className="border rounded-xl p-4 bg-white shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Average Payout / Caller</span>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            ₹{Math.round(totalPayout / earnings.length).toLocaleString()}
          </div>
          <p className="text-[10px] text-blue-600 mt-1">Highest: ₹79,000 (Ananya)</p>
        </Card>
      </div>

      {/* Table */}
      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="relative w-72">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by staff name..."
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
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Base Salary</th>
                <th className="px-4 py-3 text-center">Bookings Closed</th>
                <th className="px-4 py-3 text-right">Commissions</th>
                <th className="px-4 py-3 text-right font-bold">Total Earnings</th>
                <th className="px-4 py-3 text-center">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEarnings.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/70">
                  <td className="px-4 py-3 font-bold text-gray-900">{row.staff}</td>
                  <td className="px-4 py-3 text-gray-500">{row.role}</td>
                  <td className="px-4 py-3 text-right font-mono">₹{row.baseSalary.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">{row.bookings}</td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-600 font-semibold">
                    ₹{row.commission.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-extrabold text-gray-900">
                    ₹{row.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : row.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
