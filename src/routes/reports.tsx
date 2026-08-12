import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/components/pages/ReportsPage";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports | Suryax Real Estate ERP" },
      { name: "description", content: "Revenue, sales, leads and expense analytics with charts." },
      { property: "og:title", content: "Reports | Suryax Real Estate ERP" },
      { property: "og:description", content: "Revenue, sales, leads and expense analytics with charts." },
    ],
  }),
  component: ReportsPage,
});
