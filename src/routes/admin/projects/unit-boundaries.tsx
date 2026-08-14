import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/projects/unit-boundaries")({
  component: UnitBoundariesPage,
});

const facingRows = [
  { id: 1, facingName: "EAST", unitNo: "", boundary: "" },
  { id: 2, facingName: "WEST", unitNo: "", boundary: "" },
  { id: 3, facingName: "NORTH", unitNo: "", boundary: "" },
  { id: 4, facingName: "SOUTH", unitNo: "", boundary: "" },
];

function UnitBoundariesPage() {
  const [rows, setRows] = useState(facingRows);

  const handleRowChange = (id: number, field: string, value: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Projects › Project Boundaries
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              Project Boundaries
            </h1>
          </div>
        </div>
      </div>

      <div className=" pb-6">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Create Header */}
          <div className="px-4 py-3 bg-[#6732F2] text-white">
            <h2 className="text-sm font-semibold">Create</h2>
          </div>

          <div className="p-4 sm:p-5 space-y-6">
            {/* Top Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Unit Type <span className="text-red-500">*</span>
                </label>
                <select className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Unit Type</option>
                  <option>Apartment</option>
                  <option>Plot</option>
                  <option>Rowhouse</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Project <span className="text-red-500">*</span>
                </label>
                <select className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Project</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Unit No <span className="text-red-500">*</span>
                </label>
                <select className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                  <option>Select Unit</option>
                </select>
              </div>
            </div>

            {/* Facing Details */}
            <div>
              <div className="bg-[#f0f4ff] rounded-t-lg px-4 py-2.5 border border-b-0 border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">
                  Facing Details
                </h3>
              </div>

              <div className="border border-gray-200 rounded-b-lg overflow-hidden">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-3 gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600">
                  <div>Facing Name</div>
                  <div>Unit No</div>
                  <div>Boundary</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-100">
                  {rows.map((row) => (
                    <div
                      key={row.id}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-4 py-3 items-center"
                    >
                      {/* Facing Name */}
                      <div>
                        <label className="sm:hidden text-xs font-semibold text-gray-500 mb-1 block">
                          Facing Name
                        </label>
                        <input
                          type="text"
                          value={row.facingName}
                          readOnly
                          className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 bg-gray-50 focus:outline-none"
                        />
                      </div>

                      {/* Unit No */}
                      <div>
                        <label className="sm:hidden text-xs font-semibold text-gray-500 mb-1 block">
                          Unit No
                        </label>
                        <select
                          value={row.unitNo}
                          onChange={(e) =>
                            handleRowChange(row.id, "unitNo", e.target.value)
                          }
                          className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white"
                        >
                          <option value="">Select Unit</option>
                          <option value="U1">Unit 1</option>
                          <option value="U2">Unit 2</option>
                          <option value="U3">Unit 3</option>
                        </select>
                      </div>

                      {/* Boundary */}
                      <div>
                        <label className="sm:hidden text-xs font-semibold text-gray-500 mb-1 block">
                          Boundary
                        </label>
                        <select
                          value={row.boundary}
                          onChange={(e) =>
                            handleRowChange(row.id, "boundary", e.target.value)
                          }
                          className="w-full h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Road">Road</option>
                          <option value="Park">Park</option>
                          <option value="Building">Building</option>
                          <option value="Open">Open</option>
                          <option value="Wall">Wall</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button className="h-9 px-6 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}