import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

export const projectImages = [p1, p2, p3];

export const cities = [
  "Jaipur",
  "Delhi",
  "Delhi NCR",
  "Gurgaon",
  "Noida",
  "Mumbai",
  "Pune",
  "Bangalore",
  "Ahmedabad",
];

export const projectNames = [
  "Suryax Greens",
  "Royal Residency",
  "Sunrise Villas",
  "Suryax Heights",
  "Urban Crown",
  "Green Valley",
];

export const agents = [
  "Rohit Singh",
  "Anjali Sharma",
  "Neha Gupta",
  "Amit Verma",
  "Karan Malhotra",
  "Pooja Iyer",
];

export const people = [
  "Rahul Sharma",
  "Priya Mehta",
  "Amit Verma",
  "Neha Gupta",
  "Rohit Singh",
  "Anjali Sharma",
  "Vikram Chauhan",
  "Sneha Kapoor",
  "Arjun Nair",
  "Divya Rathore",
  "Manish Agarwal",
  "Kavita Joshi",
];

const pick = <T,>(arr: T[], i: number): T => arr[i % arr.length] as T;
const fn = (n: string) => n.split(" ")[0]!.toLowerCase();
const ln = (n: string) => (n.split(" ")[1] ?? n.split(" ")[0]!).toLowerCase();

export const leads = people.map((name, i) => ({
  id: `LD${1001 + i}`,
  name,
  phone: `+91 98${String(100000 + i * 7321).slice(0, 8)}`,
  email: `${fn(name)}@gmail.com`,
  interest: pick(["Residential", "Commercial", "Plot", "Villa"], i),
  city: pick(cities, i),
  project: pick(projectNames, i),
  source: pick(["Website", "Referral", "Social Media", "Walk-in", "Others"], i),
  budget: pick(["₹45 Lakh", "₹85 Lakh", "₹1.25 Cr", "₹2.10 Cr"], i),
  agent: pick(agents, i),
  status: pick(["New", "In Progress", "Interested", "Pending", "Cancelled"], i),
  date: `2026-0${(i % 6) + 1}-1${i % 9}`,
}));

export const clients = people.slice(0, 9).map((name, i) => ({
  id: `CL${2001 + i}`,
  name,
  phone: `+91 97${String(200000 + i * 5311).slice(0, 8)}`,
  email: `${fn(name)}.${ln(name)}@gmail.com`,
  city: pick(cities, i + 2),
  properties: (i % 3) + 1,
  totalValue: pick(["₹85 Lakh", "₹1.25 Cr", "₹2.40 Cr", "₹45 Lakh"], i),
  agent: pick(agents, i),
  status: pick(["Confirmed", "In Progress", "Pending"], i),
  since: `2025-0${(i % 9) + 1}-0${(i % 8) + 1}`,
}));

export const pipeline = leads.slice(0, 10).map((l, i) => ({
  id: `PL${3001 + i}`,
  lead: l.name,
  project: l.project,
  stage: pick(["Leads", "Qualification", "Proposal", "Negotiation", "Closed"], i),
  value: l.budget,
  probability: `${40 + (i % 6) * 10}%`,
  agent: l.agent,
  closeDate: `2026-0${(i % 6) + 1}-2${i % 8}`,
  status: pick(["In Progress", "Interested", "Pending", "Confirmed"], i),
}));

export const followups = leads.slice(0, 10).map((l, i) => ({
  id: `FU${4001 + i}`,
  lead: l.name,
  type: pick(["Call", "Email", "WhatsApp", "Meeting"], i),
  dueDate: `2026-0${(i % 6) + 1}-${10 + (i % 15)}`,
  time: pick(["10:00 AM", "11:30 AM", "03:00 PM", "05:30 PM"], i),
  agent: l.agent,
  notes: "Discuss pricing and payment plan options.",
  status: pick(["Pending", "Confirmed", "In Progress", "Cancelled"], i),
}));

export const projects = projectNames.map((name, i) => ({
  id: `PR${5001 + i}`,
  name,
  code: `SRX-${100 + i}`,
  developer: "Suryax Developers",
  city: pick(cities, i),
  location: `${pick(cities, i)}, India`,
  type: pick(["Residential", "Villa", "Commercial", "Plots"], i),
  totalUnits: [100, 80, 60, 120, 90, 140][i]!,
  sold: [78, 54, 42, 66, 51, 88][i]!,
  launchDate: `2024-0${(i % 9) + 1}-01`,
  possession: `2027-0${(i % 9) + 1}-01`,
  price: pick(["₹45 Lakh onwards", "₹85 Lakh onwards", "₹1.25 Cr onwards"], i),
  status: pick(["In Progress", "Confirmed", "Pending"], i),
  image: projectImages[i % 3]!,
}));

export const properties = Array.from({ length: 12 }, (_, i) => ({
  id: `PT${6001 + i}`,
  name: `${pick([2, 3, 4], i)} BHK ${pick(["Apartment", "Villa", "Flat", "Penthouse"], i)}`,
  project: pick(projectNames, i),
  bhk: `${pick([2, 3, 4], i)} BHK`,
  area: `${900 + i * 115} sq.ft`,
  floor: `${(i % 14) + 1}`,
  price: pick(["₹45 Lakh", "₹85 Lakh", "₹1.25 Cr", "₹2.10 Cr"], i),
  city: pick(cities, i),
  facing: pick(["East", "West", "North", "North-East"], i),
  status: pick(["Available", "Hold", "Booked", "Sold"], i),
  image: projectImages[i % 3]!,
}));

export const bookings = Array.from({ length: 10 }, (_, i) => ({
  id: `BK${1024 + i}`,
  customer: pick(people, i),
  property: `${pick([2, 3, 4], i)} BHK ${pick(["Apartment", "Villa", "Flat"], i)}`,
  project: pick(projectNames, i),
  agent: pick(agents, i),
  bookingDate: `2026-0${(i % 6) + 1}-${12 + (i % 12)}`,
  amount: pick(["₹45 Lakh", "₹85 Lakh", "₹1.25 Cr"], i),
  paymentStatus: pick(["Confirmed", "Pending", "In Progress"], i),
  status: pick(["Confirmed", "Pending", "Cancelled", "Confirmed"], i),
  image: projectImages[i % 3]!,
}));

export const inventory = Array.from({ length: 14 }, (_, i) => ({
  id: `INV${7001 + i}`,
  unitNo: `${pick(["A", "B", "C"], i)}-${(i % 12) + 1}0${(i % 4) + 1}`,
  project: pick(projectNames, i),
  tower: pick(["Tower A", "Tower B", "Tower C"], i),
  floor: `${(i % 15) + 1}`,
  type: pick(["Apartment", "Villa", "Plot", "Office"], i),
  bhk: `${pick([2, 3, 4], i)} BHK`,
  area: `${880 + i * 90} sq.ft`,
  price: pick(["₹45 Lakh", "₹85 Lakh", "₹1.25 Cr"], i),
  customer: i % 3 === 0 ? pick(people, i) : "—",
  status: pick(["Available", "Hold", "Booked", "Sold", "Blocked"], i),
}));

export const siteVisits = Array.from({ length: 10 }, (_, i) => ({
  id: `SV${8001 + i}`,
  client: pick(people, i),
  project: pick(projectNames, i),
  city: pick(cities, i),
  date: `2026-05-${String(10 + (i % 18)).padStart(2, "0")}`,
  time: pick(["10:00 AM", "11:30 AM", "01:00 PM", "04:30 PM"], i),
  agent: pick(agents, i),
  notes: "Client interested in corner unit with park view.",
  status: pick(["Scheduled", "Completed", "Rescheduled", "Cancelled"], i),
}));

export const payments = Array.from({ length: 12 }, (_, i) => ({
  id: `PY${9001 + i}`,
  customer: pick(people, i),
  booking: `BK${1024 + (i % 10)}`,
  mode: pick(["NEFT", "Cheque", "UPI", "Bank Loan"], i),
  amount: pick(["₹5.00 Lakh", "₹12.50 Lakh", "₹25.00 Lakh", "₹8.75 Lakh"], i),
  date: `2026-0${(i % 6) + 1}-${(i % 25) + 1}`,
  status: pick(["Confirmed", "Pending", "Cancelled"], i),
}));

export const invoices = Array.from({ length: 10 }, (_, i) => ({
  id: `INV-2026-${100 + i}`,
  customer: pick(people, i),
  booking: `BK${1024 + (i % 10)}`,
  amount: pick(["₹5,00,000", "₹12,50,000", "₹25,00,000"], i),
  tax: pick(["₹25,000", "₹62,500", "₹1,25,000"], i),
  total: pick(["₹5,25,000", "₹13,12,500", "₹26,25,000"], i),
  dueDate: `2026-0${(i % 6) + 1}-${(i % 26) + 1}`,
  status: pick(["Confirmed", "Pending", "Cancelled"], i),
}));

export const expenses = Array.from({ length: 10 }, (_, i) => ({
  id: `EX${1101 + i}`,
  category: pick(["Marketing", "Construction", "Salaries", "Office", "Legal"], i),
  description: pick(
    ["Digital ad campaign", "Cement & steel purchase", "Monthly payroll", "Office rent", "Registration fees"],
    i,
  ),
  amount: pick(["₹1.20 Lakh", "₹18.50 Lakh", "₹9.40 Lakh", "₹2.10 Lakh"], i),
  date: `2026-0${(i % 6) + 1}-${(i % 27) + 1}`,
  addedBy: pick(agents, i),
  status: pick(["Confirmed", "Pending"], i),
}));

export const team = Array.from({ length: 9 }, (_, i) => ({
  id: `EMP${1201 + i}`,
  name: pick(people, i + 3),
  role: pick(
    ["Sales Manager", "Sales Executive", "Property Manager", "Accountant", "HR", "Agent"],
    i,
  ),
  department: pick(["Sales", "Finance", "Operations", "Marketing"], i),
  phone: `+91 96${String(300000 + i * 4211).slice(0, 8)}`,
  email: `${fn(pick(people, i + 3))}@suryax.in`,
  city: pick(cities, i),
  joined: `2024-0${(i % 9) + 1}-15`,
  status: pick(["Confirmed", "Pending"], i),
}));

export const tasks = Array.from({ length: 12 }, (_, i) => ({
  id: `TSK${1301 + i}`,
  title: pick(
    [
      "Call new website leads",
      "Prepare cost sheet",
      "Site visit follow-up",
      "Send booking agreement",
      "Update inventory sheet",
      "Verify payment receipts",
    ],
    i,
  ),
  assignee: pick(agents, i),
  priority: pick(["High", "Medium", "Low"], i),
  dueDate: `2026-05-${String(8 + (i % 20)).padStart(2, "0")}`,
  stage: pick(["To Do", "In Progress", "Review", "Completed"], i),
  status: pick(["Pending", "In Progress", "Confirmed"], i),
}));

export const documents = Array.from({ length: 9 }, (_, i) => ({
  id: `DOC${1401 + i}`,
  name: pick(
    ["Sale Agreement.pdf", "RERA Certificate.pdf", "Floor Plan.png", "Payment Receipt.pdf", "Allotment Letter.pdf"],
    i,
  ),
  type: pick(["Agreement", "Legal", "Plan", "Receipt"], i),
  project: pick(projectNames, i),
  size: `${(i % 5) + 1}.${i % 9} MB`,
  uploadedBy: pick(agents, i),
  date: `2026-0${(i % 6) + 1}-${(i % 26) + 1}`,
  status: pick(["Confirmed", "Pending"], i),
}));

export const campaigns = Array.from({ length: 8 }, (_, i) => ({
  id: `CMP${1501 + i}`,
  name: pick(
    ["Summer Launch Offer", "Suryax Greens Promo", "Festive Booking Drive", "NRI Investment Push"],
    i,
  ),
  channel: pick(["Google", "Facebook", "Instagram", "Website", "WhatsApp", "Email"], i),
  budget: pick(["₹2.50 Lakh", "₹5.00 Lakh", "₹1.20 Lakh"], i),
  leads: 120 + i * 37,
  conversions: 8 + i * 3,
  roi: `${140 + i * 12}%`,
  status: pick(["In Progress", "Confirmed", "Pending"], i),
}));

export const enquiries = Array.from({ length: 10 }, (_, i) => ({
  id: `ENQ${1601 + i}`,
  name: pick(people, i + 1),
  phone: `+91 95${String(400000 + i * 3111).slice(0, 8)}`,
  email: `${fn(pick(people, i + 1))}@outlook.com`,
  property: `${pick([2, 3, 4], i)} BHK ${pick(["Apartment", "Villa"], i)}`,
  message: "Please share brochure and current price list.",
  source: pick(["Website", "Facebook", "WhatsApp", "Walk-in"], i),
  date: `2026-0${(i % 6) + 1}-${(i % 27) + 1}`,
  assignedTo: pick(agents, i),
  status: pick(["New", "In Progress", "Pending", "Confirmed"], i),
}));

export const users = Array.from({ length: 8 }, (_, i) => ({
  id: `USR${1701 + i}`,
  name: pick(people, i),
  email: `${fn(pick(people, i))}@suryax.in`,
  role: pick(
    ["Super Admin", "Admin", "Sales Manager", "Sales Executive", "Property Manager", "Accountant", "HR", "Agent"],
    i,
  ),
  lastLogin: `2026-05-${String(10 + (i % 18)).padStart(2, "0")} 09:${String(10 + i).padStart(2, "0")}`,
  status: pick(["Confirmed", "Pending"], i),
}));

/* ---------- dashboard chart data ---------- */

export const revenueTrend = [
  { month: "Jan", value: 1.42 },
  { month: "Feb", value: 1.68 },
  { month: "Mar", value: 1.55 },
  { month: "Apr", value: 2.12 },
  { month: "May", value: 2.76 },
  { month: "Jun", value: 2.95 },
];

export const propertyTypes = [
  { name: "Residential", value: 129, pct: 45, color: "#4F20D8" },
  { name: "Commercial", value: 80, pct: 28, color: "#2459D6" },
  { name: "Plots", value: 49, pct: 17, color: "#13A66A" },
  { name: "Villas", value: 29, pct: 10, color: "#F4A51C" },
];

export const leadSources = [
  { name: "Website", value: 499, pct: 40, color: "#4F20D8" },
  { name: "Referrals", value: 299, pct: 24, color: "#2459D6" },
  { name: "Social Media", value: 224, pct: 18, color: "#13A66A" },
  { name: "Walk-in", value: 125, pct: 10, color: "#F4A51C" },
  { name: "Others", value: 100, pct: 8, color: "#E94B5F" },
];

export const funnelStages = [
  { stage: "Leads", value: 1248, pct: 100, color: "#4F20D8" },
  { stage: "Qualification", value: 876, pct: 70, color: "#5B2BE0" },
  { stage: "Proposal", value: 512, pct: 58, color: "#2459D6" },
  { stage: "Negotiation", value: 287, pct: 56, color: "#13A66A" },
  { stage: "Closed", value: 287, pct: 100, color: "#F4A51C" },
];

export const sparkData = (seed: number) =>
  Array.from({ length: 10 }, (_, i) => ({
    x: i,
    y: 20 + ((Math.sin(i * 1.2 + seed) + 1) * 18 + i * 3),
  }));
