import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { siteVisitsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/site-visits")({
  head: () => ({
    meta: [
      { title: "Site Visits | Suryax Real Estate ERP" },
      { name: "description", content: "Plan and track client site visits across projects." },
      { property: "og:title", content: "Site Visits | Suryax Real Estate ERP" },
      { property: "og:description", content: "Plan and track client site visits across projects." },
    ],
  }),
  component: () => <CrudPage config={siteVisitsConfig} />,
});
