import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/admin/about/privacy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <CrudPage
      config={{
        storeKey: "about-privacy",
        title: "Privacy Policy",
        description: "Manage Privacy Policy content.",
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
