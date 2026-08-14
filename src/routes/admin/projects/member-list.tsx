import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  List,
  Upload,
  Search,
  Eye,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

export const Route = createFileRoute("/admin/projects/member-list")({
  component: MemberListPage,
});

const memberData = [
  {
    id: 1,
    membershipNo: "",
    memberType: "",
    price: "",
    amount: "",
    status: "",
    remark: "",
  },
];

function MemberListPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className=" py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Home › Projects › Member
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Member</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage membership under projects
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-1.5 h-9 px-4 bg-[#6732F2] text-white text-sm font-medium rounded-lg hover:bg-[#5a2ad6] transition-colors">
              <Plus className="size-4" />
              Add New Project
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
            <table className="w-full text-sm text-left min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Membership No <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Member Type <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Price <span className="text-red-500">*</span>
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    Amount <span className="text-red-500">*</span>
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
                {memberData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Membership No"
                        className="w-32 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Member Type"
                        className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
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
                        placeholder="Amount"
                        className="w-24 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2] bg-white">
                        <option value="">Select</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Remark"
                        className="w-28 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
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

            <p className="text-xs text-gray-500">1 member row</p>
          </div>
        </div>
      </div>
    </div>
  );
}