import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/associates/transfer")({
  component: AssociateTransferPage,
});

const transferData = [
  {
    id: 1,
    transferDate: "26-03-2026 14:45",
    associateName: "HEMRAJ CHOUDHARY (SX10005)",
    transferFrom: "SURYAX PRIVATE LIMITED (123456)",
    transferTo: "Raghavendra Singh Choudhary (SX10003)",
  },
  {
    id: 2,
    transferDate: "03-04-2026 15:42",
    associateName: "hanuman jii (143047)",
    transferFrom: "shri ganesh (744343)",
    transferTo: "SURYAX PRIVATE LIMITED (123456)",
  },
  {
    id: 3,
    transferDate: "03-04-2026 15:46",
    associateName: "shree ram ji (780885)",
    transferFrom: "shri ganesh (744343)",
    transferTo: "SURYAX PRIVATE LIMITED (123456)",
  },
  {
    id: 4,
    transferDate: "03-04-2026 16:00",
    associateName: "surya singh (583813)",
    transferFrom: "shri ganesh (744343)",
    transferTo: "SURYAX PRIVATE LIMITED (123456)",
  },
  {
    id: 5,
    transferDate: "03-04-2026 16:03",
    associateName: "shiv sankar (335265)",
    transferFrom: "shri ganesh (744343)",
    transferTo: "SURYAX PRIVATE LIMITED (123456)",
  },
  {
    id: 6,
    transferDate: "03-04-2026 17:49",
    associateName: "shri ganesh (744343)",
    transferFrom: "SURYAX PRIVATE LIMITED (123456)",
    transferTo: "SHRI KRISHNA JII (408918)",
  },
  {
    id: 7,
    transferDate: "03-04-2026 17:52",
    associateName: "SHRI KRISHNA JII (408918)",
    transferFrom: "SURYAX PRIVATE LIMITED (123456)",
    transferTo: "hanuman jii (143047)",
  },
  {
    id: 8,
    transferDate: "16-04-2026 17:23",
    associateName: "Balveer singh (SX 10006)",
    transferFrom: "Rajesh Agarwal (447390)",
    transferTo: "Ravindra singh shekhawat (236834)",
  },
  {
    id: 9,
    transferDate: "01-05-2026 17:01",
    associateName: "MEHROFAR KHAN (370520)",
    transferFrom: "MOIN UDDIN (290097)",
    transferTo: "Shabnam saudagar (971122)",
  },
  {
    id: 10,
    transferDate: "17-05-2026 12:00",
    associateName: "Babita Jangir (629325)",
    transferFrom: "SHAKUNTALA (545612)",
    transferTo: "Gudiya Yadav (616519)",
  },
];

function AssociateTransferPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">
          Associate Transfer
        </h1>
        <p className="text-sm text-gray-500">Home Page / Associate Transfer</p>
      </div>

      <div className="py-3">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Top Bar - Transfer Button */}
          <div className="flex justify-end px-4 py-3 border-b border-gray-100">
            <button className="h-9 px-5 bg-[#6732F2] text-white text-sm font-medium rounded-md hover:bg-[#5a2ad6] transition-colors">
              Transfer
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              Show
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entries
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              Search:
              <input
                type="text"
                className="border border-gray-300 rounded px-2.5 py-1.5 text-xs w-40 focus:outline-none focus:ring-1 focus:ring-[#6732F2]"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[900px]">
              <thead>
                <tr className="bg-[#6732F2] text-white">
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    SrNo
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Transfer Date
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Associate Name
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Transfer From Sponsor
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap">
                    Transfer To Sponsor
                  </th>
                  <th className="px-3 py-3 font-semibold whitespace-nowrap text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {transferData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                    }`}
                  >
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.transferDate}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.associateName}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.transferFrom}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.transferTo}
                    </td>
                    <td className="px-3 py-2.5 text-center whitespace-nowrap">
                      <button
                        onClick={() => setOpenDialog(true)}
                        className="px-3 py-1 text-xs font-medium bg-[#6732F2] text-white rounded hover:bg-[#5a2ad6] transition-colors"
                      >
                        View
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
              Showing 1 to 10 of 12 entries
            </p>

            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                className={`size-8 text-xs rounded font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-[#6732F2] text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                1
              </button>

              <button
                onClick={() => setCurrentPage(2)}
                className={`size-8 text-xs rounded font-medium transition-colors ${
                  currentPage === 2
                    ? "bg-[#6732F2] text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                2
              </button>

              <button className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== DIALOG ========== */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md w-[95vw]">
          <DialogHeader>
            <DialogTitle>Transfered Team Detail</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto pt-4">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 font-semibold">ID</th>
                  <th className="px-3 py-2 font-semibold">Name</th>
                  <th className="px-3 py-2 font-semibold">Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-3 py-2">SX10005</td>
                  <td className="px-3 py-2">HEMRAJ CHOUDHARY</td>
                  <td className="px-3 py-2">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
