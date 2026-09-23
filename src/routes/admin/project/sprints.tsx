import { createFileRoute } from "@tanstack/react-router";
import { SprintsView } from "@/components/pms/SprintsView";

export const Route = createFileRoute("/admin/project/sprints")({
  head: () => ({
    meta: [{ title: "Admin - Project Sprints | Vrindavan ERP" }],
  }),
  component: () => <SprintsView basePath="/admin/project" />,
});
