import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/projects/project-list")({
  component: ProjectListPage,
});

function ProjectListPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-gray-800">Project List</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 bg-[#6732F2] text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#5a2ad6]">
              <Plus className="size-3.5" /> Add New Project
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add New Project</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <div><label className="text-xs font-semibold">Project Name</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Company Name</label><input type="text" placeholder="Enter name" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Rera No.</label><input type="text" placeholder="Rera number" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Guideline Value</label><input type="number" defaultValue={0.00} className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Project Type</label><select className="w-full border rounded p-2 text-xs"><option>APARTMENT</option></select></div>
              <div><label className="text-xs font-semibold">Total Building</label><input type="number" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Head Name</label><input type="text" placeholder="Enter Name" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Mobile Number</label><input type="text" placeholder="Enter mobile number" className="w-full border rounded p-2 text-xs" /></div>
              <div className="col-span-full"><label className="text-xs font-semibold">Amenities</label><input type="text" placeholder="TEMPLE 80 Feet Road Garden 30 Feet Road" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Start Date</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Completion Date</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
              <div className="col-span-full"><label className="text-xs font-semibold">Project Description</label><textarea placeholder="Enter Description" className="w-full border rounded p-2 text-xs" rows={2} /></div>
              <div><label className="text-xs font-semibold">Status</label><select className="w-full border rounded p-2 text-xs"><option>Select</option></select></div>
              <div className="col-span-full text-sm font-bold border-b pb-1">Address</div>
              <div><label className="text-xs font-semibold">State</label><select className="w-full border rounded p-2 text-xs"><option>Select State</option></select></div>
              <div><label className="text-xs font-semibold">City</label><select className="w-full border rounded p-2 text-xs"><option>Select City</option></select></div>
              <div className="col-span-full"><label className="text-xs font-semibold">Address</label><input type="text" placeholder="Enter Address" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Latitude</label><input type="text" placeholder="Enter latitude" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Longitude</label><input type="text" placeholder="Enter longitude" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Khasara No</label><input type="text" placeholder="Enter khasaraNo" className="w-full border rounded p-2 text-xs" /></div>
              <div className="col-span-full text-sm font-bold border-b pb-1">Bank Details</div>
              <div><label className="text-xs font-semibold">Bank</label><select className="w-full border rounded p-2 text-xs"><option>Select Bank</option></select></div>
              <div><label className="text-xs font-semibold">Account No.</label><input type="text" placeholder="Enter Account no." className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">IFSC Code</label><input type="text" placeholder="Enter IFSC Code" className="w-full border rounded p-2 text-xs" /></div>
              <div className="col-span-2"><label className="text-xs font-semibold">Address</label><input type="text" placeholder="Enter bank address" className="w-full border rounded p-2 text-xs" /></div>
              <div className="col-span-full text-sm font-bold border-b pb-1">Other Details</div>
              <div><label className="text-xs font-semibold">GAT/Servey No</label><input type="text" placeholder="Enter ServeyNo" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Shivar No</label><input type="text" placeholder="Enter ShivarNo" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Reward</label><input type="text" placeholder="Reward" className="w-full border rounded p-2 text-xs" /></div>
              <div className="col-span-full text-sm font-bold border-b pb-1">Commission Detail</div>
              <div><label className="text-xs font-semibold">Commission Method</label><input type="text" defaultValue="Amount in Sqft" className="w-full border rounded p-2 text-xs" /></div>
              <div className="col-span-full text-sm font-bold border-b pb-1">Uploads</div>
              <div><label className="text-xs font-semibold">Project Map</label><input type="file" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-semibold">Project Logo</label><input type="file" className="w-full border rounded p-2 text-xs" /></div>
            </div>
            <div className="flex justify-end pt-4"><button className="px-6 py-2 bg-[#6732F2] text-white text-xs font-semibold rounded hover:bg-[#5a2ad6]">Save</button></div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4">Project list content...</div>
    </div>
  );
}
