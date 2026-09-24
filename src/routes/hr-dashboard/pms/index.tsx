import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hr-dashboard/pms/")({
  component: () => <Navigate to="/hr-dashboard/pms/dashboard" replace />,
});
