import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { Card, CardHead, MiniStat, PageHeader } from "@/components/erp/ui";
import { revenueTrend, leadSources, funnelStages } from "@/lib/erp/data";
import { IndianRupee, Users, Home, Wallet } from "lucide-react";

const tabs = ["Revenue", "Sales", "Leads", "Bookings", "Properties", "Agents", "Payments", "Expenses"];

export function ReportsPage() {
  const [tab, setTab] = useState("Revenue");
  const bars = leadSources.map((s) => ({ name: s.name, value: s.value }));

  return (
    <>
      <PageHeader
        title="Reports"
        description="Revenue, sales, leads and expense analytics."
        breadcrumb={["Finance", "Reports"]}
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MiniStat label="Total Revenue" value="₹12.48 Cr" hint="↑ 32% vs last period" icon={IndianRupee} />
        <MiniStat label="Total Leads" value="1,248" hint="↑ 18%" tone="info" icon={Users} />
        <MiniStat label="Properties Sold" value="287" hint="↑ 20%" tone="success" icon={Home} />
        <MiniStat label="Total Expenses" value="₹3.92 Cr" hint="↑ 6%" tone="warning" icon={Wallet} />
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`h-9 rounded-[10px] px-3.5 text-[13px] font-semibold transition-colors ${
              tab === t ? "bg-brand text-white" : "border border-border bg-card text-text-secondary hover:bg-accent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHead title={`${tab} Trend`} />
          <div className="h-[260px] px-2 pb-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend} margin={{ left: -14, right: 12 }}>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4F20D8" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHead title="Channel Breakdown" />
          <div className="h-[260px] px-2 pb-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} margin={{ left: -14, right: 12 }}>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#2459D6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHead title="Conversion Funnel" />
        <div className="grid gap-2 px-4 pb-4 sm:grid-cols-5">
          {funnelStages.map((s) => (
            <div key={s.stage} className="rounded-[12px] p-3 text-center" style={{ background: `${s.color}14` }}>
              <p className="text-[11.5px] font-medium text-text-secondary">{s.stage}</p>
              <p className="mt-1 text-[17px] font-bold" style={{ color: s.color }}>
                {s.value.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] font-semibold text-text-muted">{s.pct}%</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
