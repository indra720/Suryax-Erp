import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/erp/ui";
import { Search, Plus, FileSpreadsheet, FileText, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/masters/visitor-entry")({
  component: VisitorEntryPage,
});

const ALL_COLUMNS = [
  "Action", "Date", "Customer Name", "Visitor Purpose", "Mobile No", "Whatsapp No", 
  "Source", "Associate Name", "Remark", "Created By"
];

function VisitorEntryPage() {
  const [visibleColumns, setVisibleColumns] = useState(ALL_COLUMNS);

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const handleExport = (type: 'excel' | 'pdf') => {
    alert(`Exporting to ${type.toUpperCase()}...`);
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h1 className="text-lg font-bold">Visitor Entry</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded">
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Add Visitor Entry</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div><label className="text-xs font-bold">Date</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Pay To</label><input type="text" placeholder="Enter payto" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Amount</label><input type="number" placeholder="Enter Amount" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Mode</label><select className="w-full border rounded p-2 text-xs"><option>Select Mode</option></select></div>
              <div><label className="text-xs font-bold">Debit To</label><select className="w-full border rounded p-2 text-xs"><option>Select Mode</option></select></div>
              <div><label className="text-xs font-bold">Project Name</label><select className="w-full border rounded p-2 text-xs"><option>Select</option></select></div>
              <div><label className="text-xs font-bold">Bill No</label><input type="text" placeholder="Enter Bill no" className="w-full border rounded p-2 text-xs" /></div>
              <div><label className="text-xs font-bold">Bill Date</label><input type="date" className="w-full border rounded p-2 text-xs" /></div>
              <div className="sm:col-span-2"><label className="text-xs font-bold">Remark</label><input type="text" placeholder="Enter remark" className="w-full border rounded p-2 text-xs" /></div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div><label className="text-xs font-bold block mb-1">From Date</label><input type="date" className="w-full border rounded p-1.5 text-xs" /></div>
          <div><label className="text-xs font-bold block mb-1">To Date</label><input type="date" className="w-full border rounded p-1.5 text-xs" /></div>
          <div><label className="text-xs font-bold block mb-1">Visitor Purpose</label><select className="w-full border rounded p-1.5 text-xs"><option>Select Purpose</option></select></div>
          <div><label className="text-xs font-bold block mb-1">Associate Name</label><select className="w-full border rounded p-1.5 text-xs"><option>Select Associate</option></select></div>
          <div><label className="text-xs font-bold block mb-1">Source Name</label><select className="w-full border rounded p-1.5 text-xs"><option>Select Source</option></select></div>
          <div><label className="text-xs font-bold block mb-1">Created By</label><select className="w-full border rounded p-1.5 text-xs"><option>Select CreatedBy</option></select></div>
          <div className="flex gap-4 items-center sm:col-span-2 lg:col-span-3">
            <label className="text-xs font-bold">Hierarchy Filter:</label>
            <label className="flex items-center gap-1 text-xs font-semibold"><input type="radio" name="hierarchy" /> Direct</label>
            <label className="flex items-center gap-1 text-xs font-semibold"><input type="radio" name="hierarchy" /> Team Wise</label>
          </div>
        </div>
      </Card>

      {/* DATA TABLE */}
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex flex-wrap justify-between items-center mb-3 text-xs gap-3">
          <div className="flex items-center gap-2">
            Show <select className="border rounded p-1"><option>100</option></select> entries
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => handleExport('excel')} className="flex items-center gap-1 border rounded px-2 py-1 hover:bg-gray-50"><FileSpreadsheet className="size-3.5" />Excel</button>
            <button onClick={() => handleExport('pdf')} className="flex items-center gap-1 border rounded px-2 py-1 hover:bg-gray-50"><FileText className="size-3.5" />PDF</button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 border rounded px-2 py-1 hover:bg-gray-50">Column <ChevronDown className="size-3.5"/></button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                {ALL_COLUMNS.map(col => (
                  <DropdownMenuCheckboxItem key={col} checked={visibleColumns.includes(col)} onCheckedChange={() => toggleColumn(col)}>
                    {col}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" /><input className="border rounded py-1 pl-8 pr-2 outline-none" placeholder="Search..." /></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>{visibleColumns.map(c => <th key={c} className="p-2 whitespace-nowrap">{c}</th>)}</tr>
            </thead>
            <tbody className="divide-y">
              <tr><td colSpan={visibleColumns.length} className="p-4 text-center text-gray-400">No data available in table</td></tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 text-xs">
          <div>Showing 0 to 0 of 0 entries</div>
          <button className="border px-2 py-1 rounded">Previous</button>
        </div>
      </Card>
    </div>
  );
}
