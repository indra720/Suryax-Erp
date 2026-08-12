import { createFileRoute } from "@tanstack/react-router";
import { UsersRolesPage } from "@/components/pages/UsersRolesPage";

export const Route = createFileRoute("/users-roles")({
  head: () => ({
    meta: [
      { title: "Users & Roles | Suryax Real Estate ERP" },
      { name: "description", content: "System users, roles and the permission matrix." },
      { property: "og:title", content: "Users & Roles | Suryax Real Estate ERP" },
      { property: "og:description", content: "System users, roles and the permission matrix." },
    ],
  }),
  component: UsersRolesPage,
});
