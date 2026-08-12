import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { propertiesConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties | Suryax Real Estate ERP" },
      { name: "description", content: "Complete inventory of listed apartments, villas and plots." },
      { property: "og:title", content: "Properties | Suryax Real Estate ERP" },
      { property: "og:description", content: "Complete inventory of listed apartments, villas and plots." },
    ],
  }),
  component: () => <CrudPage config={propertiesConfig} />,
});
