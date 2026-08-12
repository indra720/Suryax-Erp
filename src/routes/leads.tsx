import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { leadsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads Management | Suryax Real Estate ERP" },
      { name: "description", content: "Manage and track all real estate leads in one CRM workspace." },
      { property: "og:title", content: "Leads Management | Suryax Real Estate ERP" },
      { property: "og:description", content: "Manage and track all real estate leads in one CRM workspace." },
    ],
  }),
  component: () => <CrudPage config={leadsConfig} />,
});
