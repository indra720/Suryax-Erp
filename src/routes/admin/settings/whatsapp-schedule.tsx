import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin/settings/whatsapp-schedule")({
  component: WhatsAppSchedulePage,
});

function WhatsAppSchedulePage() {
  return (
    <CrudPage
      config={{
        storeKey: "settings-whatsapp-schedule",
        title: "WhatsApp Schedule",
        description: "Manage automated WhatsApp schedules.",
        seed: [],
        columns: [
          { key: "campaignName", title: "Campaign Name" },
          { key: "scheduleTime", title: "Schedule Time" },
        ],
        fields: [
          { key: "campaignName", label: "Campaign Name", type: "text" },
          { key: "scheduleTime", label: "Schedule Time", type: "datetime-local" },
        ],
      }}
    />
  );
}
