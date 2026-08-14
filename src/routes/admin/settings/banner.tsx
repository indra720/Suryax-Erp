import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/admin/settings/banner")({
  component: BannerPage,
});

function BannerPage() {
  return (
    <CrudPage
      config={{
        storeKey: "settings-banner",
        title: "Banner",
        description: "Manage application banners.",
        seed: [],
        columns: [
          { key: "srNo", title: "SrNo" },
          { key: "file", title: "File" },
          { key: "status", title: "Status" },
        ],
        fields: [
          { key: "file", label: "File", type: "file" },
          { key: "status", label: "Status", type: "text" },
        ],
      }}
    />
  );
}
