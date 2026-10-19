import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Download,
  CheckCircle,
  FileCheck,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { customerService, type CustomerDocument } from "@/lib/services/customer";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/documents")({
  head: () => ({
    meta: [
      { title: "My Property Documents | Vrindavan Customer" },
      { name: "description", content: "Download official Allotment Letter, registered BBA agreement, and payment receipts." },
    ],
  }),
  component: CustomerDocumentsPage,
});

export function CustomerDocumentsPage() {
  const [docs] = useState<CustomerDocument[]>(customerService.getDocuments());

  const handleDownload = (title: string) => {
    toast.success(`Encrypted copy of "${title}" downloaded!`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <FileText className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Documents & Allotment Vault
          </h1>
          <p className="text-xs text-text-secondary">
            Digitally signed customer records, legal BBA copy, parking allocation, and payment receipts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((d) => (
          <Card key={d.id} className="p-5 bg-card border border-border flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                    {d.category}
                  </span>
                  <h3 className="text-sm font-bold text-foreground mt-1.5">{d.title}</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <CheckCircle className="size-3" /> {d.status}
                </span>
              </div>

              <p className="text-[11px] text-text-secondary mt-2">
                Issue Date: {d.issueDate} • File Size: {d.fileSize}
              </p>
            </div>

            <div className="pt-2 border-t border-border flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(d.title)}
                className="h-8 gap-1.5 text-xs text-brand hover:text-brand"
              >
                <Download className="size-3.5" /> Download PDF
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
