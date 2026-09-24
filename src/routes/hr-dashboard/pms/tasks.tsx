import { createFileRoute } from "@tanstack/react-router";
import { TasksView } from "@/components/pms/TasksView";

export const Route = createFileRoute("/hr-dashboard/pms/tasks")({
  head: () => ({
    meta: [{ title: "HR - PMS Task Management & Kanban | Vrindavan ERP" }],
  }),
  component: () => <TasksView basePath="/hr-dashboard/pms" />,
});
