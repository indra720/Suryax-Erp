import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/associates/generate-attendance")({
  component: GenerateAttendancePage,
});

function GenerateAttendancePage() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb] space-y-4">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-gray-800">Generate Attendance</h1>
      </div>
      <div className="p-4">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button className="bg-[#6732F2] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-[#5a2ad6]">
              Generate Attendance
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate Attendance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-gray-700">From Date</label>
                <input type="date" className="w-full border rounded p-2 text-xs" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">To Date</label>
                <input type="date" className="w-full border rounded p-2 text-xs" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">Project</label>
                <select className="w-full border rounded p-2 text-xs"><option>Select</option></select>
              </div>
              <button className="w-full bg-[#6732F2] text-white text-xs font-semibold py-2 rounded hover:bg-[#5a2ad6]">
                Generate
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
