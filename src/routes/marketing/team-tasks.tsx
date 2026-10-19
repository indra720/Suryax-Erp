import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ListChecks,
  Plus,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { initialMarketingTasks, type MarketingTask } from "@/lib/services/marketing";
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

export const Route = createFileRoute("/marketing/team-tasks")({
  head: () => ({
    meta: [
      { title: "Marketing Team & Tasks | Vrindavan Marketing" },
      { name: "description", content: "Growth squad task assignments and deadline tracker." },
    ],
  }),
  component: TeamTasksPage,
});

export function TeamTasksPage() {
  const [tasks, setTasks] = useState<MarketingTask[]>(initialMarketingTasks);
  const [modal, setModal] = useState(false);
  const [newTask, setNewTask] = useState({
    task: "",
    assignee: "Rahul Sharma (Designer)",
    platform: "Meta Ads",
    priority: "High" as MarketingTask["priority"],
    deadline: "2026-04-25",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.task) {
      toast.error("Please enter a task description");
      return;
    }
    const created: MarketingTask = {
      id: `TSK-${Date.now().toString().slice(-4)}`,
      task: newTask.task,
      assignee: newTask.assignee,
      platform: newTask.platform,
      priority: newTask.priority,
      status: "To Do",
      deadline: newTask.deadline,
    };
    setTasks([created, ...tasks]);
    toast.success("Task assigned!");
    setModal(false);
  };

  const toggleStatus = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Done" ? "In Progress" : "Done" }
          : t
      )
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <ListChecks className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Marketing Team & Deliverables
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Cross-functional task assignments for ad designers, copywriters, PPC analysts, and event coordinators.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setModal(true)}
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Assign New Task
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Sprint Deliverables</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Done</th>
                <th className="py-2.5 px-3 font-semibold">Task Description</th>
                <th className="py-2.5 px-3 font-semibold">Assignee</th>
                <th className="py-2.5 px-3 font-semibold">Platform</th>
                <th className="py-2.5 px-3 font-semibold">Priority</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3">
                    <input
                      type="checkbox"
                      checked={t.status === "Done"}
                      onChange={() => toggleStatus(t.id)}
                      className="rounded border-border text-brand focus:ring-brand size-4 cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`font-semibold block ${t.status === "Done" ? "line-through text-text-muted" : "text-foreground"}`}>
                      {t.task}
                    </span>
                    <span className="text-[10px] text-text-muted">{t.id}</span>
                  </td>
                  <td className="py-2.5 px-3 text-text-secondary">{t.assignee}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {t.platform}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10.5px] font-bold ${
                        t.priority === "Urgent"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : t.priority === "High"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        t.status === "Done"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-muted text-text-muted"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-text-muted whitespace-nowrap">{t.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="max-w-md bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <ListChecks className="size-4 text-brand" /> Assign Task
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-3 py-2 text-xs">
            <div>
              <Label className="text-xs">Task Objective</Label>
              <Input
                required
                value={newTask.task}
                onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                className="h-8 text-xs mt-1"
                placeholder="e.g. Create new WhatsApp carousel"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Assignee</Label>
                <Input
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Platform / Channel</Label>
                <Input
                  value={newTask.platform}
                  onChange={(e) => setNewTask({ ...newTask, platform: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(val: any) => setNewTask({ ...newTask, priority: val })}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Deadline</Label>
                <Input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Assign Task
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
