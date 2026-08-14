import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { IndianRupee } from "lucide-react";

export const Route = createFileRoute("/admin/settings/commission-slab")({
  component: CommissionSlabPage,
});

function CommissionSlabPage() {
  return (
    <CrudPage
      config={{
        storeKey: "settings-commission-slab",
        title: "Commission Slab",
        description: "Define commission structures.",
        seed: [],
        columns: [
          { key: "slabName", title: "Slab Name" },
          { key: "percentage", title: "Percentage" },
        ],
        fields: [
          { key: "slabName", label: "Slab Name", type: "text" },
          { key: "percentage", label: "Percentage", type: "number" },
        ],
      }}
    />
  );
}
