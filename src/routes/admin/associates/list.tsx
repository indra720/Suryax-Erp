import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  Users,
  FileUp,
  FileDown,
  Phone,
  Mail,
  ChevronUp,
  ChevronDown,
  User,
  Edit,
  Trash2,
  Eye,
  LogIn,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/erp/ui";

export const Route = createFileRoute("/admin/associates/list")({
  component: AssociateListPage,
});

function AssociateListPage() {
  const [searchOpen, setSearchOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Other Detail");

  const [associates] = useState([
    {
      id: "SX 10272",
      name: "sunita sharma",
      role: "Suryax CP",
      designation: "null",
      commission: "",
      status: "Active",
      phone1: "+919782802027",
      phone2: "+919414894560",
      email: "sunitaabhiraj@gmail.com",
      city: "N/A",
      state: "N/A",
      employeeType: "N/A",
      department: "N/A",
      trialLastDate: "No Expiry",
      sponsor: "Lal singh jadoun",
      sponsorId: "722997",
      designationSponsor: "SALES EXECUTIVE",
      loginId: "sunitaabhiraj@gmail.com",
      regDate: "13-08-2026",
    },
  ]);

  const AddEditForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-full text-sm font-bold border-b pb-2">Basic Details</div>
        <div><label className="text-xs font-semibold">Register Date</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Full Name</label><input type="text" placeholder="Enter Name" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Father/Husband Name</label><input type="text" placeholder="Enter Father/Husband Name" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Mobile No</label><input type="text" placeholder="Enter mobile number" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">WhatsApp No</label><input type="text" placeholder="Enter WhatsApp Number" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">DOB</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Email Id</label><input type="email" placeholder="Enter Email Address" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Commission %</label><input type="number" defaultValue={0} className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Applicant Designation</label><select className="w-full border rounded p-2 text-xs"><option>Select Role</option></select></div>
        <div><label className="text-xs font-semibold">Prefix</label><input type="text" defaultValue="SX" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Suffix</label><input type="text" defaultValue="10273" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Mysponsor Id</label><input type="text" defaultValue="SX 10273" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">PAN No.</label><input type="text" placeholder="Enter PAN Card Number" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Aadhar No</label><input type="text" placeholder="Enter Aadhar No" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Rera No</label><input type="text" placeholder="Enter Rera No" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Rera Application</label><input type="text" placeholder="Enter Rera Application" className="w-full border rounded p-2 text-xs" /></div>
        
        <div className="col-span-full text-sm font-bold border-b pb-2 mt-4">Bank Details</div>
        <div><label className="text-xs font-semibold">Bank Name</label><select className="w-full border rounded p-2 text-xs"><option>Select</option></select></div>
        <div><label className="text-xs font-semibold">Account No.</label><input type="text" placeholder="Enter Account number" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Account Name</label><input type="text" placeholder="Enter Account Name" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">IFSC Code</label><input type="text" placeholder="Enter IFSC" className="w-full border rounded p-2 text-xs" /></div>
        <div className="col-span-2"><label className="text-xs font-semibold">Address</label><input type="text" placeholder="Enter Bank address" className="w-full border rounded p-2 text-xs" /></div>

        <div className="col-span-full text-sm font-bold border-b pb-2 mt-4">Nominee Details</div>
        <div><label className="text-xs font-semibold">Nominee Name</label><input type="text" placeholder="Enter Nominee Name" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Nominee Mobile Number</label><input type="text" placeholder="Enter mobile number" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Relation With Nominee</label><select className="w-full border rounded p-2 text-xs"><option>Select</option></select></div>

        <div className="col-span-full text-sm font-bold border-b pb-2 mt-4">Sponsor Details</div>
        <div><label className="text-xs font-semibold">Sponsor By</label><input type="text" defaultValue="123456 SURYAX PRIVATE LIMITED" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Commission</label><input type="number" defaultValue={3000} className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Sponsor Mobile</label><input type="text" defaultValue="9660033516" className="w-full border rounded p-2 text-xs" /></div>
        <div><label className="text-xs font-semibold">Sponsor Designation</label><input type="text" className="w-full border rounded p-2 text-xs" /></div>
        <div className="col-span-full"><label className="text-xs font-semibold">Upload Photo</label><input type="file" className="w-full border rounded p-2 text-xs" /></div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button className="px-4 py-2 text-xs font-semibold border rounded hover:bg-gray-50">Cancel</button>
        <button className="px-4 py-2 text-xs font-semibold bg-[#6732F2] text-white rounded hover:bg-[#5a2ad6]">Save</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb] space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Associate New Panel</h1>
        <p className="text-sm text-gray-500">Home Page / Associate New Panel</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-[#e8f0fe] border-b border-gray-200"
        >
          <div className="flex items-center gap-2 text-[#1a73e8] font-medium text-sm">
            <Search className="size-4" /> Search Panel
          </div>
          {searchOpen ? <ChevronUp className="size-4 text-gray-500" /> : <ChevronDown className="size-4 text-gray-500" />}
        </button>

        {searchOpen && (
          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
              {[ "From Date", "To Date", "Sponsor Id", "Role", "Applicant Designation", "Status"].map((f) => (
                <div key={f}>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">{f}</label>
                  <input type={f.includes("Date") ? "date" : "text"} placeholder={f.includes("Date") ? "" : "Select/Enter"} className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
              {[ "State", "City", "Associate", "Hierarchy Filter", "Resource"].map((f) => (
                <div key={f}>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">{f}</label>
                  <select className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6732F2]"><option>Select</option></select>
                </div>
              ))}
              <div className="flex gap-2 justify-end col-span-1">
                 {/* Placeholder to align buttons correctly in grid if needed, or just let them flex */}
              </div>
            </div>
            {/* Buttons on new line */}
            <div className="flex flex-wrap gap-2 justify-end mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center justify-center gap-1.5 h-8 px-3 bg-[#1a73e8] text-white text-xs font-medium rounded hover:bg-[#1557b0]"><Users className="size-3.5" /> TeamWise</button>
                <button className="flex items-center justify-center gap-1.5 h-8 px-3 bg-[#1a73e8] text-white text-xs font-medium rounded hover:bg-[#1557b0]"><Search className="size-3.5" /> Search</button>
                <button className="h-8 px-4 bg-gray-500 text-white text-xs font-medium rounded hover:bg-gray-600">Clear</button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="border-b border-gray-200"><div className="inline-flex items-center gap-2 px-4 py-2.5 border-b-2 border-[#6732F2] text-sm font-medium text-gray-800"><User className="size-4" /> List</div></div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">List</h2>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild><button className="flex items-center gap-1.5 bg-[#6732F2] text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#5a2ad6]"><Plus className="size-3.5" /> Add New</button></DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Create Associate</DialogTitle></DialogHeader><AddEditForm /></DialogContent>
            </Dialog>
            <button className="flex items-center gap-1.5 bg-gray-500 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-gray-600"><FileUp className="size-3.5" /> Import</button>
            <button className="flex items-center gap-1.5 bg-gray-500 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-gray-600"><FileDown className="size-3.5" /> Export</button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {associates.map((a) => (
            <div key={a.id} className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#2d3748] text-white px-4 py-2.5 text-xs">
                <span className="font-medium">Associate ID : {a.id}</span>
                <span className="font-medium">Commission : {a.commission || ""}</span>
                <span className="flex items-center gap-1.5 font-medium">Status: <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-green-400" />Active</span></span>
              </div>
              <div className="p-4 bg-white">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex gap-4 min-w-[220px]">
                    <div className="size-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0"><User className="size-8 text-[#6732F2]" /></div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-gray-800 capitalize">{a.name}</h3>
                      <p className="text-xs text-gray-600">Role : {a.role}</p>
                      <p className="text-xs text-gray-600">Designation : {a.designation}</p>
                      <p className="text-xs text-gray-600 flex items-center gap-1"><Phone className="size-3" />{a.phone1} || {a.phone2}</p>
                      <p className="text-xs text-[#6732F2] flex items-center gap-1"><Mail className="size-3" />{a.email}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1 mb-3 border-b border-gray-200">
                      {["Sponsor Detail", "Registration Detail", "Credentials", "Other Detail"].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${activeTab === tab ? "bg-gray-100 text-gray-800 border border-b-0 border-gray-200" : "text-gray-500 hover:text-gray-700"}`}>{tab}</button>
                      ))}
                    </div>
                    {activeTab === "Other Detail" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div><p className="text-gray-500 mb-0.5">Employee Type</p><p className="font-medium text-gray-800">{a.employeeType}</p></div>
                        <div><p className="text-gray-500 mb-0.5">Department</p><p className="font-medium text-gray-800">{a.department}</p></div>
                        <div><p className="text-gray-500 mb-0.5">Trial Last Date</p><p className="font-medium text-gray-800">{a.trialLastDate}</p></div>
                      </div>
                    )}
                    {activeTab === "Sponsor Detail" && (
                      <div className="text-xs grid grid-cols-2 gap-2">
                        <div><p className="text-gray-500">Sponsor Name</p><p className="font-medium">{a.sponsor}</p></div>
                        <div><p className="text-gray-500">Designation</p><p className="font-medium">{a.designationSponsor}</p></div>
                        <div><p className="text-gray-500">Sponsor ID</p><p className="font-medium">{a.sponsorId}</p></div>
                      </div>
                    )}
                    {activeTab === "Registration Detail" && (
                      <div className="text-xs grid grid-cols-2 gap-2">
                          <div><p className="text-gray-500">Registration Date</p><p className="font-medium">{a.regDate}</p></div>
                          <div><p className="text-gray-500">Deactivation Date</p><p className="font-medium text-red-500">Deactivate user</p></div>
                      </div>
                    )}
                    {activeTab === "Credentials" && (
                      <div className="text-xs grid grid-cols-1 gap-2">
                        <div><p className="text-gray-500">Login ID</p><p className="font-medium">{a.loginId}</p></div>
                        <div><p className="text-gray-500">Password</p><p className="font-medium">****************</p></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-100">
                  <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer"><input type="checkbox" className="rounded border-gray-300" /> Select</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#6732F2] px-2 py-1"><Edit className="size-3" /> Edit</button>
                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#6732F2] px-2 py-1"><Eye className="size-3" /> View Tree</button>
                    <button className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 px-2 py-1"><Trash2 className="size-3" /> Delete</button>
                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#6732F2] px-2 py-1"><LogIn className="size-3" /> Login info</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
