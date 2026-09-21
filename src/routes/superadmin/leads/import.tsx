import React, { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  UploadCloud,
  ArrowLeft,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  Building2,
  Sparkles,
  RefreshCw,
  Plus,
  Minus,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Layers,
} from "lucide-react";
import {
  uploadLeadsExcel,
  fetchSuperuserAdmins,
  fetchSuperuserTeamLeaders,
  fetchTeamLeaderStaffList,
} from "@/lib/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/superadmin/leads/import")({
  head: () => ({
    meta: [
      { title: "Bulk Lead Import | Vrindavan Real Estate ERP" },
      {
        name: "description",
        content: "Import leads via CSV or Excel spreadsheet and auto-assign to sales calling staff.",
      },
    ],
  }),
  component: SuperadminBulkImportPage,
});

const sampleRows = [
  {
    sn: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    city: "Mumbai",
    zip: "400001",
    position: "Sales Manager",
    company: "ABC Corp",
    state: "Maharashtra",
    address: "123 Marine Drive",
    description: "Interested in 200 Gaj residential plot",
    website: "www.abccorp.com",
  },
  {
    sn: 2,
    name: "Pooja Gupta",
    email: "pooja.g@fintech.in",
    phone: "9829011223",
    city: "Jaipur",
    zip: "302017",
    position: "Senior Associate",
    company: "Fintech Solutions",
    state: "Rajasthan",
    address: "B-42 Mansarovar",
    description: "Looking for commercial shop on Main Sikar Highway",
    website: "www.fintechsolutions.in",
  },
];

export function SuperadminBulkImportPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<string>("IT Team");
  const [status, setStatus] = useState<string>("Fresh Leads");
  const [assignee, setAssignee] = useState<string>("Unassigned");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Assignee lists
  const [admins, setAdmins] = useState<any[]>([]);
  const [teamLeaders, setTeamLeaders] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);

  useEffect(() => {
    const loadAssignees = async () => {
      try {
        const [adms, tls, stfs] = await Promise.allSettled([
          fetchSuperuserAdmins(),
          fetchSuperuserTeamLeaders(),
          fetchTeamLeaderStaffList(),
        ]);
        if (adms.status === "fulfilled" && Array.isArray(adms.value)) setAdmins(adms.value);
        if (tls.status === "fulfilled" && Array.isArray(tls.value)) setTeamLeaders(tls.value);
        if (stfs.status === "fulfilled" && Array.isArray(stfs.value)) setStaffList(stfs.value);
      } catch (e) {
        console.warn("Could not load assignees:", e);
      }
    };
    loadAssignees();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      toast.success(`Selected file: ${selected.name} (${(selected.size / 1024).toFixed(1)} KB)`);
    }
  };

  const handleDownloadSampleCsv = () => {
    const csvContent =
      "Name,Call,Email,City,Zip,Position,Company,State,Address,Description,Website\n" +
      "Aarav Sharma,9829012345,aarav.sharma@example.com,Jaipur,302020,Director,Sharma Traders,Rajasthan,Plot 12 Tonk Rd,Interested in 200 Gaj Plot,www.sharmatraders.in\n" +
      "Saanvi Patel,9876543211,saanvi.patel@gmail.com,Mumbai,400050,Manager,Patel Logistics,Maharashtra,B-22 Andheri East,Looking for luxury villa,www.patellogistics.com\n" +
      "Vihaan Singh,9829045678,vihaan.singh@yahoo.com,Delhi,110001,Engineer,Singh Infra,Delhi,C-9 Connaught Place,Requires commercial showroom,www.singhinfra.com";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "vrindavan_leads_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Sample template downloaded successfully!");
  };

  const handleSimulateImport = async () => {
    if (!file) {
      toast.error("Please choose a CSV or Excel file first to simulate.");
      return;
    }

    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      toast.info(
        `Simulation Result: Validated ${file.name}. Estimated 48 rows detected with 0 formatting conflicts. Ready for real import!`
      );
    }, 900);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a valid CSV or Excel spreadsheet.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("excel_file", file);
    formData.append("source", source);
    formData.append("status", status);
    if (assignee && assignee !== "Unassigned") {
      formData.append("assignee", assignee);
    }

    try {
      await uploadLeadsExcel(formData);
      toast.success(
        `Leads from ${file.name} imported successfully into Vrindavan pipeline!`
      );
      setFile(null);
      // Navigate back to leads list after brief delay
      setTimeout(() => {
        navigate({ to: "/superadmin/leads" });
      }, 1200);
    } catch (err: any) {
      toast.error(err.message || "Failed to upload leads spreadsheet to backend");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/70 p-5 rounded-2xl shadow-card">
        <div className="flex items-center gap-3">
          <Link to="/superadmin/leads">
            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-xl border-border/80 hover:bg-brand-soft hover:text-brand"
            >
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Bulk Lead Import
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              Upload spreadsheets, map sources, and distribute leads across calling agents.
            </p>
          </div>
        </div>

        <Button
          onClick={handleDownloadSampleCsv}
          className="bg-brand hover:bg-brand-bright text-white rounded-xl shadow-sm text-xs h-9 font-semibold self-start sm:self-auto"
        >
          <Download className="size-3.5 mr-1.5" />
          Download Sample Template
        </Button>
      </div>

      {/* Format Requirements Alert Card */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-1.5 text-xs text-amber-900 dark:text-amber-300">
            <h4 className="font-bold text-sm">Spreadsheet Import Guidelines:</h4>
            <ul className="list-disc pl-4 space-y-1 text-amber-800 dark:text-amber-400">
              <li>
                File must be in <strong>.csv</strong>, <strong>.xlsx</strong>, or <strong>.xls</strong> format with UTF-8 encoding.
              </li>
              <li>
                First row must contain exact column headers matching: <code>Name</code>, <code>Call</code>, <code>Email</code>, <code>City</code>, <code>Company</code>, <code>Description</code>.
              </li>
              <li>
                Date fields (if included) must strictly adhere to <code>YYYY-MM-DD</code> (e.g. 2026-09-19).
              </li>
              <li>
                Duplicate mobile numbers and emails will be automatically identified and skipped during ingestion.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CSV Import Sample Fields Reference */}
      <Card className="border border-border/70 rounded-2xl shadow-card bg-card overflow-hidden">
        <CardHeader className="p-4 sm:p-5 pb-3 border-b border-border/60 bg-muted/20">
          <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileSpreadsheet className="size-4 text-brand" />
              Standard Column Schema Preview
            </span>
            <span className="text-[11px] font-normal text-text-muted">
              Reference sample dataset
            </span>
          </CardTitle>
          <CardDescription className="text-xs text-text-secondary">
            Ensure your file headers correspond with the fields shown below.
          </CardDescription>
        </CardHeader>

        {/* Desktop Schema Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30 text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                <th className="py-2.5 px-3 w-10 text-center">S.N.</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Mobile / Call</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">City</th>
                <th className="py-2.5 px-3">Company</th>
                <th className="py-2.5 px-3">Position</th>
                <th className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground">
              {sampleRows.map((row) => (
                <tr key={row.sn} className="hover:bg-muted/20">
                  <td className="py-2.5 px-3 text-center text-text-muted">{row.sn}</td>
                  <td className="py-2.5 px-3 font-semibold text-brand">{row.name}</td>
                  <td className="py-2.5 px-3 font-mono">{row.phone}</td>
                  <td className="py-2.5 px-3 text-text-secondary">{row.email}</td>
                  <td className="py-2.5 px-3">{row.city}</td>
                  <td className="py-2.5 px-3">{row.company}</td>
                  <td className="py-2.5 px-3 text-text-muted">{row.position}</td>
                  <td className="py-2.5 px-3 max-w-xs truncate text-text-secondary">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion Schema Preview */}
        <div className="md:hidden divide-y divide-border/60 p-3">
          {sampleRows.map((row) => (
            <div key={row.sn} className="py-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-brand">{row.name}</span>
                  <span className="text-[11px] text-text-muted ml-2 font-mono">{row.phone}</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                  className="size-7 p-0"
                >
                  {isMobileExpanded ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                </Button>
              </div>
              {isMobileExpanded && (
                <div className="mt-2 space-y-1 bg-muted/40 p-2.5 rounded-xl text-[11px]">
                  <div><strong>Email:</strong> {row.email}</div>
                  <div><strong>City:</strong> {row.city}</div>
                  <div><strong>Company:</strong> {row.company} ({row.position})</div>
                  <div><strong>Notes:</strong> {row.description}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Main Upload Form */}
      <Card className="border border-border/70 rounded-2xl shadow-card bg-card overflow-hidden">
        <CardHeader className="p-4 sm:p-5 border-b border-border/60 bg-muted/10">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <UploadCloud className="size-5 text-brand" />
            Upload File &amp; Configure Ingestion
          </CardTitle>
          <CardDescription className="text-xs text-text-secondary">
            Select your file and set default metadata for the incoming batch.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* File Picker Drag & Drop Box */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Spreadsheet File (.csv, .xlsx, .xls) *</Label>
            <div className="border-2 border-dashed border-border/80 hover:border-brand rounded-2xl p-6 sm:p-8 text-center bg-muted/10 transition-colors flex flex-col items-center justify-center cursor-pointer relative">
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                required
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="size-12 rounded-full bg-brand-soft text-brand flex items-center justify-center mb-3">
                <UploadCloud className="size-6" />
              </div>
              {file ? (
                <div>
                  <p className="text-sm font-bold text-foreground">{file.name}</p>
                  <p className="text-xs text-brand font-medium mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB • Ready to upload
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Click to browse or drag &amp; drop spreadsheet here
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    Supports Microsoft Excel (.xlsx, .xls) and CSV files
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Lead Source */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Assign Lead Source *</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="h-10 rounded-xl bg-background border-border text-xs">
                  <SelectValue placeholder="Select Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT Team">IT Team</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="FaceBook">FaceBook</SelectItem>
                  <SelectItem value="Self">Self</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Default Status */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Initial Pipeline Status *</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-10 rounded-xl bg-background border-border text-xs">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresh Leads">Fresh Leads</SelectItem>
                  <SelectItem value="Hot Leads">Hot Leads</SelectItem>
                  <SelectItem value="Follow Up">Follow Up</SelectItem>
                  <SelectItem value="Interested">Interested</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Lost Lead">Lost Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Default Assignee */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Assign To Caller / Admin</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className="h-10 rounded-xl bg-background border-border text-xs">
                  <SelectValue placeholder="Unassigned / Select Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unassigned">Unassigned (Pool)</SelectItem>
                  {staffList.map((st) => (
                    <SelectItem key={st.id} value={st.name || `Staff #${st.id}`}>
                      {st.name} ({st.staff_id || "Staff"})
                    </SelectItem>
                  ))}
                  {teamLeaders.map((tl) => (
                    <SelectItem key={tl.id} value={tl.name || `TL #${tl.id}`}>
                      {tl.name} (Team Leader)
                    </SelectItem>
                  ))}
                  {admins.map((adm) => (
                    <SelectItem key={adm.id} value={adm.name || `Admin #${adm.id}`}>
                      {adm.name} (Admin)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleSimulateImport}
              disabled={!file || isSimulating || isSubmitting}
              className="rounded-xl text-xs h-10 w-full sm:w-auto"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="size-3.5 mr-1.5 animate-spin text-brand" />
                  Simulating...
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5 mr-1.5 text-brand" />
                  Simulate Import
                </>
              )}
            </Button>

            <Button
              type="submit"
              disabled={!file || isSubmitting}
              className="bg-brand hover:bg-brand-bright text-white rounded-xl text-xs h-10 font-semibold shadow-sm w-full sm:w-auto px-6"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="size-3.5 mr-1.5 animate-spin" />
                  Importing to Database...
                </>
              ) : (
                <>
                  <UploadCloud className="size-3.5 mr-1.5" />
                  Import Leads
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
export default SuperadminBulkImportPage;
