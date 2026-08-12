import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { expensesConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/expenses")({
  head: () => ({
    meta: [
      { title: "Expenses | Suryax Real Estate ERP" },
      { name: "description", content: "Operational and project expense tracking." },
      { property: "og:title", content: "Expenses | Suryax Real Estate ERP" },
      { property: "og:description", content: "Operational and project expense tracking." },
    ],
  }),
  component: () => <CrudPage config={expensesConfig} />,
});
