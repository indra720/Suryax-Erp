import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/admin/reports/booking")({
  component: BookingReportsPage,
});

function BookingReportsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-booking",
        title: "Booking Reports",
        description: "View booking status and revenue reports.",
        seed: [],
        columns: [
          { key: "bookingId", title: "Booking ID" },
          { key: "customerName", title: "Customer Name" },
          { key: "amount", title: "Amount" },
        ],
        fields: [
          { key: "bookingId", label: "Booking ID", type: "text" },
          { key: "customerName", label: "Customer Name", type: "text" },
          { key: "amount", label: "Amount", type: "number" },
        ],
      }}
    />
  );
}
