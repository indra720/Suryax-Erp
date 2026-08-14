import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil } from "lucide-react";

export const Route = createFileRoute("/admin/projects/whatsapp-campaign-map")({
  component: WhatsappCampaignMapPage,
});

const campaignMapData = [
  {
    id: 1,
    projectName: "SURYAX INDUSTRIAL PARK",
    address: "Jhalara, Rajasthan, India",
    mappedCampaign: "",
  },
  {
    id: 2,
    projectName: "SURYAX FARMHOUSE",
    address: "",
    mappedCampaign: "",
  },
];

function WhatsappCampaignMapPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Projects › WhatsApp Campaign Map
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              Whatsapp Campaign Map with Project
            </h1>
          </div>
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
                    SNo
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Project Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Address
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Mapped Campaign
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaignMapData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                      {row.projectName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {row.address || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {row.mappedCampaign || "—"}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <button className="inline-flex items-center justify-center size-8 rounded-lg text-gray-400 hover:text-[#6732F2] hover:bg-purple-50 transition-colors">
                        <Pencil className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              Showing 1 to 2 of 2 entries
            </p>

            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50">
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