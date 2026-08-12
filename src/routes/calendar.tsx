import { createFileRoute } from "@tanstack/react-router";
import { CalendarPage } from "@/components/pages/CalendarPage";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar | Suryax Real Estate ERP" },
      { name: "description", content: "Site visits, follow-ups, meetings and bookings calendar." },
      { property: "og:title", content: "Calendar | Suryax Real Estate ERP" },
      { property: "og:description", content: "Site visits, follow-ups, meetings and bookings calendar." },
    ],
  }),
  component: CalendarPage,
});
