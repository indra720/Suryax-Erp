import { useState } from "react";
import { toast } from "sonner";
import { Card, PageHeader } from "@/components/erp/ui";

const tabs = ["Preferences", "Security", "Notifications"];

export function SettingsPage() {
  const [tab, setTab] = useState(tabs[0]!);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Email alerts": true,
    "WhatsApp alerts": true,
    "Weekly summary": false,
    "Two-factor authentication": true,
  });

  return (
    <>
      <PageHeader
        title="Account Settings"
        description="Preferences, security and notification settings."
        breadcrumb={["Settings", "Account"]}
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
        {tab === "Preferences" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Language", "English (India)"],
              ["Time Zone", "Asia/Kolkata (GMT +5:30)"],
              ["Date Format", "DD/MM/YYYY"],
              ["Currency", "INR (₹)"],
            ].map(([l, v]) => (
              <div key={l}>
                <label className="mb-1.5 block text-[12.5px] font-medium text-text-secondary">{l}</label>
                <input
                  defaultValue={v}
                  className="h-11 w-full rounded-[10px] border border-input bg-card px-3 text-[13.5px] outline-none focus:border-brand"
                />
              </div>
            ))}
          </div>
        )}

        {tab === "Security" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {["Current Password", "New Password", "Confirm Password"].map((l) => (
              <div key={l}>
                <label className="mb-1.5 block text-[12.5px] font-medium text-text-secondary">{l}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-[10px] border border-input bg-card px-3 text-[13.5px] outline-none focus:border-brand"
                />
              </div>
            ))}
          </div>
        )}

        {tab === "Notifications" && (
          <ul className="divide-y divide-border">
            {Object.keys(toggles).map((k) => (
              <li key={k} className="flex items-center justify-between py-3">
                <span className="text-[13.5px] font-medium">{k}</span>
                <button
                  onClick={() => setToggles((s) => ({ ...s, [k]: !s[k] }))}
                  className={`h-6 w-11 rounded-full transition-colors ${toggles[k] ? "bg-brand" : "bg-muted"}`}
                  aria-label={k}
                >
                  <span
                    className={`block size-5 rounded-full bg-white shadow transition-transform ${
                      toggles[k] ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => toast.success("Settings saved")}
            className="h-10 rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-white"
          >
            Save Changes
          </button>
        </div>
      </Card>
    </>
  );
}
