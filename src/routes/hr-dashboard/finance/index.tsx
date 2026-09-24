import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/hr-dashboard/finance/")({
  component: () => <Navigate to="/hr-dashboard/finance/salary" replace />,
});
