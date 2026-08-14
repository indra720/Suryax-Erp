import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  FileSpreadsheet,
  FileText,
  Columns,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/admin/post-sales/booking-demand")({
  component: BookingDemandPage,
});

const demandData = [
  {
    id: 1,
    bookingDate: "02-07-2026",
    projectName: "SURYAX INDUSTRIAL PARK",
    customer: "MukeshLead",
    phone: "+917415540909",
    unitType: "PLOT",
    unitDetail: "A18A",
    unitSize: "259.72",
    paymentPlan: "",
    statusDate: "",
    status: "",
    progressName: "",
    guidelineValue: "0",
    registryAmount: "0.00",
    dealAmount: "2000000.00",
    demandValue: "2000000.00",
    demandPercent: "0",
    demandAmt: "0",
    generateDemand: "0.00",
    demandReceived: "0.00",
    receivedAmt: "0.00",
    dueAgainstDemand: "0.00",
    dueAgainstDeal: "2000000.00",
  },
  {
    id: 2,
    bookingDate: "24-04-2026",
    projectName: "SURYAX INDUSTRIAL PARK",
    customer: "NAMIT SHARMA",
    phone: "+918239982399",
    unitType: "PLOT",
    unitDetail: "A111",
    unitSize: "889.26",
    paymentPlan: "",
    statusDate: "",
    status: "",
    progressName: "",
    guidelineValue: "0",
    registryAmount: "0.00",
    dealAmount: "1960000.00",
    demandValue: "1960000.00",
    demandPercent: "0",
    demandAmt: "0",
    generateDemand: "0.00",
    demandReceived: "0.00",
    receivedAmt: "0.00",
    dueAgainstDemand: "0.00",
    dueAgainstDeal: "1960000.00",
  },
  {
    id: 3,
    bookingDate: "31-05-2021",
    projectName: "SURYAX INDUSTRIAL PARK",
    customer: "BHAWANI SHANKAR",
    phone: "9636335083",
    unitType: "PLOT",
    unitDetail: "A75",
    unitSize: "15000.00",
    paymentPlan: "",
    statusDate: "",
    status: "",
    progressName: "",
    guidelineValue: "0",
    registryAmount: "0.00",
    dealAmount: "20000100.00",
    demandValue: "20000100.00",
    demandPercent: "0",
    demandAmt: "0",
    generateDemand: "0.00",
    demandReceived: "0.00",
    receivedAmt: "0.00",
    dueAgainstDemand: "0.00",
    dueAgainstDeal: "20000100.00",
  },
  {
    id: 4,
    bookingDate: "19-01-2026",
    projectName: "SURYAX INDUSTRIAL PARK",
    customer: "HARSH CHATURVEDI",
    phone: "9350261209",
    unitType: "PLOT",
    unitDetail: "",
    unitSize: "1555.00",
    paymentPlan: "",
    statusDate: "21-05-2026",
    status: "Booked",
    progressName: "",
    guidelineValue: "0",
    registryAmount: "0.00",
    dealAmount: "9335220.00",
    demandValue: "9335220.00",
    demandPercent: "0",
    demandAmt: "0",
    generateDemand: "0.00",
    demandReceived: "0.00",
    receivedAmt: "0.00",
    dueAgainstDemand: "0.00",
    dueAgainstDeal: "9335220.00",
  },
  {
    id: 5,
    bookingDate: "19-01-2026",
    projectName: "SURYAX INDUSTRIAL PARK",
    customer: "SHOBHA CHATURVEDI",
    phone: "+919610345609",
    unitType: "PLOT",
    unitDetail: "S1",
    unitSize: "122.00",
    paymentPlan: "",
    statusDate: "21-05-2026",
    status: "Booked",
    progressName: "",
    guidelineValue: "0",
    registryAmount: "0.00",
    dealAmount: "200000.00",
    demandValue: "200000.00",
    demandPercent: "0",
    demandAmt: "0",
    generateDemand: "0.00",
    demandReceived: "0.00",
    receivedAmt: "0.00",
    dueAgainstDemand: "0.00",
    dueAgainstDeal: "200000.00",
  },
];

function BookingDemandPage() {
  const [searchOpen, setSearchOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Post Sales › Booking Demand
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Booking Demand</h1>
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
              {/* Row 1 */}
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
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select Status</option>
                    <option>Hold</option>
                    <option>Booked</option>
                    <option>Registry</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Unit Type
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select Unit Type</option>
                    <option>APARTMENT</option>
                    <option>PLOT</option>
                    <option>ROWHOUSE</option>
                    <option>MEMBER</option>
                    <option>COMMERCIAL</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select Project</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Unit No.
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select Unit No.</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-end">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Unit Size
                  </label>
                  <input
                    type="text"
                    placeholder="Size"
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Booking No.
                  </label>
                  <input
                    type="text"
                    placeholder="Booking No."
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Customer Name"
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Customer No."
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Associate Name
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select</option>
                    <option>Pramod koolwal - SX 10003</option>
                    <option>Aarif Khan - SX 10010</option>
                    <option>sunita sharma - SX 10272</option>
                    <option>SURYAX PRIVATE LIMITED - 123456</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="h-8 px-3 bg-gray-600 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap">
                    Show Team Wise
                  </button>
                  <button className="h-8 px-4 bg-[#6732F2] text-white text-xs font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
                    Show
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===================== BOOKING DEMAND LIST ===================== */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">
              Booking Demand List
            </h2>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <MessageSquare className="size-3.5" />
                Send MSG
              </button>
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
                  <option>100</option>
                  <option>All</option>
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
            <table className="w-full text-xs text-left min-w-[1800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Action
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Booking Date
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Project name
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Phone
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Unit Type
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Unit Detail
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Unit Size
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Payment Plan
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Status Date
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Progress Name
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Guideline Value
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Registry Amount
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Deal Amount
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Demand value
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Demand %
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Demand Amt.
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Generate Demand
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Demand Received
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Received Amt.
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Due Against Demand
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Due Against Deal
                  </th>
                </tr>
              </thead>
              <tbody>
                {demandData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    <td className="px-3 py-2.5">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap" />
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.bookingDate}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.projectName}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.customer}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.phone}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.unitType}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.unitDetail}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.unitSize}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.paymentPlan}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.statusDate}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {row.status && (
                        <span className="text-[#6732F2] font-medium">
                          {row.status}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.progressName}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.guidelineValue}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.registryAmount}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.dealAmount}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.demandValue}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.demandPercent}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.demandAmt}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.generateDemand}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.demandReceived}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.receivedAmt}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.dueAgainstDemand}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.dueAgainstDeal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}