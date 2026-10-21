import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { initialCampaigns, type Campaign } from "@/lib/services/marketing";
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

export const Route = createFileRoute("/marketing/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaign Management | Vrindavan Marketing" },
      { name: "description", content: "Manage live ad campaigns, budgets, platforms and leads." },
    ],
  }),
  component: CampaignsPage,
});

export function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    project: "Vrindavan Heights",
    platform: "Google Ads" as Campaign["platform"],
    budget: 300000,
    startDate: "2026-04-20",
    endDate: "2026-05-20",
  });

  const filtered = campaigns.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.project.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchPlatform = platformFilter === "All" || c.platform === platformFilter;
    return matchSearch && matchStatus && matchPlatform;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please enter a campaign name");
      return;
    }
    const newCamp: Campaign = {
      id: `CMP-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      project: formData.project,
      platform: formData.platform,
      status: "Active",
      budget: Number(formData.budget),
      spent: 0,
      leadsGenerated: 0,
      cpl: 0,
      roi: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    setCampaigns([newCamp, ...campaigns]);
    toast.success("Campaign created successfully!");
    setModalOpen(false);
    setFormData({
      name: "",
      project: "Vrindavan Heights",
      platform: "Google Ads",
      budget: 300000,
      startDate: "2026-04-20",
      endDate: "2026-05-20",
    });
  };

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast.success("Campaign removed");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <Megaphone className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Campaign Management
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Plan, launch, monitor and optimize lead-generation campaigns across digital and on-ground networks.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exporting Campaigns Report (CSV)...")}
            className="flex-1 sm:flex-none h-9 gap-1.5 text-xs rounded-xl justify-center"
          >
            <Download className="size-3.5" /> Export CSV
          </Button>
          <Button
            size="sm"
            onClick={() => setModalOpen(true)}
            className="flex-1 sm:flex-none h-9 gap-1.5 text-xs bg-brand text-white shadow-sm rounded-xl justify-center"
          >
            <Plus className="size-3.5" /> Create Campaign
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-3.5 sm:p-4 bg-card border border-border">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search by campaign name, project or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8.5 sm:h-9 text-xs rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[125px] sm:w-[140px] h-8.5 sm:h-9 text-xs shrink-0 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[140px] sm:w-[160px] h-8.5 sm:h-9 text-xs shrink-0 rounded-xl">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Networks</SelectItem>
                <SelectItem value="Google Ads">Google Ads</SelectItem>
                <SelectItem value="Meta (FB/IG)">Meta (FB/IG)</SelectItem>
                <SelectItem value="99acres">99acres</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-xs sm:text-sm font-semibold text-foreground">Campaign Register</h2>
          <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
        </div>
        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[1000px] whitespace-nowrap">
            <thead className="bg-muted/70 text-text-secondary uppercase tracking-wider text-[11px] font-semibold border-b border-border">
              <tr>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Campaign ID & Name</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Project</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Network</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Duration</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Budget</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Spent</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Leads</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">CPL</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">ROI</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-center">Status</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-foreground block">{c.name}</span>
                    <span className="text-[10.5px] text-text-muted">{c.id}</span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary whitespace-nowrap">{c.project}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {c.platform}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[11.5px] text-text-muted whitespace-nowrap">
                    {c.startDate} → {c.endDate}
                  </td>
                  <td className="py-3 px-4 font-semibold text-right whitespace-nowrap">₹{c.budget.toLocaleString()}</td>
                  <td className="py-3 px-4 text-text-secondary text-right whitespace-nowrap">₹{c.spent.toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold text-foreground text-right whitespace-nowrap">{c.leadsGenerated}</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold text-right whitespace-nowrap">
                    {c.cpl > 0 ? `₹${c.cpl}` : "-"}
                  </td>
                  <td className="py-3 px-4 font-bold text-brand text-right whitespace-nowrap">
                    {c.roi > 0 ? `${c.roi}x` : "-"}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        c.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : c.status === "Completed"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(c.id)}
                      className="size-8 p-0 text-text-muted hover:text-rose-600"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Campaign Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <span className="p-2 rounded-xl bg-brand/10 text-brand">
                <Megaphone className="size-5" />
              </span>
              Create Digital Campaign
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Set up a multi-channel performance campaign with dedicated budget and tracking parameters.
            </p>
          </DialogHeader>

          <form onSubmit={handleAdd} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Campaign Name *</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. Vrindavan Summer Fest 2026"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Destination Project</Label>
                  <Select
                    value={formData.project}
                    onValueChange={(val) => setFormData({ ...formData, project: val })}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vrindavan Heights">Vrindavan Heights</SelectItem>
                      <SelectItem value="Green Valley Villas">Green Valley Villas</SelectItem>
                      <SelectItem value="Cyber Techpark Tower">Cyber Techpark Tower</SelectItem>
                      <SelectItem value="Radha Govind City">Radha Govind City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Marketing Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(val: any) => setFormData({ ...formData, platform: val })}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                      <SelectItem value="Meta (FB/IG)">Meta (FB/IG)</SelectItem>
                      <SelectItem value="99acres">99acres</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Allocated Budget (₹)</Label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. 500000"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border shrink-0 gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Launch Campaign
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
