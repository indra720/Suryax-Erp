import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, MessageSquare, Search, Plus, Minus, Calendar, Loader2, RefreshCw, Clock, Building } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { fetchStaffLeadsReportByTag, fetchStaffTagEndpoint, type StaffLead } from "@/lib/services/staff";

interface StaffTagReportViewProps {
  title: string;
  description: string;
  tagKey: string;
  endpoint?: string;
  badgeLabel?: string;
  badgeClass?: string;
}

export function StaffTagReportView({
  title,
  description,
  tagKey,
  endpoint,
  badgeLabel,
  badgeClass = "bg-primary/10 text-primary border-primary/20",
}: StaffTagReportViewProps) {
  const [leads, setLeads] = useState<StaffLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      let data: any;
      if (endpoint) {
        data = await fetchStaffTagEndpoint(endpoint);
      } else {
        data = await fetchStaffLeadsReportByTag(tagKey);
      }
      setLeads(data.results || data || []);
    } catch (err: any) {
      toast.error(err.message || `Failed to fetch ${title} report`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tagKey, endpoint]);

  const filtered = leads.filter((l) =>
    ((l.name || "") + (l.call || "") + (l.message || "")).toLowerCase().includes(search.toLowerCase())
  );

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>
            <Button variant="outline" size="sm" onClick={loadData} disabled={loading} className="h-8 text-xs gap-1">
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-xs">Loading {title.toLowerCase()}...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm font-medium">No leads found under this category.</p>
              <p className="text-xs mt-1">Check back later or refresh your calling queue.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead className="text-xs font-bold">Client</TableHead>
                    <TableHead className="text-xs font-bold">Status Tag</TableHead>
                    <TableHead className="text-xs font-bold">Follow-Up Date</TableHead>
                    <TableHead className="text-xs font-bold">Project</TableHead>
                    <TableHead className="text-xs font-bold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((lead) => {
                    const initials = (lead.name || "CL").slice(0, 2).toUpperCase();
                    return (
                      <React.Fragment key={lead.id}>
                        <TableRow className="text-xs hover:bg-muted/30 cursor-pointer" onClick={() => toggleRow(lead.id)}>
                          <TableCell className="p-2 text-center">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              {expandedRowId === lead.id ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7 text-[10px] font-semibold bg-primary/10 text-primary">
                                <AvatarFallback>{initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-foreground">{lead.name}</p>
                                <p className="text-[11px] text-muted-foreground">{lead.call}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`text-[10px] px-2 py-0.5 ${badgeClass}`}>
                              {badgeLabel || lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{lead.follow_up_date || "Not set"}</span>
                              {lead.follow_up_time && (
                                <span className="ml-1 text-[10px] bg-muted px-1.5 py-0.5 rounded">
                                  {lead.follow_up_time}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs font-medium text-foreground">
                              {lead.project?.name || "Vrindavan Greens"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                                asChild
                              >
                                <a href={`tel:${lead.call}`} title="Call Now">
                                  <Phone className="h-3.5 w-3.5" />
                                </a>
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                                asChild
                              >
                                <a
                                  href={`https://wa.me/+91${lead.call.replace(/\D/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="WhatsApp Connect"
                                >
                                  <MessageSquare className="h-3.5 w-3.5" />
                                </a>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {expandedRowId === lead.id && (
                          <TableRow className="bg-muted/20">
                            <TableCell colSpan={6} className="p-3">
                              <div className="bg-card p-3 rounded-lg border text-xs space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-foreground">Calling Remarks / Notes:</span>
                                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {lead.updated_date || "Updated recently"}
                                  </span>
                                </div>
                                <p className="text-muted-foreground bg-muted/30 p-2 rounded border">
                                  {lead.message || "No notes recorded for this client yet."}
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
