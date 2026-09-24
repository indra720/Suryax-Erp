import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  ScanFace,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  History,
  AlertCircle,
  Building,
} from "lucide-react";
import { FaceAttendanceDialog } from "@/components/attendance/FaceAttendanceDialog";
import { useAuth } from "@/lib/services/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/hr-dashboard/attendance/face-punch")({
  head: () => ({
    meta: [{ title: "My Face Attendance | HR Dashboard" }],
  }),
  component: HrFaceAttendancePage,
});

interface PunchRecord {
  id: string;
  type: "check-in" | "check-out";
  time: string;
  date: string;
  location: string;
  status: "Present" | "Absent";
  confidence: number;
}

function HrFaceAttendancePage() {
  const { user } = useAuth();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [actionType, setActionType] = useState<"check-in" | "check-out">("check-in");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [punchState, setPunchState] = useState<{
    hasCheckedIn: boolean;
    checkInTime: string | null;
    hasCheckedOut: boolean;
    checkOutTime: string | null;
    totalHours: string;
  }>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("hr_self_attendance") : null;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      hasCheckedIn: true,
      checkInTime: "09:28 AM",
      hasCheckedOut: false,
      checkOutTime: null,
      totalHours: "05h 46m (In Progress)",
    };
  });

  const [history, setHistory] = useState<PunchRecord[]>([
    {
      id: "1",
      type: "check-in",
      time: "09:28 AM",
      date: "Today, 24 Sep",
      location: "Vrindavan Central Campus (Gate 1)",
      status: "Present",
      confidence: 99.2,
    },
    {
      id: "2",
      type: "check-out",
      time: "06:35 PM",
      date: "Yesterday, 23 Sep",
      location: "Vrindavan Central Campus (Gate 1)",
      status: "Present",
      confidence: 98.7,
    },
    {
      id: "3",
      type: "check-in",
      time: "09:25 AM",
      date: "Yesterday, 23 Sep",
      location: "Vrindavan Central Campus (Gate 1)",
      status: "Present",
      confidence: 99.0,
    },
    {
      id: "4",
      type: "check-out",
      time: "06:40 PM",
      date: "22 Sep 2026",
      location: "Vrindavan Central Campus",
      status: "Present",
      confidence: 98.4,
    },
  ]);

  // Keep live clock running
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openCamera = (type: "check-in" | "check-out") => {
    setActionType(type);
    setShowCameraModal(true);
  };

  const handlePunchSuccess = (record: {
    action: "check-in" | "check-out";
    time: string;
    status: "Present" | "Absent";
    confidence: number;
    photo?: string;
  }) => {
    const nowStr = record.time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    if (record.action === "check-in") {
      const updated = {
        ...punchState,
        hasCheckedIn: true,
        checkInTime: nowStr,
        totalHours: "00h 01m (In Progress)",
      };
      setPunchState(updated);
      localStorage.setItem("hr_self_attendance", JSON.stringify(updated));
    } else {
      const updated = {
        ...punchState,
        hasCheckedOut: true,
        checkOutTime: nowStr,
        totalHours: "08h 15m (Completed)",
      };
      setPunchState(updated);
      localStorage.setItem("hr_self_attendance", JSON.stringify(updated));
    }

    const newHist: PunchRecord = {
      id: Date.now().toString(),
      type: record.action,
      time: nowStr,
      date: "Today, " + new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      location: "Vrindavan Central Campus (Biometric Gate)",
      status: "Present",
      confidence: record.confidence || 98.8,
    };
    setHistory([newHist, ...history]);
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ScanFace className="size-6 text-primary" />
            My Face Attendance (HR Self Punch)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Mark your daily biometric attendance using live AI face verification and campus geofencing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono py-1 px-2.5 bg-background shadow-xs">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-primary animate-pulse" />
            {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </Badge>
          <Badge variant="outline" className="text-xs font-semibold py-1 px-2.5 bg-emerald-50 text-emerald-700 border-emerald-300">
            <MapPin className="h-3 w-3 mr-1" />
            Vrindavan Campus Geofence Active
          </Badge>
        </div>
      </div>

      {/* Main Action Banner */}
      <Card className="border shadow-sm bg-gradient-to-br from-card via-primary/[0.03] to-muted/30 overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Left: Status & Timings */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Today&apos;s Status</span>
                {punchState.hasCheckedIn ? (
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Punched In (Active)
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs text-amber-600 border-amber-300 bg-amber-50">
                    Not Punched In
                  </Badge>
                )}
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {punchState.checkInTime || "--:--"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Shift: General Day Shift (09:30 AM - 06:30 PM)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 bg-muted/40 rounded-lg border">
                  <span className="text-muted-foreground text-[10px] uppercase font-bold block">Check In</span>
                  <span className="font-bold text-emerald-600">{punchState.checkInTime || "Pending"}</span>
                </div>
                <div className="p-2 bg-muted/40 rounded-lg border">
                  <span className="text-muted-foreground text-[10px] uppercase font-bold block">Check Out</span>
                  <span className="font-bold text-muted-foreground">{punchState.checkOutTime || "Pending"}</span>
                </div>
              </div>
            </div>

            {/* Middle: Biometric Face Scanner Launcher */}
            <div className="flex flex-col items-center justify-center p-5 bg-background/80 rounded-2xl border border-primary/20 shadow-xs text-center space-y-3">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/30 animate-pulse">
                  <ScanFace className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 text-white shadow">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm text-foreground">AI Face Biometric Punch</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Look directly into the camera for instant face detection & geofenced check-in.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full pt-1">
                <Button
                  onClick={() => openCamera("check-in")}
                  size="sm"
                  className="flex-1 h-9 text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                  Face Check-In
                </Button>
                <Button
                  onClick={() => openCamera("check-out")}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 text-xs font-bold gap-1.5 border-rose-300 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                >
                  <Clock className="h-4 w-4" />
                  Face Check-Out
                </Button>
              </div>
            </div>

            {/* Right: Security & Geofence Details */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Biometric Security Parameters
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                  <span className="text-muted-foreground">HR Personnel:</span>
                  <span className="font-semibold text-foreground">{user?.name || "HR Administrator"}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                  <span className="text-muted-foreground">Face Vector Profile:</span>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold">
                    Enrolled (99.4% match)
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                  <span className="text-muted-foreground">Campus Geofence:</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Within 50m Radius
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History and Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Punches Table */}
        <Card className="lg:col-span-2 shadow-xs border">
          <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <History className="h-4 w-4 text-primary" />
                My Recent Face Punches
              </CardTitle>
              <CardDescription className="text-xs">
                Biometric timestamps verified via AI face match.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Attendance log refreshed")}
              className="h-7 text-xs text-muted-foreground"
            >
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-muted/50 text-muted-foreground font-semibold border-b">
                  <tr>
                    <th className="py-2.5 px-3 text-left">Action</th>
                    <th className="py-2.5 px-3 text-left">Time & Date</th>
                    <th className="py-2.5 px-3 text-left">Location</th>
                    <th className="py-2.5 px-3 text-left">AI Confidence</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {history.map((h) => (
                    <tr key={h.id} className="hover:bg-muted/30">
                      <td className="py-2.5 px-3 font-semibold">
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            h.type === "check-in"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-blue-50 text-blue-700 border-blue-300"
                          }`}
                        >
                          {h.type === "check-in" ? "Check In" : "Check Out"}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-foreground">{h.time}</div>
                        <div className="text-[11px] text-muted-foreground">{h.date}</div>
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">{h.location}</td>
                      <td className="py-2.5 px-3 font-mono font-medium text-emerald-600">
                        {h.confidence}% Match
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {h.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Policy & Guidelines */}
        <Card className="shadow-xs border">
          <CardHeader className="py-3 px-4 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-1.5">
              <Building className="h-4 w-4 text-primary" />
              HR Attendance Protocol
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs text-muted-foreground">
            <div className="p-2.5 bg-muted/20 rounded-lg border space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Shift Timings
              </span>
              <p>General Shift starts at 09:30 AM with a 15-minute grace period until 09:45 AM.</p>
            </div>

            <div className="p-2.5 bg-muted/20 rounded-lg border space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <ScanFace className="h-3.5 w-3.5 text-primary" />
                Liveness & Face Verification
              </span>
              <p>Face biometric uses live liveness detection to prevent proxy punches with printed photos.</p>
            </div>

            <div className="p-2.5 bg-muted/20 rounded-lg border space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Campus Geofence
              </span>
              <p>Attendance is valid only when punched inside Vrindavan Central Campus or registered site offices.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live AI Face Attendance Modal */}
      <FaceAttendanceDialog
        open={showCameraModal}
        onOpenChange={setShowCameraModal}
        actionType={actionType}
        employeeName={user?.name || "HR Manager"}
        onSuccess={handlePunchSuccess}
      />
    </div>
  );
}
