import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Search,
  Download,
  Calendar,
  Filter,
} from "lucide-react";
import { initialLedgerEntries, type LedgerEntry } from "@/lib/services/accountant";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/ledger")({
  head: () => ({
    meta: [
      { title: "General Ledger & Day Book | Vrindavan Accounts" },
      { name: "description", content: "Double-entry general ledger, debit-credit day book and account statements." },
    ],
  }),
  component: LedgerPage,
});

export function LedgerPage() {
  const [entries] = useState<LedgerEntry[]>(initialLedgerEntries);
  const [search, setSearch] = useState("");

  const filtered = entries.filter(
    (e) =>
      e.accountHead.toLowerCase().includes(search.toLowerCase()) ||
      e.particulars.toLowerCase().includes(search.toLowerCase()) ||
      e.voucherNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <BookOpen className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              General Ledger & Cash Book
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Double-entry journal transactions, debit/credit audit trail and real estate customer account heads.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exporting General Ledger (CSV)...")}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs border-border justify-center"
          >
            <Download className="size-3.5" /> Export Ledger (CSV)
          </Button>
        </div>
      </div>

      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-semibold text-foreground">Journal Entries Register</h2>
            <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search account head or particulars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8.5 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Date</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Voucher</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Account Head</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Particulars & Description</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Debit (Dr)</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Credit (Cr)</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Running Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3.5 text-text-muted whitespace-nowrap">{l.date}</td>
                  <td className="py-3 px-3.5 font-mono font-bold text-brand whitespace-nowrap">{l.voucherNo}</td>
                  <td className="py-3 px-3.5 font-semibold text-foreground whitespace-nowrap">{l.accountHead}</td>
                  <td className="py-3 px-3.5 text-text-secondary whitespace-nowrap">{l.particulars}</td>
                  <td className="py-3 px-3.5 font-bold text-rose-600 whitespace-nowrap">
                    {l.debit > 0 ? `₹${l.debit.toLocaleString()}` : "-"}
                  </td>
                  <td className="py-3 px-3.5 font-bold text-emerald-600 whitespace-nowrap">
                    {l.credit > 0 ? `₹${l.credit.toLocaleString()}` : "-"}
                  </td>
                  <td className="py-3 px-3.5 font-bold text-foreground whitespace-nowrap">
                    ₹{l.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
