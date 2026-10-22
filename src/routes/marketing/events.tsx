import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  Plus,
  MapPin,
  Users,
  CheckCircle,
  Download,
} from "lucide-react";
import { initialEvents, type MarketingEvent } from "@/lib/services/marketing";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/events")({
  head: () => ({
    meta: [
      { title: "Events & Site Visit Drives | Vrindavan Marketing" },
      { name: "description", content: "Site visit campaigns, channel partner summits and webinars." },
    ],
  }),
  component: EventsPage,
});

export function EventsPage() {
  const [events, setEvents] = useState<MarketingEvent[]>(initialEvents);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "Site Visit Drive" as MarketingEvent["type"],
    eventDate: "2026-05-10",
    location: "Vrindavan Heights Experience Center",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("Please enter event name");
      return;
    }
    const created: MarketingEvent = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      name: form.name,
      type: form.type,
      eventDate: form.eventDate,
      location: form.location,
      registrations: 0,
      confirmedAttendance: 0,
      status: "Upcoming",
    };
    setEvents([created, ...events]);
    toast.success("Event scheduled successfully!");
    setModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <CalendarDays className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Events & Site Visits
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Coordinate high-attendance mega site visit weekends, broker summits, NRI virtual showcases and property expos.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            onClick={() => setModal(true)}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm justify-center"
          >
            <Plus className="size-3.5" /> Schedule New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {events.map((evt) => (
          <Card key={evt.id} className="p-3.5 sm:p-4 bg-card border border-border shadow-sm hover:border-brand/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded font-bold bg-brand/10 text-brand">
                  {evt.type}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                    evt.status === "Upcoming"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {evt.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-foreground mt-1">{evt.name}</h3>
              <div className="mt-2 space-y-1 text-xs text-text-muted">
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-brand" /> {evt.eventDate}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-brand" /> {evt.location}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10.5px] text-text-muted block">Confirmed Attendees</span>
                <span className="font-bold text-emerald-600">
                  {evt.confirmedAttendance} / {evt.registrations} RSVP
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success("Attendee roster exported!")}
                className="h-7 text-xs border-border"
              >
                RSVP List
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="w-[95vw] sm:max-w-xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
              <CalendarDays className="size-4 text-brand" /> Schedule Event / Site Drive
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Plan and launch promotional drives, site expos, and channel meets.</p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Event Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. Mega Sunday Site Visit Rally"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Event Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(val: any) => setForm({ ...form, type: val })}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Site Visit Drive">Site Visit Drive</SelectItem>
                      <SelectItem value="Channel Partner Meet">Channel Partner Meet</SelectItem>
                      <SelectItem value="NRI Webinar">NRI Webinar</SelectItem>
                      <SelectItem value="Property Expo">Property Expo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Date</Label>
                  <Input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Venue / Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. Site Experience Center, Vrindavan Park"
                />
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setModal(false)} className="w-full sm:w-auto rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Create Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
