import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/erp/ui";
import { Search, Plus, MoreVertical, Phone, Mail, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/admin/masters/customer")({
  component: CustomerPage,
});

function CustomerPage() {
  const [customers] = useState([
    { id: "360", name: "Prashant Kumar", date: "Wed, 12 Aug 2026", phone: "+91 87687 66868", email: "prashant@example.com", city: "Jaipur", state: "Rajasthan", profession: "Software Engineer", avatar: "https://github.com/shadcn.png" }
  ]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h1 className="text-lg font-bold">Customer Master</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded">
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create Customer</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
              <div className="col-span-full text-sm font-bold border-b pb-1 mb-1">Personal Details</div>
              <div><label className="text-xs font-bold">Full Name</label><input type="text" placeholder="Enter Name" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Mobile Number</label><input type="text" placeholder="+91 Enter mobile number" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">WhatsApp Number</label><input type="text" placeholder="+91 Enter WhatsApp Number" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Email Id</label><input type="email" placeholder="Enter Email Address" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Register Date</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Aadhar</label><input type="text" placeholder="Enter Aadhar" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Pan Number</label><input type="text" placeholder="Enter Pan Number" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Father Name</label><input type="text" placeholder="Enter Father Name" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Date of Birth</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Anniversary</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Gender</label><select className="w-full border rounded p-2 text-xs"><option>Select Gender</option></select></div>
              <div><label className="text-xs font-bold">Profession</label><select className="w-full border rounded p-2 text-xs"><option>Select Profession</option></select></div>
              <div className="col-span-full"><label className="text-xs font-bold">Full Address</label><input type="text" placeholder="Enter Address" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">State</label><select className="w-full border rounded p-2 text-xs"><option>Select State</option></select></div>
              <div><label className="text-xs font-bold">City</label><select className="w-full border rounded p-2 text-xs"><option>Select City</option></select></div>
              <div><label className="text-xs font-bold">Company Name</label><input type="text" placeholder="Enter company" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Designation</label><select className="w-full border rounded p-2 text-xs"><option>Select Designation</option></select></div>
              <div><label className="text-xs font-bold">Occupation</label><select className="w-full border rounded p-2 text-xs"><option>Select Occupation</option></select></div>
              <div className="col-span-full"><label className="text-xs font-bold">Remark</label><input type="text" placeholder="Enter Remark" className="w-full border rounded p-2 text-xs" /></div>
              <div className="col-span-full"><label className="text-xs font-bold">Upload Photo</label><input type="file" className="w-full border rounded p-2 text-xs" /></div>
              
              <div className="col-span-full flex justify-end gap-2 pt-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div><label className="text-xs font-bold block mb-1">From Date</label><input type="date" className="w-full border rounded p-1.5 text-xs" /></div>
          <div><label className="text-xs font-bold block mb-1">To Date</label><input type="date" className="w-full border rounded p-1.5 text-xs" /></div>
          <div><label className="text-xs font-bold block mb-1">Profession</label><select className="w-full border rounded p-1.5 text-xs"><option>Select</option></select></div>
          <div><label className="text-xs font-bold block mb-1">State</label><select className="w-full border rounded p-1.5 text-xs"><option>Select</option></select></div>
          <div><label className="text-xs font-bold block mb-1">City</label><select className="w-full border rounded p-1.5 text-xs"><option>Select</option></select></div>
          <div><label className="text-xs font-bold block mb-1">Associate</label><select className="w-full border rounded p-1.5 text-xs"><option>Select</option></select></div>
          <button className="h-8 bg-brand text-white text-xs font-semibold px-4 rounded hover:bg-brand-dark">Search</button>
        </div>
      </Card>

      {/* CUSTOMER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((c) => (
          <Card key={c.id} className="p-4 bg-white border border-gray-200">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage src={c.avatar} />
                <AvatarFallback>{c.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-brand">Customer ID : {c.id}</span>
                    <button className="text-gray-400"><MoreVertical className="size-4"/></button>
                </div>
                <h3 className="text-sm font-bold">{c.name}</h3>
                <p className="text-[10px] text-gray-500">Created On: {c.date}</p>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-600 space-y-1">
                <p className="font-semibold">Profession: {c.profession}</p>
                <div className="flex items-center gap-2"><Phone className="size-3"/> {c.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="size-3"/> {c.city}, {c.state}</div>
            </div>
            
            <div className="flex gap-2 mt-4 border-t pt-3">
                {['Basic', 'Personal', 'Other', 'Profession'].map(t => (
                    <button key={t} className="text-[10px] font-bold text-brand hover:underline">{t} Details</button>
                ))}
            </div>
            <div className="flex gap-2 mt-2">
                <button className="flex-1 text-xs font-semibold border rounded py-1.5 hover:bg-gray-50">Edit</button>
                <button className="flex-1 text-xs font-semibold bg-brand text-white rounded py-1.5 hover:bg-brand-dark">Add Lead</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
