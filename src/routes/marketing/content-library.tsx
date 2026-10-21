import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Image as ImageIcon,
  Plus,
  Download,
  Search,
  Filter,
  Eye,
  Video,
  FileText,
  Copy,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/content-library")({
  head: () => ({
    meta: [
      { title: "Content & Creative Library | Vrindavan Marketing" },
      { name: "description", content: "Marketing creatives, ad copy templates and high-res media library." },
    ],
  }),
  component: ContentLibraryPage,
});

export function ContentLibraryPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [items, setItems] = useState([
    { id: "CRT-01", title: "Luxury Balcony View 3D Rendering (4K)", category: "Ad Creatives", type: "Image", size: "18 MB", dimensions: "3840 x 2160", downloads: 412, date: "2026-04-10" },
    { id: "CRT-02", title: "Tower A & B Elevation Drone Cinematic Reel", category: "Drone Videos", type: "Video", size: "142 MB", dimensions: "1080 x 1920 (9:16)", downloads: 680, date: "2026-04-12" },
    { id: "CRT-03", title: "Akshaya Tritiya Gold Coin Offer Ad Set", category: "Ad Creatives", type: "Image", size: "24 MB", dimensions: "1080 x 1080", downloads: 310, date: "2026-04-15" },
    { id: "CRT-04", title: "High-Converting Facebook Ad Copy Templates (x5)", category: "Copywriting", type: "Doc", size: "1.2 MB", dimensions: "Text/Doc", downloads: 890, date: "2026-04-05" },
    { id: "CRT-05", title: "Virtual Sample Flat 360 Walkthrough MP4", category: "Drone Videos", type: "Video", size: "98 MB", dimensions: "1920 x 1080 (16:9)", downloads: 540, date: "2026-04-11" },
    { id: "CRT-06", title: "WhatsApp Broadcast Image Banner (BHK Options)", category: "Ad Creatives", type: "Image", size: "6 MB", dimensions: "1200 x 628", downloads: 720, date: "2026-04-14" },
  ]);

  const [newAsset, setNewAsset] = useState({
    title: "",
    category: "Ad Creatives",
    type: "Image",
    dimensions: "1080 x 1080 (Square)",
    size: "15 MB",
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.title) {
      toast.error("Please enter asset title");
      return;
    }
    const created = {
      id: `CRT-0${items.length + 1}`,
      title: newAsset.title,
      category: newAsset.category,
      type: newAsset.type,
      size: newAsset.size,
      dimensions: newAsset.dimensions,
      downloads: 0,
      date: new Date().toISOString().slice(0, 10),
    };
    setItems([created, ...items]);
    toast.success(`Creative asset "${created.title}" uploaded to library!`);
    setModalOpen(false);
    setNewAsset({
      title: "",
      category: "Ad Creatives",
      type: "Image",
      dimensions: "1080 x 1080 (Square)",
      size: "15 MB",
    });
  };

  const filtered = items.filter((it) => {
    const matchCat = filter === "All" || it.category === filter;
    const matchSearch = it.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <ImageIcon className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Content & Creative Library
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Central repository of high-converting ad visuals, 3D floor plans, drone walk-throughs and copywriting swipe files.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setModalOpen(true)}
          className="h-8.5 sm:h-9 gap-1.5 text-xs bg-brand text-white shadow-sm shrink-0 w-auto self-start sm:self-auto rounded-xl px-3.5"
        >
          <Plus className="size-3.5" /> Upload Creative Asset
        </Button>
      </div>

      {/* Filter Chips & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {["All", "Ad Creatives", "Drone Videos", "Copywriting"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 whitespace-nowrap ${
                filter === cat
                  ? "bg-brand text-white shadow-sm"
                  : "bg-card border border-border text-text-secondary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search creative asset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 sm:h-9 text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Grid of Creatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Card key={item.id} className="p-4 bg-card border border-border hover:border-brand/40 transition-all shadow-sm flex flex-col justify-between">
            <div>
              <div className="h-36 w-full rounded-lg bg-gradient-to-br from-brand/10 via-muted to-muted flex items-center justify-center border border-border/50 relative overflow-hidden group">
                {item.type === "Video" ? (
                  <Video className="size-10 text-brand" />
                ) : item.type === "Doc" ? (
                  <FileText className="size-10 text-brand" />
                ) : (
                  <ImageIcon className="size-10 text-brand" />
                )}
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white">
                  {item.dimensions}
                </span>
              </div>

              <div className="mt-3">
                <span className="text-[10.5px] font-semibold text-brand block">{item.category}</span>
                <h3 className="text-xs font-bold text-foreground line-clamp-1 mt-0.5">{item.title}</h3>
                <div className="flex items-center justify-between text-[11px] text-text-muted mt-2">
                  <span>Size: {item.size}</span>
                  <span>{item.downloads} downloads</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
              <span className="text-[10px] text-text-muted">{item.date}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success(`Downloading ${item.title}...`)}
                className="h-7 text-xs gap-1 border-border"
              >
                <Download className="size-3" /> Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Creative Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <UploadCloud className="size-4 text-brand" /> Upload New Creative Asset
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpload} className="space-y-3 py-2 text-xs">
            <div>
              <Label className="text-xs">Asset Title & Description</Label>
              <Input
                required
                placeholder="e.g. Vrindavan Heights Night Elevation 3D Render"
                value={newAsset.title}
                onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                className="h-8 text-xs mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Creative Category</Label>
                <Select
                  value={newAsset.category}
                  onValueChange={(val) => {
                    const type = val === "Drone Videos" ? "Video" : val === "Copywriting" ? "Doc" : "Image";
                    setNewAsset({ ...newAsset, category: val, type });
                  }}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ad Creatives">Social & Ad Banners</SelectItem>
                    <SelectItem value="Drone Videos">Drone Walkthrough Video</SelectItem>
                    <SelectItem value="Copywriting">Copywriting Swipe File</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Aspect Ratio / Format</Label>
                <Select
                  value={newAsset.dimensions}
                  onValueChange={(val) => setNewAsset({ ...newAsset, dimensions: val })}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1080 x 1080 (Square)">1:1 Square (Instagram/FB)</SelectItem>
                    <SelectItem value="1080 x 1920 (9:16 Vertical)">9:16 Reels/Stories</SelectItem>
                    <SelectItem value="1920 x 1080 (16:9 Landscape)">16:9 Landscape (YouTube/Display)</SelectItem>
                    <SelectItem value="1200 x 628 (Feed Banner)">1200x628 Banner</SelectItem>
                    <SelectItem value="Text Document (PDF/Doc)">Copy Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">File Size Estimate</Label>
                <Input
                  value={newAsset.size}
                  onChange={(e) => setNewAsset({ ...newAsset, size: e.target.value })}
                  className="h-8 text-xs mt-1"
                  placeholder="e.g. 24 MB"
                />
              </div>

              <div>
                <Label className="text-xs">Target Project</Label>
                <Input
                  defaultValue="Vrindavan Heights"
                  className="h-8 text-xs mt-1"
                />
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-brand/50 transition-colors bg-muted/20">
              <UploadCloud className="size-7 text-brand mx-auto mb-1" />
              <p className="font-semibold text-foreground text-xs">Drag & drop files or click to browse</p>
              <p className="text-[10px] text-text-muted mt-0.5">Supports PNG, JPG, MP4, PDF up to 250MB</p>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Save & Publish
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
