import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart as LineChartIcon,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { initialWeeklyTrends, initialLeadSources } from "@/lib/services/marketing";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/analytics")({
  head: () => ({
    meta: [
      { title: "Marketing Analytics & Reports | Vrindavan Marketing" },
      { name: "description", content: "Deep-dive attribution, ROI reports and spend curves." },
    ],
  }),
  component: AnalyticsPage,
});

export function AnalyticsPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <LineChartIcon className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Marketing Analytics & ROI Reports
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Longitudinal lead curves, advertising cost optimization analysis, and site-visit ROI benchmarking.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Exporting Executive Analytics Pack...")}
          className="h-9 gap-1.5 text-xs"
        >
          <Download className="size-3.5" /> Download Executive PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5 bg-card border border-border shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-1">Ad Spend vs Confirmed Bookings Value</h2>
          <p className="text-xs text-text-muted mb-4">Correlation between weekly digital marketing spend and sales velocity</p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={initialWeeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#10184A",
                    borderColor: "#331fa3",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="spend" name="Spend (₹)" stroke="#4F20D8" strokeWidth={2.5} />
                <Line type="monotone" dataKey="leads" name="Inbound Leads" stroke="#10b981" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border shadow-sm">
          <h2 className="text-sm font-semibold text-foreground mb-1">Cost Per Lead (CPL) Benchmarking</h2>
          <p className="text-xs text-text-muted mb-4">Channel comparison against target CPL ceiling of ₹500</p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={initialLeadSources}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="source" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#10184A",
                    borderColor: "#331fa3",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Bar dataKey="cpl" name="CPL (₹)" fill="#2459D6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
