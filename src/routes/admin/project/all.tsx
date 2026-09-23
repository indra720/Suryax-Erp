import { createFileRoute } from "@tanstack/react-router";
import { ProjectsAllView } from "@/components/pms/ProjectsAllView";

export const Route = createFileRoute("/admin/project/all")({
  head: () => ({
    meta: [{ title: "Admin - All Projects | Vrindavan ERP" }],
  }),
  component: () => <ProjectsAllView basePath="/admin/project" />,
});
