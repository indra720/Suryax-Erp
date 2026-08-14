import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/leads/assignment")({
  component: LeadAssignmentPage,
});

function LeadAssignmentPage() {
  const [entriesPerPage, setEntriesPerPage] = useState(100);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Leads › Source Wise Lead Assignment
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              Source Wise Lead Assignment
            </h1>
          </div>
          <button className="h-9 px-4 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors self-start sm:self-auto">
            Assigned List
          </button>
        </div>
      </div>

      <div className=" pb-6 space-y-4">
        {/* FILTERS CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 flex-wrap">
            <div className="w-full sm:w-48">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Source
              </label>
              <select className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                <option>-SELECT-</option>
              </select>
            </div>

            <div className="w-full sm:w-48">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Associate
              </label>
              <select className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                <option>-SELECT-</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE CARD */}
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
            <table className="w-full text-sm text-left min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      Select
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Associate Code
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Associate Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Associate Phone
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Seq.
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Active
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              Showing 0 to 0 of 0 entries
            </p>

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

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="h-9 px-6 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}