import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { tasksConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks | Suryax Real Estate ERP" },
      { name: "description", content: "Team task board across all departments." },
      { property: "og:title", content: "Tasks | Suryax Real Estate ERP" },
      { property: "og:description", content: "Team task board across all departments." },
    ],
  }),
  component: () => <CrudPage config={tasksConfig} />,
});
