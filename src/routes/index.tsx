import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/dashboard/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | Suryax Real Estate ERP" },
      {
        name: "description",
        content:
          "Real-time real estate ERP dashboard with leads, bookings, revenue trends and project performance.",
      },
      { property: "og:title", content: "Suryax Real Estate ERP Dashboard" },
      {
        property: "og:description",
        content: "Manage leads, projects, bookings and finance with real-time insights.",
      },
    ],
  }),
  component: Dashboard,
});
