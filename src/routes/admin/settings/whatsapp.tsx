import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin/settings/whatsapp")({
  component: WhatsAppSettingPage,
});

function WhatsAppSettingPage() {
  return (
    <CrudPage
      config={{
        storeKey: "settings-whatsapp",
        title: "WhatsApp Setting",
        description: "Configure WhatsApp integration.",
        seed: [],
        columns: [
          { key: "apiKey", title: "API Key" },
          { key: "instanceId", title: "Instance ID" },
        ],
        fields: [
          { key: "apiKey", label: "API Key", type: "text" },
          { key: "instanceId", label: "Instance ID", type: "text" },
        ],
      }}
    />
  );
}
