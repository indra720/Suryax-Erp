import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, ChevronDown, User } from "lucide-react";

export const Route = createFileRoute("/admin/associates/tree")({
  component: AssociateTreePage,
});

function AssociateTreePage() {
  const [selectedAssociate, setSelectedAssociate] = useState(
    "SURYAX PRIVATE LIMITED - 123456"
  );
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Tree</h1>
        <p className="text-sm text-gray-500">Home Page / Tree</p>
      </div>

      <div className="py-3">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">
              Associate Tree
            </h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-[#6732F2] border border-[#6732F2] rounded hover:bg-purple-50 transition-colors">
                Associate List
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-[#6732F2] border border-[#6732F2] rounded hover:bg-purple-50 transition-colors">
                Old Tree
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Associate Dropdown + Search */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-6">
              <div className="flex-1 max-w-md">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Associate <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedAssociate}
                  onChange={(e) => setSelectedAssociate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] focus:border-[#6732F2] bg-white"
                >
                  <option value="SURYAX PRIVATE LIMITED - 123456">
                    SURYAX PRIVATE LIMITED - 123456
                  </option>
                  <option value="Other Associate - 789012">
                    Other Associate - 789012
                  </option>
                </select>
              </div>
              <button className="h-9 px-6 bg-[#6732F2] text-white text-sm font-medium rounded-md hover:bg-[#5a2ad6] transition-colors self-start sm:self-auto">
                Search
              </button>
            </div>

            {/* Tree + Color Legend */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Tree Structure */}
              <div className="flex-1 min-w-0">
                {/* Horizontal scroll bar */}
                <div className="relative mb-3">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-gray-300 rounded-full" />
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1">
                    <div className="size-3 border border-gray-400 rounded-full bg-white" />
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1">
                    <div className="size-3 border border-gray-400 rounded-full bg-white" />
                  </div>
                </div>

                {/* Tree Node */}
                <div className="flex items-center gap-1.5 py-1.5">
                  <span className="text-gray-400 text-sm select-none">•</span>
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                  >
                    {expanded ? (
                      <ChevronDown className="size-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="size-4 text-gray-600" />
                    )}
                  </button>
                  <span className="text-sm font-medium text-gray-800">
                    SURYAX PRIVATE LIMITED
                  </span>
                  <div className="size-5 rounded bg-[#6732F2] flex items-center justify-center ml-1">
                    <User className="size-3 text-white" />
                  </div>
                </div>

                {/* Expanded children (placeholder) */}
                {expanded && (
                  <div className="ml-6 pl-3 border-l border-gray-200 space-y-1 mt-1">
                    {/* Add child nodes here when needed */}
                  </div>
                )}
              </div>

              {/* Color schemes brief */}
              <div className="flex-shrink-0 lg:text-right">
                <p className="text-xs text-gray-500 mb-2">Color schemes brief:</p>
                <div className="flex flex-wrap gap-1.5 justify-start lg:justify-end">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded text-[11px] font-semibold text-white bg-[#4A90D9]">
                    L-1
                  </span>
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded text-[11px] font-semibold text-gray-800 bg-[#F5C518]">
                    L-2
                  </span>
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded text-[11px] font-semibold text-white bg-[#5CB85C]">
                    L-3
                  </span>
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded text-[11px] font-semibold text-white bg-[#5BC0DE]">
                    L-4
                  </span>
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded text-[11px] font-semibold text-white bg-[#777777]">
                    L-5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}