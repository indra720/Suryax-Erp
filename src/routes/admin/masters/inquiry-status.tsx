import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/erp/ui";
import { Search, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/masters/inquiry-status")({
  component: InquiryStatusPage,
});

function InquiryStatusPage() {
  const [data] = useState([
    { name: "BOOKING -> HOT", alias: "-", code: "BOOKING_VERY_INTERESTED", status: "Active", colCode: "", textCol: "" },
    { name: "BOOKING -> Next day Payment", alias: "Next day Payment", code: "BOOKING_INTERESTED", status: "Active", colCode: "", textCol: "" },
    { name: "LEAD -> Budget Issue", alias: "-", code: "LEAD_CLOSED", status: "Active", colCode: "#000000", textCol: "#000000" },
    { name: "LEAD -> Vary Interested", alias: "-", code: "LEAD_VERY_INTERESTED", status: "Active", colCode: "#ffff80", textCol: "#000000" },
  ]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h1 className="text-lg font-bold">Inquiry Status Master</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded">
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Add/Edit Inquiry Status</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <div><label className="text-xs font-bold">Stage Type</label><select className="w-full border rounded p-2 text-xs"><option>- Select -</option></select></div>
              <div><label className="text-xs font-bold">Inquiry Code</label><select className="w-full border rounded p-2 text-xs"><option>- Select -</option></select></div>
              <div><label className="text-xs font-bold">Inquiry Status Name</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Alias</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-xs font-bold">Colour Code</label><input type="color" className="w-full h-8" /></div>
                <div><label className="text-xs font-bold">Text Colour</label><input type="color" className="w-full h-8" /></div>
              </div>
              <div className="flex items-center gap-2"><input type="checkbox" id="active" /> <label htmlFor="active" className="text-xs font-bold">Active</label></div>
              <div className="flex justify-end gap-2 pt-4">
                <button className="px-3 py-1.5 text-xs font-semibold border rounded hover:bg-gray-50">Cancel</button>
                <button className="px-3 py-1.5 text-xs font-semibold bg-brand text-white rounded hover:bg-brand-dark">Save</button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* SEARCH PANEL */}
      <Card className="p-4 bg-white border border-gray-200">
        <h3 className="text-xs font-bold mb-3">Search Panel</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div><label className="text-[10px] font-bold block mb-1">Stage</label><select className="w-full border rounded p-1.5 text-xs"><option>- Select -</option></select></div>
          <div><label className="text-[10px] font-bold block mb-1">Inquiry Code</label><select className="w-full border rounded p-1.5 text-xs"><option>- Select -</option></select></div>
          <div><label className="text-[10px] font-bold block mb-1">Status</label><select className="w-full border rounded p-1.5 text-xs"><option>- Select -</option></select></div>
        </div>
      </Card>

      {/* DATA TABLE */}
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex justify-between items-center mb-3 text-xs">
          <div>Show <select className="border rounded p-1"><option>50</option></select> entries</div>
          <div className="flex items-center border rounded px-2"><Search className="size-3.5 text-gray-400 mr-1" /><input className="p-1 outline-none" placeholder="Search..." /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr><th className="p-2">Inquiry Name</th><th className="p-2">Alias</th><th className="p-2">Inquiry Code</th><th className="p-2">Status</th><th className="p-2">Colour Code</th><th className="p-2">Text Colour</th><th className="p-2">Action</th></tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item, i) => (
                <tr key={i}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.alias}</td>
                  <td className="p-2">{item.code}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.colCode}</td>
                  <td className="p-2">{item.textCol}</td>
                  <td className="p-2 flex gap-2"><Edit2 className="size-3.5 text-blue-600 cursor-pointer"/><Trash2 className="size-3.5 text-red-600 cursor-pointer"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 text-xs">
          <div>Showing 1 to 20 of 20 entries</div>
          <div className="flex gap-1"><button className="border px-2 py-1 rounded">Previous</button><button className="border px-2 py-1 rounded bg-gray-100">1</button><button className="border px-2 py-1 rounded">Next</button></div>
        </div>
      </Card>
    </div>
  );
}
