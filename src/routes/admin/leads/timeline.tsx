import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/leads/timeline")({
  component: LeadTimelinePage,
});

function LeadTimelinePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Leads › Lead TimeLine
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Lead TimeLine</h1>
          </div>
        </div>
      </div>

      <div className=" pb-6">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Section Title */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">Lead Detail</h2>
          </div>

          {/* Filters */}
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 flex-wrap">
              <div className="w-full sm:w-48">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Associate Name <span className="text-red-500">*</span>
                </label>
                <select className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select</option>
                </select>
              </div>

              <div className="w-full sm:w-52">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Lead
                </label>
                <select className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Lead</option>
                </select>
              </div>

              <button className="h-9 px-5 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Divider / empty content area */}
          <div className="px-4 sm:px-5 pb-6">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}