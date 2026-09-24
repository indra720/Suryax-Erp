import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hr-dashboard/attendance/")({
  component: () => <Navigate to="/hr-dashboard/attendance/list" replace />,
});
