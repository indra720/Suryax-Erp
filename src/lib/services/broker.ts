// src/lib/services/broker.ts
// Data & Mock Service for CRM / Channel Partner (Broker) Portal

export interface BrokerKpi {
  totalLeadsSubmitted: number;
  activeProspects: number;
  dealsClosed: number;
  totalCommissionEarned: number; // INR
  walletAvailableBalance: number; // INR
  pendingPayoutAmount: number; // INR
  currentSlab: string; // e.g. "Gold Partner (3.0%)"
  nextTierRequirement: string;
}

export interface BrokerLead {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  interestedProject: string;
  unitType: string;
  budgetRange: string;
  stage: "Lead Submitted" | "Site Visit Scheduled" | "Site Visit Completed" | "Booking Token Received" | "Deal Closed Won" | "Disqualified";
  assignedSalesManager: string;
  submittedAt: string;
  notes: string;
}

export interface CommissionTransaction {
  id: string;
  bookingRef: string;
  clientName: string;
  project: string;
  unitNo: string;
  dealValue: number;
  commissionPercentage: number;
  grossCommission: number;
  tdsPercentage: number;
  netPayable: number;
  status: "Credited to Wallet" | "In Review" | "Paid Out";
  creditedDate: string;
}

export interface BrokerProject {
  id: string;
  name: string;
  location: string;
  reraNumber: string;
  propertyType: "Luxury High-Rise" | "Villas & Plots" | "Commercial & Retail";
  priceRange: string;
  baseCommission: string;
  promotionalIncentive: string;
  unitsAvailable: number;
  brochureAvailable: boolean;
}

export interface BrokerSiteVisit {
  id: string;
  clientName: string;
  phone: string;
  projectName: string;
  scheduledDate: string;
  timeSlot: string;
  cabRequested: boolean;
  status: "Confirmed" | "Awaiting Confirmation" | "Completed" | "Cancelled";
  escortExecutive: string;
}

export interface BrokerPayout {
  id: string;
  payoutDate: string;
  amountRequested: number;
  tdsDeducted: number;
  netDisbursed: number;
  bankRef: string;
  utrNumber: string;
  status: "Completed" | "Processing" | "Approved";
  invoiceNumber: string;
}

export const mockBrokerKpi: BrokerKpi = {
  totalLeadsSubmitted: 64,
  activeProspects: 22,
  dealsClosed: 9,
  totalCommissionEarned: 3850000, // 38.5 Lakhs
  walletAvailableBalance: 840000, // 8.4 Lakhs
  pendingPayoutAmount: 420000,
  currentSlab: "Platinum Partner (3.25%)",
  nextTierRequirement: "1 more booking to unlock 3.50% Elite Diamond Tier",
};

export const mockBrokerLeads: BrokerLead[] = [
  {
    id: "BL-801",
    clientName: "Amitabh Chaturvedi",
    phone: "+91 98390 12345",
    email: "amitabh.c@gmail.com",
    interestedProject: "Vrindavan Heights",
    unitType: "3 BHK Premium",
    budgetRange: "₹90L - ₹1.1 Cr",
    stage: "Booking Token Received",
    assignedSalesManager: "Rajesh Malhotra",
    submittedAt: "2026-04-02",
    notes: "Client token received. Commission calculation in progress.",
  },
  {
    id: "BL-802",
    clientName: "Sunil & Rashmi Bhatnagar",
    phone: "+91 94151 55667",
    email: "sbhatnagar@tcs.com",
    interestedProject: "Vrindavan Green Valley",
    unitType: "4 BHK Luxury Villa",
    budgetRange: "₹2.2 Cr - ₹2.6 Cr",
    stage: "Site Visit Completed",
    assignedSalesManager: "Pooja Verma",
    submittedAt: "2026-04-12",
    notes: "Site visit completed on Sunday. Highly interested in Villa 14.",
  },
  {
    id: "BL-803",
    clientName: "Capt. Alok Narain",
    phone: "+91 98392 33441",
    email: "alok.narain@airindia.in",
    interestedProject: "Vrindavan Royale",
    unitType: "2 BHK Club View",
    budgetRange: "₹65L - ₹75L",
    stage: "Site Visit Scheduled",
    assignedSalesManager: "Vikas Saxena",
    submittedAt: "2026-04-16",
    notes: "Requested luxury cab pick-up from Hazratganj.",
  },
  {
    id: "BL-804",
    clientName: "Manoj K. Chawla",
    phone: "+91 97931 88990",
    email: "manoj@chawlagroup.com",
    interestedProject: "Vrindavan Commercial Plaza",
    unitType: "Retail Showroom (Ground Floor)",
    budgetRange: "₹1.5 Cr - ₹2.0 Cr",
    stage: "Deal Closed Won",
    assignedSalesManager: "Ananya Sharma",
    submittedAt: "2026-03-20",
    notes: "Deal closed & registered. Commission ₹4,80,000 credited to wallet.",
  },
];

export const mockCommissionTransactions: CommissionTransaction[] = [
  {
    id: "COM-2026-091",
    bookingRef: "VRN-COMM-G-12",
    clientName: "Manoj K. Chawla",
    project: "Vrindavan Commercial Plaza",
    unitNo: "G-12",
    dealValue: 16000000,
    commissionPercentage: 3.0,
    grossCommission: 480000,
    tdsPercentage: 5,
    netPayable: 456000,
    status: "Credited to Wallet",
    creditedDate: "2026-04-14",
  },
  {
    id: "COM-2026-088",
    bookingRef: "VRN-GV-V-09",
    clientName: "Gaurav Mehrotra",
    project: "Vrindavan Green Valley",
    unitNo: "Villa 09",
    dealValue: 22500000,
    commissionPercentage: 3.25,
    grossCommission: 731250,
    tdsPercentage: 5,
    netPayable: 694688,
    status: "Credited to Wallet",
    creditedDate: "2026-04-05",
  },
  {
    id: "COM-2026-085",
    bookingRef: "VRN-HGT-T3-1402",
    clientName: "Amitabh Chaturvedi",
    project: "Vrindavan Heights",
    unitNo: "1402",
    dealValue: 9500000,
    commissionPercentage: 3.0,
    grossCommission: 285000,
    tdsPercentage: 5,
    netPayable: 270750,
    status: "In Review",
    creditedDate: "2026-04-18",
  },
];

export const mockBrokerProjects: BrokerProject[] = [
  {
    id: "PRJ-01",
    name: "Vrindavan Heights",
    location: "Shaheed Path, Gomti Nagar Extn, Lucknow",
    reraNumber: "UPRERAPRJ882419",
    propertyType: "Luxury High-Rise",
    priceRange: "₹72 Lakh - ₹1.45 Cr",
    baseCommission: "3.00%",
    promotionalIncentive: "+ ₹50,000 Cash Bonus per 3 BHK Booking",
    unitsAvailable: 42,
    brochureAvailable: true,
  },
  {
    id: "PRJ-02",
    name: "Vrindavan Green Valley",
    location: "Kisan Path, Sultanpur Road, Lucknow",
    reraNumber: "UPRERAPRJ993102",
    propertyType: "Villas & Plots",
    priceRange: "₹1.40 Cr - ₹3.20 Cr",
    baseCommission: "3.25%",
    promotionalIncentive: "+ 50g Gold Coin or ₹3,50,000 Cash Voucher",
    unitsAvailable: 19,
    brochureAvailable: true,
  },
  {
    id: "PRJ-03",
    name: "Vrindavan Royale",
    location: "Amar Shaheed Path, Sector 7, Lucknow",
    reraNumber: "UPRERAPRJ771203",
    propertyType: "Luxury High-Rise",
    priceRange: "₹65 Lakh - ₹98 Lakh",
    baseCommission: "2.75%",
    promotionalIncentive: "+ ₹25,000 Fast Token Incentive",
    unitsAvailable: 28,
    brochureAvailable: true,
  },
  {
    id: "PRJ-04",
    name: "Vrindavan Commercial Plaza",
    location: "Main Vibhuti Khand, Gomti Nagar, Lucknow",
    reraNumber: "UPRERAPRJ660412",
    propertyType: "Commercial & Retail",
    priceRange: "₹85 Lakh - ₹4.50 Cr",
    baseCommission: "3.50%",
    promotionalIncentive: "+ 100% Brokerage payout within 7 days of BBA",
    unitsAvailable: 11,
    brochureAvailable: true,
  },
];

export const mockBrokerSiteVisits: BrokerSiteVisit[] = [
  {
    id: "BSV-01",
    clientName: "Capt. Alok Narain",
    phone: "+91 98392 33441",
    projectName: "Vrindavan Royale",
    scheduledDate: "2026-04-21",
    timeSlot: "11:00 AM",
    cabRequested: true,
    status: "Confirmed",
    escortExecutive: "Vikas Saxena",
  },
  {
    id: "BSV-02",
    clientName: "Deepesh Trivedi",
    phone: "+91 94150 11992",
    projectName: "Vrindavan Heights",
    scheduledDate: "2026-04-22",
    timeSlot: "03:30 PM",
    cabRequested: false,
    status: "Awaiting Confirmation",
    escortExecutive: "Rajesh Malhotra",
  },
];

export const mockBrokerPayouts: BrokerPayout[] = [
  {
    id: "PO-7701",
    payoutDate: "2026-04-10",
    amountRequested: 600000,
    tdsDeducted: 30000,
    netDisbursed: 570000,
    bankRef: "HDFC-RTGS-009918237",
    utrNumber: "HDFCR520260410091823",
    status: "Completed",
    invoiceNumber: "INV-APEX-2026-04",
  },
  {
    id: "PO-7688",
    payoutDate: "2026-03-25",
    amountRequested: 450000,
    tdsDeducted: 22500,
    netDisbursed: 427500,
    bankRef: "HDFC-NEFT-008129381",
    utrNumber: "HDFCN320260325081293",
    status: "Completed",
    invoiceNumber: "INV-APEX-2026-03",
  },
];

export const brokerService = {
  getKpi: () => mockBrokerKpi,
  getLeads: () => mockBrokerLeads,
  getTransactions: () => mockCommissionTransactions,
  getProjects: () => mockBrokerProjects,
  getSiteVisits: () => mockBrokerSiteVisits,
  getPayouts: () => mockBrokerPayouts,
};
