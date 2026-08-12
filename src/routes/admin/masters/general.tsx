import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/erp/ui";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Search,
  ArrowUpDown,
} from "lucide-react";

export const Route = createFileRoute("/admin/masters/general")({
  component: GeneralMastersPage,
});

const moduleConfigs: Record<string, {
  formFields: { name: string; label: string; placeholder: string; type: string }[];
  columns: string[];
  data: any[];
}> = {
  "Bank": {
    formFields: [
      { name: "name", label: "Bank Name", placeholder: "Enter Name", type: "text" },
      { name: "alias", label: "Bank Alias", placeholder: "Enter Alias", type: "text" },
      { name: "contact", label: "Contact Person", placeholder: "Enter contact person name", type: "text" },
      { name: "number", label: "Mobile Number", placeholder: "Enter mobile number", type: "text" },
    ],
    columns: ["Bank Name", "Alias", "Contact Person", "Contact Number", "Status", "Action"],
    data: [{ values: ["Axis Bank", "—", "Test14", "6589766768", "Active"] }],
  },
  "Charges": {
    formFields: [
      { name: "name", label: "Charge Name", placeholder: "Enter charge", type: "text" },
      { name: "alias", label: "Charge Alias", placeholder: "Enter charge alias", type: "text" },
      { name: "demand", label: "Demand", placeholder: "Select", type: "select" },
    ],
    columns: ["Charge Name", "Charge Alias", "Demand", "Status", "Action"],
    data: [{ values: ["Parking", "—", "De-active", "Active"] }],
  },
  "Facing": {
    formFields: [
      { name: "facing", label: "Facing", placeholder: "Enter Facing", type: "text" },
      { name: "alias", label: "Facing Alias", placeholder: "Enter Facing alias", type: "text" },
    ],
    columns: ["Facing", "Facing Alias", "Status", "Action"],
    data: [{ values: ["80 FEET + N", "—", "Active"] }],
  },
  "Document Type": {
    formFields: [
      { name: "stage", label: "Document Stage Type", placeholder: "Select Type", type: "select" },
      { name: "type", label: "Document Type", placeholder: "Enter Document Type", type: "text" },
      { name: "alias", label: "Document Type Alias", placeholder: "Enter Description", type: "text" },
    ],
    columns: ["Document Type", "Stage Type", "Description", "Status", "Action"],
    data: [{ values: ["Pan Card", "Booking", "—", "Active"] }],
  },
  "Flat Type": {
    formFields: [
      { name: "type", label: "Flat Type", placeholder: "Enter flat type", type: "text" },
      { name: "alias", label: "Flat Type Alias", placeholder: "Enter flat type alias", type: "text" },
    ],
    columns: ["Flat Type", "Flat Type Alias", "Status", "Action"],
    data: [{ values: ["1 BHK", "—", "Active"] }],
  },
  "Rowhouse": {
    formFields: [
      { name: "type", label: "Rowhouse Type", placeholder: "Enter Rowhouse type", type: "text" },
      { name: "alias", label: "Rowhouse Type Alias", placeholder: "Enter Rowhouse type alias", type: "text" },
    ],
    columns: ["Rowhouse Type", "Rowhouse Type Alias", "Status", "Action"],
    data: [{ values: ["VILLA", "—", "Active"] }],
  },
  "Commercial Type": {
    formFields: [
      { name: "type", label: "Commercial Type", placeholder: "Enter Commercial type", type: "text" },
      { name: "alias", label: "Commercial Type Alias", placeholder: "Enter Commercial type alias", type: "text" },
    ],
    columns: ["Commercial Type", "Commercial Type Alias", "Status", "Action"],
    data: [{ values: ["SHOPS", "—", "Active"] }],
  },
  "Project Progress": {
    formFields: [
      { name: "type", label: "Progress Type", placeholder: "Select Type", type: "select" },
      { name: "progress", label: "Progress", placeholder: "Enter progress", type: "text" },
      { name: "alias", label: "Progress Alias", placeholder: "Enter progress alias", type: "text" },
    ],
    columns: ["Progress Type", "Progress", "Progress Alias", "Status", "Action"],
    data: [{ values: ["Plot", "RUNNING", "—", "Active"] }],
  },
  "Inventory Type": {
    formFields: [
      { name: "unit", label: "Unit Type", placeholder: "Select", type: "select" },
      { name: "type", label: "Inventory Type", placeholder: "Enter Inventory Type", type: "text" },
    ],
    columns: ["Unit Type", "Inventory Type", "Status", "Action"],
    data: [{ values: ["FARMLAND", "FARM HOUSE", "Active"] }],
  },
  "Profession": {
    formFields: [
      { name: "name", label: "Profession", placeholder: "Enter profession", type: "text" },
    ],
    columns: ["Profession", "Status", "Action"],
    data: [{ values: ["BUSINESS", "Active"] }],
  },
  "Amenities": {
    formFields: [
      { name: "type", label: "Amenity Type", placeholder: "Select", type: "select" },
      { name: "name", label: "Amenity", placeholder: "Enter Amenity", type: "text" },
      { name: "alias", label: "Amenity Alias", placeholder: "Enter Amenity alias", type: "text" },
    ],
    columns: ["Amenity Type", "Amenity", "Amenity Alias", "Status", "Action"],
    data: [{ values: ["Project", "Garden", "—", "Active"] }],
  },
  "Deduction Type": {
    formFields: [
      { name: "name", label: "Deduction Name", placeholder: "Enter Deduction", type: "text" },
      { name: "rate", label: "Deduction Per(%)", placeholder: "Enter deduction rate", type: "text" },
      { name: "type", label: "Deduction Type", placeholder: "Select Type", type: "select" },
    ],
    columns: ["Deduction Name", "Deduction Per(%)", "Type", "Status", "Action"],
    data: [],
  },
  "Member Type": {
    formFields: [
      { name: "name", label: "Member Name", placeholder: "Enter Member", type: "text" },
      { name: "alias", label: "Member Alias", placeholder: "Enter Member alis", type: "text" },
    ],
    columns: ["Member Name", "Member Alias", "Status", "Action"],
    data: [],
  },
  "Expense Type": {
    formFields: [
      { name: "name", label: "Expense Name", placeholder: "Enter Expense", type: "text" },
      { name: "alias", label: "Expense Alias", placeholder: "Enter Expense alis", type: "text" },
    ],
    columns: ["Expense Name", "Expense Alias", "Status", "Action"],
    data: [{ values: ["Stationary", "—", "Active"] }],
  },
  "Visitor Purpose": {
    formFields: [
      { name: "name", label: "Visitor Purpose", placeholder: "Enter Purpose", type: "text" },
      { name: "alias", label: "Alias", placeholder: "Enter Purpose alis", type: "text" },
    ],
    columns: ["Visitor Purpose", "Alias", "Status", "Action"],
    data: [{ values: ["MEETING", "MEET", "Active"] }],
  },
  "Facing Boundary": {
    formFields: [
      { name: "name", label: "Facing Boundary", placeholder: "Enter Facing Boundary", type: "text" },
    ],
    columns: ["Facing Boundary", "Status", "Action"],
    data: [],
  },
  "Occupation": {
    formFields: [
      { name: "name", label: "Occupation", placeholder: "Enter Occupation", type: "text" },
    ],
    columns: ["Occupation", "Status", "Action"],
    data: [],
  },
  "Resident Category": {
    formFields: [
      { name: "name", label: "Resident Category", placeholder: "Enter Interested", type: "text" },
    ],
    columns: ["Resident Category", "Status", "Action"],
    data: [{ values: ["Villa", "Active"] }],
  },
};

const subModules = Object.keys(moduleConfigs);

function GeneralMastersPage() {
  const [activeSub, setActiveSub] = useState(subModules[0]);
  const config = moduleConfigs[activeSub] || { formFields: [], columns: [], data: [] };

  return (
    <div className="space-y-4 p-4 lg:p-6 bg-[#f3f4f6] min-h-screen">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Masters</h1>
          <p className="text-xs text-gray-500">Foundational CRM configuration</p>
        </div>
        <Link to="/" className="text-sm font-semibold text-brand hover:underline">
          Home Page
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[220px_350px_1fr] gap-4">
        <Card className="p-0 overflow-hidden border border-gray-200 shadow-sm bg-white h-fit">
          <div className="bg-[#331fa3] px-4 py-3 text-white text-sm font-bold tracking-wide rounded-t-lg">
            General Masters
          </div>
          <ul className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto no-scrollbar">
            {subModules.map((m) => (
              <li key={m}>
                <button
                  onClick={() => setActiveSub(m)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${
                    activeSub === m
                      ? "bg-[#ECEEF4] text-[#331fa3] border-l-4 border-[#331fa3]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {m}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 border border-gray-200 shadow-sm bg-white h-fit">
          <h2 className="text-sm font-bold text-gray-800 border-b pb-2 mb-3">
            {activeSub} details Master
          </h2>
          <form className="space-y-3">
            {config.formFields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                {field.type === "text" ? (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full h-8 px-2 text-xs border rounded outline-none focus:border-[#331fa3]"
                  />
                ) : field.type === "checkbox" ? (
                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" />
                ) : (
                  <select className="w-full h-8 px-2 text-xs border rounded outline-none focus:border-[#331fa3]">
                    <option>{field.placeholder}</option>
                  </select>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 py-1">
              <input type="checkbox" id="active" className="h-3.5 w-3.5 rounded border-gray-300" />
              <label htmlFor="active" className="text-xs font-bold text-gray-700 select-none">Active</label>
            </div>
            <div className="flex gap-2 pt-2 border-t">
              <button type="button" className="flex-1 h-8 bg-brand text-white text-xs font-semibold rounded hover:bg-brand-dark">Save</button>
              <button type="button" className="flex-1 h-8 border text-gray-600 text-xs font-semibold rounded hover:bg-gray-50">Reset</button>
            </div>
          </form>
        </Card>

        <Card className="p-4 border border-gray-200 shadow-sm bg-white overflow-hidden">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>Show</span>
              <select className="h-7 border rounded px-1.5 outline-none"><option>10</option></select>
              <span>entries</span>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
              <input type="text" placeholder="Search..." className="w-full h-8 pl-8 pr-3 text-xs border rounded outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto border rounded border-gray-200">
            <table className="w-full text-left text-xs text-gray-600">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 font-bold text-gray-700">
                  {config.columns.map((col) => <th key={col} className="px-3 py-2.5">{col}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {config.data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {row.values.map((val: any, j: number) => (
                      <td key={j} className="px-3 py-2">{val}</td>
                    ))}
                    <td className="px-3 py-2 text-center flex gap-2">
                        <button className="text-brand"><Edit2 className="size-3.5" /></button>
                        <button className="text-danger"><Trash2 className="size-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
