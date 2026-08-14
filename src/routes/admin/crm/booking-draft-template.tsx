import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/crm/booking-draft-template")({
  component: BookingDraftTemplatePage,
});

function BookingDraftTemplatePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Home › CRM › Booking Draft Template</p>
            <h1 className="text-2xl font-bold text-gray-900">Booking Draft Template</h1>
          </div>
          <button
            onClick={() => setOpenDialog(true)}
            className="flex items-center gap-1.5 h-9 px-4 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors self-start sm:self-auto"
          >
            <Plus className="size-4" />
            Add New
          </button>
        </div>
      </div>

      <div className=" pb-6">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
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
            <table className="w-full text-sm text-left min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">SNo</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Template Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Description
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">Showing 0 to 0 of 0 entries</p>

            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== ADD TEMPLATE DIALOG ========== */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md w-[95vw] p-0">
          <DialogHeader className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base font-semibold text-gray-800">
                Add Template
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
            {/* Template Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Template Name
              </label>
              <input
                type="text"
                placeholder="Enter template name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] focus:border-[#6732F2]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Enter description"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] focus:border-[#6732F2] resize-none"
              />
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                defaultChecked
                className="rounded border-gray-300 text-[#6732F2] focus:ring-[#6732F2]"
              />
              <label htmlFor="active" className="text-sm font-medium text-gray-700 cursor-pointer">
                Active
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
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
