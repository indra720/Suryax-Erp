import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/admin/projects/apartment-commercial/list"
)({
  component: ApartmentListPage,
});

function ApartmentListPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Projects › Report
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Report</h1>
          </div>
        </div>
      </div>

      <div className=" pb-6">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Section Title */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">Apartment</h2>
          </div>

          {/* Filters */}
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
              <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[200px] flex-1 sm:flex-none">
                <option>Select Project</option>
              </select>

              <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[200px] flex-1 sm:flex-none">
                <option>Select Building</option>
              </select>

              <button className="h-9 px-5 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
                Search
              </button>
            </div>

            {/* Divider line (as in screenshot) */}
            <div className="mt-6 border-t-2 border-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}