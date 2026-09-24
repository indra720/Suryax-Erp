import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hr-dashboard/settings/")({
  component: () => <Navigate to="/hr-dashboard/settings/holidays" replace />,
});
