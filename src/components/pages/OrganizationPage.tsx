import { useState } from "react";
import { toast } from "sonner";
import { Card, PageHeader } from "@/components/erp/ui";

const tabs = ["General", "Company Information", "Branding", "Contact", "Address", "Notifications", "Invoice Settings"];

const fieldsByTab: Record<string, { label: string; value: string }[]> = {
  General: [
    { label: "Organization Name", value: "Suryax Developers Pvt. Ltd." },
    { label: "Short Name", value: "Suryax ERP" },
    { label: "Industry", value: "Real Estate" },
    { label: "Currency", value: "INR (₹)" },
  ],
  "Company Information": [
    { label: "CIN Number", value: "U70100RJ2016PTC054321" },
    { label: "RERA Number", value: "RAJ/P/2024/1245" },
    { label: "GSTIN", value: "08AABCS1429B1ZP" },
    { label: "PAN", value: "AABCS1429B" },
  ],
  Branding: [
    { label: "Primary Colour", value: "#4F20D8" },
    { label: "Accent Colour", value: "#F4A51C" },
    { label: "Logo File", value: "suryax-logo.svg" },
    { label: "Favicon", value: "favicon.ico" },
  ],
  Contact: [
    { label: "Support Email", value: "support@suryax.in" },
    { label: "Sales Phone", value: "+91 98290 12345" },
    { label: "Website", value: "www.suryax.in" },
    { label: "WhatsApp", value: "+91 98290 12345" },
  ],
  Address: [
    { label: "Address Line", value: "12 Ashok Marg, C-Scheme" },
    { label: "City", value: "Jaipur" },
    { label: "State", value: "Rajasthan" },
    { label: "Pincode", value: "302001" },
  ],
  Notifications: [
    { label: "Lead Alerts", value: "Email + WhatsApp" },
    { label: "Payment Alerts", value: "Email" },
    { label: "Daily Summary", value: "09:00 AM" },
    { label: "Escalation Email", value: "ops@suryax.in" },
  ],
  "Invoice Settings": [
    { label: "Invoice Prefix", value: "INV-2026-" },
    { label: "GST Rate", value: "5%" },
    { label: "Payment Terms", value: "15 Days" },
    { label: "Bank Account", value: "HDFC ****4321" },
  ],
};

export function OrganizationPage() {
  const [tab, setTab] = useState(tabs[0]!);
  const fields = fieldsByTab[tab]!;

  return (
    <>
      <PageHeader
        title="Organization"
        description="Company information, branding and invoice preferences."
        breadcrumb={["Settings", "Organization"]}
      />
      <div className="mb-4 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`h-9 rounded-[10px] px-3.5 text-[13px] font-semibold ${
              tab === t ? "bg-brand text-white" : "border border-border bg-card text-text-secondary hover:bg-accent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(`${tab} settings saved`);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label}>
                <label className="mb-1.5 block text-[12.5px] font-medium text-text-secondary">{f.label}</label>
                <input
                  defaultValue={f.value}
                  className="h-11 w-full rounded-[10px] border border-input bg-card px-3 text-[13.5px] outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(79,32,216,0.08)]"
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="reset"
              className="h-10 rounded-[10px] border border-border bg-card px-4 text-[13px] font-semibold text-text-secondary"
            >
              Reset
            </button>
            <button type="submit" className="h-10 rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-white">
              Save Changes
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}
