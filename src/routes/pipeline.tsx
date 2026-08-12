import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { pipelineConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Sales Pipeline | Suryax Real Estate ERP" },
      { name: "description", content: "Track every real estate deal from qualification to closure." },
      { property: "og:title", content: "Sales Pipeline | Suryax Real Estate ERP" },
      { property: "og:description", content: "Track every real estate deal from qualification to closure." },
    ],
  }),
  component: () => <CrudPage config={pipelineConfig} />,
});
