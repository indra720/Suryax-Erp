import { toast } from "sonner";
import { Card, CardHead, PageHeader, StatusBadge } from "@/components/erp/ui";
import { agents } from "@/lib/erp/data";

export function ProfilePage() {
  return (
    <>
      <PageHeader title="My Profile" description="Your Suryax ERP account details." breadcrumb={["Profile"]} />
      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <Card className="p-5 text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand text-[24px] font-bold text-white">
            SA
          </span>
          <p className="mt-3 text-[16px] font-bold">Super Admin</p>
          <p className="text-[12.5px] text-text-muted">Administrator • Jaipur</p>
          <div className="mt-3 flex justify-center">
            <StatusBadge value="Confirmed" />
          </div>
          <div className="mt-4 space-y-1.5 text-left text-[12.5px] text-text-secondary">
            <p>Email: admin@suryax.in</p>
            <p>Phone: +91 98290 12345</p>
            <p>Joined: 12 Jan 2024</p>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-[15px] font-semibold">Edit Profile</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile updated");
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              ["Full Name", "Super Admin"],
              ["Email", "admin@suryax.in"],
              ["Phone", "+91 98290 12345"],
              ["Designation", "Administrator"],
              ["City", "Jaipur"],
              ["Reporting To", agents[0]!],
            ].map(([label, value]) => (
              <div key={label}>
                <label className="mb-1.5 block text-[12.5px] font-medium text-text-secondary">{label}</label>
                <input
                  defaultValue={value}
                  className="h-11 w-full rounded-[10px] border border-input bg-card px-3 text-[13.5px] outline-none focus:border-brand"
                />
              </div>
            ))}
            <div className="sm:col-span-2 flex justify-end">
              <button className="h-10 rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-white">
                Save Changes
              </button>
            </div>
          </form>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHead title="Recent Activity" />
        <ul className="px-4 pb-4">
          {[
            "Approved booking BK1024 — ₹85 Lakh",
            "Added new project Urban Crown",
            "Updated permissions for Sales Manager",
            "Exported leads report (CSV)",
          ].map((a, i) => (
            <li key={a} className="border-b border-border py-2.5 text-[13px] last:border-0">
              {a} <span className="text-text-muted">• {i + 1}h ago</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
