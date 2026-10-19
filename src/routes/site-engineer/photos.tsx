import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Camera,
  Plus,
  UploadCloud,
  CheckCircle,
  Eye,
  Calendar,
  Building,
} from "lucide-react";
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
import { siteEngineerService, type SitePhoto } from "@/lib/services/site-engineer";
import { toast } from "sonner";

export const Route = createFileRoute("/site-engineer/photos")({
  head: () => ({
    meta: [
      { title: "Site Photos & Drone Surveys | Vrindavan Engineering" },
      { name: "description", content: "Geotagged site quality inspection photos and drone progress surveys." },
    ],
  }),
  component: SitePhotosPage,
});

export function SitePhotosPage() {
  const [photos, setPhotos] = useState<SitePhoto[]>(siteEngineerService.getPhotos());
  const [modalOpen, setModalOpen] = useState(false);

  const [newPhoto, setNewPhoto] = useState({
    title: "",
    tower: "Tower A",
    floorZone: "16th Floor Slab",
    category: "Quality Inspection" as SitePhoto["category"],
    remarks: "",
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title) {
      toast.error("Please enter photo title");
      return;
    }
    const created: SitePhoto = {
      id: `SPH-0${photos.length + 1}`,
      title: newPhoto.title,
      tower: newPhoto.tower,
      floorZone: newPhoto.floorZone,
      capturedDate: new Date().toISOString().split("T")[0],
      category: newPhoto.category,
      remarks: newPhoto.remarks || "Visual inspection recorded.",
      engineerName: "Er. Indrajeet Verma",
    };
    setPhotos([created, ...photos]);
    toast.success(`Photo "${created.title}" uploaded to construction gallery!`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Camera className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Site Photo & Drone Surveys
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Geotagged visual evidence for milestone customer demand letters and structural verification.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Upload Inspection Photo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((p) => (
          <Card key={p.id} className="p-4 bg-card border border-border flex flex-col justify-between space-y-3">
            <div>
              <div className="h-40 rounded-xl bg-muted/60 border border-border flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-xs font-semibold text-white truncate">{p.floorZone}</span>
                </div>
                <Camera className="size-10 text-white/30" />
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                  {p.category}
                </span>
                <h3 className="text-xs font-bold text-foreground mt-1.5 leading-snug">{p.title}</h3>
                <p className="text-[11px] text-text-secondary mt-1 line-clamp-2">{p.remarks}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] text-text-muted">
              <span>{p.capturedDate}</span>
              <span>{p.engineerName}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Upload Site Inspection Photo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Photo Title / Description</Label>
              <Input
                placeholder="e.g. Tower B 18th Floor Slab Reinforcement Inspection"
                value={newPhoto.title}
                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Tower / Structure</Label>
                <Input
                  value={newPhoto.tower}
                  onChange={(e) => setNewPhoto({ ...newPhoto, tower: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Floor Zone</Label>
                <Input
                  value={newPhoto.floorZone}
                  onChange={(e) => setNewPhoto({ ...newPhoto, floorZone: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Technical Remarks</Label>
              <Input
                placeholder="e.g. Verified concrete cover, cube test samples taken"
                value={newPhoto.remarks}
                onChange={(e) => setNewPhoto({ ...newPhoto, remarks: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <div className="border border-dashed border-border rounded-xl p-4 text-center text-xs text-text-muted bg-muted/20">
              <UploadCloud className="size-6 text-brand mx-auto mb-1" />
              <span>Select image file or take camera snapshot</span>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Upload & Geotag
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
