// src/lib/services/sales-manager.ts
// Data & Mock Service for Sales / Sales Manager Portal

export interface SalesKpi {
  totalBookingsMTD: number;
  totalRevenueMTD: number; // in INR
  pipelineValue: number; // in INR
  conversionRate: number; // %
  siteVisitsCompleted: number;
  activeOpportunities: number;
  targetAchievementRate: number; // %
  topPerformingExecutive: string;
}

export interface Deal {
  id: string;
  leadName: string;
  phone: string;
  email: string;
  project: string;
  unitPreference: string;
  budget: number;
  stage: "New Enquiry" | "Qualified" | "Site Visit Scheduled" | "Negotiation" | "Token Paid" | "Closed Won" | "Lost";
  assignedRep: string;
  probability: number;
  expectedClosingDate: string;
  lastFollowUp: string;
  notes: string;
}

export interface SiteVisit {
  id: string;
  customerName: string;
  phone: string;
  project: string;
  preferredUnit: string;
  date: string;
  timeSlot: string;
  salesExecutive: string;
  transportProvided: "Complimentary Cab" | "Own Transport" | "Site Shuttle";
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  feedback?: string;
  leadRating: "Hot" | "Warm" | "Cold";
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerName: string;
  project: string;
  tower: string;
  unitNo: string;
  unitType: string;
  agreementValue: number;
  bookingAmountPaid: number;
  paymentMode: "Cheque" | "NEFT/RTGS" | "UPI" | "Online Portal";
  bookingDate: string;
  salesExecutive: string;
  brokerPartner?: string;
  status: "Confirmed" | "Verification Pending" | "Cancelled";
}

export interface SalesTarget {
  id: string;
  repName: string;
  avatar: string;
  monthlyTargetUnits: number;
  achievedUnits: number;
  monthlyTargetValue: number; // INR
  achievedValue: number; // INR
  visitsTarget: number;
  achievedVisits: number;
  incentiveEarned: number;
  completionPercentage: number;
}

export interface SalesTeamMember {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  activeLeads: number;
  visitsDoneMTD: number;
  dealsWonMTD: number;
  revenueMTD: number;
  conversionRatio: number;
  status: "Active" | "On Site Visit" | "On Leave";
}

export interface UrgentFollowup {
  id: string;
  clientName: string;
  phone: string;
  dealId: string;
  project: string;
  dueTime: string;
  priority: "High" | "Medium" | "Low";
  actionType: "Call Back" | "Send Quote" | "Site Visit Followup" | "Token Collection";
  status: "Pending" | "Done" | "Overdue";
}

export const mockSalesKpi: SalesKpi = {
  totalBookingsMTD: 38,
  totalRevenueMTD: 284500000, // 28.45 Cr
  pipelineValue: 842000000,  // 84.20 Cr
  conversionRate: 14.8,
  siteVisitsCompleted: 194,
  activeOpportunities: 260,
  targetAchievementRate: 94.8,
  topPerformingExecutive: "Rajesh Malhotra (12 Bookings)",
};

export const mockDeals: Deal[] = [
  {
    id: "DL-101",
    leadName: "Amitabh Chaturvedi",
    phone: "+91 98390 12345",
    email: "amitabh.c@gmail.com",
    project: "Vrindavan Heights",
    unitPreference: "3 BHK Premium (1850 sq.ft)",
    budget: 9500000,
    stage: "Token Paid",
    assignedRep: "Rajesh Malhotra",
    probability: 95,
    expectedClosingDate: "2026-04-22",
    lastFollowUp: "2026-04-18",
    notes: "Token of 5 Lakhs received via NEFT. Drafting BBA today.",
  },
  {
    id: "DL-102",
    leadName: "Sunita Singhania",
    phone: "+91 94150 98765",
    email: "sunita.singhania@yahoo.com",
    project: "Vrindavan Green Valley",
    unitPreference: "4 BHK Villa (3200 sq.ft)",
    budget: 24000000,
    stage: "Negotiation",
    assignedRep: "Pooja Verma",
    probability: 75,
    expectedClosingDate: "2026-04-25",
    lastFollowUp: "2026-04-19",
    notes: "Requested 2 covered car parkings and customized modular kitchen package.",
  },
  {
    id: "DL-103",
    leadName: "Dr. K. K. Srivastava",
    phone: "+91 97930 45678",
    email: "dr.kksrivastava@apollo.org",
    project: "Vrindavan Royale",
    unitPreference: "2 BHK Luxury (1320 sq.ft)",
    budget: 6800000,
    stage: "Site Visit Scheduled",
    assignedRep: "Vikas Saxena",
    probability: 60,
    expectedClosingDate: "2026-04-28",
    lastFollowUp: "2026-04-17",
    notes: "Visit scheduled for Sunday 11:30 AM with family and architect.",
  },
  {
    id: "DL-104",
    leadName: "Col. Sanjeev Rawat (Retd.)",
    phone: "+91 99180 88221",
    email: "sanjeev.rawat@armymod.in",
    project: "Vrindavan Heights",
    unitPreference: "3 BHK Penthouse (2600 sq.ft)",
    budget: 16500000,
    stage: "Qualified",
    assignedRep: "Rajesh Malhotra",
    probability: 50,
    expectedClosingDate: "2026-05-05",
    lastFollowUp: "2026-04-18",
    notes: "Interested in park-facing high floor. Pre-approved defense home loan.",
  },
  {
    id: "DL-105",
    leadName: "Manish Agarwal",
    phone: "+91 98380 54321",
    email: "manish@agarwaltraders.com",
    project: "Vrindavan Commercial Plaza",
    unitPreference: "Retail Ground Floor (850 sq.ft)",
    budget: 18000000,
    stage: "Closed Won",
    assignedRep: "Ananya Sharma",
    probability: 100,
    expectedClosingDate: "2026-04-15",
    lastFollowUp: "2026-04-16",
    notes: "Full booking payment received. Unit G-12 allotment confirmed.",
  },
  {
    id: "DL-106",
    leadName: "Neeraj Tiwari",
    phone: "+91 93350 11223",
    email: "neeraj.t@tcs.com",
    project: "Vrindavan Green Valley",
    unitPreference: "3 BHK Villa (2400 sq.ft)",
    budget: 15500000,
    stage: "New Enquiry",
    assignedRep: "Pooja Verma",
    probability: 30,
    expectedClosingDate: "2026-05-12",
    lastFollowUp: "2026-04-19",
    notes: "Direct lead from 99acres portal ad campaign.",
  },
];

export const mockSiteVisits: SiteVisit[] = [
  {
    id: "SV-401",
    customerName: "Dr. K. K. Srivastava",
    phone: "+91 97930 45678",
    project: "Vrindavan Royale",
    preferredUnit: "2 BHK Luxury (Tower B)",
    date: "2026-04-20",
    timeSlot: "11:30 AM",
    salesExecutive: "Vikas Saxena",
    transportProvided: "Complimentary Cab",
    status: "Scheduled",
    leadRating: "Hot",
  },
  {
    id: "SV-402",
    customerName: "Sanjay Gupta & Family",
    phone: "+91 98399 22110",
    project: "Vrindavan Heights",
    preferredUnit: "3 BHK High-Rise (Tower C, 14th Floor)",
    date: "2026-04-20",
    timeSlot: "02:00 PM",
    salesExecutive: "Rajesh Malhotra",
    transportProvided: "Site Shuttle",
    status: "Scheduled",
    leadRating: "Hot",
  },
  {
    id: "SV-403",
    customerName: "Deepak Rastogi",
    phone: "+91 94155 77665",
    project: "Vrindavan Green Valley",
    preferredUnit: "4 BHK Villa Club-Facing",
    date: "2026-04-19",
    timeSlot: "04:30 PM",
    salesExecutive: "Pooja Verma",
    transportProvided: "Own Transport",
    status: "Completed",
    feedback: "Extremely impressed with landscape & clubhouse. Expected to give token by Tuesday.",
    leadRating: "Hot",
  },
  {
    id: "SV-404",
    customerName: "Rakesh Jaiswal",
    phone: "+91 98890 33445",
    project: "Vrindavan Commercial Plaza",
    preferredUnit: "First Floor Office Space",
    date: "2026-04-18",
    timeSlot: "01:00 PM",
    salesExecutive: "Ananya Sharma",
    transportProvided: "Own Transport",
    status: "Completed",
    feedback: "Budget slightly higher than expectations. Shared revised payment schedule.",
    leadRating: "Warm",
  },
  {
    id: "SV-405",
    customerName: "Harishankar Pandey",
    phone: "+91 99350 88990",
    project: "Vrindavan Heights",
    preferredUnit: "2 BHK Corner Unit",
    date: "2026-04-17",
    timeSlot: "10:00 AM",
    salesExecutive: "Vikas Saxena",
    transportProvided: "Complimentary Cab",
    status: "Cancelled",
    feedback: "Out of city for emergency. Rescheduling for next weekend.",
    leadRating: "Cold",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "BK-2026-081",
    bookingNumber: "VRN-HGT-T3-1402",
    customerName: "Amitabh Chaturvedi",
    project: "Vrindavan Heights",
    tower: "Tower 3",
    unitNo: "1402",
    unitType: "3 BHK Premium",
    agreementValue: 9500000,
    bookingAmountPaid: 500000,
    paymentMode: "NEFT/RTGS",
    bookingDate: "2026-04-18",
    salesExecutive: "Rajesh Malhotra",
    brokerPartner: "Apex Realtors",
    status: "Confirmed",
  },
  {
    id: "BK-2026-080",
    bookingNumber: "VRN-COMM-G-12",
    customerName: "Manish Agarwal",
    project: "Vrindavan Commercial Plaza",
    tower: "Retail Block",
    unitNo: "G-12",
    unitType: "Retail Shop",
    agreementValue: 18000000,
    bookingAmountPaid: 1800000,
    paymentMode: "Cheque",
    bookingDate: "2026-04-15",
    salesExecutive: "Ananya Sharma",
    status: "Confirmed",
  },
  {
    id: "BK-2026-079",
    bookingNumber: "VRN-GV-V-09",
    customerName: "Gaurav Mehrotra",
    project: "Vrindavan Green Valley",
    tower: "Phase 1",
    unitNo: "Villa 09",
    unitType: "4 BHK Luxury Villa",
    agreementValue: 22500000,
    bookingAmountPaid: 2000000,
    paymentMode: "Online Portal",
    bookingDate: "2026-04-12",
    salesExecutive: "Pooja Verma",
    status: "Confirmed",
  },
  {
    id: "BK-2026-078",
    bookingNumber: "VRN-ROY-T1-804",
    customerName: "Priyanka Tandon",
    project: "Vrindavan Royale",
    tower: "Tower 1",
    unitNo: "804",
    unitType: "2 BHK Luxury",
    agreementValue: 6900000,
    bookingAmountPaid: 350000,
    paymentMode: "UPI",
    bookingDate: "2026-04-10",
    salesExecutive: "Vikas Saxena",
    brokerPartner: "Shree Real Estate",
    status: "Confirmed",
  },
];

export const mockSalesTargets: SalesTarget[] = [
  {
    id: "TRG-01",
    repName: "Rajesh Malhotra",
    avatar: "RM",
    monthlyTargetUnits: 12,
    achievedUnits: 12,
    monthlyTargetValue: 90000000,
    achievedValue: 98500000,
    visitsTarget: 40,
    achievedVisits: 48,
    incentiveEarned: 245000,
    completionPercentage: 109,
  },
  {
    id: "TRG-02",
    repName: "Pooja Verma",
    avatar: "PV",
    monthlyTargetUnits: 10,
    achievedUnits: 9,
    monthlyTargetValue: 80000000,
    achievedValue: 74500000,
    visitsTarget: 35,
    achievedVisits: 42,
    incentiveEarned: 185000,
    completionPercentage: 93,
  },
  {
    id: "TRG-03",
    repName: "Ananya Sharma",
    avatar: "AS",
    monthlyTargetUnits: 8,
    achievedUnits: 8,
    monthlyTargetValue: 65000000,
    achievedValue: 68000000,
    visitsTarget: 30,
    achievedVisits: 36,
    incentiveEarned: 170000,
    completionPercentage: 104,
  },
  {
    id: "TRG-04",
    repName: "Vikas Saxena",
    avatar: "VS",
    monthlyTargetUnits: 8,
    achievedUnits: 6,
    monthlyTargetValue: 55000000,
    achievedValue: 43500000,
    visitsTarget: 35,
    achievedVisits: 31,
    incentiveEarned: 95000,
    completionPercentage: 79,
  },
];

export const mockSalesTeam: SalesTeamMember[] = [
  {
    id: "STM-01",
    name: "Rajesh Malhotra",
    designation: "Senior Sales Manager",
    email: "rajesh.m@vrindavan.com",
    phone: "+91 98390 11001",
    activeLeads: 48,
    visitsDoneMTD: 48,
    dealsWonMTD: 12,
    revenueMTD: 98500000,
    conversionRatio: 25.0,
    status: "Active",
  },
  {
    id: "STM-02",
    name: "Pooja Verma",
    designation: "Assistant Sales Manager - Villas",
    email: "pooja.v@vrindavan.com",
    phone: "+91 94150 22002",
    activeLeads: 42,
    visitsDoneMTD: 42,
    dealsWonMTD: 9,
    revenueMTD: 74500000,
    conversionRatio: 21.4,
    status: "On Site Visit",
  },
  {
    id: "STM-03",
    name: "Ananya Sharma",
    designation: "Commercial Sales Specialist",
    email: "ananya.s@vrindavan.com",
    phone: "+91 97930 33003",
    activeLeads: 36,
    visitsDoneMTD: 36,
    dealsWonMTD: 8,
    revenueMTD: 68000000,
    conversionRatio: 22.2,
    status: "Active",
  },
  {
    id: "STM-04",
    name: "Vikas Saxena",
    designation: "Sales Executive - Mid Rise",
    email: "vikas.s@vrindavan.com",
    phone: "+91 99180 44004",
    activeLeads: 38,
    visitsDoneMTD: 31,
    dealsWonMTD: 6,
    revenueMTD: 43500000,
    conversionRatio: 19.3,
    status: "Active",
  },
];

export const mockUrgentFollowups: UrgentFollowup[] = [
  {
    id: "UF-01",
    clientName: "Sunita Singhania",
    phone: "+91 94150 98765",
    dealId: "DL-102",
    project: "Vrindavan Green Valley",
    dueTime: "Today, 03:00 PM",
    priority: "High",
    actionType: "Send Quote",
    status: "Pending",
  },
  {
    id: "UF-02",
    clientName: "Amitabh Chaturvedi",
    phone: "+91 98390 12345",
    dealId: "DL-101",
    project: "Vrindavan Heights",
    dueTime: "Today, 04:30 PM",
    priority: "High",
    actionType: "Token Collection",
    status: "Pending",
  },
  {
    id: "UF-03",
    clientName: "Col. Sanjeev Rawat",
    phone: "+91 99180 88221",
    dealId: "DL-104",
    project: "Vrindavan Heights",
    dueTime: "Tomorrow, 11:00 AM",
    priority: "Medium",
    actionType: "Call Back",
    status: "Pending",
  },
];

export const salesManagerService = {
  getKpi: () => mockSalesKpi,
  getDeals: () => mockDeals,
  getSiteVisits: () => mockSiteVisits,
  getBookings: () => mockBookings,
  getTargets: () => mockSalesTargets,
  getTeam: () => mockSalesTeam,
  getFollowups: () => mockUrgentFollowups,
};
