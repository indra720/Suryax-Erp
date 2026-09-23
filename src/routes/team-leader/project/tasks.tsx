import { createFileRoute } from "@tanstack/react-router";
import { TasksView } from "@/components/pms/TasksView";

export const Route = createFileRoute("/team-leader/project/tasks")({
  head: () => ({
    meta: [{ title: "Team Leader - Tasks | Vrindavan ERP" }],
  }),
  component: () => <TasksView basePath="/team-leader/project" />,
});
