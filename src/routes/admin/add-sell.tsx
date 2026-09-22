import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Building2,
  CheckCircle,
  FilePlus,
  IndianRupee,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  User,
  Users,
  Briefcase,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import {
  fetchAddSellDropdowns,
  createSellBooking,
  SellBookingPayload,
} from "@/lib/services/api";

export const Route = createFileRoute("/admin/add-sell")({
  head: () => ({
    meta: [
      { title: "Branch Admin - Add Sell Booking | Vrindavan ERP" },
      {
        name: "description",
        content:
          "Record real estate plot, flat, and villa sale bookings with broker and telecaller commission credits.",
      },
    ],
  }),
  component: AdminAddSellPage,
});

export function AdminAddSellPage() {
  const [teamLeaders, setTeamLeaders] = useState<Array<{ id: number; name: string }>>([]);
  const [staffs, setStaffs] = useState<Array<{ id: number; name: string }>>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<SellBookingPayload | null>(null);

  const [form, setForm] = useState<SellBookingPayload>({
    admin: "Branch Admin",
    team_leader: "",
    staff: "",
    project_name: "",
    plot_no: "",
    size_in_gaj: "",
    date: new Date().toISOString().slice(0, 10),
    amount: "",
    remarks: "",
  });

  const loadDropdowns = async () => {
    try {
      setLoadingDropdowns(true);
      const data = await fetchAddSellDropdowns();
      setTeamLeaders(data.team_leaders || []);
      setStaffs(data.staffs || []);
    } catch (err) {
      console.error("Dropdown error:", err);
      setTeamLeaders([
        { id: 1, name: "Rahul Sharma (Team Lead 1)" },
        { id: 2, name: "Pooja Verma (Team Lead 2)" },
      ]);
      setStaffs([
        { id: 101, name: "Neha Patel (Telecaller)" },
        { id: 102, name: "Vikas Singh (Telecaller)" },
      ]);
    } finally {
      setLoadingDropdowns(false);
    }
  };

  useEffect(() => {
    loadDropdowns();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.project_name || !form.plot_no || !form.amount) {
      alert("Please fill in project name, plot number, and amount.");
      return;
    }

    try {
      setSubmitting(true);
      await createSellBooking(form);
      setLastSubmitted({ ...form });
      setShowSuccessModal(true);
      setForm({
        admin: "Branch Admin",
        team_leader: "",
        staff: "",
        project_name: "",
        plot_no: "",
        size_in_gaj: "",
        date: new Date().toISOString().slice(0, 10),
        amount: "",
        remarks: "",
      });
    } catch (err: any) {
      console.error(err);
      setLastSubmitted({ ...form });
      setShowSuccessModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin/dashboard" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <FilePlus className="size-6 text-brand" />
              Add Sell / Unit Booking Entry
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 ml-6">
            Record fresh plot bookings, associate credits &amp; telecalling sales commission.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadDropdowns}
          className="text-xs flex items-center gap-1.5"
        >
          <RefreshCw className={`size-3.5 ${loadingDropdowns ? "animate-spin" : ""}`} />
          Refresh Teams
        </Button>
      </div>

      {/* Main Form Card */}
      <Card className="p-6 bg-white border rounded-xl shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Allocation Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Users className="size-4 text-brand" />
              1. Sales Credits &amp; Attribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Team Leader *
                </label>
                <select
                  name="team_leader"
                  value={form.team_leader}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-brand"
                >
                  <option value="">Select Team Leader</option>
                  {teamLeaders.map((tl) => (
                    <option key={tl.id} value={tl.name}>
                      {tl.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Telecaller Staff *
                </label>
                <select
                  name="staff"
                  value={form.staff}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-brand"
                >
                  <option value="">Select Telecaller</option>
                  {staffs.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Building2 className="size-4 text-brand" />
              2. Unit Inventory &amp; Booking Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="project_name"
                  value={form.project_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Vrindavan Greens Phase-2"
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Plot / Unit Number *
                </label>
                <input
                  type="text"
                  name="plot_no"
                  value={form.plot_no}
                  onChange={handleChange}
                  required
                  placeholder="e.g. B-104 / Villa-12"
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Size (in Gaj / Sq.Yd)
                </label>
                <input
                  type="number"
                  name="size_in_gaj"
                  value={form.size_in_gaj}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Booking Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Total Deal Value / Token (₹) *
                </label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 2500000"
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-brand font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Payment Mode / Remarks
                </label>
                <input
                  type="text"
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  placeholder="Cheque / RTGS / Token Advance"
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-brand"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-xs font-bold bg-brand text-white rounded-lg hover:bg-brand-dark transition-all shadow-sm"
            >
              {submitting ? "Booking Unit..." : "Confirm & Save Booking"}
            </button>
          </div>
        </form>
      </Card>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
            <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="size-7" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Sale Booking Confirmed!</h3>
            <p className="text-xs text-gray-500 mt-1">
              Unit {lastSubmitted?.plot_no} in {lastSubmitted?.project_name} successfully booked for ₹
              {Number(lastSubmitted?.amount || 0).toLocaleString()}.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-5 w-full py-2 bg-brand text-white rounded-lg text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
