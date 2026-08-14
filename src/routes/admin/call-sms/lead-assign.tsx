import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { UsersRound } from "lucide-react";

export const Route = createFileRoute("/admin/call-sms/lead-assign")({
  component: LeadAssignReportPage,
});

function LeadAssignReportPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-lead-assign",
        title: "Assigned List Report",
        description: "View lead assignment details.",
        seed: [],
        columns: [
          { key: "assignDate", title: "Assign Date" },
          { key: "currentStatus", title: "Current Status" },
          { key: "assignBy", title: "Assign By" },
          { key: "assignByMobile", title: "Assign By Mobile" },
          { key: "assignTo", title: "Assign To" },
          { key: "assignToMobile", title: "Assign To Mobile" },
          { key: "customerName", title: "Customer Name" },
          { key: "customerMobile", title: "Customer Mobile" },
          { key: "lastFollowupStatus", title: "Last Followup Status" },
          { key: "lastFollowupRemark", title: "Last Followup Remark" },
          { key: "source", title: "Source" },
          { key: "projectName", title: "Project Name" },
          { key: "leadNo", title: "Lead No" },
        ],
        fields: [
          { key: "assignDate", label: "Assign Date", type: "date" },
          { key: "currentStatus", label: "Current Status", type: "text" },
          { key: "assignBy", label: "Assign By", type: "text" },
          { key: "assignTo", label: "Assign To", type: "text" },
        ],
        filterKey: "currentStatus",
      }}
    />
  );
}
