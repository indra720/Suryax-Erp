import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, FileSpreadsheet, FileText, Columns, ChevronDown, List as ListIcon } from "lucide-react";

export const Route = createFileRoute("/admin/post-sales/associate-payments/generate-commission")({
  component: GenerateCommissionPage,
});

function GenerateCommissionPage() {
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Commission Generation</h1>
          <p className="text-sm text-gray-500">Home Page / Commission Generation</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase">Receive From</label>
                <input type="date" className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase">Receive To</label>
                <input type="date" className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase">Unit Type</label>
                <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none bg-white">
                  <option>Select Unit Type</option>
                  <option>APARTMENT</option>
                  <option>PLOT</option>
                  <option>ROWHOUSE</option>
                  <option>MEMBER</option>
                  <option>COMMERCIAL</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase">Project</label>
                <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none bg-white">
                  <option>Select Project</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase">Unit No.</label>
                <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none bg-white">
                  <option>Select Unit</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase">Booking No.</label>
                <input type="text" placeholder="Booking No." className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase">Associate Name</label>
                <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none bg-white">
                  <option>- SELECT -</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase">Include Team Members</label>
                <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none bg-white">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <button className="h-9 px-8 bg-[#6732F2] text-white text-xs font-bold rounded hover:bg-[#5a2ad6] transition-colors flex items-center gap-2 uppercase tracking-wider">
                    <Search className="size-4" />
                    Search
                </button>
            </div>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center gap-2 text-gray-800 font-bold uppercase tracking-tight">
              <ListIcon className="size-4 text-[#6732F2]" />
              List
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors shadow-sm uppercase"><FileSpreadsheet className="size-3.5" /> Excel</button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors shadow-sm uppercase"><FileText className="size-3.5" /> PDF</button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors shadow-sm uppercase"><Columns className="size-3.5" /> Column <ChevronDown className="size-3" /></button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                Show
                <select 
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#6732F2] outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                entries
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                Search:
                <input type="text" className="border border-gray-300 rounded px-2.5 py-1.5 text-xs w-40 focus:ring-1 focus:ring-[#6732F2] outline-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10px] text-left min-w-[2000px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">#</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Booking Date</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Received Date</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Unit Type</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Project</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Unit Detail</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Unit Size</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Registery</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Associate</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Associate Phone</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Booking Amount</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Cost Amount</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Total Booking Commission</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Received Amount</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Payable Commission(%)</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Payable Commission Amount</th>
                  <th className="px-3 py-3 font-bold text-gray-700 uppercase whitespace-nowrap">Previous Payable Commission Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={17} className="px-4 py-10 text-center text-gray-500 italic text-sm">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500 font-medium">Showing 0 to 0 of 0 entries</p>
              <div className="flex items-center gap-1">
                  <button disabled className="px-3 py-1.5 text-[10px] border border-gray-300 rounded text-gray-400 bg-gray-100 cursor-not-allowed font-bold uppercase">Previous</button>
                  <button disabled className="px-3 py-1.5 text-[10px] border border-gray-300 rounded text-gray-400 bg-gray-100 cursor-not-allowed font-bold uppercase">Next</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
