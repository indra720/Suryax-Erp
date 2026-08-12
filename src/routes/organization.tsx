import { createFileRoute } from "@tanstack/react-router";
import { OrganizationPage } from "@/components/pages/OrganizationPage";

export const Route = createFileRoute("/organization")({
  head: () => ({
    meta: [
      { title: "Organization | Suryax Real Estate ERP" },
      { name: "description", content: "Company information, branding, contact and invoice settings." },
      { property: "og:title", content: "Organization | Suryax Real Estate ERP" },
      { property: "og:description", content: "Company information, branding, contact and invoice settings." },
    ],
  }),
  component: OrganizationPage,
});
