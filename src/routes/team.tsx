import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { teamConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team Management | Suryax Real Estate ERP" },
      { name: "description", content: "Employees, roles and departments." },
      { property: "og:title", content: "Team Management | Suryax Real Estate ERP" },
      { property: "og:description", content: "Employees, roles and departments." },
    ],
  }),
  component: () => <CrudPage config={teamConfig} />,
});
