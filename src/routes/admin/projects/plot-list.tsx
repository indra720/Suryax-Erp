import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Map,
  List,
  Upload,
  Search,
  Copy,
  Eye,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

export const Route = createFileRoute("/admin/projects/plot-list")({
  component: PlotListPage,
});

const plotData = [
  {
    id: 1,
    plotName: "",
    w1: "",
    l1: "",
    totalSize: "",
    facing: "",
    price: "",
    plc: "",
    amount: "",
    guidelineValue: "",
    inventoryType: "",
    status: "",
    remark: "",
  },
];

function PlotListPage() {
  const [mapUrl] = useState(
    "https://crm.suryax.com/Public/ProjectShowMap?project_id=null&project_type=2&associate_id=1&view_mode=WEB"
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mapUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Home › Projects › Plot</p>
            <h1 className="text-2xl font-bold text-gray-900">Plot</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage plots under projects
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-1.5 h-9 px-4 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
              <Plus className="size-4" />
              Add New Project
            </button>
            <button className="flex items-center gap-1.5 h-9 px-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Map className="size-4" />
              Show Map
            </button>
            <button className="flex items-center gap-1.5 h-9 px-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <List className="size-4" />
              Project List
            </button>
            <button className="flex items-center gap-1.5 h-9 px-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="size-4" />
              Import
            </button>
          </div>
        </div>
      </div>

      <div className=" pb-6 space-y-4">
        {/* MAP URL CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Map Url
            </label>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={mapUrl}
                readOnly
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-gray-50 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="h-9 px-4 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors flex items-center gap-1.5"
              >
                <Copy className="size-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* MAIN TABLE CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b border-gray-100">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] focus:border-[#6732F2]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                <option>Page 1</option>
                <option>Page 2</option>
              </select>
              <button className="h-9 px-4 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[1200px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Plot Name <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    W1 <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    L1 <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Total Size <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Facing
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Price <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    PLC %
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Amount <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Guideline Value
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Inventory Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Status <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Remark
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {plotData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Plot Name"
                        className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="W1"
                        className="w-16 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="L1"
                        className="w-16 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Size"
                        className="w-20 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Facing"
                        className="w-20 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Price"
                        className="w-24 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="PLC %"
                        className="w-16 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Amount"
                        className="w-24 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Guideline"
                        className="w-24 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Type"
                        className="w-24 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select className="w-24 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                        <option value="">Select</option>
                        <option>Available</option>
                        <option>Sold</option>
                        <option>Hold</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Remark"
                        className="w-24 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-[#6732F2] transition-colors">
                          <Eye className="size-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-[#6732F2] transition-colors">
                          <Pencil className="size-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 h-8 px-3 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Save className="size-3.5" />
                Save All
              </button>
              <button className="flex items-center gap-1.5 h-8 px-3 bg-[#6732F2] text-white text-xs font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
                <Plus className="size-3.5" />
                Add
              </button>
            </div>

            <p className="text-xs text-gray-500">1 plot row</p>
          </div>
        </div>
      </div>
    </div>
  );
}