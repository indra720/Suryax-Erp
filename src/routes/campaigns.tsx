import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { campaignsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns | Suryax Real Estate ERP" },
      { name: "description", content: "Marketing campaign performance and ROI." },
      { property: "og:title", content: "Campaigns | Suryax Real Estate ERP" },
      { property: "og:description", content: "Marketing campaign performance and ROI." },
    ],
  }),
  component: () => <CrudPage config={campaignsConfig} />,
});
