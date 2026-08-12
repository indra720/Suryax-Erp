import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/pages/SettingsPage";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Account Settings | Suryax Real Estate ERP" },
      { name: "description", content: "Preferences, security and notification settings." },
      { property: "og:title", content: "Account Settings | Suryax Real Estate ERP" },
      { property: "og:description", content: "Preferences, security and notification settings." },
    ],
  }),
  component: SettingsPage,
});
