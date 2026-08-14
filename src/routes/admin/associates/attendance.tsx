import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  FileSpreadsheet,
  FileText,
  Columns,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/associates/attendance")({
  component: AttendancePage,
});

const attendanceData = [
  {
    id: 1,
    date: "Fri, 14 Aug 2026",
    name: "shiv sankar 335265",
    inTime: "",
    outTime: "",
    status: "Absent",
    project: "",
    remark: "",
    approvalStatus: "",
    statusDate: "",
    approvalRemark: "",
    inAddress: "",
    outAddress: "",
    entrySource: "",
  },
  {
    id: 2,
    date: "Fri, 14 Aug 2026",
    name: "hanuman jii 143047",
    inTime: "",
    outTime: "",
    status: "Absent",
    project: "",
    remark: "",
    approvalStatus: "",
    statusDate: "",
    approvalRemark: "",
    inAddress: "",
    outAddress: "",
    entrySource: "",
  },
  {
    id: 3,
    date: "Fri, 14 Aug 2026",
    name: "shri ganesh 744343",
    inTime: "",
    outTime: "",
    status: "Absent",
    project: "",
    remark: "",
    approvalStatus: "",
    statusDate: "",
    approvalRemark: "",
    inAddress: "",
    outAddress: "",
    entrySource: "",
  },
  {
    id: 4,
    date: "Fri, 14 Aug 2026",
    name: "SAKSHI GIRDHANI SX10002",
    inTime: "",
    outTime: "",
    status: "Absent",
    project: "",
    remark: "",
    approvalStatus: "",
    statusDate: "",
    approvalRemark: "",
    inAddress: "",
    outAddress: "",
    entrySource: "",
  },
  {
    id: 5,
    date: "Fri, 14 Aug 2026",
    name: "bhawani singh meena SX10001",
    inTime: "",
    outTime: "",
    status: "Absent",
    project: "",
    remark: "",
    approvalStatus: "",
    statusDate: "",
    approvalRemark: "",
    inAddress: "",
    outAddress: "",
    entrySource: "",
  },
];

function AttendancePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Attendance</h1>
        <p className="text-sm text-gray-500">Home Page / Attendance</p>
      </div>

      <div className="p-3 sm:p-4 space-y-4">
        {/* ===================== SEARCH PANEL ===================== */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
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
                    From Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Status
                  </label>
                  <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]">
                    <option>All</option>
                    <option>Present</option>
                    <option>Absent</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="h-8 px-5 bg-[#6732F2] text-white text-xs font-medium rounded hover:bg-[#5a2ad6] transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===================== LIST SECTION ===================== */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* List Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">List</h2>
            
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#16a34a] border border-[#16a34a] rounded hover:bg-green-50 transition-colors self-start sm:self-auto">
                  <Plus className="size-3.5" />
                  Add New
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader><DialogTitle>Create Attendance</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-4">
                    <div><label className="text-xs font-semibold text-gray-700">Attendance Date Time</label><input type="text" defaultValue="14-08-2026 11:57:57" readOnly className="w-full border rounded p-2 text-xs bg-gray-50 text-gray-500" /></div>
                    <div><label className="text-xs font-semibold text-gray-700">Project</label><select className="w-full border border-gray-300 rounded p-2 text-xs"><option>Select</option></select></div>
                    <div><label className="text-xs font-semibold text-gray-700">User</label><select className="w-full border border-gray-300 rounded p-2 text-xs"><option>Select</option></select></div>
                    <div><label className="text-xs font-semibold text-gray-700">Attendance Remark</label><textarea className="w-full border border-gray-300 rounded p-2 text-xs" rows={3}></textarea></div>
                    <button className="w-full bg-[#6732F2] text-white text-xs font-semibold py-2 rounded hover:bg-[#5a2ad6]">Save</button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                <FileSpreadsheet className="size-3.5" />
                Excel
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                <FileText className="size-3.5" />
                PDF
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                <Columns className="size-3.5" />
                Column
                <ChevronDown className="size-3" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                Show
                <select className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]">
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
                  className="border border-gray-300 rounded px-2.5 py-1 text-xs w-36 focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
                />
              </div>
            </div>
          </div>

          {/* TABLE - horizontal scroll, no data shrink */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[1400px]">
              <thead>
                <tr className="bg-[#6732F2] text-white">
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Action
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    In Time
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Out Time
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Project
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Remark
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Approval Status
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Status Date
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Approval Remark
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    In Address
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Out Address
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Entry Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {/* empty action cell like screenshot */}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.inTime}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.outTime}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="text-red-600 font-medium">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.project}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.remark}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.approvalStatus}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.statusDate}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.approvalRemark}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.inAddress}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.outAddress}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.entrySource}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              Showing 1 to 5 of 303 entries
            </p>

            <div className="flex items-center gap-1 flex-wrap">
              <button className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`size-8 text-xs rounded font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#6732F2] text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="px-1 text-xs text-gray-500">...</span>

              <button className="size-8 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                61
              </button>

              <button className="size-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                <Search className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
