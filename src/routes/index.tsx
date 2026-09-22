import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth, getRoleRedirect } from "@/lib/services/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | Vrindavan ERP" },
      {
        name: "description",
        content: "Role-based intelligent real estate management dashboard.",
      },
    ],
  }),
  component: IndexRedirect,
});

function IndexRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.token) {
      navigate({ to: "/login" });
    } else {
      const redirectPath = getRoleRedirect(user.role);
      navigate({ to: redirectPath });
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3 text-muted-foreground text-sm">
        <div className="size-7 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        <span className="font-medium text-gray-600">Directing to your dedicated workspace...</span>
      </div>
    </div>
  );
}
