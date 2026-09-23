import { createFileRoute } from "@tanstack/react-router";
import { SprintsView } from "@/components/pms/SprintsView";

export const Route = createFileRoute("/superadmin/project/sprints")({
  head: () => ({
    meta: [{ title: "Superadmin - Project Sprints | Vrindavan ERP" }],
  }),
  component: () => <SprintsView basePath="/superadmin/project" />,
});
