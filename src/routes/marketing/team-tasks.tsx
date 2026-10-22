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
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <ListChecks className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Marketing Team & Tasks
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Cross-functional task assignments for ad designers, copywriters, PPC analysts, and event coordinators.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            onClick={() => setModal(true)}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm justify-center"
          >
            <Plus className="size-3.5" /> Assign New Task
          </Button>
        </div>
      </div>

      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
          <h2 className="text-xs sm:text-sm font-semibold text-foreground">Sprint Deliverables</h2>
          <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
        </div>
        <div className="overflow-x-auto -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Done</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Task Description</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Assignee</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Platform</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Priority</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Status</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={t.status === "Done"}
                      onChange={() => toggleStatus(t.id)}
                      className="rounded border-border text-brand focus:ring-brand size-4 cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className={`font-semibold block ${t.status === "Done" ? "line-through text-text-muted" : "text-foreground"}`}>
                      {t.task}
                    </span>
                    <span className="text-[10px] text-text-muted">{t.id}</span>
                  </td>
                  <td className="py-3 px-3.5 text-text-secondary whitespace-nowrap">{t.assignee}</td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {t.platform}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
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
                  <td className="py-3 px-3.5 whitespace-nowrap">
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
                  <td className="py-3 px-3.5 text-text-muted whitespace-nowrap">{t.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <ListChecks className="size-5 text-brand" /> Assign Marketing Task
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Delegate campaign execution, creative design, or attribution tracking tasks to team members.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Task Objective / Scope</Label>
                <Input
                  required
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. Design 3D video reel and WhatsApp carousel for Akshaya Tritiya"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Assignee</Label>
                  <Input
                    placeholder="e.g. Vikram Joshi"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Platform / Channel</Label>
                  <Input
                    placeholder="e.g. Meta Ads / WhatsApp"
                    value={newTask.platform}
                    onChange={(e) => setNewTask({ ...newTask, platform: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Priority Level</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(val: any) => setNewTask({ ...newTask, priority: val })}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
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
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Deadline</Label>
                  <Input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setModal(false)} className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto">
                Assign Task
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
