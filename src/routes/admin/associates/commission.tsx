import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/associates/commission")({
  component: AssociateCommissionPage,
});

const commissionData = [
  {
    id: 1,
    myId: "SX 10272",
    designation: "",
    associateName: "sunita sharma",
    sponsorName: "Lal singh jadoun",
    sponsorBy: "722997",
    sponsorDesignation: "SALES EXECUTIVE",
    sponsorCommission: "0.00",
    previousComm: "0.000",
    currentComm: "0.000",
  },
  {
    id: 2,
    myId: "SX 10271",
    designation: "",
    associateName: "Akhilesh Kumar",
    sponsorName: "Vikram Singh Sh",
    sponsorBy: "SX 10230",
    sponsorDesignation: "",
    sponsorCommission: "0.00",
    previousComm: "0.000",
    currentComm: "0.000",
  },
  {
    id: 3,
    myId: "SX 10270",
    designation: "",
    associateName: "Raghuraj Singh",
    sponsorName: "Lal singh jadoun",
    sponsorBy: "722997",
    sponsorDesignation: "SALES EXECUTIVE",
    sponsorCommission: "0.00",
    previousComm: "0.000",
    currentComm: "0.000",
  },
  {
    id: 4,
    myId: "SX 10269",
    designation: "",
    associateName: "Rakesh saini",
    sponsorName: "Manoj kumar sh",
    sponsorBy: "SX 10141",
    sponsorDesignation: "",
    sponsorCommission: "0.00",
    previousComm: "0.000",
    currentComm: "0.000",
  },
  {
    id: 5,
    myId: "SX 10268",
    designation: "",
    associateName: "Ramesh chand SI",
    sponsorName: "Abhishek tiwari",
    sponsorBy: "SX 10263",
    sponsorDesignation: "",
    sponsorCommission: "0.00",
    previousComm: "0.000",
    currentComm: "0.000",
  },
  {
    id: 6,
    myId: "SX 10267",
    designation: "",
    associateName: "MANISH KUMAR G",
    sponsorName: "SUMITA SHARMA",
    sponsorBy: "SX 10211",
    sponsorDesignation: "SALES EXECUTIVE",
    sponsorCommission: "0.00",
    previousComm: "0.000",
    currentComm: "0.000",
  },
  {
    id: 7,
    myId: "SX 10266",
    designation: "",
    associateName: "KAVITA MOHANP",
    sponsorName: "SUMITA SHARMA",
    sponsorBy: "SX 10211",
    sponsorDesignation: "SALES EXECUTIVE",
    sponsorCommission: "0.00",
    previousComm: "0.000",
    currentComm: "0.000",
  },
  {
    id: 8,
    myId: "SX 10265",
    designation: "",
    associateName: "Omender singh N",
    sponsorName: "Bhupender Singh",
    sponsorBy: "SX 10197",
    sponsorDesignation: "",
    sponsorCommission: "0.00",
    previousComm: "0.000",
    currentComm: "0.000",
  },
];

function AssociateCommissionPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssociate, setSelectedAssociate] = useState<string>("");

  const handleLockClick = (name: string) => {
    setSelectedAssociate(name);
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">
          Associate Commission
        </h1>
        <p className="text-sm text-gray-500">Home Page / Associate Commission</p>
      </div>

      <div className="p-3 sm:p-4">
        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Slab Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-2.5 bg-[#6732F2] text-white">
            <h2 className="text-sm font-semibold">Slab</h2>
            <button className="px-3 py-1.5 text-xs font-medium bg-white text-[#6732F2] rounded hover:bg-gray-100 transition-colors self-start sm:self-auto">
              Associate List
            </button>
          </div>

          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-b border-gray-100">
            <select className="w-full sm:w-48 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6732F2] focus:border-[#6732F2] bg-white">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="h-9 px-6 bg-[#6732F2] text-white text-sm font-medium rounded-md hover:bg-[#5a2ad6] transition-colors self-start sm:self-auto flex items-center gap-2">
              <Search className="size-4" />
              Search
            </button>
          </div>

          {/* TABLE - Horizontal scroll on small screens, no data shrink */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[1100px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    S/No.
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    My ID
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Designation
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Associate Name
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Sponsor Name
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Sponsor By
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Sponsor Designation
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Sponsor Commission
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Previous Comm
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Current Comm
                  </th>
                  <th className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {commissionData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.myId}
                        readOnly
                        className="w-24 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.designation}
                        readOnly
                        className="w-24 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.associateName}
                        readOnly
                        className="w-32 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.sponsorName}
                        readOnly
                        className="w-32 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.sponsorBy}
                        readOnly
                        className="w-24 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.sponsorDesignation}
                        readOnly
                        className="w-32 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.sponsorCommission}
                        readOnly
                        className="w-20 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700 text-center"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.previousComm}
                        readOnly
                        className="w-20 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700 text-center"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.currentComm}
                        readOnly
                        className="w-20 border border-gray-200 rounded px-2 py-1 text-xs bg-gray-50 text-gray-700 text-center"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <button
                        onClick={() => handleLockClick(row.associateName)}
                        className="inline-flex items-center justify-center size-8 rounded bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-colors"
                        title="View Commission History"
                      >
                        <Lock className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========== COMMISSION HISTORY DIALOG ========== */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg w-[95vw] sm:w-full p-0 overflow-hidden">
          <DialogHeader className="px-4 py-3 border-b border-gray-200 flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-base font-semibold text-gray-800 capitalize">
              {selectedAssociate}
            </DialogTitle>
            <button
              onClick={() => setOpenDialog(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="size-5" />
            </button>
          </DialogHeader>

          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left min-w-[400px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">
                      Previous Commission (%)
                    </th>
                    <th className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">
                      Current Commission (%)
                    </th>
                    <th className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      08/14/2026
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      0.00
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                      0.00
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {/* empty or add action if needed */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}