import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { IndianRupee } from "lucide-react";

export const Route = createFileRoute("/admin/reports/emi")({
  component: EmiReportsPage,
});

function EmiReportsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-emi",
        title: "EMI Reports",
        description: "View customer EMI tracking reports.",
        seed: [],
        columns: [
          { key: "customerName", title: "Customer Name" },
          { key: "amount", title: "Amount" },
        ],
        fields: [
          { key: "customerName", label: "Customer Name", type: "text" },
          { key: "amount", label: "Amount", type: "number" },
        ],
      }}
    />
  );
}
