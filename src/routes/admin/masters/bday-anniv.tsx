import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/erp/ui";
import { Search, FileSpreadsheet, FileText, ChevronDown, MessageSquare } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/masters/bday-anniv")({
  component: BdayAnnivPage,
});

const COLUMNS = ["Action", "DOB/Anniversary", "Register Date", "Name", "Father Name", "Mobile No.", "WhatsApp No.", "Address", "Email Id"];

function BdayAnnivPage() {
  const [activeTab, setActiveTab] = useState<'birthday' | 'anniversary'>('birthday');
  const [visibleColumns, setVisibleColumns] = useState(COLUMNS);

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]);
  };

  const bdayData = [
    { dob: "Mon, 12 Aug 1974", reg: "Fri, 08 May 2026", name: "Ajay maharwal", father: "-", mobile: "+918209340527", whatsapp: "+91", addr: "651, Surya Nagar, Jaipur", email: "ajaymaharwal@gmail.com" },
    { dob: "Wed, 12 Aug 1992", reg: "Mon, 06 Jul 2026", name: "AJEET SHERAWAT", father: "-", mobile: "+917976492905", whatsapp: "+91", addr: "62/72 Sector 6 Zone 62 RHB, Jaipur", email: "ajeetsherawatjaipur1990@gmail.com" },
  ];

  const annivData = [
    { anniv: "Wed, 12 Aug 2026", reg: "Sat, 09 May 2026", name: "Agarwal", father: "Late Mr S.N. Agarwal", mobile: "+919166333138", whatsapp: "+919166333138", addr: "House number 10, Govind Nagar, Jaipur", email: "guptagahana@gmail.com" },
  ];

  const currentData = activeTab === 'birthday' ? bdayData : annivData;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h1 className="text-lg font-bold">Birthday / Anniversary</h1>
      </div>

      {/* SEARCH PANEL */}
      <Card className="p-4 bg-white border border-gray-200">
        <h3 className="text-xs font-bold mb-3">Search Panel</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div><label className="text-xs font-bold block mb-1">From Date</label><input type="date" className="w-full border rounded p-1.5 text-xs" defaultValue="2026-08-12"/></div>
          <div><label className="text-xs font-bold block mb-1">To Date</label><input type="date" className="w-full border rounded p-1.5 text-xs" defaultValue="2026-08-19"/></div>
          <div className="flex items-center gap-4 pb-1">
             <label className="flex items-center gap-1 text-xs font-semibold"><input type="radio" name="cat" defaultChecked /> Associate</label>
             <label className="flex items-center gap-1 text-xs font-semibold"><input type="radio" name="cat" /> Customer</label>
          </div>
          <button className="h-8 bg-brand text-white text-xs font-semibold px-4 rounded hover:bg-brand-dark">Search</button>
        </div>
      </Card>

      {/* MAIN CONTENT */}
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex border-b mb-4">
            <button onClick={() => setActiveTab('birthday')} className={`px-4 py-2 text-xs font-bold ${activeTab === 'birthday' ? 'border-b-2 border-brand text-brand' : 'text-gray-500'}`}>Birthday</button>
            <button onClick={() => setActiveTab('anniversary')} className={`px-4 py-2 text-xs font-bold ${activeTab === 'anniversary' ? 'border-b-2 border-brand text-brand' : 'text-gray-500'}`}>Anniversary</button>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-3 text-xs gap-3">
          <div className="flex items-center gap-2">Show <select className="border rounded p-1"><option>5</option></select> entries</div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 border rounded px-2 py-1"><FileSpreadsheet className="size-3.5" />Excel</button>
            <button className="flex items-center gap-1 border rounded px-2 py-1"><FileText className="size-3.5" />PDF</button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><button className="flex items-center gap-1 border rounded px-2 py-1">Column <ChevronDown className="size-3.5"/></button></DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                {COLUMNS.map(col => <DropdownMenuCheckboxItem key={col} checked={visibleColumns.includes(col)} onCheckedChange={() => toggleColumn(col)}>{col}</DropdownMenuCheckboxItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" /><input className="border rounded py-1 pl-8 pr-2 outline-none" placeholder="Search..." /></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>{visibleColumns.map(c => <th key={c} className="p-2">{c}</th>)}</tr>
            </thead>
            <tbody className="divide-y">
              {currentData.map((item: any, i: number) => (
                <tr key={i}>
                  <td className="p-2"><button className="flex items-center gap-1 text-emerald-600"><MessageSquare className="size-3.5"/>Whatsapp</button></td>
                  <td className="p-2 whitespace-nowrap">{activeTab === 'birthday' ? item.dob : item.anniv}</td>
                  <td className="p-2 whitespace-nowrap">{item.reg}</td>
                  <td className="p-2 font-medium">{item.name}</td>
                  <td className="p-2">{item.father}</td>
                  <td className="p-2 whitespace-nowrap">{item.mobile}</td>
                  <td className="p-2 whitespace-nowrap">{item.whatsapp}</td>
                  <td className="p-2">{item.addr}</td>
                  <td className="p-2">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
