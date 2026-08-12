import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHead, PageHeader, StatusBadge } from "@/components/erp/ui";
import { siteVisits, followups } from "@/lib/erp/data";

const views = ["Month", "Week", "Day"] as const;

export function CalendarPage() {
  const [view, setView] = useState<(typeof views)[number]>("Month");
  const [month, setMonth] = useState(4); // May
  const year = 2026;
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const label = new Date(year, month, 1).toLocaleString("en-IN", { month: "long", year: "numeric" });

  const events: Record<number, { title: string; type: string }[]> = {};
  siteVisits.forEach((v) => {
    const d = Number(v.date.split("-")[2]);
    (events[d] ??= []).push({ title: `${v.project} visit`, type: "Site Visit" });
  });
  followups.slice(0, 5).forEach((f, i) => {
    const d = 5 + i * 4;
    (events[d] ??= []).push({ title: `${f.type} — ${f.lead}`, type: "Follow-up" });
  });

  return (
    <>
      <PageHeader
        title="Calendar"
        description="Site visits, follow-ups, meetings and bookings."
        breadcrumb={["Operations", "Calendar"]}
        actions={
          <div className="flex gap-1.5">
            {views.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`h-9 rounded-[10px] px-3.5 text-[13px] font-semibold ${
                  view === v ? "bg-brand text-white" : "border border-border bg-card text-text-secondary"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        }
      />

      <Card>
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <h3 className="text-[15px] font-semibold">{label}</h3>
          <div className="flex gap-1">
            <button
              onClick={() => setMonth((m) => (m + 11) % 12)}
              className="grid size-8 place-items-center rounded-lg border border-border"
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setMonth((m) => (m + 1) % 12)}
              className="grid size-8 place-items-center rounded-lg border border-border"
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px border-t border-border bg-border">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="bg-muted py-2 text-center text-[11.5px] font-semibold text-text-secondary">
              {d}
            </div>
          ))}
          {Array.from({ length: first }).map((_, i) => (
            <div key={`e${i}`} className="min-h-[92px] bg-card" />
          ))}
          {Array.from({ length: view === "Month" ? days : view === "Week" ? 7 : 1 }, (_, i) => i + 1).map((d) => (
            <div key={d} className="min-h-[92px] bg-card p-1.5">
              <p className="mb-1 text-[11.5px] font-semibold text-text-secondary">{d}</p>
              {(events[d] ?? []).slice(0, 2).map((e, i) => (
                <p
                  key={i}
                  className="mb-1 truncate rounded-md bg-brand-soft px-1.5 py-1 text-[10.5px] font-medium text-brand"
                >
                  {e.title}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-4">
        <CardHead title="Upcoming Events" />
        <ul className="px-4 pb-4">
          {siteVisits.slice(0, 5).map((v) => (
            <li key={v.id} className="flex items-center gap-3 border-b border-border py-2.5 last:border-0">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold">
                  {v.project} — {v.client}
                </p>
                <p className="text-[11.5px] text-text-muted">
                  {v.date} • {v.time} • {v.agent}
                </p>
              </div>
              <span className="ml-auto">
                <StatusBadge value={v.status} />
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
