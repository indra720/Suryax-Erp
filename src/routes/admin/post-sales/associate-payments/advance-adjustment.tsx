import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, ChevronDown, CalendarDays, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/post-sales/associate-payments/advance-adjustment")({
  component: AdvanceAdjustmentPage,
});

function AdvanceAdjustmentPage() {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const AddAdvancePaymentForm = () => (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Associate Name</label>
          <select className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]">
            <option>Select Associate</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Transaction Date</label>
          <input type="date" className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]" defaultValue="2026-08-14" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Amount</label>
          <input type="number" placeholder="Enter Amount" className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Payment Mode</label>
          <select className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]">
            <option>Select Mode</option>
            <option>Cash</option>
            <option>Bank Transfer</option>
            <option>Cheque</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Remark</label>
          <textarea rows={3} placeholder="Enter Remark" className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]" />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button className="px-6 py-2 bg-[#6732F2] text-white text-xs font-semibold rounded hover:bg-[#5a2ad6] transition-colors shadow-sm">
          Save Advance Payment
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Advance Adjustment</h1>
          <p className="text-sm text-gray-500">Home Page / Advance Adjustment</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* FILTER CRITERIA */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 bg-[#e8f0fe] border-b border-gray-200 flex items-center gap-2">
            <Search className="size-4 text-[#1a73e8]" />
            <span className="text-sm font-medium text-[#1a73e8]">Filter Criteria</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1 uppercase tracking-wider">From Date</label>
                <div className="relative">
                  <input type="date" className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1 uppercase tracking-wider">To Date</label>
                <div className="relative">
                  <input type="date" className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1 uppercase tracking-wider">Associate Name</label>
                <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none bg-white">
                  <option>Select</option>
                </select>
              </div>
              <button className="h-8 px-6 bg-[#6732F2] text-white text-xs font-medium rounded hover:bg-[#5a2ad6] transition-colors flex items-center justify-center gap-2">
                <Search className="size-3.5" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ADVANCE PAYMENT LIST */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800 uppercase tracking-tight">
                <Wallet className="size-4 text-[#6732F2]" />
                ADVANCE PAYMENT
            </div>
            
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-1.5 bg-[#6732F2] text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#5a2ad6] transition-colors shadow-sm">
                  <Plus className="size-3.5" />
                  Add New
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-[95vw]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Wallet className="size-5 text-[#6732F2]" />
                    Add Advance Payment
                  </DialogTitle>
                </DialogHeader>
                <AddAdvancePaymentForm />
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              Show
              <select className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#6732F2]">
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              entries
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 uppercase font-medium">
              Search:
              <input type="text" className="border border-gray-300 rounded px-2.5 py-1 text-xs w-40 focus:ring-1 focus:ring-[#6732F2] outline-none" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 font-bold text-gray-700">Tran#</th>
                  <th className="px-4 py-3 font-bold text-gray-700">Transaction Date</th>
                  <th className="px-4 py-3 font-bold text-gray-700">Associate</th>
                  <th className="px-4 py-3 font-bold text-gray-700">Associate Phone</th>
                  <th className="px-4 py-3 font-bold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500 italic">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-gray-500 font-medium">Showing 0 to 0 of 0 entries</p>
            <div className="flex items-center gap-1">
              <button disabled className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-400 bg-gray-100 cursor-not-allowed uppercase font-bold tracking-tight">
                Previous
              </button>
              <button disabled className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-400 bg-gray-100 cursor-not-allowed uppercase font-bold tracking-tight">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
