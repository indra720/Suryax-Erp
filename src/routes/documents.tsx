import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { documentsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents | Suryax Real Estate ERP" },
      { name: "description", content: "Agreements, legal papers and project documents." },
      { property: "og:title", content: "Documents | Suryax Real Estate ERP" },
      { property: "og:description", content: "Agreements, legal papers and project documents." },
    ],
  }),
  // new testing code
  component: () => <CrudPage config={documentsConfig} />,
});
