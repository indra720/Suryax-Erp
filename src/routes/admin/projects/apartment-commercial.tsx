import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/projects/apartment-commercial")({
  component: ApartmentCommercialLayout,
});

function ApartmentCommercialLayout() {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-4">Apartment / Commercial</h1>
      <Outlet />
    </div>
  );
}
