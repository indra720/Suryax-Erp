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
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <BookOpen className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              General Ledger & Cash Book
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Double-entry journal transactions, debit/credit audit trail and real estate customer account heads.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Exporting General Ledger (CSV)...")}
          className="h-9 gap-1.5 text-xs"
        >
          <Download className="size-3.5" /> Export Ledger (CSV)
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Journal Entries Register</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search account head or particulars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Date</th>
                <th className="py-2.5 px-3 font-semibold">Voucher</th>
                <th className="py-2.5 px-3 font-semibold">Account Head</th>
                <th className="py-2.5 px-3 font-semibold">Particulars & Description</th>
                <th className="py-2.5 px-3 font-semibold">Debit (Dr)</th>
                <th className="py-2.5 px-3 font-semibold">Credit (Cr)</th>
                <th className="py-2.5 px-3 font-semibold">Running Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 text-text-muted whitespace-nowrap">{l.date}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-brand">{l.voucherNo}</td>
                  <td className="py-2.5 px-3 font-semibold text-foreground">{l.accountHead}</td>
                  <td className="py-2.5 px-3 text-text-secondary">{l.particulars}</td>
                  <td className="py-2.5 px-3 font-bold text-rose-600">
                    {l.debit > 0 ? `₹${l.debit.toLocaleString()}` : "-"}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600">
                    {l.credit > 0 ? `₹${l.credit.toLocaleString()}` : "-"}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-foreground">
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
