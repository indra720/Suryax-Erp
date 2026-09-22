import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Users, HardHat, Shield, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/admin/project/team")({
  head: () => ({
    meta: [{ title: "Admin - Project Site Team | Vrindavan ERP" }],
  }),
  component: AdminProjectTeamPage,
});

export function AdminProjectTeamPage() {
  const team = [
    { id: 1, name: "Pramod Sharma", role: "Chief Project Engineer", phone: "9876541100", email: "pramod.civil@vrindavan.com", site: "Vrindavan Greens Phase-2", status: "Active" },
    { id: 2, name: "Alok Mathur", role: "Electrical & Substation Incharge", phone: "9876541101", email: "alok.elec@vrindavan.com", site: "All Sectors", status: "Active" },
    { id: 3, name: "Sunil Verma", role: "Road & Paving Contractor", phone: "9876541102", email: "sunil.contractor@vrindavan.com", site: "Radha Enclave Commercial Hub", status: "Active" },
    { id: 4, name: "Mahesh Yadav", role: "Site Security & Stores Manager", phone: "9876541103", email: "mahesh.stores@vrindavan.com", site: "Gate 1 Central Depot", status: "Active" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <HardHat className="size-6 text-brand" />
          On-Ground Construction &amp; Engineering Team
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Site engineers, surveyors, contractors, and project managers deployed across township sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((m) => (
          <Card key={m.id} className="border rounded-xl bg-white shadow-xs p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{m.name}</h3>
                <p className="text-xs font-semibold text-brand mt-0.5">{m.role}</p>
                <p className="text-xs text-gray-500 mt-2">📍 Deployed at: {m.site}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                {m.status}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t flex items-center gap-4 text-xs text-gray-600 font-mono">
              <span className="flex items-center gap-1">
                <Phone className="size-3 text-emerald-600" /> {m.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="size-3 text-blue-600" /> {m.email}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
