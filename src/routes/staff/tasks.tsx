import { createFileRoute } from "@tanstack/react-router";
import { TasksView } from "@/components/pms/TasksView";

export const Route = createFileRoute("/staff/tasks")({
  head: () => ({
    meta: [{ title: "Staff - My Assigned Tasks | Vrindavan ERP" }],
  }),
  component: () => <TasksView basePath="/staff/tasks" />,
});
