import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IndianRupee,
  CreditCard,
  Building,
  CheckCircle,
  ShieldCheck,
  QrCode,
  Copy,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/pay-online")({
  head: () => ({
    meta: [
      { title: "Pay Installment Online | Vrindavan Customer" },
      { name: "description", content: "Secure instant payment gateway for property installments and virtual escrow." },
    ],
  }),
  component: CustomerPayOnlinePage,
});

export function CustomerPayOnlinePage() {
  const [amount, setAmount] = useState(1900000);
  const [payMethod, setPayMethod] = useState<"upi" | "netbanking" | "neft">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success("Payment of ₹" + amount.toLocaleString("en-IN") + " processed successfully! Receipt generated.");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <IndianRupee className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Pay Installment Online
          </h1>
          <p className="text-xs text-text-secondary">
            RERA Designated Project Escrow Account with instant reconciliation receipt.
          </p>
        </div>
      </div>

      {isSuccess ? (
        <Card className="p-8 bg-card border border-emerald-500/30 text-center space-y-4">
          <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="size-10" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Payment Received Successfully!</h2>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            Amount of <strong>₹{amount.toLocaleString("en-IN")}</strong> has been credited to Vrindavan Real Estate RERA Escrow Account.
          </p>
          <div className="pt-2">
            <Button
              size="sm"
              onClick={() => setIsSuccess(false)}
              className="bg-brand text-white text-xs"
            >
              Make Another Payment
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 bg-card border border-border">
          <form onSubmit={handlePay} className="space-y-5">
            <div>
              <Label className="text-xs">Installment Amount to Pay (INR)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-1 h-10 text-base font-bold text-brand"
                required
              />
              <span className="text-[11px] text-text-muted mt-1 block">
                Current Due: 5th Installment (Brickwork & External Plaster)
              </span>
            </div>

            <div>
              <Label className="text-xs">Select Payment Method</Label>
              <div className="grid grid-cols-3 gap-3 mt-1.5">
                {[
                  { id: "upi", label: "UPI / QR Code", icon: QrCode },
                  { id: "netbanking", label: "NetBanking", icon: CreditCard },
                  { id: "neft", label: "Virtual Escrow RTGS", icon: Building },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      payMethod === m.id
                        ? "border-brand bg-brand/10 text-brand font-bold"
                        : "border-border bg-muted/20 text-text-secondary hover:bg-muted/40"
                    }`}
                  >
                    <m.icon className="size-5 mx-auto mb-1 text-inherit" />
                    <span className="text-xs block">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {payMethod === "upi" && (
              <div className="p-4 rounded-xl bg-muted/40 border border-border text-center space-y-2">
                <p className="text-xs font-semibold text-foreground">Scan UPI QR or Pay to VPA</p>
                <div className="p-3 bg-white w-32 h-32 mx-auto rounded-lg shadow-sm flex items-center justify-center">
                  <QrCode className="size-24 text-black" />
                </div>
                <p className="font-mono text-xs text-brand font-bold">vrindavan.escrow@hdfcbank</p>
              </div>
            )}

            {payMethod === "neft" && (
              <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs text-text-secondary space-y-1.5">
                <p className="font-bold text-foreground">Dedicated Project Virtual Account Details:</p>
                <p>Beneficiary: <strong>Vrindavan Real Estate Pvt Ltd - Escrow A/c</strong></p>
                <p>Bank: <strong>HDFC Bank Ltd, Hazratganj Branch</strong></p>
                <p className="font-mono">Account No: <strong>VRN1402HDFC2026</strong></p>
                <p className="font-mono">IFSC Code: <strong>HDFC0000128</strong></p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
            >
              {isProcessing ? "Processing Escrow Payment..." : `Pay ₹${amount.toLocaleString("en-IN")} Securely`}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
