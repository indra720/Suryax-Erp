import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { ListChecks } from "lucide-react";

export const Route = createFileRoute("/admin/member-panel/extra-field")({
  component: ExtraFieldMappingPage,
});

function ExtraFieldMappingPage() {
  return (
    <CrudPage
      config={{
        storeKey: "member-panel-extra-field",
        title: "Extra Field Mapping",
        description: "Map custom fields for members.",
        seed: [],
        columns: [
          { key: "fieldName", title: "Field Name" },
          { key: "fieldType", title: "Field Type" },
        ],
        fields: [
          { key: "fieldName", label: "Field Name", type: "text" },
          { key: "fieldType", label: "Field Type", type: "text" },
        ],
      }}
    />
  );
}
