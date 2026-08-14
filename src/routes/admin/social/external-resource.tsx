import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { Megaphone } from "lucide-react";

export const Route = createFileRoute("/admin/social/external-resource")({
  component: ExternalResourcePage,
});

function ExternalResourcePage() {
  return (
    <CrudPage
      config={{
        storeKey: "external-resource",
        title: "External Resource",
        description: "Manage external resources for social media.",
        seed: [],
        columns: [
          { key: "name", title: "Name" },
          { key: "platform", title: "Platform" },
          { key: "url", title: "URL" },
        ],
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "platform", label: "Platform", type: "text" },
          { key: "url", label: "URL", type: "text" },
        ],
      }}
    />
  );
}
