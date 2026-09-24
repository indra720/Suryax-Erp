import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Loader2,
  ScanFace,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

interface FaceAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType?: "check-in" | "check-out";
  employeeName?: string;
  onSuccess?: (record: {
    action: "check-in" | "check-out";
    time: string;
    status: "Present" | "Absent";
    confidence: number;
    photo?: string;
  }) => void;
}

export function FaceAttendanceDialog({
  open,
  onOpenChange,
  actionType = "check-in",
  employeeName = "Staff Member",
  onSuccess,
}: FaceAttendanceDialogProps) {
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "failed">("idle");
  const [action, setAction] = useState<"check-in" | "check-out">(actionType);
  const [analysisStep, setAnalysisStep] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(98.5);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [simulateFail, setSimulateFail] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setAction(actionType);
  }, [actionType]);

  // Start webcam when modal opens
  useEffect(() => {
    if (open) {
      setStatus("idle");
      setCapturedPhoto(null);
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [open]);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setHasCameraPermission(true);
    } catch (err) {
      console.warn("Camera access denied or unavailable, fallback mode active:", err);
      setHasCameraPermission(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCaptureAndAnalyze = () => {
    // Capture snapshot from video to canvas
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          const photoUrl = canvas.toDataURL("image/jpeg", 0.85);
          setCapturedPhoto(photoUrl);
        } catch (e) {
          // ignore canvas taint
        }
      }
    }

    setStatus("scanning");
    setAnalysisStep("Detecting facial landmarks in camera frame...");

    setTimeout(() => {
      setAnalysisStep("Comparing biometric vector with registered employee profile...");
    }, 900);

    setTimeout(() => {
      setAnalysisStep("Verifying liveness & anti-spoofing lighting...");
    }, 1800);

    setTimeout(() => {
      if (simulateFail) {
        // Simulated failure / unrecognized face -> ABSENT
        setStatus("failed");
        setConfidence(38.4);
        toast.error("Face Not Recognized! Verification failed. Marked as Absent.", {
          description: "Confidence: 38.4% (< 70% threshold required). Please retry or contact HR.",
        });
      } else {
        // Simulated success -> PRESENT
        const score = Number((97 + Math.random() * 2.5).toFixed(1));
        setConfidence(score);
        setStatus("success");
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        toast.success(`Face Verified (${score}%)! Marked as Present.`, {
          description: `Successfully logged ${action.toUpperCase()} at ${now} for ${employeeName}.`,
        });

        onSuccess?.({
          action,
          time: now,
          status: "Present",
          confidence: score,
          photo: capturedPhoto || undefined,
        });
      }
    }, 2700);
  };

  const handleReset = () => {
    setStatus("idle");
    setCapturedPhoto(null);
    setAnalysisStep("");
    startCamera();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border">
        {/* Header Banner */}
        <div className="bg-primary/10 border-b p-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ScanFace className="h-5 w-5 text-primary" />
              <DialogTitle className="text-base font-bold">
                Face Recognition Attendance
              </DialogTitle>
            </div>
            <Badge
              variant="outline"
              className={action === "check-in" ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-blue-50 text-blue-700 border-blue-300"}
            >
              {action === "check-in" ? "Punch In (Check-in)" : "Punch Out (Check-out)"}
            </Badge>
          </div>
          <DialogDescription className="text-xs text-muted-foreground mt-0.5">
            Hold your face inside the target frame for real-time biometric verification.
          </DialogDescription>
        </div>

        <div className="p-4 sm:p-6 flex flex-col items-center gap-4">
          {/* Action switcher */}
          <div className="flex rounded-lg bg-muted p-1 w-full max-w-xs text-xs font-semibold">
            <button
              type="button"
              className={`flex-1 py-1.5 rounded-md transition-all ${
                action === "check-in" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setAction("check-in")}
            >
              Punch In (Check-in)
            </button>
            <button
              type="button"
              className={`flex-1 py-1.5 rounded-md transition-all ${
                action === "check-out" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setAction("check-out")}
            >
              Punch Out (Check-out)
            </button>
          </div>

          {/* Camera Viewport Frame */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-primary/30 shadow-xl bg-slate-950 flex items-center justify-center">
            {/* Live Video */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 ${
                status !== "idle" && status !== "scanning" ? "hidden" : "block"
              }`}
            />

            {/* Hidden canvas for snapshot */}
            <canvas ref={canvasRef} className="hidden" />

            {/* If camera is unavailable */}
            {!hasCameraPermission && status === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-slate-300 bg-slate-900">
                <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-xs font-semibold">Camera Access Inactive</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Using biometric simulation mode. Click below to scan.
                </p>
              </div>
            )}

            {/* Face Target Oval Overlay */}
            {status === "idle" && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-44 h-56 rounded-full border-2 border-dashed border-primary/70 animate-pulse flex flex-col items-center justify-between py-4">
                  <span className="text-[10px] font-bold text-white/90 bg-black/60 px-2 py-0.5 rounded-full">
                    Align Face
                  </span>
                  <div className="h-0.5 w-12 bg-primary/80 rounded" />
                </div>
              </div>
            )}

            {/* Scanning Laser Radar Animation */}
            {status === "scanning" && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                {/* Horizontal scanner beam */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce" />
                <div className="w-44 h-56 rounded-full border-2 border-cyan-400/80 shadow-[0_0_20px_#22d3ee] flex items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
                </div>
                <div className="absolute bottom-4 left-3 right-3 bg-black/80 rounded-md p-2 text-center">
                  <p className="text-[11px] font-mono text-cyan-300 animate-pulse">
                    {analysisStep}
                  </p>
                </div>
              </div>
            )}

            {/* Success State Overlay */}
            {status === "success" && (
              <div className="absolute inset-0 bg-emerald-950/90 text-white flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-2 drop-shadow" />
                <Badge className="bg-emerald-500 text-white font-bold text-xs uppercase px-3 py-0.5">
                  Face Verified: Present
                </Badge>
                <p className="text-xl font-extrabold text-white mt-2">
                  {confidence}% Match
                </p>
                <div className="mt-2 text-xs text-emerald-200/90 space-y-0.5 font-mono">
                  <p>Employee: {employeeName}</p>
                  <p>Action: {action.toUpperCase()}</p>
                  <p className="text-[11px] text-emerald-300">Geofence: Inside Office Premises (50m)</p>
                </div>
              </div>
            )}

            {/* Failure State Overlay */}
            {status === "failed" && (
              <div className="absolute inset-0 bg-rose-950/90 text-white flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 duration-200">
                <XCircle className="h-16 w-16 text-rose-400 mb-2 drop-shadow" />
                <Badge className="bg-rose-600 text-white font-bold text-xs uppercase px-3 py-0.5">
                  Verification Failed: Absent
                </Badge>
                <p className="text-xl font-extrabold text-white mt-2">
                  {confidence}% Confidence
                </p>
                <p className="text-xs text-rose-200/90 mt-1 max-w-[200px]">
                  Facial features did not match registered master vector.
                </p>
              </div>
            )}
          </div>

          {/* Test Simulation Controls */}
          <div className="w-full flex items-center justify-between text-[11px] bg-muted/40 p-2 rounded-lg border">
            <span className="text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Test Simulation:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  !simulateFail ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                }`}
                onClick={() => setSimulateFail(false)}
              >
                Match: True (Present)
              </button>
              <button
                type="button"
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  simulateFail ? "bg-rose-600 text-white" : "bg-muted text-muted-foreground"
                }`}
                onClick={() => setSimulateFail(true)}
              >
                Mismatch: False (Absent)
              </button>
            </div>
          </div>

          {/* Dialog Action Buttons */}
          <div className="flex gap-2 w-full pt-1">
            {status === "idle" && (
              <Button
                className="flex-1 h-10 font-bold gap-2 text-sm shadow-md"
                onClick={handleCaptureAndAnalyze}
              >
                <Camera className="h-4 w-4" />
                Scan & Verify Face
              </Button>
            )}

            {(status === "success" || status === "failed") && (
              <Button
                variant="outline"
                className="flex-1 h-10 font-semibold gap-2 text-sm"
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4" /> Re-scan Face
              </Button>
            )}

            <Button
              variant="secondary"
              className="h-10 text-xs px-4"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
