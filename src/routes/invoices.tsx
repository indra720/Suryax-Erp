import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { invoicesConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices | Suryax Real Estate ERP" },
      { name: "description", content: "GST invoices raised against property bookings." },
      { property: "og:title", content: "Invoices | Suryax Real Estate ERP" },
      { property: "og:description", content: "GST invoices raised against property bookings." },
    ],
  }),
  component: () => <CrudPage config={invoicesConfig} />,
});
