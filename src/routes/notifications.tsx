import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/components/pages/NotificationsPage";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | Suryax Real Estate ERP" },
      { name: "description", content: "All system notifications and activity log." },
      { property: "og:title", content: "Notifications | Suryax Real Estate ERP" },
      { property: "og:description", content: "All system notifications and activity log." },
    ],
  }),
  component: NotificationsPage,
});
