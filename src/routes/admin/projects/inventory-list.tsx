import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/admin/projects/inventory-list")({
  component: InventoryListPage,
});

function InventoryListPage() {
  const [activeTab, setActiveTab] = useState("List");

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Projects › Inventory List
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Inventory List</h1>
          </div>
        </div>
      </div>

      <div className=" pb-6">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Section Title */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">Inventory</h2>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-4">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("List")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "List"
                    ? "border-[#6732F2] text-[#6732F2]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
              <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[160px]">
                <option>Select Project Type</option>
                <option>Apartment</option>
                <option>Plot</option>
                <option>Rowhouse</option>
              </select>

              <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[160px]">
                <option>Select Project</option>
              </select>

              <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[130px]">
                <option>All Facing</option>
                <option>East</option>
                <option>West</option>
                <option>North</option>
                <option>South</option>
              </select>

              <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[100px]">
                <option>All</option>
                <option>Available</option>
                <option>Sold</option>
                <option>Hold</option>
              </select>

              <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[150px]">
                <option>Select Inventory</option>
              </select>

              <button className="h-9 px-5 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors flex items-center gap-1.5">
                <Search className="size-4" />
                Search
              </button>
            </div>
          </div>

          {/* Empty state / results area */}
          <div className="px-4 pb-8 pt-2">
            <div className="border border-dashed border-gray-200 rounded-lg py-12 text-center">
              <p className="text-sm text-gray-400">
                Select filters and click Search to view inventory
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}