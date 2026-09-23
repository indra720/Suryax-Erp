import { createFileRoute } from "@tanstack/react-router";
import { ProjectsAllView } from "@/components/pms/ProjectsAllView";

export const Route = createFileRoute("/staff/projects")({
  head: () => ({
    meta: [{ title: "Staff - My Assigned Projects | Vrindavan ERP" }],
  }),
  component: () => <ProjectsAllView basePath="/staff/projects" />,
});
