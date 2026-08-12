import { useState } from "react";
import { toast } from "sonner";
import { Card, CardHead, PageHeader } from "@/components/erp/ui";
import { CrudPage } from "@/components/erp/CrudPage";
import { usersConfig } from "@/lib/erp/configs";

const roles = [
  "Super Admin",
  "Admin",
  "Sales Manager",
  "Sales Executive",
  "Property Manager",
  "Accountant",
  "HR",
  "Agent",
];
const modules = [
  "Dashboard","Leads","Clients","Projects","Properties","Bookings","Inventory","Payments","Invoices",
  "Expenses","Reports","Team","Tasks","Calendar","Documents","Campaigns","Enquiries","Settings",
];
const perms = ["View", "Create", "Edit", "Delete", "Export"];

export function UsersRolesPage() {
  const [role, setRole] = useState(roles[0]!);
  const [matrix, setMatrix] = useState<Record<string, boolean>>({});

  const key = (m: string, p: string) => `${role}|${m}|${p}`;
  const checked = (m: string, p: string) =>
    matrix[key(m, p)] ?? (role === "Super Admin" || p === "View");

  return (
    <>
      <CrudPage config={usersConfig} />

      <Card className="mt-4">
        <CardHead
          title="Permission Matrix"
          action={
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-9 rounded-[10px] border border-border bg-card px-2 text-[12.5px] font-medium outline-none focus:border-brand"
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="bg-muted/70">
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-text-secondary">Module</th>
                {perms.map((p) => (
                  <th key={p} className="px-4 py-3 text-center text-[12px] font-semibold text-text-secondary">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m} className="border-b border-[#ECEEF4] last:border-0 dark:border-border">
                  <td className="px-4 py-2.5 text-[13.5px] font-medium">{m}</td>
                  {perms.map((p) => (
                    <td key={p} className="px-4 py-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={checked(m, p)}
                        onChange={(e) => setMatrix((s) => ({ ...s, [key(m, p)]: e.target.checked }))}
                        className="size-4 accent-[#4F20D8]"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end border-t border-border p-4">
          <button
            onClick={() => toast.success(`Permissions saved for ${role}`)}
            className="h-10 rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-white"
          >
            Save Permissions
          </button>
        </div>
      </Card>
    </>
  );
}
