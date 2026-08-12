import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  BookMarked,
  Building,
  Building2,
  CalendarCheck,
  Home,
  IndianRupee,
  MapPin,
  Megaphone,
  Send,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  UsersRound,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card, CardHead, StatusBadge } from "@/components/erp/ui";
import {
  funnelStages,
  leadSources,
  projects,
  propertyTypes,
  revenueTrend,
  sparkData,
  bookings,
  leads,
  siteVisits,
} from "@/lib/erp/data";
import heroImg from "@/assets/hero-builidng2.png";
import heroImg2 from "@/assets/hero-img3.png";

import aiAvatar from "@/assets/ai-avatar.jpg";
import { RealtyBot } from "./RealtyBot";
import { cn } from "@/lib/utils";

const kpis = [
  {
    label: "Total Leads",
    value: "1,248",
    delta: "18%",
    icon: Users,
    tone: "brand",
    color: "#4F20D8",
  },
  {
    label: "Active Clients",
    value: "876",
    delta: "22%",
    icon: UserCheck,
    tone: "success",
    color: "#13A66A",
  },
  {
    label: "Bookings",
    value: "342",
    delta: "26%",
    icon: CalendarCheck,
    tone: "info",
    color: "#2459D6",
  },
  {
    label: "Revenue",
    value: "₹12.48 Cr",
    delta: "32%",
    icon: IndianRupee,
    tone: "brand",
    color: "#5B2BE0",
  },
  {
    label: "Properties Sold",
    value: "287",
    delta: "20%",
    icon: Home,
    tone: "danger",
    color: "#E94B5F",
  },
] as const;

const toneBg: Record<string, string> = {
  brand: "bg-brand-soft text-brand",
  success: "bg-success-soft text-success",
  info: "bg-info-soft text-info",
  danger: "bg-danger-soft text-danger",
};

function ChartTip({ active, payload, label, suffix = "" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[10px] border border-border bg-popover px-3 py-2 shadow-[var(--shadow-pop)]">
      <p className="text-[13px] font-bold">
        {suffix}
        {payload[0].value}
        {suffix ? " Cr" : ""}
      </p>
      <p className="text-[11px] text-text-muted">{label} 2026</p>
    </div>
  );
}

export function Dashboard() {
  const [range, setRange] = useState("Last 6 Months");
  const [chat, setChat] = useState<{ from: "bot" | "me"; text: string }[]>([]);
  const [msg, setMsg] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setChat((c) => [
      ...c,
      { from: "me", text },
      {
        from: "bot",
        text: `Based on current data, ${text.toLowerCase().includes("market") ? "Jaipur residential demand is up 18% QoQ; Suryax Greens has the strongest absorption at 78%." : "I recommend prioritising the 499 website leads — they convert at 24% within 30 days."}`,
      },
    ]);
    setMsg("");
  };

  return (
    <div className="space-y-4 ">
      {/* HERO */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <div className="relative h-50 overflow-hidden rounded-[14px]">
          <img
            src={heroImg}
            alt="Suryax residential towers at dusk"
            width={1300}
            className="absolute inset-0 size-full  object-cover"
          />
          <div className="absolute inset-0 w-full " />
          <div className="relative flex h-full flex-col justify-center p-6">
            <h2 className="text-[14px] md:text-[20px] font-bold text-white">
              Welcome back, Super Admin! 👋
            </h2>
            <p className="mt-1 text-[12.5px] text-white/70">
              Manage leads, projects and operations with real-time insights.
            </p>
            <div className="mt-3   flex flex-wrap gap-2">
              {[
                { icon: Building2, label: "Total Projects", value: "6" },
                { icon: MapPin, label: "Cities", value: "9" },
                { icon: TrendingUp, label: "Revenue", value: "↑ 24%" },
                { icon: ArrowUpRight, label: "Conversion", value: "↑ 18%" },
              ].map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[11.5px] font-medium text-white/90 backdrop-blur-[2px]"
                >
                  <p.icon className="size-3.5" />
                  {p.label}
                  <span className="font-semibold text-[#7DF0B6]">{p.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-50 overflow-hidden rounded-[14px]">
          <img
            src={heroImg2}
            alt="Premium villa"
            width={900}
            height={560}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B0F2B]/50 to-[#0B0F2B]/90" />
          <div className="relative flex h-full flex-col items-end justify-center px-4 text-right">
            <p className="text-[14px] leading-snug font-bold text-white">
              Dream Properties
              <br />
              Better Investments.
            </p>
            <Link
              to="/projects"
              className="mt-3 inline-flex h-8 items-center rounded-lg bg-[#bd8839] px-3 text-[12px] font-semibold text-[#3A2000] transition-transform hover:scale-[1.02]"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k, i) => (
          // <Card key={k.label} className="p-3 relative overflow-hidden h-[96px]">
          //   <div className="flex items-start gap-2.5">
          //     <span
          //       className={cn(
          //         "grid size-8 shrink-0 place-items-center rounded-[10px]",
          //         toneBg[k.tone],
          //       )}
          //     >
          //       <k.icon className="size-4" />
          //     </span>
          //     <div className="min-w-0">
          //       <p className="text-[11px] font-medium text-text-secondary">{k.label}</p>
          //       <p className="text-[20px] leading-tight font-bold tracking-tight">{k.value}</p>
          //       <p className="text-[9.5px] font-medium" style={{ color: k.color }}>
          //         ↑ {k.delta} <span className="text-text-muted">vs last month</span>
          //       </p>
          //     </div>
          //     <Sparkles className="size-4 shrink-0 opacity-70" style={{ color: k.color }} />
          //   </div>

          //   <div className="mt-2 h-7 w-1/2 transaction transform rotate-45">
          //     <ResponsiveContainer width="100%" height="100%">
          //       <AreaChart data={sparkData(i)} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          //         <Area
          //           type="linear"
          //           dataKey="y"
          //           stroke={k.color}
          //           strokeWidth={1.5}
          //           fill={k.color}
          //           fillOpacity={0.2}
          //           dot={false}
          //           isAnimationActive={false}
          //         />
          //       </AreaChart>
          //     </ResponsiveContainer>
          //   </div>
          // </Card>
          <Card key={k.label} className="p-3 relative overflow-hidden h-[96px]">
            <div className="flex items-start gap-2.5">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-[10px]",
                  toneBg[k.tone],
                )}
              >
                <k.icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-text-secondary">{k.label}</p>
                <p className="text-[20px] leading-tight font-bold tracking-tight">{k.value}</p>
                <p className="text-[9.5px] font-medium" style={{ color: k.color }}>
                  ↑ {k.delta} <span className="text-text-muted">vs last month</span>
                </p>
              </div>
              <Sparkles className="size-4 shrink-0 opacity-70" style={{ color: k.color }} />
            </div>

            <div className="absolute bottom-0 right-0 h-6 w-24 transform -skew-y-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData(i)} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <Area
                    type="linear"
                    dataKey="y"
                    stroke={k.color}
                    strokeWidth={1.5}
                    fill={k.color}
                    fillOpacity={0.2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      {/* ADDITIONAL KPI GRID */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {[
          { label: "Associates", value: "301", icon: UsersRound, color: "#4F20D8" },
          { label: "Bookings", value: "26", icon: BookMarked, color: "#2459D6" },
          { label: "Projects", value: "1", icon: Building2, color: "#E94B5F" },
          { label: "Leads", value: "9", icon: Users, color: "#13A66A" },
          { label: "SiteVisits", value: "0", icon: MapPin, color: "#F4A51C" },
          { label: "MagicBricks", value: "0", icon: Home, color: "#5B2BE0" },
          { label: "Facebook", value: "0", icon: Megaphone, color: "#3b5998" },
          { label: "Housing.com", value: "0", icon: Building, color: "#E4405F" },
          { label: "99acres.com", value: "0", icon: Building, color: "#e46f00" },
          { label: "WebSite", value: "0", icon: Send, color: "#6732F2" },
        ].map((k) => (
          <Card key={k.label} className="p-3" style={{ borderLeft: `4px solid ${k.color}` }}>
            <div className="flex items-center gap-2">
              <k.icon className="size-4" style={{ color: k.color }} />
              <p className="text-[11px] font-medium text-text-secondary truncate">{k.label}</p>
            </div>
            <p className="mt-1 text-[18px] font-bold tracking-tight">{k.value}</p>
          </Card>
        ))}
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-[5fr_3fr_2.6fr]">
        <Card className="pb-3">
          <div className="flex items-center justify-between px-4 pt-4">
            <h3 className="text-[15px] font-semibold">Revenue Trend</h3>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="h-8 rounded-lg border border-border bg-card px-2 text-[12px] font-medium outline-none focus:border-brand"
            >
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <p className="px-4 pt-2 text-right text-[12px] font-semibold text-success">
            ↑ 32% <span className="font-medium text-text-muted">vs last period</span>
          </p>
          <div className="h-[210px] px-2 pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 4, right: 12, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F20D8" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#4F20D8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                />
                <YAxis
                  tickFormatter={(v) => `₹${v} Cr`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                />
                <Tooltip content={<ChartTip suffix="₹" />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4F20D8"
                  strokeWidth={2.5}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHead title="Property Type Distribution" />
          <div className="flex flex-col md:flex-row  items-center gap-2 px-4 pb-4">
            <div className="relative h-[180px] w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypes}
                    dataKey="value"
                    innerRadius={54}
                    outerRadius={80}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {propertyTypes.map((p) => (
                      <Cell key={p.name} fill={p.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <p className="text-[11px] text-text-muted">Total</p>
                  <p className="text-[22px] font-bold">287</p>
                </div>
              </div>
            </div>
            <ul className="space-y-2.5">
              {propertyTypes.map((p) => (
                <li key={p.name} className="flex items-center gap-2 text-[12.5px]">
                  <span className="size-2 rounded-full" style={{ background: p.color }} />
                  <span className="font-medium">{p.name}</span>
                  <span className="ml-auto font-semibold">{p.pct}%</span>
                  <span className="text-text-muted">({p.value})</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card>
          <CardHead
            title="Recent Leads"
            action={
              <Link to="/leads" className="text-[12px] font-semibold text-brand">
                View All
              </Link>
            }
          />
          <ul className="px-4 pb-3">
            {leads.slice(0, 3).map((l) => (
              <li
                key={l.id}
                className="flex items-center gap-2.5 border-b border-[#ECEEF4] py-2.5 last:border-0 dark:border-border"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-[12px] font-semibold text-brand">
                  {l.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold">{l.name}</p>
                  <p className="truncate text-[11.5px] text-text-muted">
                    {l.interest} • {l.city}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <StatusBadge value={l.status} />
                  <p className="mt-1 text-[10.5px] text-text-muted">2h ago</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-[4fr_3.4fr_3fr]">
        <Card>
          <CardHead
            title="Project Performance"
            action={
              <Link to="/projects" className="text-[12px] font-semibold text-brand">
                View All
              </Link>
            }
          />
          <ul className="space-y-3 px-4 pb-4">
            {projects.slice(0, 3).map((p) => {
              const pct = Math.round((p.sold / p.totalUnits) * 100);
              return (
                <li key={p.id} className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={640}
                    height={512}
                    className="size-12 shrink-0 rounded-[10px] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold">{p.name}</p>
                    <p className="text-[11.5px] text-text-muted">{p.location}</p>
                  </div>
                  <div className="w-[130px]">
                    <div className="flex items-center justify-between text-[11px] text-text-secondary">
                      <span>Units Sold</span>
                      <span className="font-semibold text-foreground">{pct}%</span>
                    </div>
                    <p className="text-[12.5px] font-semibold">
                      {p.sold}/{p.totalUnits}
                    </p>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-success"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <CardHead title="Leads by Source" />
          <div className="flex flex-col md:flex-row items-center gap-2 px-4 pb-4">
            <div className="relative h-[180px] w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSources}
                    dataKey="value"
                    innerRadius={54}
                    outerRadius={80}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {leadSources.map((p) => (
                      <Cell key={p.name} fill={p.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <p className="text-[22px] leading-tight font-bold">1,248</p>
                  <p className="text-[11px] text-text-muted">Total Leads</p>
                </div>
              </div>
            </div>
            <ul className="space-y-2.5">
              {leadSources.map((p) => (
                <li key={p.name} className="flex items-center gap-2 text-[12.5px]">
                  <span className="size-2 rounded-full" style={{ background: p.color }} />
                  <span className="font-medium">{p.name}</span>
                  <span className="ml-auto font-semibold">{p.pct}%</span>
                  <span className="text-text-muted">({p.value})</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card>
          <CardHead
            title="Upcoming Site Visits"
            action={
              <Link to="/site-visits" className="text-[12px] font-semibold text-brand">
                View All
              </Link>
            }
          />
          <ul className="space-y-2 px-4 pb-4">
            {siteVisits.slice(0, 3).map((v, i) => (
              <li key={v.id} className="flex items-center gap-2.5 rounded-[10px] bg-muted p-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-card text-brand">
                  <CalendarCheck className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold">
                    {v.project} – {v.city}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    {["Today, 10:00 AM", "Tomorrow, 11:30 AM", "22 May, 10:00 AM"][i]}
                  </p>
                </div>
                <span className="ml-auto rounded-md bg-brand-soft px-2 py-1 text-[10.5px] font-semibold text-brand">
                  Site Visit
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ROW 4 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHead
              title="Recent Bookings"
              action={
                <Link to="/bookings" className="text-[12px] font-semibold text-brand">
                  View All
                </Link>
              }
            />
            <ul className="px-4 pb-3">
              {bookings.slice(0, 3).map((b) => (
                <li
                  key={b.id}
                  className="flex items-center gap-3 border-b border-[#ECEEF4] py-2.5 last:border-0 dark:border-border"
                >
                  <img
                    src={b.image}
                    alt={b.property}
                    loading="lazy"
                    width={640}
                    height={512}
                    className="size-10 rounded-[10px] object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold">
                      {b.property} – {b.project}
                    </p>
                    <p className="text-[11.5px] text-text-muted">Booking ID: {b.id}</p>
                  </div>
                  <span className="ml-auto">
                    <StatusBadge value={b.status} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHead title="Sales Funnel" />
            <div className="grid grid-cols-1 gap-2 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-5">
              {funnelStages.map((s, i) => {
                const isFirst = i === 0;
                const isLast = i === funnelStages.length - 1;

                return (
                  <div
                    key={s.stage}
                    className="relative flex flex-col justify-center gap-2 px-5 py-4"
                    style={{
                      background: `linear-gradient(135deg, ${s.color}22, ${s.color}3D)`,
                      clipPath: isFirst
                        ? "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)"
                        : isLast
                          ? "polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)"
                          : "polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0 50%)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[12px] font-medium text-text-secondary">
                        {s.stage}
                      </span>
                      <span className="shrink-0 text-[13px] font-bold" style={{ color: s.color }}>
                        {s.pct}%
                      </span>
                    </div>

                    <p className="text-[19px] leading-none font-bold tracking-tight">
                      {s.value.toLocaleString("en-IN")}
                    </p>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/60 dark:bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.pct}%`, background: s.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* AI ASSISTANT */}
        <RealtyBot variant="card" />
      </div>
    </div>
  );
}
