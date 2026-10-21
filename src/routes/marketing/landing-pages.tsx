import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Globe,
  Plus,
  Search,
  ExternalLink,
  Copy,
  Users,
  Eye,
  CheckCircle,
} from "lucide-react";
import { initialLandingPages, type LandingPage } from "@/lib/services/marketing";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/landing-pages")({
  head: () => ({
    meta: [
      { title: "Landing Pages & Forms | Vrindavan Marketing" },
      { name: "description", content: "Lead capture landing pages, web forms and conversion metrics." },
    ],
  }),
  component: LandingPagesPage,
});

export function LandingPagesPage() {
  const [pages, setPages] = useState<LandingPage[]>(initialLandingPages);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    project: "Vrindavan Heights",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Please enter a title");
      return;
    }
    const created: LandingPage = {
      id: `LP-${Date.now().toString().slice(-4)}`,
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
      project: form.project,
      visitors: 0,
      conversions: 0,
      conversionRate: 0,
      status: "Live",
      updatedAt: "2026-04-19",
    };
    setPages([created, ...pages]);
    toast.success("Landing page published!");
    setModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <Globe className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Landing Pages & Capture Forms
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            High-converting mobile-first project landing pages, form abandonment tracking, and live lead webhook sinks.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            onClick={() => setModal(true)}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm justify-center"
          >
            <Plus className="size-3.5" /> Create New Landing Page
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {pages.map((p) => (
          <Card key={p.id} className="p-3.5 sm:p-4 bg-card border border-border hover:border-brand/40 transition-all shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-brand">{p.project}</span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {p.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-foreground line-clamp-1">{p.title}</h3>
              <p className="text-[11px] font-mono text-text-muted mt-1 truncate">
                /p/{p.slug}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60">
              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                <div>
                  <span className="text-[10px] text-text-muted block">Visitors</span>
                  <span className="font-bold text-foreground">{p.visitors.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">Submissions</span>
                  <span className="font-bold text-brand">{p.conversions}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">Conv Rate</span>
                  <span className="font-bold text-emerald-600">{p.conversionRate}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                <span className="text-[10.5px] text-text-muted">Updated {p.updatedAt}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://vrindavanerp.com/p/${p.slug}`);
                    toast.success("Page link copied!");
                  }}
                  className="h-7 text-xs gap-1 border-border"
                >
                  <Copy className="size-3" /> Copy URL
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <Globe className="size-5 text-brand" /> Create High-Converting Landing Page
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Configure targeted promotional microsite with instant lead capture, brochure download, and UTM attribution.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Page Headline / Marketing Title</Label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. Exclusive Golf Villas Launch - Early Bird Pricing"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">URL Slug</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    placeholder="e.g. golf-villas-launch-2026"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Associated Project</Label>
                  <Input
                    placeholder="e.g. Vrindavan Heights"
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border shrink-0 gap-2">
              <Button type="button" variant="outline" onClick={() => setModal(false)} className="rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Publish Page
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
