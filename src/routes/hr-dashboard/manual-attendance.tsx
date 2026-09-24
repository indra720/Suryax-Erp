import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, Clock, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/manual-attendance")({
  component: ManualAttendancePage,
});

interface ManualEntry {
  id: string;
  employee: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  comment: string;
  loggedAt: string;
}

function ManualAttendancePage() {
  const { toast } = useToast();
  const [employee, setEmployee] = useState("Himanshu Raut");
  const [date, setDate] = useState("2026-08-01");
  const [checkIn, setCheckIn] = useState("09:30");
  const [checkOut, setCheckOut] = useState("18:30");
  const [status, setStatus] = useState("present");
  const [comment, setComment] = useState("");

  const [entries, setEntries] = useState<ManualEntry[]>([
    {
      id: "M-1",
      employee: "Himanshu Raut",
      date: "2026-08-01",
      checkIn: "09:30",
      checkOut: "18:30",
      status: "Present",
      comment: "Biometric machine punch failed due to power glitch",
      loggedAt: "2026-08-01 18:35",
    },
    {
      id: "M-2",
      employee: "Indrajeet",
      date: "2026-08-01",
      checkIn: "09:35",
      checkOut: "18:30",
      status: "Present",
      comment: "Client site morning visit",
      loggedAt: "2026-08-01 18:40",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: ManualEntry = {
      id: `M-${Date.now().toString().slice(-4)}`,
      employee,
      date,
      checkIn,
      checkOut,
      status: status.charAt(0).toUpperCase() + status.slice(1),
      comment: comment || "Manual regularization by HR",
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setEntries([newEntry, ...entries]);
    setComment("");
    toast({
      title: "Attendance Logged",
      description: `Manual punch registered for ${employee} on ${date}.`,
    });
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manual Attendance Marker</h1>
          <p className="text-sm text-muted-foreground">Log or regularize attendance punches for employees manually.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> Manual Attendance Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Select Employee *</Label>
                <Select value={employee} onValueChange={setEmployee}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Himanshu Raut">Himanshu Raut</SelectItem>
                    <SelectItem value="Indrajeet">Indrajeet</SelectItem>
                    <SelectItem value="Akshay">Akshay</SelectItem>
                    <SelectItem value="Kamal">Kamal</SelectItem>
                    <SelectItem value="Lokendra">Lokendra</SelectItem>
                    <SelectItem value="Purvansh">Purvansh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Select Date *</Label>
                <Input
                  type="date"
                  className="h-9"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Check-in Time *</Label>
                <Input
                  type="time"
                  className="h-9"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Check-out Time *</Label>
                <Input
                  type="time"
                  className="h-9"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Attendance Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="half-day">Half Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Admin Comment / Remarks</Label>
                <Input
                  className="h-9"
                  placeholder="Enter regularization reason..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" size="sm" className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" /> Save Attendance
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <History className="h-4 w-4 text-primary" /> Recent Manual Regularizations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>In</TableHead>
                <TableHead>Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Logged</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-semibold text-sm">{entry.employee}</TableCell>
                  <TableCell className="text-xs font-mono">{entry.date}</TableCell>
                  <TableCell className="text-xs font-mono">{entry.checkIn}</TableCell>
                  <TableCell className="text-xs font-mono">{entry.checkOut}</TableCell>
                  <TableCell>
                    <Badge variant={entry.status === "Present" ? "default" : "destructive"}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs max-w-xs truncate">{entry.comment}</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{entry.loggedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
