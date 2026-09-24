import { createFileRoute } from "@tanstack/react-router";
import { SprintsView } from "@/components/pms/SprintsView";

export const Route = createFileRoute("/hr-dashboard/pms/sprints")({
  head: () => ({
    meta: [{ title: "HR - PMS Sprint Planning & Velocity | Vrindavan ERP" }],
  }),
  component: () => <SprintsView basePath="/hr-dashboard/pms" />,
});
