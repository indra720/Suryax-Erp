import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  CalendarDays,
  Info,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/settings/holidays")({
  component: HolidaysPage,
});

interface HolidayItem {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  type: "National" | "Gazetted" | "Optional";
  description?: string;
}

const initialHolidays: HolidayItem[] = [
  { id: "1", name: "New Year's Day", date: "2026-01-01", type: "Gazetted", description: "First day of the year" },
  { id: "2", name: "Republic Day", date: "2026-01-26", type: "National", description: "Constitution of India" },
  { id: "3", name: "Maha Shivratri", date: "2026-02-15", type: "Gazetted", description: "Lord Shiva celebration" },
  { id: "4", name: "Holi Festival", date: "2026-03-04", type: "Gazetted", description: "Festival of colors" },
  { id: "5", name: "Eid-ul-Fitr", date: "2026-03-21", type: "Gazetted", description: "Islamic festival" },
  { id: "6", name: "Independence Day", date: "2026-08-15", type: "National", description: "Indian Independence" },
  { id: "7", name: "Raksha Bandhan", date: "2026-08-28", type: "Gazetted", description: "Brother-sister festival" },
  { id: "8", name: "Janmashtami", date: "2026-09-04", type: "Gazetted", description: "Lord Krishna's birthday" },
  { id: "9", name: "Milad-un-Nabi", date: "2026-09-25", type: "Optional", description: "Prophet's Birthday" },
  { id: "10", name: "Mahatma Gandhi Jayanti", date: "2026-10-02", type: "National", description: "Father of the Nation" },
  { id: "11", name: "Dussehra (Vijayadashami)", date: "2026-10-20", type: "Gazetted", description: "Victory of Good over Evil" },
  { id: "12", name: "Diwali (Deepavali)", date: "2026-11-08", type: "National", description: "Festival of lights" },
  { id: "13", name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Gazetted", description: "Sikh festival" },
  { id: "14", name: "Christmas Day", date: "2026-12-25", type: "Gazetted", description: "Christmas celebration" },
];

function HolidaysPage() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 8, 1)); // Default to Sept 2026
  const [holidays, setHolidays] = useState<HolidayItem[]>(initialHolidays);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("All");

  // Form states
  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayDate, setNewHolidayDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [newHolidayType, setNewHolidayType] = useState<"National" | "Gazetted" | "Optional">("Gazetted");
  const [newHolidayDesc, setNewHolidayDesc] = useState("");

  const daysInGrid = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHolidayName.trim()) return;

    const newH: HolidayItem = {
      id: String(Date.now()),
      name: newHolidayName.trim(),
      date: newHolidayDate,
      type: newHolidayType,
      description: newHolidayDesc.trim(),
    };

    setHolidays([...holidays, newH]);
    setNewHolidayName("");
    setNewHolidayDesc("");
    setIsAddOpen(false);
    toast({
      title: "Holiday Added",
      description: `"${newH.name}" scheduled for ${format(new Date(newH.date), "PPP")}.`,
    });
  };

  const handleDeleteHoliday = (id: string) => {
    setHolidays(holidays.filter(h => h.id !== id));
    toast({ title: "Removed", description: "Holiday removed from company calendar." });
  };

  const getHolidaysForDay = (day: Date) => {
    const formatted = format(day, "yyyy-MM-dd");
    return holidays.filter(h => h.date === formatted);
  };

  // Sort upcoming holidays from current month onwards
  const filteredList = holidays
    .filter(h => filterType === "All" || h.type === filterType)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="p-1 sm:p-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" /> Company Holidays Calendar
          </h1>
          <p className="text-sm text-muted-foreground">
            Official company holiday schedules, national observances, and non-working business days.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Add Holiday
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle>Add New Company Holiday</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddHoliday} className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Holiday Title *</Label>
                  <Input
                    placeholder="e.g. Diwali, Independence Day"
                    value={newHolidayName}
                    onChange={(e) => setNewHolidayName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Date *</Label>
                    <Input
                      type="date"
                      value={newHolidayDate}
                      onChange={(e) => setNewHolidayDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Holiday Category</Label>
                    <Select value={newHolidayType} onValueChange={(v) => setNewHolidayType(v as any)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="National">National Holiday</SelectItem>
                        <SelectItem value="Gazetted">Gazetted Holiday</SelectItem>
                        <SelectItem value="Optional">Optional / Restricted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Description / Notes</Label>
                  <Textarea
                    placeholder="Optional notes or employee guidelines..."
                    rows={2}
                    value={newHolidayDesc}
                    onChange={(e) => setNewHolidayDesc(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save to Calendar</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar View */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-sm border overflow-hidden">
            {/* Single Unified Calendar Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-muted/30 border-b">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <Badge variant="outline" className="font-semibold text-xs text-primary">
                  {holidays.filter(h => {
                    const d = new Date(h.date);
                    return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
                  }).length} Holiday(s) this month
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-semibold"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <Select
                  value={String(currentDate.getFullYear())}
                  onValueChange={(yr) => {
                    const next = new Date(currentDate);
                    next.setFullYear(Number(yr));
                    setCurrentDate(next);
                  }}
                >
                  <SelectTrigger className="w-[90px] h-8 text-xs ml-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b text-center bg-muted/10">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                <div
                  key={day}
                  className={cn(
                    "py-2.5 text-xs font-bold uppercase tracking-wider",
                    idx === 0 ? "text-rose-500" : idx === 6 ? "text-blue-500" : "text-muted-foreground"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days Full-Width Grid */}
            <div className="grid grid-cols-7 border-collapse">
              {daysInGrid.map((day, i) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isToday = isSameDay(day, new Date());
                const dayHolidays = getHolidaysForDay(day);
                const hasHoliday = dayHolidays.length > 0;
                const isSunday = day.getDay() === 0;
                const isSaturday = day.getDay() === 6;

                return (
                  <div
                    key={i}
                    className={cn(
                      "min-h-[90px] sm:min-h-[110px] p-2 border-b border-r flex flex-col justify-between transition-colors",
                      !isCurrentMonth && "bg-muted/15 text-muted-foreground opacity-40",
                      isCurrentMonth && isSunday && "bg-rose-50/20 dark:bg-rose-950/10",
                      isCurrentMonth && isSaturday && "bg-blue-50/20 dark:bg-blue-950/10",
                      hasHoliday && "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-xs font-semibold h-6 w-6 flex items-center justify-center rounded-full transition-transform",
                          isToday && "bg-primary text-primary-foreground font-bold shadow-sm",
                          !isToday && hasHoliday && "font-bold text-amber-700 dark:text-amber-400",
                          !isToday && !hasHoliday && isSunday && "text-rose-500 font-medium",
                          !isToday && !hasHoliday && isSaturday && "text-blue-500 font-medium"
                        )}
                      >
                        {format(day, "d")}
                      </span>

                      {hasHoliday && (
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </div>

                    {/* Holiday Badges Inside Day Box */}
                    <div className="space-y-1 mt-1">
                      {dayHolidays.map((h) => {
                        const badgeColor =
                          h.type === "National"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300"
                            : h.type === "Gazetted"
                            ? "bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300 border-violet-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300";

                        return (
                          <div
                            key={h.id}
                            title={`${h.name} (${h.type}) - ${h.description || ''}`}
                            className={cn(
                              "text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded border leading-tight truncate shadow-2xs",
                              badgeColor
                            )}
                          >
                            <span className="font-bold">{h.name}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[10px] text-muted-foreground self-end">
                      {isSunday && !hasHoliday && <span className="opacity-60">Weekend</span>}
                      {isSaturday && !hasHoliday && <span className="opacity-60">Weekend</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Color Legend Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground px-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-rose-200 dark:bg-rose-900 border border-rose-400" />
              <span>National Holiday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-violet-200 dark:bg-violet-900 border border-violet-400" />
              <span>Gazetted Holiday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-emerald-200 dark:bg-emerald-900 border border-emerald-400" />
              <span>Optional / Restricted</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="h-3 w-3 rounded-full bg-primary" />
              <span>Today ({format(new Date(), "dd MMM")})</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Upcoming Holidays */}
        <div className="space-y-4">
          <Card className="shadow-sm border">
            <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Upcoming Official Holidays</CardTitle>
                <p className="text-xs text-muted-foreground">Gazetted & National calendar</p>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[100px] h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                  <SelectItem value="Gazetted">Gazetted</SelectItem>
                  <SelectItem value="Optional">Optional</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="p-0 divide-y max-h-[580px] overflow-y-auto">
              {filteredList.map((h) => {
                const dateObj = new Date(h.date);
                const isSelectedMonth = dateObj.getMonth() === currentDate.getMonth() && dateObj.getFullYear() === currentDate.getFullYear();

                const badgeVariant =
                  h.type === "National"
                    ? "destructive"
                    : h.type === "Gazetted"
                    ? "default"
                    : "secondary";

                return (
                  <div
                    key={h.id}
                    className={cn(
                      "p-3.5 flex items-center justify-between hover:bg-muted/40 transition-colors",
                      isSelectedMonth && "bg-primary/5"
                    )}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm leading-tight">{h.name}</span>
                        {isSelectedMonth && (
                          <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 bg-primary/10 text-primary border-primary/20">
                            This Month
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">
                        {format(dateObj, "dd MMM yyyy")} • {format(dateObj, "EEEE")}
                      </p>
                      {h.description && (
                        <p className="text-[11px] text-muted-foreground italic">{h.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={badgeVariant} className="text-[10px] capitalize">
                        {h.type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDeleteHoliday(h.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
