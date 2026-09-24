import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hr-dashboard/shifts/")({
  component: () => <Navigate to="/hr-dashboard/shifts/custom" replace />,
});
