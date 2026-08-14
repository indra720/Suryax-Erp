import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
  Columns,
  FilePlus,
} from "lucide-react";

export const Route = createFileRoute("/admin/post-sales/project-demand")({
  component: ProjectDemandPage,
});

const projectDemandData = [
  {
    id: 1,
    projectType: "ROWHOUSE",
    projectName: "SURYAX FARMHOUSE",
    status: "Under Construction",
    progress: "",
    demandPercent: "0 %",
    description: "",
  },
  {
    id: 2,
    projectType: "PLOT",
    projectName: "SURYAX INDUSTRIAL PARK",
    status: "Under Construction",
    progress: "",
    demandPercent: "0 %",
    description: "",
  },
];

function ProjectDemandPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Post Sales › Project Demand List
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              Project Demand List
            </h1>
          </div>
        </div>
      </div>

      <div className=" pb-6 space-y-4">
        {/* SEARCH PANEL */}
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
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Type
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>All</option>
                    <option>PLOT</option>
                    <option>ROWHOUSE</option>
                    <option>APARTMENT</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Name
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select Project</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Status
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>All</option>
                    <option>Under Construction</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="h-8 px-5 bg-[#6732F2] text-white text-xs font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LIST CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">List</h2>
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
            <table className="w-full text-sm text-left min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Action
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Project Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Project name
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Progress
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Demand(%)
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectDemandData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                        <FilePlus className="size-3.5" />
                        Demand
                      </button>
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.projectType}
                    </td>
                    <td className="px-4 py-2.5 text-gray-800 font-medium whitespace-nowrap">
                      {row.projectName}
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.status}
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.progress || "—"}
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.demandPercent}
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.description || "—"}
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