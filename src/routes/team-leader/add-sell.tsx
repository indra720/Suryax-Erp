import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, FilePlus, Sparkles, Building2, User, Calendar, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  fetchTeamLeaderStaffDashboard,
  addSellFreelancer,
  TeamLeaderStaff,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/add-sell")({
  head: () => ({
    meta: [
      { title: "Add Sell Plot Booking | Team Leader Portal" },
      { name: "description", content: "Record plot and villa sales for staff and associates." },
    ],
  }),
  component: TeamLeaderAddSellPage,
});

export function TeamLeaderAddSellPage() {
  const [staffs, setStaffs] = useState<TeamLeaderStaff[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    staff: "",
    project_name: "",
    plot_no: "",
    size_in_gaj: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const loadStaffs = async () => {
    try {
      const data = await fetchTeamLeaderStaffDashboard();
      setStaffs(data.staff_list || []);
      const first = data.staff_list?.[0];
      if (first) {
        setForm((prev) => ({ ...prev, staff: String(first.id) }));
      }
    } catch {
      // Fallback staff list
      setStaffs([
        { id: 1, username: "Neha Sharma", email: "neha.sharma@vrindavan.com", mobile: "9829011223", created_date: "" },
        { id: 2, username: "Rahul Verma", email: "rahul.verma@vrindavan.com", mobile: "9829044556", created_date: "" },
      ]);
      setForm((prev) => ({ ...prev, staff: "1" }));
    }
  };

  useEffect(() => {
    loadStaffs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.staff) {
      toast.error("Please select a staff member.");
      return;
    }
    setLoading(true);

    try {
      const { staff, ...sellData } = form;
      await addSellFreelancer(staff, sellData);
      setShowSuccessModal(true);
      setForm({
        staff: staffs.length > 0 && staffs[0] ? String(staffs[0].id) : "",
        project_name: "",
        plot_no: "",
        size_in_gaj: "",
        date: new Date().toISOString().slice(0, 10),
      });
      toast.success("Sell record added successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to record sell.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <FilePlus className="size-6 text-[#6732F2]" />
            Add Sell Booking
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Submit confirmed plot sales on behalf of your team telecallers for incentive tracking.
          </p>
        </div>
      </div>

      <Card className="border border-border rounded-2xl bg-card shadow-sm max-w-4xl xl:max-w-5xl">
        <CardHeader className="p-5 sm:p-6 border-b border-border">
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Building2 className="size-5 text-brand" />
            Sell Plot Details
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
            Fill in the buyer booking details and assign credit to the respective staff member.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="staff" className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">
                Staff Member *
              </Label>
              <Select
                name="staff"
                value={form.staff}
                onValueChange={(val) => handleSelectChange("staff", val)}
              >
                <SelectTrigger id="staff" className="h-10 sm:h-11 text-sm rounded-xl">
                  <SelectValue placeholder="Select Staff Telecaller" />
                </SelectTrigger>
                <SelectContent>
                  {staffs.map((st) => (
                    <SelectItem key={st.id} value={String(st.id)} className="text-sm">
                      {st.username || st.name} ({st.email || st.mobile})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="project_name" className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">
                  Project Name *
                </Label>
                <Input
                  id="project_name"
                  name="project_name"
                  value={form.project_name}
                  onChange={handleChange}
                  placeholder="e.g. Vrindavan Residency Phase-2"
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">
                  Booking / Sale Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="plot_no" className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">
                  Plot Number *
                </Label>
                <Input
                  id="plot_no"
                  name="plot_no"
                  value={form.plot_no}
                  onChange={handleChange}
                  placeholder="e.g. P-142"
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="size_in_gaj" className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">
                  Plot Size (Gaj) *
                </Label>
                <Input
                  id="size_in_gaj"
                  name="size_in_gaj"
                  value={form.size_in_gaj}
                  onChange={handleChange}
                  placeholder="e.g. 200"
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 h-11 rounded-xl shadow-md"
              >
                {loading ? "Submitting Booking..." : "Submit Sell Booking"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-sm text-center p-6">
          <DialogHeader className="items-center">
            <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2 animate-bounce">
              <CheckCircle className="size-10" />
            </div>
            <DialogTitle className="text-xl font-extrabold text-emerald-700">
              Fantastic!
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-gray-600 py-2">
            The sell record has been saved successfully and credited to the telecaller's incentive plan.
          </p>
          <DialogFooter className="sm:justify-center">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
              onClick={() => setShowSuccessModal(false)}
            >
              Great, Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
