import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { Building } from "lucide-react";

export const Route = createFileRoute("/admin/member-panel/setting")({
  component: MemberPanelSettingPage,
});

function MemberPanelSettingPage() {
  return (
    <CrudPage
      config={{
        storeKey: "member-panel-setting",
        title: "Member Panel Setting",
        description: "Configure member panel settings.",
        seed: [],
        columns: [
          { key: "settingName", title: "Setting Name" },
          { key: "value", title: "Value" },
        ],
        fields: [
          { key: "settingName", label: "Setting Name", type: "text" },
          { key: "value", label: "Value", type: "text" },
        ],
      }}
    />
  );
}
