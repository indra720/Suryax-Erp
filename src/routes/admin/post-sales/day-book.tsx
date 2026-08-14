import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
  Columns,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/admin/post-sales/day-book")({
  component: DayBookPage,
});

const dayBookData = [
  {
    id: 1,
    transDate: "14-08-2026",
    receivedName: "",
    toPayName: "",
    projectName: "",
    headName: "Opening Balance",
    associateName: "",
    associateCode: "0",
    receiptNo: "0",
    voucherNo: "",
    paymentMode: "",
    transactionType: "",
    receiptAmount: "0.00",
    paymentAmount: "0.00",
    openingBalanceCash: "0.00",
    closingBalanceCash: "0.00",
    openingBalanceBank: "0.00",
    closingBalanceBank: "0.00",
  },
];

function DayBookPage() {
  const [searchOpen, setSearchOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Post Sales › Day Book
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Day Book</h1>
          </div>
        </div>
      </div>

      <div className=" pb-6 space-y-4">
        {/* ===================== SEARCH PANEL ===================== */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">Search Panel</span>
            {searchOpen ? (
              <ChevronUp className="size-4 text-gray-500" />
            ) : (
              <ChevronDown className="size-4 text-gray-500" />
            )}
          </button>

          {searchOpen && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Name
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Head Type
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select Status</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Payment Type
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select Status</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Associate Name
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="h-8 px-4 bg-gray-600 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
                  Show Team Wise
                </button>
                <button className="h-8 px-4 bg-[#6732F2] text-white text-xs font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors flex items-center gap-1.5">
                  <Search className="size-3.5" />
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===================== DAY BOOK LIST ===================== */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">
              Day Book List
            </h2>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <FileSpreadsheet className="size-3.5" />
                Excel
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <FileText className="size-3.5" />
                PDF
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Columns className="size-3.5" />
                Column
                <ChevronDown className="size-3" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                Show
                <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]">
                  <option>5</option>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                entries
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                Search:
                <input
                  type="text"
                  className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs w-36 focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[1600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    S#
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Trans.Date
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    ReceivedName
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    ToPayName
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    ProjectName
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    HeadName
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    AssociateName
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    AssociateCode
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    ReciptNo
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    VoucherNo
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    PaymentMode
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    TranscationType
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    ReciptAmount
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    PaymentAmount
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Opening Balance Cash
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Closing Balance Cash
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Opening Balance Bank
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Closing Balance Bank
                  </th>
                </tr>
              </thead>
              <tbody>
                {dayBookData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors bg-white"
                  >
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.transDate}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.receivedName || "—"}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.toPayName || "—"}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.projectName || "—"}
                    </td>
                    <td className="px-3 py-2.5 text-gray-800 font-medium whitespace-nowrap">
                      {row.headName}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.associateName || "—"}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.associateCode}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.receiptNo}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.voucherNo || "—"}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.paymentMode || "—"}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.transactionType || "—"}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.receiptAmount}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.paymentAmount}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.openingBalanceCash}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.closingBalanceCash}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.openingBalanceBank}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.closingBalanceBank}
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-gray-50 border-t border-gray-200 font-semibold">
                  <td colSpan={12} className="px-3 py-2.5 text-right text-gray-700">
                    Total
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                    0.00(0.00)
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                    0.00(0.00)
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                    0.00(0.00)
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                    0.00(0.00)
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                    0.00(0.00)
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                    0.00(0.00)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              Showing 1 to 1 of 1 entries
            </p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`size-8 text-xs rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-[#6732F2] text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                1
              </button>
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}