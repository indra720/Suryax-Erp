import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ScanFace,
  Camera,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  Calendar,
  UserCheck,
} from "lucide-react";
import { FaceAttendanceDialog } from "@/components/attendance/FaceAttendanceDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/overview/face-attendance")({
  head: () => ({
    meta: [{ title: "Biometric Face Attendance | Staff Portal" }],
  }),
  component: StaffFaceAttendancePage,
});

interface AttendanceLog {
  id: string;
  timestamp: string;
  action: "Punch In" | "Punch Out";
  status: "Present" | "Absent";
  confidence: number;
  location: string;
}

const initialLogs: AttendanceLog[] = [
  { id: "LOG-101", timestamp: "Today, 09:32 AM", action: "Punch In", status: "Present", confidence: 98.7, location: "Main Head Office (GPS 50m)" },
  { id: "LOG-100", timestamp: "Yesterday, 06:34 PM", action: "Punch Out", status: "Present", confidence: 97.9, location: "Main Head Office (GPS 45m)" },
  { id: "LOG-099", timestamp: "Yesterday, 09:28 AM", action: "Punch In", status: "Present", confidence: 99.2, location: "Main Head Office (GPS 52m)" },
  { id: "LOG-098", timestamp: "22 Sep 2026, 09:45 AM", action: "Punch In", status: "Absent", confidence: 42.1, location: "Outside Office Geofence" },
];

function StaffFaceAttendancePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"check-in" | "check-out">("check-in");
  const [logs, setLogs] = useState<AttendanceLog[]>(initialLogs);
  const [todayStatus, setTodayStatus] = useState<"Present" | "Absent" | "Not Punched">("Present");
  const [punchInTime, setPunchInTime] = useState<string>("09:32 AM");
  const [punchOutTime, setPunchOutTime] = useState<string | null>(null);

  const handleOpenScanner = (action: "check-in" | "check-out") => {
    setDialogAction(action);
    setModalOpen(true);
  };

  const handleAttendanceVerified = (record: {
    action: "check-in" | "check-out";
    time: string;
    status: "Present" | "Absent";
    confidence: number;
  }) => {
    const newLog: AttendanceLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: `Today, ${record.time}`,
      action: record.action === "check-in" ? "Punch In" : "Punch Out",
      status: record.status,
      confidence: record.confidence,
      location: "Main Head Office (GPS Geofence Verified)",
    };

    setLogs([newLog, ...logs]);

    if (record.action === "check-in") {
      setPunchInTime(record.time);
      setTodayStatus(record.status);
    } else {
      setPunchOutTime(record.time);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ScanFace className="size-6 text-primary" />
            Biometric Face Attendance Scanner
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Real-time biometric facial recognition attendance marking with geofence security.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="gap-2 font-bold shadow-sm"
            onClick={() => handleOpenScanner("check-in")}
          >
            <Camera className="h-4 w-4" />
            Punch In With Face
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 font-semibold"
            onClick={() => handleOpenScanner("check-out")}
          >
            Punch Out
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Punch Card */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <CardTitle className="text-base font-semibold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Today's Punch Status
              </span>
              <Badge
                variant={todayStatus === "Present" ? "default" : todayStatus === "Absent" ? "destructive" : "secondary"}
                className="text-xs px-2.5 py-0.5"
              >
                {todayStatus}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-muted/40 rounded-xl border">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Punch In</p>
                <p className="text-lg font-extrabold text-foreground mt-0.5">{punchInTime || "--:--"}</p>
                <span className="text-[10px] text-emerald-600 font-medium">Face Verified (98.7%)</span>
              </div>
              <div className="p-3 bg-muted/40 rounded-xl border">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase">Punch Out</p>
                <p className="text-lg font-extrabold text-foreground mt-0.5">{punchOutTime || "--:--"}</p>
                <span className="text-[10px] text-muted-foreground">Pending checkout</span>
              </div>
            </div>

            <div className="bg-muted/20 p-3 rounded-lg border text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shift:</span>
                <span className="font-semibold">General Day (09:30 AM - 06:30 PM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Geofence:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Inside Premises (35m)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Biometric Algorithm:</span>
                <span className="font-mono text-[11px]">3D Vector Mesh v2.4</span>
              </div>
            </div>

            <Button
              className="w-full gap-2 h-10 font-bold"
              onClick={() => handleOpenScanner(punchInTime && !punchOutTime ? "check-out" : "check-in")}
            >
              <ScanFace className="h-4 w-4" />
              {punchInTime && !punchOutTime ? "Punch Out with Face Scanner" : "Punch In with Face Scanner"}
            </Button>
          </CardContent>
        </Card>

        {/* Live Camera Scanner Launcher Card */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Camera className="h-4 w-4 text-primary" /> Live Face Recognition Camera
            </CardTitle>
            <CardDescription className="text-xs">
              AI camera scans facial vectors to mark Present or Absent
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 flex flex-col items-center justify-center text-center space-y-4">
            <div
              className="relative w-40 h-40 rounded-full border-4 border-dashed border-primary/40 bg-muted/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all group"
              onClick={() => handleOpenScanner("check-in")}
            >
              <ScanFace className="h-14 w-14 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary mt-1">
                Click to Open Camera
              </span>
            </div>

            <p className="text-xs text-muted-foreground max-w-xs">
              Ensure proper lighting and face directly into your front camera. The algorithm checks liveness, landmarks, and logs your punch.
            </p>

            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-emerald-600">Camera Engine Ready</span>
            </div>
          </CardContent>
        </Card>

        {/* Biometric Face Profile Status Card */}
        <Card className="shadow-sm border">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Face Registration Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900">
              <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-sm text-emerald-800 dark:text-emerald-300">Face Vector Active</p>
                <p className="text-xs text-emerald-700/80 dark:text-emerald-400">High Confidence (99.4%)</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Registered On:</span>
                <span className="font-semibold">15 Jan 2024</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Liveness Detection:</span>
                <span className="font-semibold text-emerald-600">Active (Anti-spoofing)</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Matching Threshold:</span>
                <span className="font-semibold">70.0% minimum</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Approval Status:</span>
                <span className="font-semibold text-primary">Approved by HR</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs gap-1.5"
              onClick={() => toast.info("Opening face re-registration studio...")}
            >
              <RefreshCw className="h-3.5 w-3.5" /> Re-register Facial Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Face Attendance Logs Table */}
      <Card className="shadow-sm border">
        <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold">Recent Biometric Face Verification Logs</CardTitle>
            <CardDescription className="text-xs">
              History of biometric attendance checks and match confidence scores
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {logs.length} Entries Logged
          </Badge>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Log ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Biometric Result</TableHead>
                <TableHead>Match Confidence</TableHead>
                <TableHead>Office Geofence</TableHead>
                <TableHead className="text-right">Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="text-xs">
                  <TableCell className="font-mono font-bold text-primary">{log.id}</TableCell>
                  <TableCell className="font-semibold">{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={log.action === "Punch In" ? "secondary" : "outline"}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={log.status === "Present" ? "default" : "destructive"}
                      className="font-bold"
                    >
                      {log.status === "Present" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> PRESENT
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> ABSENT
                        </span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono font-bold">
                    <span className={log.confidence >= 70 ? "text-emerald-600" : "text-rose-600"}>
                      {log.confidence}%
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.location}</TableCell>
                  <TableCell className="text-right font-medium text-emerald-600">
                    Front Cam AI
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Live Camera Attendance Modal */}
      <FaceAttendanceDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        actionType={dialogAction}
        employeeName="Pooja Sharma"
        onSuccess={handleAttendanceVerified}
      />
    </div>
  );
}
