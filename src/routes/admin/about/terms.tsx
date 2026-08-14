import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/admin/about/terms")({
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "about-terms",
        title: "Terms & Conditions",
        description: "Manage Terms & Conditions content.",
        seed: [],
        columns: [
          { key: "title", title: "Title" },
          { key: "updatedAt", title: "Last Updated" },
        ],
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "content", label: "Content", type: "textarea" },
        ],
      }}
    />
  );
}
