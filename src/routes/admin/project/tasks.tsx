import { createFileRoute } from "@tanstack/react-router";
import { TasksView } from "@/components/pms/TasksView";

export const Route = createFileRoute("/admin/project/tasks")({
  head: () => ({
    meta: [{ title: "Admin - Project Tasks | Vrindavan ERP" }],
  }),
  component: () => <TasksView basePath="/admin/project" />,
});
