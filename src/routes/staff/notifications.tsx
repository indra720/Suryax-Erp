import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, RefreshCw, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { fetchStaffNotifications } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/notifications")({
  head: () => ({
    meta: [{ title: "Staff - Daily Follow-up Notifications | Vrindavan ERP" }],
  }),
  component: StaffNotificationsPage,
});

interface NotificationItem {
  title: string;
  description: string;
  time: string;
  avatar: string;
}

export function StaffNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadNotifications() {
    setLoading(true);
    try {
      const data = await fetchStaffNotifications();
      const leads = data && Array.isArray(data.leads) ? data.leads : [];
      const mapped: NotificationItem[] = leads.map((item: any) => ({
        title: "Follow-up Scheduled Today",
        description: item.name || "Customer Inquirer",
        time: item.follow_up_time || "Scheduled today",
        avatar: (item.name || "CL").slice(0, 2).toUpperCase(),
      }));
      setNotifications(mapped);
    } catch (err) {
      console.error("Failed to load notifications", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              My Calling Alerts & Daily Notifications
            </CardTitle>
            <CardDescription className="text-xs">
              Reminders for scheduled customer follow-up calls, site visits, and team tasks.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadNotifications} disabled={loading} className="gap-1 text-xs h-8">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="grid gap-2 w-full">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-2/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))
            ) : notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p className="font-medium text-sm">No new follow-up alerts for today.</p>
                <p className="text-xs mt-1">All your scheduled client tasks are up to date.</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/40 transition-colors"
                >
                  <Avatar className="h-9 w-9 flex-shrink-0 bg-primary/10 text-primary border border-primary/20">
                    <AvatarFallback className="text-xs font-semibold">{notification.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1 w-full text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-foreground">{notification.title}</span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/80 font-medium">
                      Client Contact: {notification.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
