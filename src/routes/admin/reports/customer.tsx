import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { Users } from "lucide-react";

export const Route = createFileRoute("/admin/reports/customer")({
  component: CustomerReportsPage,
});

function CustomerReportsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-customer",
        title: "Customer Reports",
        description: "View customer list and engagement reports.",
        seed: [],
        columns: [
          { key: "customerName", title: "Customer Name" },
          { key: "contact", title: "Contact" },
        ],
        fields: [
          { key: "customerName", label: "Customer Name", type: "text" },
          { key: "contact", label: "Contact", type: "text" },
        ],
      }}
    />
  );
}
