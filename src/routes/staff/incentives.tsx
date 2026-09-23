import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Filter, Loader2, IndianRupee, Layers, CheckCircle, Home, Calendar, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { fetchStaffIncentives, type IncentiveSlab, type StaffIncentivesData } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/incentives")({
  head: () => ({
    meta: [
      { title: "My Incentives & Bonus Slabs | Vrindavan ERP Staff" },
      { name: "description", content: "Track property sales, achieved commission slabs, and monthly incentive payout." },
    ],
  }),
  component: StaffIncentivesPage,
});

interface SoldProperty {
  id: number;
  property_name: string;
  plot_no: string;
  size_in_gaj: number | string;
  earn_amount: number;
  sale_date: string;
}

export function StaffIncentivesPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [incentives, setIncentives] = useState<StaffIncentivesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const mockSoldProperties: SoldProperty[] = [
    {
      id: 1,
      property_name: "Vrindavan Greens Phase 1",
      plot_no: "A-42",
      size_in_gaj: 150,
      earn_amount: 18000,
      sale_date: "12 Sep 2026",
    },
    {
      id: 2,
      property_name: "Vrindavan Heights Tower B",
      plot_no: "Flat 402",
      size_in_gaj: 180,
      earn_amount: 22000,
      sale_date: "18 Sep 2026",
    },
    {
      id: 3,
      property_name: "Royal City Phase 2",
      plot_no: "C-15",
      size_in_gaj: 120,
      earn_amount: 14000,
      sale_date: "21 Sep 2026",
    },
  ];

  async function loadIncentives(y = year, m = month) {
    setLoading(true);
    try {
      const data = await fetchStaffIncentives(y, m);
      setIncentives(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load incentives");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIncentives(year, month);
  }, [year, month]);

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const slabs = incentives?.incentive_slabs || [];
  const currentSlab = incentives?.current_slab;

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Month & Year Filter Bar */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                My Incentives & Bonus Slabs
              </h2>
              <p className="text-xs text-muted-foreground">
                Performance-based commission slabs and monthly earned bonus.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Select value={String(month)} onValueChange={(val) => setMonth(Number(val))}>
                <SelectTrigger className="w-[125px] h-8 text-xs">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={String(m.value)} className="text-xs">
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={String(year)} onValueChange={(val) => setYear(Number(val))}>
                <SelectTrigger className="w-[90px] h-8 text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {[2024, 2025, 2026, 2027].map((y) => (
                    <SelectItem key={y} value={String(y)} className="text-xs">
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1"
                onClick={() => loadIncentives()}
                disabled={loading}
              >
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-l-4 border-l-blue-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Plots/Units Sold</p>
            <h3 className="text-lg sm:text-xl font-bold mt-1">
              {incentives?.total_plots ?? 3}
            </h3>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Total Gaj Sold</p>
            <h3 className="text-lg sm:text-xl font-bold mt-1">
              {incentives?.total_gaj ?? 450} <span className="text-xs font-normal text-muted-foreground">Gaj</span>
            </h3>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Total Sales Value</p>
            <h3 className="text-lg sm:text-xl font-bold mt-1">
              ₹{(incentives?.total_target_value ?? 3600000).toLocaleString()}
            </h3>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Incentive Earned</p>
            <h3 className="text-lg sm:text-xl font-bold text-emerald-700 mt-1">
              ₹{(incentives?.incentive_amount ?? 54000).toLocaleString()}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Incentive Slabs Achieved */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            Company Incentive Slabs & Current Status
          </CardTitle>
          <CardDescription className="text-xs">
            Commission percentage scales dynamically with your total monthly sales volume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold">Slab Level</TableHead>
                  <TableHead className="text-xs font-bold">Start Volume</TableHead>
                  <TableHead className="text-xs font-bold">End Volume</TableHead>
                  <TableHead className="text-xs font-bold">Incentive Rate</TableHead>
                  <TableHead className="text-xs font-bold text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slabs.map((slab) => {
                  const isAchieved = currentSlab?.id === slab.id;
                  const endText = slab.end_value === "0" ? "No Upper Limit" : `₹${Number(slab.end_value).toLocaleString()}`;
                  return (
                    <TableRow
                      key={slab.id}
                      className={cn("text-xs transition-colors", isAchieved && "bg-emerald-50/70 font-semibold")}
                    >
                      <TableCell className="font-semibold">Slab #{slab.id}</TableCell>
                      <TableCell>₹{Number(slab.start_value).toLocaleString()}</TableCell>
                      <TableCell>{endText}</TableCell>
                      <TableCell className="text-primary font-bold">{slab.incentive}</TableCell>
                      <TableCell className="text-right">
                        {isAchieved ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px] gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Current Achieved
                          </Badge>
                        ) : (
                          <span className="text-text-muted text-[11px]">Pending Target</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Sold Properties Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Home className="h-4 w-4 text-primary" />
            Sold Properties Breakdown
          </CardTitle>
          <CardDescription className="text-xs">
            Individual property bookings contributing to this month's incentive payout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead className="text-xs font-bold">Project Name</TableHead>
                  <TableHead className="text-xs font-bold">Plot / Unit No</TableHead>
                  <TableHead className="text-xs font-bold">Size (Gaj)</TableHead>
                  <TableHead className="text-xs font-bold">Booking Date</TableHead>
                  <TableHead className="text-xs font-bold text-right">Earn Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSoldProperties.map((prop) => (
                  <React.Fragment key={prop.id}>
                    <TableRow className="text-xs hover:bg-muted/30 cursor-pointer" onClick={() => toggleRow(prop.id)}>
                      <TableCell className="p-2 text-center">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          {expandedRowId === prop.id ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </Button>
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">{prop.property_name}</TableCell>
                      <TableCell>{prop.plot_no}</TableCell>
                      <TableCell>{prop.size_in_gaj} Gaj</TableCell>
                      <TableCell>{prop.sale_date}</TableCell>
                      <TableCell className="text-right font-bold text-emerald-700">
                        ₹{prop.earn_amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    {expandedRowId === prop.id && (
                      <TableRow className="bg-muted/20">
                        <TableCell colSpan={6} className="p-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-card p-3 rounded-lg border">
                            <div>
                              <span className="text-muted-foreground">Property Unit:</span>
                              <p className="font-semibold">{prop.property_name} - {prop.plot_no}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Area in Sq. Yards:</span>
                              <p className="font-semibold">{prop.size_in_gaj} Gaj</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Payout Status:</span>
                              <p className="font-semibold text-emerald-600">Approved for Monthly Settlement</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
