import { createFileRoute } from "@tanstack/react-router";
import { ProjectsAllView } from "@/components/pms/ProjectsAllView";

export const Route = createFileRoute("/hr-dashboard/pms/projects")({
  head: () => ({
    meta: [{ title: "HR - All PMS Projects | Vrindavan ERP" }],
  }),
  component: () => <ProjectsAllView basePath="/hr-dashboard/pms" />,
});
