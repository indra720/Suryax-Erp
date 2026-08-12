import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/erp/ui";
import { Search, Edit2, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/masters/budget")({
  component: BudgetPage,
});

function BudgetPage() {
  const [data] = useState([
    { budget: "10 Lacs", amount: "10", status: "Active" },
    { budget: "20 Lacs", amount: "20", status: "Active" },
    { budget: "30 Lacs", amount: "30", status: "Active" },
    { budget: "40 Lacs", amount: "40", status: "Active" },
    { budget: "50 Lacs", amount: "50", status: "Active" },
    { budget: "60 Lacs", amount: "60", status: "Active" },
    { budget: "70 Lacs", amount: "70", status: "Active" },
    { budget: "80 Lacs", amount: "80", status: "Active" },
    { budget: "90 Lacs", amount: "90", status: "Active" },
    { budget: "1 Crore", amount: "100", status: "Active" },
  ]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h1 className="text-lg font-bold">Budget Master</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded">
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader><DialogTitle>Add Budget</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <div><label className="text-xs font-bold">Budget</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Amount in Lakh</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="active" /> <label htmlFor="active" className="text-xs font-bold">Active</label></div>
              <div className="flex justify-end gap-2 pt-4">
                <button className="px-3 py-1.5 text-xs font-semibold border rounded hover:bg-gray-50">Cancel</button>
                <button className="px-3 py-1.5 text-xs font-semibold bg-brand text-white rounded hover:bg-brand-dark">Save</button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* DATA TABLE */}
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex justify-between items-center mb-3 text-xs">
          <div>Show <select className="border rounded p-1"><option>10</option></select> entries</div>
          <div className="flex items-center border rounded px-2"><Search className="size-3.5 text-gray-400 mr-1" /><input className="p-1 outline-none" placeholder="Search..." /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr><th className="p-2">Budget</th><th className="p-2">Amount in Lakh</th><th className="p-2">Status</th><th className="p-2">Action</th></tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item, i) => (
                <tr key={i}>
                  <td className="p-2">{item.budget}</td>
                  <td className="p-2">{item.amount}</td>
                  <td className="p-2 text-emerald-600">{item.status}</td>
                  <td className="p-2 flex gap-2"><Edit2 className="size-3.5 text-blue-600 cursor-pointer"/><Trash2 className="size-3.5 text-red-600 cursor-pointer"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 text-xs">
          <div>Showing 1 to 10 of 13 entries</div>
          <div className="flex gap-1"><button className="border px-2 py-1 rounded">Previous</button><button className="border px-2 py-1 rounded bg-gray-100">1</button><button className="border px-2 py-1 rounded">2</button><button className="border px-2 py-1 rounded">Next</button></div>
        </div>
      </Card>
    </div>
  );
}
