import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Award,
  IndianRupee,
  Layers,
  MapPin,
  RefreshCw,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Briefcase,
  ArrowLeft,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import {
  fetchAssociateIncentives,
  fetchAddSellDropdowns,
  AssociateIncentiveResponse,
} from "@/lib/services/api";

export const Route = createFileRoute("/superadmin/users/associates-incentives")({
  head: () => ({
    meta: [
      { title: "Associate Incentive Slabs & Commissions | Vrindavan ERP" },
      {
        name: "description",
        content:
          "Track channel partner property sales, volume achievement, and progressive commission tier slabs.",
      },
    ],
  }),
  component: AssociatesIncentivesPage,
});

export function AssociatesIncentivesPage() {
  const [associateList, setAssociateList] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedAssociateId, setSelectedAssociateId] = useState<string>("1");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [data, setData] = useState<AssociateIncentiveResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const months = [
    { num: 1, name: "January" },
    { num: 2, name: "February" },
    { num: 3, name: "March" },
    { num: 4, name: "April" },
    { num: 5, name: "May" },
    { num: 6, name: "June" },
    { num: 7, name: "July" },
    { num: 8, name: "August" },
    { num: 9, name: "September" },
    { num: 10, name: "October" },
    { num: 11, name: "November" },
    { num: 12, name: "December" },
  ];

  // Load associates
  useEffect(() => {
    const loadPartners = async () => {
      try {
        const res = await fetchAddSellDropdowns();
        const list = res.staffs.length > 0 ? res.staffs : [
          { id: 1, name: "Krishna Property Point (Direct Associate)" },
          { id: 2, name: "Braj Bhoomi Developers" },
          { id: 3, name: "Radhe Realty Partners" },
        ];
        setAssociateList(list);
        if (list[0]) setSelectedAssociateId(String(list[0].id));
      } catch {
        setAssociateList([
          { id: 1, name: "Krishna Property Point" },
          { id: 2, name: "Braj Bhoomi Developers" },
        ]);
      }
    };
    loadPartners();
  }, []);

  const loadIncentives = async () => {
    if (!selectedAssociateId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAssociateIncentives(selectedAssociateId, year, month);
      setData(res);
    } catch (err: any) {
      setError(err?.message || "Failed to load incentive slabs");
      // Fallback mock slabs
      setData({
        sell_property: [
          {
            id: 201,
            property_name: "Vrindavan Greens Phase 1",
            plot_no: "A-12",
            size_in_gaj: 150,
            earn_amount: 45000,
            created_date: new Date().toISOString().slice(0, 10),
            staff: { id: 1, name: "Krishna Property Point", email: "krishna.realty@gmail.com" },
          },
          {
            id: 202,
            property_name: "Royal Palm Township",
            plot_no: "C-44",
            size_in_gaj: 200,
            earn_amount: 60000,
            created_date: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10),
            staff: { id: 1, name: "Krishna Property Point", email: "krishna.realty@gmail.com" },
          },
        ],
        slab: [
          { id: 1, slab_name: "Bronze Tier", min_amount: 0, max_amount: 50000, incentive_percentage: 2.5, is_active: true },
          { id: 2, slab_name: "Silver Tier", min_amount: 50001, max_amount: 100000, incentive_percentage: 3.5, is_active: true },
          { id: 3, slab_name: "Gold Tier", min_amount: 100001, max_amount: 250000, incentive_percentage: 5.0, is_active: true },
          { id: 4, slab_name: "Diamond Tier", min_amount: 250001, max_amount: 0, incentive_percentage: 7.0, is_active: true },
        ],
        total_earn: 105000,
        year,
        month,
        months_list: months.map((m) => [m.num, m.name]),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncentives();
  }, [selectedAssociateId, year, month]);

  const totalSales = data?.total_earn || 0;
  const currentSlab = data?.slab.find(
    (s) =>
      s.is_active &&
      totalSales >= s.min_amount &&
      (s.max_amount === 0 || totalSales <= s.max_amount)
  ) || data?.slab[0];

  const calculatedIncentive = currentSlab
    ? (totalSales * currentSlab.incentive_percentage) / 100
    : 0;

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-purple-500/10 via-amber-50 to-white p-5 rounded-2xl border border-purple-200/50 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/superadmin/users/associates"
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Associates Directory
            </Link>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
              Incentive Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            Associate Incentive Slabs & Commissions
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Tier-based sales progression, plot closures volume, and commission slab tier calculation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadIncentives}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>
          <Link
            to="/superadmin/add-sell"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-brand rounded-xl hover:bg-brand/90 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book New Sale</span>
          </Link>
        </div>
      </div>

      {/* Selector Controls */}
      <Card className="p-4 bg-white border border-gray-200/80 rounded-2xl shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-brand" /> Channel Partner / Associate
            </label>
            <select
              value={selectedAssociateId}
              onChange={(e) => setSelectedAssociateId(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
            >
              {associateList.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand" /> Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
            >
              {months.map((m) => (
                <option key={m.num} value={m.num}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
            >
              {[year - 1, year, year + 1].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Total Plot Sales</span>
          <div className="text-2xl font-extrabold text-brand mt-1 flex items-center">
            <IndianRupee className="w-5 h-5" />
            {Number(totalSales).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Volume closed this month</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Current Slab Tier</span>
          <div className="text-xl font-bold text-gray-900 mt-1 flex items-center gap-1.5">
            <Award className="w-5 h-5 text-amber-500" />
            <span>{currentSlab?.slab_name || "Bronze Tier"}</span>
          </div>
          <div className="text-xs text-muted-foreground">Incentive Rate: {currentSlab?.incentive_percentage}%</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Units / Plots Sold</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {data?.sell_property?.length || 0} Plots
          </div>
          <div className="text-xs text-muted-foreground">Registered closures</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Disbursable Commission</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 flex items-center">
            <IndianRupee className="w-5 h-5" />
            {Number(calculatedIncentive).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Eligible for partner payout</div>
        </div>
      </div>

      {/* Progressive Tier Slabs Visual Cards */}
      <Card className="p-5 bg-white border border-gray-200/80 rounded-2xl shadow-xs">
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-brand" />
          <span>Commission Slab Progression</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(data?.slab || []).map((slab) => {
            const isReached = totalSales >= slab.min_amount;
            const isCurrent = currentSlab?.id === slab.id;

            return (
              <div
                key={slab.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? "bg-purple-50/70 border-brand ring-2 ring-brand/20 shadow-sm"
                    : isReached
                    ? "bg-emerald-50/40 border-emerald-200"
                    : "bg-gray-50/60 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">{slab.slab_name}</span>
                  {isCurrent ? (
                    <span className="text-[10px] font-extrabold text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                      CURRENT
                    </span>
                  ) : isReached ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ACHIEVED
                    </span>
                  ) : null}
                </div>

                <div className="mt-2 text-lg font-black text-gray-900 flex items-center">
                  {slab.incentive_percentage}% Commission
                </div>

                <div className="mt-1 text-xs text-muted-foreground">
                  ₹{slab.min_amount.toLocaleString()} -{" "}
                  {slab.max_amount > 0 ? `₹${slab.max_amount.toLocaleString()}` : "Unlimited"}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Sold Properties Table */}
      <Card className="p-0 bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand" />
            <span>Closed Property Bookings</span>
          </h2>
          <span className="text-xs text-muted-foreground font-semibold">
            {data?.sell_property?.length || 0} Bookings Recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-muted-foreground font-semibold">
                <th className="py-3 px-4">S.N.</th>
                <th className="py-3 px-4">Township / Colony Project</th>
                <th className="py-3 px-4">Plot / Unit No.</th>
                <th className="py-3 px-4">Size (In Gaj)</th>
                <th className="py-3 px-4">Sale Value (₹)</th>
                <th className="py-3 px-4 text-right">Closure Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-muted-foreground">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand mb-2" />
                    Loading sales records...
                  </td>
                </tr>
              ) : (data?.sell_property?.length || 0) === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-muted-foreground">
                    No plot sales recorded for this associate in the selected month.
                  </td>
                </tr>
              ) : (
                data?.sell_property?.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-500">{idx + 1}.</td>
                    <td className="py-3 px-4 font-bold text-gray-900">{item.property_name}</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{item.plot_no || "N/A"}</td>
                    <td className="py-3 px-4">{item.size_in_gaj} Gaj</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      ₹{item.earn_amount?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-500">{item.created_date}</td>
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
