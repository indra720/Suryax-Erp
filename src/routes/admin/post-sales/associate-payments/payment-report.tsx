import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  Calendar,
  Filter,
} from "lucide-react";

export const Route = createFileRoute(
  "/admin/post-sales/associate-payments/payment-report"
)({
  component: PaymentReportPage,
});

const unitTypes = ["APARTMENT", "PLOT", "ROWHOUSE", "MEMBER", "COMMERCIAL"];

function PaymentReportPage() {
  const [showFilter, setShowFilter] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [unitType, setUnitType] = useState("");
  const [project, setProject] = useState("");
  const [unitNo, setUnitNo] = useState("");
  const [bookingNo, setBookingNo] = useState("");
  const [associateName, setAssociateName] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  // Summary values (mock – replace with real API data)
  const summary = {
    commission: 0.0,
    advance: 0.0,
    commissionPaid: 0.0,
    adjustment: 0.0,
  };

  // Commission Payable table data (empty for now)
  const commissionData: any[] = [];

  const handleSearch = () => {
    // Add your search/filter logic here
    console.log({
      fromDate,
      toDate,
      unitType,
      project,
      unitNo,
      bookingNo,
      associateName,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Page Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span>Home Page</span>
            <span>/</span>
            <span className="text-gray-800 font-medium">PAYMENT DETAILS</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            PAYMENT DETAILS
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* ===================== Filter Criteria ===================== */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-gray-800">Filter Criteria</span>
            </div>
            {showFilter ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {showFilter && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 pt-4">
                {/* From Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    From Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* To Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    To Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Unit Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Unit Type
                  </label>
                  <select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                  >
                    <option value="">Select Unit Type</option>
                    {unitTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Project
                  </label>
                  <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                  >
                    <option value="">Select Project</option>
                    <option value="SURYAX INDUSTRIAL PARK">
                      SURYAX INDUSTRIAL PARK
                    </option>
                  </select>
                </div>

                {/* Unit No. */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Unit No.
                  </label>
                  <select
                    value={unitNo}
                    onChange={(e) => setUnitNo(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                  >
                    <option value="">Select Unit</option>
                  </select>
                </div>

                {/* Booking No. */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Booking No.
                  </label>
                  <input
                    type="text"
                    value={bookingNo}
                    onChange={(e) => setBookingNo(e.target.value)}
                    placeholder="Booking No."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Associate Name + Search */}
              <div className="flex flex-wrap items-end gap-4 mt-4">
                <div className="w-full sm:w-64">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Associate Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={associateName}
                    onChange={(e) => setAssociateName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                  >
                    <option value="">SELECT</option>
                    <option value="Vaibhav Test Test 1">Vaibhav Test Test 1</option>
                    <option value="SURYAX PRIVATE LIMITED">
                      SURYAX PRIVATE LIMITED
                    </option>
                    <option value="Chandra Shekhar Chaturvedi">
                      Chandra Shekhar Chaturvedi
                    </option>
                    <option value="Rinki chouhan">Rinki chouhan</option>
                    <option value="Bhagirath singh Rathore">
                      Bhagirath singh Rathore
                    </option>
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===================== Summary + Commission Payable ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT: SUMMARY */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-full">
              <div className="px-5 py-3 border-b border-gray-100 bg-[#f0f4ff]">
                <h2 className="text-sm font-semibold text-gray-800 tracking-wide">
                  SUMMARY
                </h2>
              </div>

              <div className="p-5 space-y-5">
                {/* CASE RECEIVED */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    CASE RECEIVED
                  </h3>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Commission</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {summary.commission.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* PAYMENT */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    PAYMENT
                  </h3>
                  <div className="space-y-0">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Advance</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {summary.advance.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Commission Paid
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {summary.commissionPaid.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Adjustment</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {summary.adjustment.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: COMMISSION PAYABLE */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3 border-b border-gray-100 bg-[#f0f4ff]">
                <h2 className="text-sm font-semibold text-gray-800 tracking-wide">
                  COMMISSION PAYABLE
                </h2>
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Show</span>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="px-2 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  >
                    {[5, 10, 25, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span>entries</span>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-1.5 w-48 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f0f4ff] text-left">
                      <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                        Date
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                        Upto Date
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                        Associate
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                        Associate Phone
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                        Payable Amount
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                        Project
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionData.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-16 text-center text-gray-400"
                        >
                          No data available in table
                        </td>
                      </tr>
                    ) : (
                      commissionData.map((row, idx) => (
                        <tr
                          key={idx}
                          className={`hover:bg-purple-50/40 transition ${
                            idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            {row.date}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {row.uptoDate}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium">
                            {row.associate}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {row.phone}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium">
                            {row.payableAmount}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {row.project}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {row.unit}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-gray-100 bg-gray-50/50">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium text-gray-900">0</span> to{" "}
                  <span className="font-medium text-gray-900">0</span> of{" "}
                  <span className="font-medium text-gray-900">0</span> entries
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled
                    className="px-3 py-1.5 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    disabled
                    className="px-3 py-1.5 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentReportPage;