import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hr-dashboard/support/")({
  component: () => <Navigate to="/hr-dashboard/support/tickets" replace />,
});
