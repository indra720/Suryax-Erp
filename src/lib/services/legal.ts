// src/lib/services/legal.ts
// Data & Mock Service for Legal & Documentation Portal

export interface LegalKpi {
  totalAgreementsDrafted: number;
  agreementsSigned: number;
  pendingRegistryCount: number;
  reraComplianceScore: string; // e.g. "100% Compliant"
  activeClearancesCount: number;
  litigationCasesCount: number;
  escrowAuditStatus: string;
  nextReraFilingDue: string;
}

export interface LegalAgreement {
  id: string;
  agreementNo: string;
  customerName: string;
  customerPhone: string;
  projectName: string;
  unitNo: string;
  agreementValue: number;
  stampDutyAmount: number;
  eStampNumber: string;
  draftStatus: "Draft Prepared" | "Sent for Buyer Review" | "Signed & Executed" | "Archived";
  assignedAdvocate: string;
  executionDate: string;
}

export interface RegistryRecord {
  id: string;
  docketNo: string;
  buyerName: string;
  unitNumber: string;
  projectName: string;
  subRegistrarOffice: string;
  appointmentDate: string;
  challanAmount: number;
  eRegistrationFee: number;
  status: "Challan Generated" | "Appointment Booked" | "Deed Registered & Sealed" | "Khatauni Mutation Done";
  advocateInCharge: string;
}

export interface ReraFiling {
  id: string;
  project: string;
  reraRegistrationNo: string;
  quarterPeriod: string;
  caEscrowCertificate: "Uploaded & Valid" | "Pending CA Sign";
  architectProgressCert: "Certified" | "Pending";
  engineerProgressCert: "Certified" | "Pending";
  filingStatus: "Compliant & Acknowledged" | "Review Required";
  submittedOn: string;
}

export interface NocClearance {
  id: string;
  certificateName: string;
  issuingAuthority: string;
  project: string;
  clearanceNumber: string;
  issueDate: string;
  validUntil: string;
  status: "Active & Valid" | "Renewal In Progress" | "Exempted";
  complianceOfficer: string;
}

export interface LegalVaultDoc {
  id: string;
  title: string;
  category: "Parent Title Deed" | "Government Sanctions" | "Land Revenue Orders" | "RERA Approvals" | "Banking NOC";
  fileSize: string;
  updatedOn: string;
  confidentiality: "Level 1 - Public RERA" | "Level 2 - Purchaser Access" | "Level 3 - Internal Legal Only";
  verifiedBy: string;
}

export const mockLegalKpi: LegalKpi = {
  totalAgreementsDrafted: 248,
  agreementsSigned: 216,
  pendingRegistryCount: 32,
  reraComplianceScore: "100% Certified",
  activeClearancesCount: 14,
  litigationCasesCount: 0,
  escrowAuditStatus: "Reconciled by M/s Goel & Co. CAs",
  nextReraFilingDue: "30 April 2026 (Q4 Returns)",
};

export const mockAgreements: LegalAgreement[] = [
  {
    id: "AGR-2026-101",
    agreementNo: "BBA/VRN-HGT/2026/088",
    customerName: "Amitabh Chaturvedi",
    customerPhone: "+91 98390 12345",
    projectName: "Vrindavan Heights",
    unitNo: "Tower 3, Unit 1402",
    agreementValue: 9500000,
    stampDutyAmount: 665000,
    eStampNumber: "IN-UP99201928374182U",
    draftStatus: "Signed & Executed",
    assignedAdvocate: "Adv. Sudhir Dixit (High Court)",
    executionDate: "2026-04-18",
  },
  {
    id: "AGR-2026-102",
    agreementNo: "BBA/VRN-GV/2026/042",
    customerName: "Sunita Singhania",
    customerPhone: "+91 94150 98765",
    projectName: "Vrindavan Green Valley",
    unitNo: "Villa 14",
    agreementValue: 24000000,
    stampDutyAmount: 1680000,
    eStampNumber: "IN-UP88192830192831V",
    draftStatus: "Sent for Buyer Review",
    assignedAdvocate: "Adv. Sudhir Dixit",
    executionDate: "2026-04-19",
  },
  {
    id: "AGR-2026-103",
    agreementNo: "BBA/VRN-COMM/2026/019",
    customerName: "Manish Agarwal",
    customerPhone: "+91 98380 54321",
    projectName: "Vrindavan Commercial Plaza",
    unitNo: "Retail Shop G-12",
    agreementValue: 18000000,
    stampDutyAmount: 1260000,
    eStampNumber: "IN-UP77192830112938C",
    draftStatus: "Signed & Executed",
    assignedAdvocate: "Adv. Meenakshi Rai",
    executionDate: "2026-04-16",
  },
  {
    id: "AGR-2026-104",
    agreementNo: "BBA/VRN-ROY/2026/064",
    customerName: "Dr. K. K. Srivastava",
    customerPhone: "+91 97930 45678",
    projectName: "Vrindavan Royale",
    unitNo: "Tower B, Unit 804",
    agreementValue: 6800000,
    stampDutyAmount: 476000,
    eStampNumber: "Pending Purchase",
    draftStatus: "Draft Prepared",
    assignedAdvocate: "Adv. Meenakshi Rai",
    executionDate: "2026-04-20",
  },
];

export const mockRegistryRecords: RegistryRecord[] = [
  {
    id: "REG-01",
    docketNo: "REG-DOC-2026-882",
    buyerName: "Manish Agarwal",
    unitNumber: "Shop G-12",
    projectName: "Vrindavan Commercial Plaza",
    subRegistrarOffice: "Sub-Registrar Office II, Sadar, Lucknow",
    appointmentDate: "2026-04-22 (11:00 AM)",
    challanAmount: 1260000,
    eRegistrationFee: 180000,
    status: "Appointment Booked",
    advocateInCharge: "Adv. Sudhir Dixit",
  },
  {
    id: "REG-02",
    docketNo: "REG-DOC-2026-879",
    buyerName: "Alok Gupta & Nidhi Gupta",
    unitNumber: "Tower 1, Flat 402",
    projectName: "Vrindavan Heights",
    subRegistrarOffice: "Sub-Registrar Office IV, Mohanlalganj, Lucknow",
    appointmentDate: "2026-04-15",
    challanAmount: 580000,
    eRegistrationFee: 85000,
    status: "Deed Registered & Sealed",
    advocateInCharge: "Adv. Meenakshi Rai",
  },
  {
    id: "REG-03",
    docketNo: "REG-DOC-2026-875",
    buyerName: "Gaurav Mehrotra",
    unitNumber: "Villa 09",
    projectName: "Vrindavan Green Valley",
    subRegistrarOffice: "Sub-Registrar Office IV, Mohanlalganj, Lucknow",
    appointmentDate: "2026-04-10",
    challanAmount: 1575000,
    eRegistrationFee: 225000,
    status: "Khatauni Mutation Done",
    advocateInCharge: "Adv. Sudhir Dixit",
  },
];

export const mockReraFilings: ReraFiling[] = [
  {
    id: "RERA-01",
    project: "Vrindavan Heights (Phase 1 & 2)",
    reraRegistrationNo: "UPRERAPRJ882419",
    quarterPeriod: "Q3 (Oct - Dec 2025)",
    caEscrowCertificate: "Uploaded & Valid",
    architectProgressCert: "Certified",
    engineerProgressCert: "Certified",
    filingStatus: "Compliant & Acknowledged",
    submittedOn: "2026-01-14",
  },
  {
    id: "RERA-02",
    project: "Vrindavan Green Valley Villas",
    reraRegistrationNo: "UPRERAPRJ993102",
    quarterPeriod: "Q3 (Oct - Dec 2025)",
    caEscrowCertificate: "Uploaded & Valid",
    architectProgressCert: "Certified",
    engineerProgressCert: "Certified",
    filingStatus: "Compliant & Acknowledged",
    submittedOn: "2026-01-12",
  },
  {
    id: "RERA-03",
    project: "Vrindavan Commercial Plaza",
    reraRegistrationNo: "UPRERAPRJ660412",
    quarterPeriod: "Q4 (Jan - Mar 2026)",
    caEscrowCertificate: "Pending CA Sign",
    architectProgressCert: "Certified",
    engineerProgressCert: "Certified",
    filingStatus: "Review Required",
    submittedOn: "2026-04-18",
  },
];

export const mockNocClearances: NocClearance[] = [
  {
    id: "NOC-01",
    certificateName: "Provisional & Final Fire Safety NOC",
    issuingAuthority: "Directorate of Fire Services, Uttar Pradesh",
    project: "Vrindavan Heights",
    clearanceNumber: "UPFS/LKO/NOC/2024/9912",
    issueDate: "2024-06-15",
    validUntil: "2027-06-14",
    status: "Active & Valid",
    complianceOfficer: "Er. Amit Srivastav",
  },
  {
    id: "NOC-02",
    certificateName: "Height Clearance Certificate (110m AGL)",
    issuingAuthority: "Airports Authority of India (AAI NOC)",
    project: "Vrindavan Heights",
    clearanceNumber: "AAI/NR/LKO/HEIGHT/2023/1829",
    issueDate: "2023-11-20",
    validUntil: "2031-11-19",
    status: "Active & Valid",
    complianceOfficer: "Adv. Sudhir Dixit",
  },
  {
    id: "NOC-03",
    certificateName: "State Environmental Impact Assessment (SEIAA)",
    issuingAuthority: "Ministry of Environment, Forest & Climate Change",
    project: "Vrindavan Green Valley",
    clearanceNumber: "SEIAA/UP/ENV/2023/7810",
    issueDate: "2023-08-10",
    validUntil: "2030-08-09",
    status: "Active & Valid",
    complianceOfficer: "Adv. Meenakshi Rai",
  },
  {
    id: "NOC-04",
    certificateName: "Lucknow Development Authority (LDA) Sanctioned Layout",
    issuingAuthority: "Lucknow Development Authority (Town Planning)",
    project: "Vrindavan Heights",
    clearanceNumber: "LDA/MAP/RES/2023/5401",
    issueDate: "2023-04-12",
    validUntil: "2028-04-11",
    status: "Active & Valid",
    complianceOfficer: "Adv. Sudhir Dixit",
  },
];

export const mockLegalVault: LegalVaultDoc[] = [
  {
    id: "VD-01",
    title: "30-Year Comprehensive Title Search & Legal Opinion Report",
    category: "Parent Title Deed",
    fileSize: "14.2 MB",
    updatedOn: "2026-01-20",
    confidentiality: "Level 1 - Public RERA",
    verifiedBy: "Senior Advocate K. L. Sharma",
  },
  {
    id: "VD-02",
    title: "Section 143 UP ZALR Non-Agricultural Conversion Order",
    category: "Land Revenue Orders",
    fileSize: "4.8 MB",
    updatedOn: "2024-03-12",
    confidentiality: "Level 2 - Purchaser Access",
    verifiedBy: "Sub-Divisional Magistrate (Mohanlalganj)",
  },
  {
    id: "VD-03",
    title: "HDFC Bank & SBI Project Approval Approved Title Deeds",
    category: "Banking NOC",
    fileSize: "8.5 MB",
    updatedOn: "2025-05-18",
    confidentiality: "Level 2 - Purchaser Access",
    verifiedBy: "SBI Real Estate Legal Panel",
  },
  {
    id: "VD-04",
    title: "Approved Architectural Master Layout & Structural Vetting",
    category: "Government Sanctions",
    fileSize: "28.4 MB",
    updatedOn: "2024-09-05",
    confidentiality: "Level 1 - Public RERA",
    verifiedBy: "IIT Roorkee Structural Panel",
  },
];

export const legalService = {
  getKpi: () => mockLegalKpi,
  getAgreements: () => mockAgreements,
  getRegistry: () => mockRegistryRecords,
  getRera: () => mockReraFilings,
  getNoc: () => mockNocClearances,
  getVault: () => mockLegalVault,
};
