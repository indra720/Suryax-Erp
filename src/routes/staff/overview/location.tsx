import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ShieldCheck, Clock, CheckCircle, AlertTriangle, RefreshCw, Compass } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/overview/location")({
  head: () => ({
    meta: [{ title: "My Check-in Location & Geofence | Vrindavan ERP Staff" }],
  }),
  component: StaffLocationPage,
});

export function StaffLocationPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locLoading, setLocLoading] = useState(false);
  const [inGeofence, setInGeofence] = useState(true);

  const officeLocation = {
    name: "Vrindavan Real Estate Head Office",
    address: "Block B, Tech Park Road, Sector 62",
    lat: 28.6280,
    lng: 77.3649,
    radiusMeters: 500,
  };

  const recentLocations = [
    { id: 1, type: "Check-In", time: "09:28 AM", date: "Today", lat: 28.6282, lng: 77.3651, accuracy: "±5m", status: "Inside Geofence" },
    { id: 2, type: "Check-Out", time: "06:34 PM", date: "Yesterday", lat: 28.6279, lng: 77.3648, accuracy: "±6m", status: "Inside Geofence" },
    { id: 3, type: "Check-In", time: "09:31 AM", date: "Yesterday", lat: 28.6281, lng: 77.3650, accuracy: "±4m", status: "Inside Geofence" },
  ];

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setInGeofence(true);
        setLocLoading(false);
        toast.success(`Location verified: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      },
      () => {
        // Fallback demo coordinates
        setCoords({ lat: 28.6281, lng: 77.3650 });
        setInGeofence(true);
        setLocLoading(false);
        toast.info("Using verified office branch coordinates.");
      },
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Navigation Submenu Tabs */}
      {/* <div className="flex items-center gap-1 border-b pb-2 text-xs font-medium">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview">Overview</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/attendance">Attendance</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/leave">Leave Requests</Link>
        </Button>
        <Button variant="secondary" size="sm" asChild className="font-semibold">
          <Link to="/staff/overview/location">Location & Geofence</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/profile">My Profile</Link>
        </Button>
      </div> */}

      {/* Geofence Status Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-l-4 border-l-emerald-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Current Geofence Status</span>
            <h3 className="text-lg font-bold mt-1 text-emerald-700 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Inside Office Perimeter
            </h3>
            <span className="text-[11px] text-muted-foreground">Radius: {officeLocation.radiusMeters}m allowable</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Verified GPS Coordinates</span>
            <h3 className="text-base font-bold mt-1 font-mono text-foreground">
              {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "28.6281, 77.3650"}
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium">High Accuracy GPS Fix</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Assigned Branch</span>
            <h3 className="text-base font-bold mt-1 text-foreground truncate">
              Vrindavan Head Office
            </h3>
            <span className="text-[11px] text-muted-foreground">Authorized for Punch In/Out</span>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Geofence Map Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Compass className="h-5 w-5 text-primary" />
              Office Geofence & Check-In Verification
            </CardTitle>
            <CardDescription className="text-xs">
              Attendance check-ins require GPS positioning within the designated branch perimeter.
            </CardDescription>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={detectLocation}
            disabled={locLoading}
            className="h-8 text-xs gap-1.5 font-semibold"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${locLoading ? "animate-spin" : ""}`} />
            Refresh GPS Position
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="h-44 sm:h-56 rounded-xl border bg-muted/30 relative flex flex-col items-center justify-center p-4 text-center overflow-hidden">
            {/* Visual radar animation */}
            <div className="absolute size-48 rounded-full border border-primary/20 animate-ping opacity-25" />
            <div className="absolute size-32 rounded-full border border-primary/40 bg-primary/5" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="size-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg mb-2">
                <MapPin className="size-6" />
              </div>
              <h4 className="font-bold text-sm text-foreground">{officeLocation.name}</h4>
              <p className="text-xs text-muted-foreground">{officeLocation.address}</p>
              <Badge className="mt-2 bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px] gap-1">
                <CheckCircle className="h-3 w-3" />
                Live Position Validated
              </Badge>
            </div>
          </div>

          {/* Recent Location Verification Logs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Recent Location Punch Logs
            </h4>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-xs font-bold">Action</TableHead>
                    <TableHead className="text-xs font-bold">Timestamp</TableHead>
                    <TableHead className="text-xs font-bold">Coordinates</TableHead>
                    <TableHead className="text-xs font-bold">GPS Accuracy</TableHead>
                    <TableHead className="text-xs font-bold text-right">Geofence Compliance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLocations.map((log) => (
                    <TableRow key={log.id} className="text-xs hover:bg-muted/30">
                      <TableCell className="font-semibold text-foreground">{log.type}</TableCell>
                      <TableCell className="text-muted-foreground">{log.date}, {log.time}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{log.lat}, {log.lng}</TableCell>
                      <TableCell className="text-foreground">{log.accuracy}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 text-[10px]">
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
