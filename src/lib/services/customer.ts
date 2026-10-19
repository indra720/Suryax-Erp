// src/lib/services/customer.ts
// Data & Mock Service for Customer / Client Portal

export interface CustomerProfile {
  buyerName: string;
  coApplicant: string;
  email: string;
  phone: string;
  pan: string;
  aadhar: string;
  currentAddress: string;
  bookedUnit: {
    projectName: string;
    tower: string;
    floor: string;
    unitNo: string;
    unitType: string;
    carpetArea: string;
    superBuiltUpArea: string;
    facing: string;
    allottedParking: string;
    possessionTarget: string;
    totalCost: number;
    amountPaid: number;
    balanceDue: number;
    allotmentDate: string;
  };
  relationshipManager: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface PaymentScheduleItem {
  id: string;
  milestoneName: string;
  stagePercentage: number;
  amountDue: number;
  dueDate: string;
  status: "Paid" | "Due Now" | "Upcoming";
  paidDate?: string;
  paymentMode?: string;
  receiptNumber?: string;
  transactionRef?: string;
}

export interface CustomerDocument {
  id: string;
  title: string;
  category: "Allotment Letter" | "Agreement to Sale (BBA)" | "Payment Receipt" | "Tax Form 16B" | "Possession Certificate";
  issueDate: string;
  fileSize: string;
  status: "Digitally Signed" | "Verified";
  downloadUrl?: string;
}

export interface ConstructionMilestoneUpdate {
  id: string;
  milestoneTitle: string;
  progressPercentage: number;
  updateDate: string;
  description: string;
  imageThumbnail: string;
}

export interface CustomerTicket {
  id: string;
  ticketCode: string;
  subject: string;
  category: "Payment Query" | "Interior Modification" | "Loan Assistance" | "Site Visit Request" | "Snagging";
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Review" | "Resolved";
  createdOn: string;
  lastReply: string;
}

export const mockCustomerProfile: CustomerProfile = {
  buyerName: "Amitabh Chaturvedi",
  coApplicant: "Rashmi Chaturvedi",
  email: "amitabh.c@gmail.com",
  phone: "+91 98390 12345",
  pan: "ABCDE1234F",
  aadhar: "XXXX-XXXX-8921",
  currentAddress: "B-4/12, Vipul Khand, Gomti Nagar, Lucknow, UP - 226010",
  bookedUnit: {
    projectName: "Vrindavan Heights",
    tower: "Tower 3 (Skyline Crest)",
    floor: "14th Floor",
    unitNo: "1402",
    unitType: "3 BHK Premium + Servant Quarter",
    carpetArea: "1,380 sq.ft",
    superBuiltUpArea: "1,850 sq.ft",
    facing: "East-Facing (Club & Botanical Garden View)",
    allottedParking: "Basement 2, Bay #142 (Covered)",
    possessionTarget: "December 2026",
    totalCost: 9500000,
    amountPaid: 5700000,
    balanceDue: 3800000,
    allotmentDate: "18 April 2026",
  },
  relationshipManager: {
    name: "Rajesh Malhotra",
    phone: "+91 98390 11001",
    email: "rajesh.m@vrindavan.com",
  },
};

export const mockCustomerPaymentSchedule: PaymentScheduleItem[] = [
  {
    id: "SCH-01",
    milestoneName: "Earnest Booking Token",
    stagePercentage: 10,
    amountDue: 950000,
    dueDate: "2026-04-02",
    status: "Paid",
    paidDate: "2026-04-02",
    paymentMode: "NEFT Bank Transfer",
    receiptNumber: "REC-2026-8812",
    transactionRef: "HDFCR520260402019283",
  },
  {
    id: "SCH-02",
    milestoneName: "Execution of Agreement to Sale (BBA)",
    stagePercentage: 15,
    amountDue: 1425000,
    dueDate: "2026-04-18",
    status: "Paid",
    paidDate: "2026-04-18",
    paymentMode: "RTGS Bank Transfer",
    receiptNumber: "REC-2026-8899",
    transactionRef: "SBINR20260418991203",
  },
  {
    id: "SCH-03",
    milestoneName: "Completion of 10th Floor Slab Casting",
    stagePercentage: 20,
    amountDue: 1900000,
    dueDate: "2026-04-15",
    status: "Paid",
    paidDate: "2026-04-15",
    paymentMode: "HDFC Home Loan Disbursement",
    receiptNumber: "REC-2026-8910",
    transactionRef: "HDFCLOAN20260415881",
  },
  {
    id: "SCH-04",
    milestoneName: "Completion of 14th Floor Slab Casting",
    stagePercentage: 15,
    amountDue: 1425000,
    dueDate: "2026-04-19",
    status: "Paid",
    paidDate: "2026-04-19",
    paymentMode: "HDFC Home Loan Disbursement",
    receiptNumber: "REC-2026-8924",
    transactionRef: "HDFCLOAN20260419012",
  },
  {
    id: "SCH-05",
    milestoneName: "Completion of External Brickwork & Plaster",
    stagePercentage: 20,
    amountDue: 1900000,
    dueDate: "2026-06-30",
    status: "Due Now",
  },
  {
    id: "SCH-06",
    milestoneName: "On Notice of Possession & Registry Handover",
    stagePercentage: 20,
    amountDue: 1900000,
    dueDate: "2026-12-31",
    status: "Upcoming",
  },
];

export const mockCustomerDocuments: CustomerDocument[] = [
  {
    id: "CD-01",
    title: "Official Allotment Letter - Unit 1402 (Tower 3)",
    category: "Allotment Letter",
    issueDate: "2026-04-05",
    fileSize: "2.4 MB",
    status: "Digitally Signed",
  },
  {
    id: "CD-02",
    title: "Agreement to Sale (BBA) Registered Copy",
    category: "Agreement to Sale (BBA)",
    issueDate: "2026-04-18",
    fileSize: "12.8 MB",
    status: "Digitally Signed",
  },
  {
    id: "CD-03",
    title: "Consolidated Milestone Payment Receipts (₹57,00,000)",
    category: "Payment Receipt",
    issueDate: "2026-04-19",
    fileSize: "1.8 MB",
    status: "Verified",
  },
  {
    id: "CD-04",
    title: "Car Parking Bay Allotment Certificate (Bay B2-142)",
    category: "Possession Certificate",
    issueDate: "2026-04-18",
    fileSize: "950 KB",
    status: "Verified",
  },
];

export const mockConstructionMilestones: ConstructionMilestoneUpdate[] = [
  {
    id: "CM-01",
    milestoneTitle: "16th Floor Shuttering & Rebar Binding In Progress",
    progressPercentage: 74,
    updateDate: "19 April 2026",
    description: "The concrete pouring for 15th floor slab has cured with 100% test cube compliance. 16th floor columns have been aligned.",
    imageThumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "CM-02",
    milestoneTitle: "14th Floor Internal Brickwork & Conduit Plumbing Complete",
    progressPercentage: 100,
    updateDate: "12 April 2026",
    description: "All internal AAC block partition walls and sanitary pipe shafts have been completed for your unit floor.",
    imageThumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "CM-03",
    milestoneTitle: "Clubhouse Dome & Olympic Pool Structure Complete",
    progressPercentage: 90,
    updateDate: "28 March 2026",
    description: "Ponding tests for the swimming pool have concluded successfully. Final glass mosaic tiling is commencing next week.",
    imageThumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60",
  },
];

export const mockCustomerTickets: CustomerTicket[] = [
  {
    id: "TCK-881",
    ticketCode: "REQ-VRN-1092",
    subject: "Request for Italian Marble Upgrade in Master Bedroom",
    category: "Interior Modification",
    priority: "Medium",
    status: "In Review",
    createdOn: "2026-04-18",
    lastReply: "Our site project architect Er. Indrajeet has verified the slab load and will share the cost difference invoice by tomorrow.",
  },
  {
    id: "TCK-880",
    ticketCode: "REQ-VRN-1044",
    subject: "HDFC Home Loan Tranche 4 Demand Letter Copy",
    category: "Loan Assistance",
    priority: "High",
    status: "Resolved",
    createdOn: "2026-04-15",
    lastReply: "Demand letter and architect milestone certificate emailed to your loan officer Mr. Alok Verma.",
  },
];

export const customerService = {
  getProfile: () => mockCustomerProfile,
  getSchedule: () => mockCustomerPaymentSchedule,
  getDocuments: () => mockCustomerDocuments,
  getMilestones: () => mockConstructionMilestones,
  getTickets: () => mockCustomerTickets,
};
