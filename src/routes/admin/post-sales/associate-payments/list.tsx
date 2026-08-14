import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, List as ListIcon, Search, ReceiptText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/post-sales/associate-payments/list")({
  component: AssociatePaymentsPage,
});

function AssociatePaymentsPage() {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const CreatePaymentForm = () => (
    <div className="space-y-4 pt-4 overflow-y-auto max-h-[75vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Voucher No:</label>
          <input type="text" value="1" readOnly className="w-full border rounded p-2 text-xs bg-gray-50 text-gray-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Voucher Date:</label>
          <input type="text" value="14-08-2026" readOnly className="w-full border rounded p-2 text-xs bg-gray-50 text-gray-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Associate:</label>
          <select className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]">
            <option>- SELECT -</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Select Head:</label>
          <select className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Select Project:</label>
          <select className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Overall Commission:</label>
          <input type="text" value="0.00" readOnly className="w-full border rounded p-2 text-xs bg-gray-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Payable Commission:</label>
          <input type="text" value="0.00" readOnly className="w-full border rounded p-2 text-xs bg-gray-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Paid Amount:</label>
          <input type="text" value="0.00" readOnly className="w-full border rounded p-2 text-xs bg-gray-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Balance:</label>
          <input type="text" value="0.00" readOnly className="w-full border rounded p-2 text-xs bg-gray-50 text-red-500 font-medium" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Amount:</label>
          <input type="text" placeholder="Enter Amount" className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">TDS:</label>
          <input type="text" placeholder="TDS" className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Charge:</label>
          <input type="text" placeholder="Charge" className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Net Amount:</label>
          <input type="text" readOnly className="w-full border rounded p-2 text-xs bg-gray-50" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Payment Mode:</label>
          <select className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]">
            <option>Select</option>
            <option>Cash</option>
            <option>Cheque</option>
            <option>Online</option>
          </select>
        </div>
        <div className="col-span-full">
          <label className="text-xs font-semibold text-gray-700 block mb-1">Remark:</label>
          <textarea rows={2} placeholder="Enter Remark" className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#6732F2]" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
          <button className="px-6 py-2 bg-[#6732F2] text-white text-xs font-semibold rounded hover:bg-[#5a2ad6] transition-colors">
              Save Payment
          </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Payment Voucher</h1>
          <p className="text-sm text-gray-500">Home Page / Payment Voucher</p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 bg-[#6732F2] text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#5a2ad6] transition-colors shadow-sm">
                <Plus className="size-3.5" />
                Add New
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-[95vw] sm:w-full">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <ReceiptText className="size-5 text-[#6732F2]" />
                    Create Payment
                </DialogTitle>
              </DialogHeader>
              <CreatePaymentForm />
            </DialogContent>
          </Dialog>

          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded hover:bg-gray-50 transition-colors shadow-sm">
            <ListIcon className="size-3.5" />
            List
          </button>
        </div>
      </div>

      <div className="py-4 space-y-4">
        {/* DATA TABLE */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[1200px]">
              <thead>
                <tr className="bg-[#6732F2] text-white">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Action</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Voucher No</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Voucher Date</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Associate</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Head</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Project</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Amount</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">TDS</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Charge</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Net Amount</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Payment Mode</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    no: "1",
                    date: "14-08-2026",
                    associate: "Pramod koolwal",
                    head: "Sales Commission",
                    project: "SURYAX INDUSTRIAL PARK",
                    amount: "5000.00",
                    tds: "250.00",
                    charge: "0.00",
                    net: "4750.00",
                    mode: "Cash",
                    remark: "First Payment",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5">
                      <button className="text-[#6732F2] font-semibold hover:underline">Edit</button>
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 font-medium">{row.no}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.date}</td>
                    <td className="px-4 py-2.5 text-gray-700">{row.associate}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.head}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.project}</td>
                    <td className="px-4 py-2.5 text-gray-700 font-medium">₹{row.amount}</td>
                    <td className="px-4 py-2.5 text-gray-600">₹{row.tds}</td>
                    <td className="px-4 py-2.5 text-gray-600">₹{row.charge}</td>
                    <td className="px-4 py-2.5 text-[#16a34a] font-bold">₹{row.net}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase border border-blue-100">
                        {row.mode}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 max-w-[200px] truncate">{row.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[10px] text-gray-500 font-medium italic">Showing 1 of 1 records</p>
          </div>
        </div>
      </div>
    </div>
  );
}
