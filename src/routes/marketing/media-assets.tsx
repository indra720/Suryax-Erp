import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Download,
  Plus,
  Search,
  FileCheck,
  FileSpreadsheet,
  Share2,
} from "lucide-react";
import { initialMediaAssets, type MediaAsset } from "@/lib/services/marketing";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/media-assets")({
  head: () => ({
    meta: [
      { title: "Brochures & Media Assets | Vrindavan Marketing" },
      { name: "description", content: "Downloadable sales enablement collateral, floor plans and brochures." },
    ],
  }),
  component: MediaAssetsPage,
});

export function MediaAssetsPage() {
  const [assets] = useState<MediaAsset[]>(initialMediaAssets);
  const [search, setSearch] = useState("");

  const filtered = assets.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <FileText className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Brochures & Sales Collateral Assets
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Verified marketing brochures, floor plan packs, walkthrough 3D videos and statutory RERA disclosures.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => toast.info("Opening Asset Upload...")}
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Upload Collateral
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Collateral Library</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search collateral..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Asset Title</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Format</th>
                <th className="py-2.5 px-3 font-semibold">File Size</th>
                <th className="py-2.5 px-3 font-semibold">Total Downloads</th>
                <th className="py-2.5 px-3 font-semibold">Last Updated</th>
                <th className="py-2.5 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-foreground block">{a.title}</span>
                    <span className="text-[10.5px] text-text-muted">{a.id}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {a.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-text-secondary">{a.format}</td>
                  <td className="py-2.5 px-3">{a.size}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">{a.downloadCount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-text-muted">{a.uploadDate}</td>
                  <td className="py-2.5 px-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success(`Downloading ${a.title}`)}
                      className="h-7 text-xs gap-1 border-border"
                    >
                      <Download className="size-3" /> Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
