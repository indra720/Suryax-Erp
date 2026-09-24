import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hr-dashboard/employees/")({
  component: () => <Navigate to="/hr-dashboard/employees/all" replace />,
});
