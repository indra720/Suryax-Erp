import React, { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  Building2,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Users,
} from "lucide-react";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero-builidng2.png";
import { API_BASE_URL } from "@/lib/services/api";
import {
  saveAuthSession,
  getRoleRedirect,
  type UserRole,
} from "@/lib/services/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In | Vrindavan Real Estate ERP" },
      {
        name: "description",
        content: "Sign in to your Vrindavan Real Estate ERP & Sales CRM portal.",
      },
      { property: "og:title", content: "Sign In | Vrindavan Real Estate ERP" },
    ],
  }),
  component: LoginPage,
});

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" className="size-5" {...props}>
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A8 8 0 0 1 24 36c-5.223 0-9.64-3.657-11.303-8.62H6.306C9.656 35.663 16.318 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.244 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="h-3.5 w-3.5 bg-brand rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-3.5 w-3.5 bg-brand rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-3.5 w-3.5 bg-brand rounded-full animate-bounce" />
      </div>
      <p className="mt-3 text-sm font-semibold text-brand tracking-wide">
        Authenticating...
      </p>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    rememberMe: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.username.trim() || !loginData.password.trim()) {
      toast.error("Please enter your email/username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/apilogin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const responseText = await response.text();
      const contentType = response.headers.get("content-type") || "";
      let data: { status?: boolean; message?: string; data?: any };

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Login endpoint returned ${response.status} ${response.statusText}. Check backend server.`
        );
      }

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Login endpoint returned an invalid JSON response.");
      }

      if (!response.ok) {
        throw new Error(data.message || `Login failed with status ${response.status}.`);
      }

      if (data.status && data.data) {
        const token = data.data.token_detail;
        const userEmail = data.data.email || loginData.username;
        const userId = data.data.id;
        const userName = data.data.name || loginData.username.split("@")[0];

        // Determine user role from API response boolean flags
        let userRole: UserRole = "superadmin";
        if (data.data.is_admin) {
          userRole = "admin";
        } else if (data.data.is_team_leader) {
          userRole = "team-leader";
        } else if (data.data.is_hr) {
          userRole = "hr";
        } else if (data.data.is_staff_new) {
          userRole = "staff";
        } else if (data.data.is_freelancer) {
          userRole = "freelancer";
        }

        saveAuthSession({
          token,
          role: userRole,
          email: userEmail,
          id: userId,
          name: userName,
        });

        toast.success(`Login Successful! Welcome, ${userName}`);

        const redirectPath = getRoleRedirect(userRole);
        navigate({ to: redirectPath });
      } else {
        toast.error(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      console.error("Login API error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not connect to the backend server at " + API_BASE_URL
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your email address.");
      return;
    }
    toast.success("If an account with that email exists, a password reset link has been sent.");
    setForgotOpen(false);
    setForgotEmail("");
  };

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row bg-background overflow-x-hidden">
      {isLoading && <LoadingOverlay />}

      {/* Left Column: Full-height Form Panel */}
      <div className="w-full lg:w-[48%] xl:w-[42%] min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-card border-r border-border">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-gradient-to-r from-[#331fa3] to-[#6732F2] p-2 shadow-[0_2px_10px_rgba(103,50,242,0.3)]">
            <img src={logo} alt="Vrindavan Logo" className="size-full object-contain" />
          </span>
          <div>
            <h2 className="text-[18px] leading-none font-extrabold tracking-wide text-foreground">
              VRINDAVAN
            </h2>
            <p className="mt-1 text-[10px] font-bold tracking-[0.14em] text-text-secondary uppercase">
              Real Estate ERP
            </p>
          </div>
        </div>

        {/* Central Form Box */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-8">
            <h1 className="text-[28px] sm:text-[32px] font-bold text-foreground tracking-tight">
              Welcome back!
            </h1>
            <p className="text-[14px] text-text-secondary mt-1.5">
              Enter your login credentials to access your portal.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-[13px] font-medium text-foreground"
              >
                Email / Username
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="you@vrindavan.com"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                  className="h-11 rounded-[10px] bg-background border border-border text-foreground text-[13.5px] pl-10 pr-4 focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="password"
                  className="text-[13px] font-medium text-foreground"
                >
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-[12.5px] font-semibold text-brand hover:text-brand-bright transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="h-11 rounded-[10px] bg-background border border-border text-foreground text-[13.5px] pl-10 pr-10 focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={loginData.rememberMe}
                onCheckedChange={(checked) =>
                  setLoginData((prev) => ({ ...prev, rememberMe: !!checked }))
                }
                className="size-4 rounded-[5px] border-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
              />
              <Label
                htmlFor="rememberMe"
                className="font-normal text-[13px] text-text-secondary cursor-pointer select-none"
              >
                Remember for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 rounded-[10px] bg-brand hover:bg-brand-bright text-white font-semibold text-[14px] shadow-[0_2px_10px_rgba(79,32,216,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>

          {/* Social / Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold">
              <span className="bg-card px-2.5 text-text-muted">
                Or continue with
              </span>
            </div>
          </div>

          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.info("Google Authentication is active in Production.")}
              className="w-full h-11 rounded-[10px] border border-border bg-card hover:bg-muted text-foreground text-[13px] font-medium flex items-center justify-center gap-2.5"
            >
              <GoogleIcon />
              <span>Sign in with Google</span>
            </Button>
          </div>

          {/* Quick Demo Role Logins */}
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-[11px] font-semibold text-text-muted mb-2 text-center uppercase tracking-wider">
              Quick One-Click Test Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-teamleader-token",
                    role: "team-leader",
                    email: "teamleader@vrindavan.com",
                    id: 3,
                    name: "Team Leader",
                  });
                  toast.success("Logged in as Team Leader!");
                  navigate({ to: "/team-leader" });
                }}
                className="h-9 text-xs font-semibold border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 cursor-pointer"
              >
                Team Leader Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-admin-token",
                    role: "admin",
                    email: "admin@vrindavan.com",
                    id: 2,
                    name: "Branch Administrator",
                  });
                  toast.success("Logged in as Branch Admin!");
                  navigate({ to: "/admin/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-purple-800 cursor-pointer"
              >
                Admin Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-superadmin-token",
                    role: "superadmin",
                    email: "superadmin@vrindavan.com",
                    id: 1,
                    name: "Super Administrator",
                  });
                  toast.success("Logged in as Superadmin!");
                  navigate({ to: "/" });
                }}
                className="h-9 text-xs font-semibold border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-800 cursor-pointer"
              >
                Superadmin Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-staff-token",
                    role: "staff",
                    email: "staff@vrindavan.com",
                    id: 4,
                    name: "Staff Member",
                  });
                  toast.success("Logged in as Staff!");
                  navigate({ to: "/staff/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-800 cursor-pointer"
              >
                Staff Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-hr-token",
                    role: "hr",
                    email: "hr@vrindavan.com",
                    id: 5,
                    name: "HR Manager",
                  });
                  toast.success("Logged in as HR Manager!");
                  navigate({ to: "/hr-dashboard" });
                }}
                className="h-9 text-xs font-semibold border-teal-200 bg-teal-50/70 hover:bg-teal-100 text-teal-800 cursor-pointer"
              >
                HR Portal Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-marketing-token",
                    role: "marketing",
                    email: "marketing@vrindavan.com",
                    id: 6,
                    name: "Marketing Lead",
                  });
                  toast.success("Logged in as Marketing Head!");
                  navigate({ to: "/marketing/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-pink-200 bg-pink-50/70 hover:bg-pink-100 text-pink-800 cursor-pointer"
              >
                Marketing Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-accountant-token",
                    role: "accountant",
                    email: "accounts@vrindavan.com",
                    id: 7,
                    name: "Chief Accountant",
                  });
                  toast.success("Logged in as Chief Accountant!");
                  navigate({ to: "/accountant/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-800 cursor-pointer"
              >
                Accountant Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-sales-manager-token",
                    role: "sales-manager",
                    email: "salesmgr@vrindavan.com",
                    id: 8,
                    name: "Sales Director",
                  });
                  toast.success("Logged in as Sales Manager!");
                  navigate({ to: "/sales-manager/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-orange-200 bg-orange-50/70 hover:bg-orange-100 text-orange-800 cursor-pointer"
              >
                Sales Manager Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-broker-token",
                    role: "broker",
                    email: "broker@vrindavan.com",
                    id: 9,
                    name: "Apex Realtors (Broker)",
                  });
                  toast.success("Logged in as Channel Partner / Broker!");
                  navigate({ to: "/broker/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-cyan-200 bg-cyan-50/70 hover:bg-cyan-100 text-cyan-800 cursor-pointer"
              >
                Broker Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-engineer-token",
                    role: "site-engineer",
                    email: "engineer@vrindavan.com",
                    id: 10,
                    name: "Site Chief Engineer",
                  });
                  toast.success("Logged in as Site Engineer!");
                  navigate({ to: "/site-engineer/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-yellow-200 bg-yellow-50/70 hover:bg-yellow-100 text-yellow-800 cursor-pointer"
              >
                Site Engineer Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-legal-token",
                    role: "legal",
                    email: "legal@vrindavan.com",
                    id: 11,
                    name: "Legal Counsel",
                  });
                  toast.success("Logged in as Legal & Documentation!");
                  navigate({ to: "/legal/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
              >
                Legal Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-customer-token",
                    role: "customer",
                    email: "client@vrindavan.com",
                    id: 12,
                    name: "Valued Buyer",
                  });
                  toast.success("Logged in as Client / Customer!");
                  navigate({ to: "/customer/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-800 cursor-pointer"
              >
                Customer Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  saveAuthSession({
                    token: "demo-inventory-token",
                    role: "inventory",
                    email: "inventory@vrindavan.com",
                    id: 13,
                    name: "Inventory Custodian",
                  });
                  toast.success("Logged in as Inventory Manager!");
                  navigate({ to: "/inventory/dashboard" });
                }}
                className="h-9 text-xs font-semibold border-lime-200 bg-lime-50/70 hover:bg-lime-100 text-lime-800 cursor-pointer col-span-2"
              >
                Inventory Manager Login
              </Button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-[11.5px] text-text-muted">
          <span>© 2026 Vrindavan Real Estate ERP</span>
          <span className="flex items-center gap-1.5 text-success font-medium">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            Server: 127.0.0.1:8000
          </span>
        </div>
      </div>

      {/* Right Column: Full-Height Immersive Real Estate Showcase */}
      <div className="hidden lg:flex flex-1 min-h-screen relative flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-brand-soft via-secondary to-background overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
          <img
            src={heroImg}
            alt="Vrindavan Real Estate"
            className="w-full h-full object-cover object-center filter saturate-150"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

        {/* Top Feature Tag */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/90 backdrop-blur-md px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm border border-border">
            <Building2 className="size-4" />
            Enterprise Real Estate Suite &amp; Sales CRM
          </span>
        </div>

        {/* Center Highlight Cards */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div>
            <h2 className="text-[32px] xl:text-[40px] font-extrabold text-foreground tracking-tight leading-tight">
              One platform for properties, telecallers &amp; performance.
            </h2>
            <p className="text-[15px] text-text-secondary mt-3 leading-relaxed">
              Real-time synchronization with your Django backend. Direct telecalling queues, team leader allocations, and inventory management.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card/85 backdrop-blur-md border border-border shadow-sm">
              <div className="flex items-center gap-2 text-brand font-semibold text-[13px] mb-1">
                <TrendingUp className="size-4" />
                <span>Active Telecalling</span>
              </div>
              <p className="text-[12px] text-text-secondary">
                Today &amp; Tomorrow follow-up calling queues with instant status tagging.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-card/85 backdrop-blur-md border border-border shadow-sm">
              <div className="flex items-center gap-2 text-success font-semibold text-[13px] mb-1">
                <ShieldCheck className="size-4" />
                <span>Django Token Auth</span>
              </div>
              <p className="text-[12px] text-text-secondary">
                Multi-role access for Superadmin, Admin, Team Leader, Staff &amp; HR.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Pill */}
        <div className="relative z-10 flex items-center justify-between p-4 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-sm max-w-md">
          <div className="flex items-center gap-3">
            <span className="grid size-9 rounded-lg bg-brand-soft text-brand place-items-center">
              <Users className="size-5" />
            </span>
            <div>
              <p className="text-[12.5px] font-bold text-foreground">Multi-Role Architecture</p>
              <p className="text-[11px] text-text-secondary">Auto-redirects to your role dashboard</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-md">
            v2.0 Active
          </span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="w-[94vw] sm:max-w-lg md:max-w-xl p-6 sm:p-8 rounded-2xl shadow-2xl bg-card text-foreground border-border">
          <DialogHeader className="pb-2 border-b border-border">
            <DialogTitle className="text-xl font-bold">Forgot Password</DialogTitle>
            <DialogDescription className="text-text-secondary text-sm mt-1">
              Enter your registered corporate or customer email address to receive an instant secure reset link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="forgot-email" className="text-xs sm:text-sm font-semibold mb-1.5 block">
                Email Address
              </Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="you@vrindavanerp.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="h-11 rounded-xl bg-background border-border text-foreground text-sm"
              />
            </div>
            <DialogFooter className="pt-3 border-t border-border gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-xl h-10 px-5 text-sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="rounded-xl h-10 px-6 bg-brand hover:bg-brand/90 text-white text-sm font-semibold shadow-md">
                Send Reset Link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
