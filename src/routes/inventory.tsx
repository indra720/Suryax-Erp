import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { inventoryConfig } from "@/lib/erp/configs";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory | Suryax Real Estate ERP" },
      { name: "description", content: "Unit-level availability across towers and projects." },
      { property: "og:title", content: "Inventory | Suryax Real Estate ERP" },
      { property: "og:description", content: "Unit-level availability across towers and projects." },
    ],
  }),
  component: () => <CrudPage config={inventoryConfig} />,
});
