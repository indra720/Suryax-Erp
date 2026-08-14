import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  List,
  Search,
  Eye,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute(
  "/admin/projects/apartment-commercial/flat"
)({
  component: FlatListPage,
});

const flatData = [
  {
    id: 1,
    flatNumber: "",
    flatType: "",
    saleableArea: "",
    carpet: "",
    flatFacing: "",
    price: "",
    plc: "",
    costLacs: "",
    guidelineValue: "",
    inventoryType: "",
    status: "",
    remark: "",
  },
];

function FlatListPage() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Projects › Flat
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Flat</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOpenDialog(true)}
              className="flex items-center gap-1.5 h-9 px-4 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors"
            >
              <Plus className="size-4" />
              Add New Project
            </button>
            <button className="flex items-center gap-1.5 h-9 px-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <List className="size-4" />
              Project List
            </button>
          </div>
        </div>
      </div>

      <div className=" pb-6 space-y-4">
        {/* FILTERS */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[160px]">
              <option>Select Project</option>
            </select>
            <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[160px]">
              <option>Select Building</option>
            </select>
            <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[140px]">
              <option>Select Floor</option>
            </select>
            <select className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white min-w-[100px]">
              <option>Page 1</option>
              <option>Page 2</option>
            </select>
            <button className="h-9 px-5 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors flex items-center gap-1.5">
              <Search className="size-4" />
              Search
            </button>
          </div>
        </div>

        {/* BUILDING LIST */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-800">Building List</h3>
            <button className="size-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#6732F2] transition-colors">
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        {/* FLOOR LIST */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-800">Floor List</h3>
            <button className="size-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#6732F2] transition-colors">
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        {/* FLAT TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[1300px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Flat Number <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Flat Type <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Saleable Area
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Carpet
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Flat Facing
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Price <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    PLC %
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Cost(Lacs) <span className="text-red-500">*</span>
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
                {flatData.map((row) => (
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
                        placeholder="Flat No"
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
                      <input
                        type="text"
                        placeholder="Area"
                        className="w-20 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Carpet"
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
                        placeholder="Cost"
                        className="w-20 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
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
          <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <button className="flex items-center gap-1.5 h-8 px-3 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Save className="size-3.5" />
              Save All
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 bg-[#6732F2] text-white text-xs font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
              <Plus className="size-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ========== ADD NEW PROJECT DIALOG ========== */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-800">
                Project - Info
              </DialogTitle>
              <button
                onClick={() => setOpenDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* Project Info */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">
                Project Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Rera No.
                  </label>
                  <input
                    type="text"
                    placeholder="Rera number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Guideline Value
                  </label>
                  <input
                    type="text"
                    defaultValue="0.000"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Type
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>APARTMENT</option>
                    <option>PLOT</option>
                    <option>ROWHOUSE</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Total Building
                  </label>
                  <input
                    type="text"
                    placeholder="Total Building"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Head Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter mobile number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Amenities
                  </label>
                  <input
                    type="text"
                    defaultValue="TEMPLE, 80 Feet Road, Garden, 30 Feet Road"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-08-14"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Status
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Upcoming</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter Description"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
              </div>
            </section>

            {/* Address */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">
                Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    State
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select State</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    City
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select City</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    placeholder="Enter latitude"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    placeholder="Enter longitude"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Khasara No
                  </label>
                  <input
                    type="text"
                    placeholder="Enter khasaraNo"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    GAT/Servey No
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ServeyNo"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Shivar No
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ShivarNo"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
              </div>
            </section>

            {/* Bank */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">
                Bank
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Bank
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Select Bank</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Account No.
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Account no."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter IFSC Code"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bank address"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
              </div>
            </section>

            {/* Reward + Commission */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">
                Reward & Commission
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Reward
                  </label>
                  <input
                    type="text"
                    placeholder="Reward"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Commission Method
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                    <option>Amount in Sqft</option>
                    <option>Percentage</option>
                    <option>Fixed</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Uploads */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">
                Uploads
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Map
                  </label>
                  <input
                    type="file"
                    className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:bg-[#6732F2] file:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Upload Photo (jpg, png)
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.png"
                    className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:bg-[#6732F2] file:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Project Logo{" "}
                    <span className="text-gray-400 font-normal">
                      Max 150×150 Px
                    </span>
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.png"
                    className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:bg-[#6732F2] file:text-white"
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-5 py-2 text-sm bg-[#6732F2] text-white rounded-lg hover:bg-[#5a2ad6] transition-colors">
                Save Project
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}