import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/pages/ProfilePage";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | Suryax Real Estate ERP" },
      { name: "description", content: "Your Suryax ERP profile and activity." },
      { property: "og:title", content: "My Profile | Suryax Real Estate ERP" },
      { property: "og:description", content: "Your Suryax ERP profile and activity." },
    ],
  }),
  component: ProfilePage,
});
