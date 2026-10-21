import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Share2,
  Plus,
  Calendar,
  Eye,
  Heart,
  MousePointer,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { initialSocialPosts, type SocialPost } from "@/lib/services/marketing";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export const Route = createFileRoute("/marketing/social-media")({
  head: () => ({
    meta: [
      { title: "Social Media Manager | Vrindavan Marketing" },
      { name: "description", content: "Organic social publishing, schedule and engagement analytics." },
    ],
  }),
  component: SocialMediaPage,
});

export function SocialMediaPage() {
  const [posts, setPosts] = useState<SocialPost[]>(initialSocialPosts);
  const [openModal, setOpenModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    platform: "Instagram" as SocialPost["platform"],
    scheduledDate: "2026-04-22 11:00 AM",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title) {
      toast.error("Please add post caption or title");
      return;
    }
    const created: SocialPost = {
      id: `SOC-${Date.now().toString().slice(-4)}`,
      title: newPost.title,
      platform: newPost.platform,
      scheduledDate: newPost.scheduledDate,
      status: "Scheduled",
      reach: 0,
      engagement: 0,
      clicks: 0,
    };
    setPosts([created, ...posts]);
    toast.success("Post scheduled successfully!");
    setOpenModal(false);
    setNewPost({
      title: "",
      platform: "Instagram",
      scheduledDate: "2026-04-22 11:00 AM",
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <Share2 className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Social Media Manager
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Manage multi-channel social media posts, content scheduling and engagement analytics.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            onClick={() => setOpenModal(true)}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm justify-center"
          >
            <Plus className="size-3.5" /> Schedule New Post
          </Button>
        </div>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-3.5 sm:p-4 bg-card border border-border shadow-sm hover:border-brand/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded font-bold bg-brand/10 text-brand">
                  {post.platform}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                    post.status === "Published"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground line-clamp-2 mt-1">
                {post.title}
              </h3>
              <p className="text-[11px] text-text-muted flex items-center gap-1.5 mt-2">
                <Clock className="size-3 text-brand" /> {post.scheduledDate}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-text-muted block">Reach</span>
                <span className="font-bold text-foreground">
                  {post.reach > 0 ? post.reach.toLocaleString() : "-"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-text-muted block">Engagement</span>
                <span className="font-bold text-brand">
                  {post.engagement > 0 ? post.engagement.toLocaleString() : "-"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-text-muted block">Clicks</span>
                <span className="font-bold text-emerald-600">
                  {post.clicks > 0 ? post.clicks.toLocaleString() : "-"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <Share2 className="size-5 text-brand" /> Schedule Social Post
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Draft and queue multi-channel marketing content across Instagram, Facebook, LinkedIn and YouTube.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Select Channel</Label>
                  <Select
                    value={newPost.platform}
                    onValueChange={(val: any) => setNewPost({ ...newPost, platform: val })}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Publish Time / Slot</Label>
                  <Input
                    placeholder="e.g. Tomorrow, 6:00 PM"
                    value={newPost.scheduledDate}
                    onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Post Caption / Content Copy</Label>
                <Textarea
                  required
                  rows={5}
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Write your engaging real estate copy with project highlights, pricing, and hashtags..."
                  className="text-sm rounded-xl min-h-[120px] p-3"
                />
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border shrink-0 gap-2">
              <Button type="button" variant="outline" onClick={() => setOpenModal(false)} className="rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Schedule Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
