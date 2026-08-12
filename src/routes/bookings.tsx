import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { bookingsConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Bookings | Suryax Real Estate ERP" },
      { name: "description", content: "Property bookings with payment and confirmation status." },
      { property: "og:title", content: "Bookings | Suryax Real Estate ERP" },
      { property: "og:description", content: "Property bookings with payment and confirmation status." },
    ],
  }),
  component: () => <CrudPage config={bookingsConfig} />,
});
