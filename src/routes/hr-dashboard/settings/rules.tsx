import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Users, CheckCircle, Clock, TrendingUp, X, ArrowLeft, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/settings/rules")({
  component: RulesPage,
});

interface RuleItem {
  id: number;
  title: string;
  description: string;
  points: string[];
  active: boolean;
}

const initialRules: RuleItem[] = [
  {
    id: 1,
    title: "Office Timing & Grace Period",
    description: "Daily reporting hours and biometric punch compliance.",
    points: [
      "Employees are expected to check in by 09:30 AM IST.",
      "A 15-minute grace period is allowed up to 3 times per calendar month.",
      "Check-ins post 10:00 AM automatically deduct half-day unless approved by Team Leader.",
    ],
    active: true,
  },
  {
    id: 2,
    title: "Leave Intimation & Notice Window",
    description: "Standard protocols for requesting planned time off.",
    points: [
      "Casual Leave must be submitted at least 24 hours in advance.",
      "Sick leave exceeding 2 consecutive working days requires registered medical prescription.",
      "Leaves during critical sprint releases require TL and HR joint approval.",
    ],
    active: true,
  },
  {
    id: 3,
    title: "Hardware & Security Compliance",
    description: "Protection of company code repositories and client data.",
    points: [
      "Accessing client database credentials on personal devices is strictly prohibited.",
      "Laptops and test devices must have disk encryption and remote wipe agents active.",
    ],
    active: true,
  },
];

function RulesPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState<RuleItem[]>(initialRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [points, setPoints] = useState([""]);

  const handleCreateRule = () => {
    if (!title.trim()) return;
    const newRule: RuleItem = {
      id: Date.now(),
      title,
      description: desc,
      points: points.filter(p => p.trim() !== ""),
      active: true,
    };
    setRules([...rules, newRule]);
    setTitle("");
    setDesc("");
    setPoints([""]);
    setIsDialogOpen(false);
    toast({ title: "Rule Created", description: `Policy rule "${newRule.title}" published.` });
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" /> Company Rules & Compliance
          </h1>
          <p className="text-sm text-muted-foreground">Publish employee handbook regulations, office codes, and policy acknowledgements.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Create Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create Company Policy Rule</DialogTitle>
              </DialogHeader>
              <div className="space-y-3.5 py-2">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Rule Title *</label>
                  <Input placeholder="e.g. Office Timing, Remote Work Policy" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Short Description</label>
                  <Textarea placeholder="Brief overview of this policy..." rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 block">Rule Key Points</label>
                  <div className="space-y-2 mb-2">
                    {points.map((p, i) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          placeholder={`Point #${i + 1}`}
                          value={p}
                          onChange={(e) => {
                            const newArr = [...points];
                            newArr[i] = e.target.value;
                            setPoints(newArr);
                          }}
                        />
                        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setPoints(points.filter((_, idx) => idx !== i))}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setPoints([...points, ""])}>+ Add Clause</Button>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="rule-active" defaultChecked />
                  <label htmlFor="rule-active" className="text-sm font-medium">Active Policy Rule</label>
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateRule}>Publish Rule</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Workforce", value: "25", icon: Users, color: "text-primary" },
          { label: "Acknowledged", value: "20", icon: CheckCircle, color: "text-emerald-600" },
          { label: "Pending Sign-off", value: "5", icon: Clock, color: "text-amber-600" },
          { label: "Completion Rate", value: "80%", icon: TrendingUp, color: "text-blue-600" },
        ].map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-3 sm:p-4 flex items-center gap-3">
              <stat.icon className={`h-7 w-7 ${stat.color} shrink-0`} />
              <div>
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rules list */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="shadow-sm border">
            <CardHeader className="py-4 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">{rule.title}</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
              </div>
              <Badge variant={rule.active ? "default" : "secondary"}>
                {rule.active ? "Active" : "Archived"}
              </Badge>
            </CardHeader>
            <CardContent className="pt-4 pb-4">
              <ul className="space-y-2">
                {rule.points.map((pt, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Acknowledgements Status */}
      <Card className="shadow-sm">
        <CardHeader className="py-3 border-b">
          <CardTitle className="text-base font-semibold">Employee Acknowledgement Tracking</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="text-sm font-semibold">20 out of 25 employees have digitally signed the handbook</div>
          <div className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg border">
            Pending signatures: <span className="font-semibold text-foreground">Akshay, Himanshu Raut, Indrajeet, Kamal, Lokendra (+ 0 other)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
