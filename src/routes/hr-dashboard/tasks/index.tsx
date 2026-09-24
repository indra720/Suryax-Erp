import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hr-dashboard/tasks/")({
  component: () => <Navigate to="/hr-dashboard/tasks/board" replace />,
});
