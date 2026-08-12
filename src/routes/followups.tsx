import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { followupsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/followups")({
  head: () => ({
    meta: [
      { title: "Follow-ups | Suryax Real Estate ERP" },
      { name: "description", content: "Scheduled calls, emails and meetings with prospects." },
      { property: "og:title", content: "Follow-ups | Suryax Real Estate ERP" },
      { property: "og:description", content: "Scheduled calls, emails and meetings with prospects." },
    ],
  }),
  component: () => <CrudPage config={followupsConfig} />,
});
