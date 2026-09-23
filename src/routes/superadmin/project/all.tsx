import { createFileRoute } from "@tanstack/react-router";
import { ProjectsAllView } from "@/components/pms/ProjectsAllView";

export const Route = createFileRoute("/superadmin/project/all")({
  head: () => ({
    meta: [{ title: "Superadmin - All Projects | Vrindavan ERP" }],
  }),
  component: () => <ProjectsAllView basePath="/superadmin/project" />,
});
