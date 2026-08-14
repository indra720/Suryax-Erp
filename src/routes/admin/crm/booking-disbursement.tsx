import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/crm/booking-disbursement")({
  component: BookingDisbursementPage,
});

function BookingDisbursementPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › CRM › Disbursement List
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              Disbursement List
            </h1>
          </div>
        </div>
      </div>

      <div className=" pb-6">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">
              Disbursement List
            </h2>
            <button
              onClick={() => setOpenDialog(true)}
              className="flex items-center gap-1.5 h-9 px-4 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors self-start sm:self-auto"
            >
              <Plus className="size-4" />
              Add New
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              Show
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entries
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              Search:
              <input
                type="text"
                className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs w-40 focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[1400px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Action
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    SNo
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Customer Name
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Unit Type
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Project Name
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Unit Details
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Progress Name
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Sanction_Amt
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Demand %
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Disburse Amount
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Total DisburseAmt
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Interest Percentage
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Interest Amount
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Created Date
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Created By
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={15}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              Showing 0 to 0 of 0 entries
            </p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== CREATE DISBURSEMENT DIALOG ========== */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base font-semibold text-gray-800">
                Create Disbursement
              </DialogTitle>
              <button
                onClick={() => setOpenDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Customer Name
                </label>
                <select className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Type</option>
                </select>
              </div>

              {/* Unit Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Unit Type
                </label>
                <select className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Unit Type</option>
                  <option>Apartment</option>
                  <option>Plot</option>
                  <option>Rowhouse</option>
                  <option>Commercial</option>
                </select>
              </div>

              {/* Project */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Project
                </label>
                <select className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Project</option>
                </select>
              </div>

              {/* Unit No. */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Unit No.
                </label>
                <select className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Unit</option>
                </select>
              </div>

              {/* Progress Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Progress Name
                </label>
                <select className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Progress</option>
                </select>
              </div>

              {/* Demand % */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Demand %
                </label>
                <input
                  type="text"
                  placeholder="Demand %"
                  className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                />
              </div>

              {/* Sanction Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Sanction Amount
                </label>
                <input
                  type="text"
                  placeholder="Sanction Amount"
                  className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                />
              </div>

              {/* Disburse Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Disburse Amount
                </label>
                <input
                  type="text"
                  placeholder="Disburse Amount"
                  className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                />
              </div>

              {/* Total Disbursed */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Total Disbursed
                </label>
                <input
                  type="text"
                  placeholder="Total Disbursed"
                  className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                />
              </div>

              {/* Interest % */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Interest %
                </label>
                <input
                  type="text"
                  placeholder="Interest %"
                  className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                />
              </div>

              {/* Interest Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Interest Amount
                </label>
                <input
                  type="text"
                  placeholder="Interest Amount"
                  className="w-full h-9 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-[#6732F2] text-white rounded-lg hover:bg-[#5a2ad6] transition-colors">
                Save
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}