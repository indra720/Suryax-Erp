import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/post-sales/associate-payments/payment-to-vendor")({
  component: PaymentToVendorPage,
});

function PaymentToVendorPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] space-y-4">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-gray-800">Payment to Vendor</h1>
      </div>
      <div className="p-4">
        <div className="bg-white border rounded p-6 text-center text-gray-500">
          Payment to Vendor content will be implemented here.
        </div>
      </div>
    </div>
  );
}
