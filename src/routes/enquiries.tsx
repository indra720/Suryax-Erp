import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { enquiriesConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/enquiries")({
  head: () => ({
    meta: [
      { title: "Enquiries | Suryax Real Estate ERP" },
      { name: "description", content: "Inbound enquiries from all marketing channels." },
      { property: "og:title", content: "Enquiries | Suryax Real Estate ERP" },
      { property: "og:description", content: "Inbound enquiries from all marketing channels." },
    ],
  }),
  component: () => <CrudPage config={enquiriesConfig} />,
});
