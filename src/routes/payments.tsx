import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { paymentsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments | Suryax Real Estate ERP" },
      { name: "description", content: "Collections, dues and payment history." },
      { property: "og:title", content: "Payments | Suryax Real Estate ERP" },
      { property: "og:description", content: "Collections, dues and payment history." },
    ],
  }),
  component: () => <CrudPage config={paymentsConfig} />,
});
