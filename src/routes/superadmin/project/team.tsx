import { createFileRoute } from "@tanstack/react-router";
import { TeamView } from "@/components/pms/TeamView";

export const Route = createFileRoute("/superadmin/project/team")({
  head: () => ({
    meta: [{ title: "Superadmin - Project Team | Vrindavan ERP" }],
  }),
  component: () => <TeamView basePath="/superadmin/project" />,
});
