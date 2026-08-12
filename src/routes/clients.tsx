import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { clientsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients | Suryax Real Estate ERP" },
      { name: "description", content: "View client portfolios, contacts and lifetime value." },
      { property: "og:title", content: "Clients | Suryax Real Estate ERP" },
      { property: "og:description", content: "View client portfolios, contacts and lifetime value." },
    ],
  }),
  component: () => <CrudPage config={clientsConfig} />,
});
