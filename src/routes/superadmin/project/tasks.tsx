import { createFileRoute } from "@tanstack/react-router";
import { TasksView } from "@/components/pms/TasksView";

export const Route = createFileRoute("/superadmin/project/tasks")({
  head: () => ({
    meta: [{ title: "Superadmin - Project Tasks | Vrindavan ERP" }],
  }),
  component: () => <TasksView basePath="/superadmin/project" />,
});
