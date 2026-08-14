import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/erp/ui";
import { Plus, MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/masters/broker")({
  component: BrokerPage,
});

function BrokerPage() {
  const [brokers] = useState([
    { id: "BRK001", name: "Example Broker", code: "EX001", status: "Active" }
  ]);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h1 className="text-lg font-bold">Broker Master</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 bg-[#6732F2] text-white text-xs font-semibold px-3 py-1.5 rounded">
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">Add Broker</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create Broker</DialogTitle></DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 bg-white border border-gray-200">
        <h3 className="text-xs font-bold mb-3">Search Panel</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div><label className="text-xs font-bold block mb-1">Broker Name</label><input type="text" placeholder="Enter Name" className="w-full border rounded p-1.5 text-xs" /></div>
          <div className="flex gap-2">
            <button className="h-8 bg-gray-200 text-xs font-semibold px-4 rounded hover:bg-gray-300">Clear</button>
            <button className="h-8 bg-[#6732F2] text-white text-xs font-semibold px-4 rounded hover:bg-[#5a2ad6]">Search</button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brokers.map((b) => (
          <Card key={b.id} className="p-4 bg-white border border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold">{b.name}</h3>
              <p className="text-[10px] text-gray-500">Code: {b.code} | Status: {b.status}</p>
            </div>
            <button className="text-gray-400"><MoreVertical className="size-4"/></button>
          </Card>
        ))}
      </div>
    </div>
  );
}
