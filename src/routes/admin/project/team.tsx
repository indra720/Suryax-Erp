import { createFileRoute } from "@tanstack/react-router";
import { TeamView } from "@/components/pms/TeamView";

export const Route = createFileRoute("/admin/project/team")({
  head: () => ({
    meta: [{ title: "Admin - Project Team | Vrindavan ERP" }],
  }),
  component: () => <TeamView basePath="/admin/project" />,
});
