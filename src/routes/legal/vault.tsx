import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FolderOpen,
  Download,
  Lock,
  ShieldCheck,
  FileText,
  Search,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { legalService, type LegalVaultDoc } from "@/lib/services/legal";
import { toast } from "sonner";

export const Route = createFileRoute("/legal/vault")({
  head: () => ({
    meta: [
      { title: "Legal Document Vault | Vrindavan ERP" },
      { name: "description", content: "High-security digital vault for parent deeds, title search, and bank approvals." },
    ],
  }),
  component: LegalVaultPage,
});

export function LegalVaultPage() {
  const [docs] = useState<LegalVaultDoc[]>(legalService.getVault());
  const [search, setSearch] = useState("");

  const downloadDoc = (title: string) => {
    toast.success(`Access verified. Encrypted copy of "${title}" downloaded!`);
  };

  const filtered = docs.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <FolderOpen className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Encrypted Legal Document Vault
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Master repository for 30-year title opinions, Section 143 conversion orders, and bank APF letters.
          </p>
        </div>
      </div>

      <Card className="p-3 bg-card border border-border flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search vault documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <div className="text-xs text-text-secondary font-medium">
          Stored Documents: <span className="font-bold text-foreground">{docs.length}</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((d) => (
          <Card key={d.id} className="p-5 bg-card border border-border flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                    {d.category}
                  </span>
                  <h3 className="text-sm font-bold text-foreground mt-1.5">{d.title}</h3>
                </div>
                <Lock className="size-4 text-text-muted shrink-0 ml-2" />
              </div>

              <div className="mt-3 text-xs text-text-secondary space-y-1">
                <p>Security: <span className="font-semibold text-foreground">{d.confidentiality}</span></p>
                <p>Verified By: <span className="font-semibold text-foreground">{d.verifiedBy}</span></p>
                <p className="text-[11px] text-text-muted">Updated: {d.updatedOn} • Size: {d.fileSize}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadDoc(d.title)}
                className="h-8 gap-1.5 text-xs text-brand hover:text-brand"
              >
                <Download className="size-3.5" /> Download Encrypted Copy
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
