import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { projectsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Suryax Real Estate ERP" },
      { name: "description", content: "All ongoing and completed real estate projects with unit sales progress." },
      { property: "og:title", content: "Projects | Suryax Real Estate ERP" },
      { property: "og:description", content: "All ongoing and completed real estate projects with unit sales progress." },
    ],
  }),
  component: () => <CrudPage config={projectsConfig} />,
});
