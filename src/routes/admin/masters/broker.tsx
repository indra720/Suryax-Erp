import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/erp/ui";
import { Search, Edit2, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/masters/broker")({
  component: BrokerPage,
});

function BrokerPage() {
  const [data] = useState([
    { id: "1", name: "Broker", phone: "+917415540909", whatsapp: "+917415540909", company: "SIPL" },
  ]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h1 className="text-lg font-bold">Broker Master</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded">
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader><DialogTitle>Add/Edit Broker</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <div><label className="text-xs font-bold">Broker Id</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Name</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Phone No</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">WhatsApp Number</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Company Name</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
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
          <div>Show <select className="border rounded p-1"><option>5</option></select> entries</div>
          <div className="flex items-center border rounded px-2"><Search className="size-3.5 text-gray-400 mr-1" /><input className="p-1 outline-none" placeholder="Search..." /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr><th className="p-2">Action</th><th className="p-2">Broker Id</th><th className="p-2">Name</th><th className="p-2">Phone No</th><th className="p-2">WhatsApp Number</th><th className="p-2">Company Name</th></tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item, i) => (
                <tr key={i}>
                  <td className="p-2 flex gap-2"><Edit2 className="size-3.5 text-blue-600 cursor-pointer"/><Trash2 className="size-3.5 text-red-600 cursor-pointer"/></td>
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.phone}</td>
                  <td className="p-2">{item.whatsapp}</td>
                  <td className="p-2">{item.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 text-xs">
          <div>Showing 1 to 1 of 1 entries</div>
          <div className="flex gap-1"><button className="border px-2 py-1 rounded">Previous</button><button className="border px-2 py-1 rounded bg-gray-100">1</button><button className="border px-2 py-1 rounded">Next</button></div>
        </div>
      </Card>
    </div>
  );
}
