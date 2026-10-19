// src/lib/services/accountant.ts
// Service & Mock Data for Accountant Portal

export interface AccountantKpi {
  totalRevenue: number;
  collectionsToday: number;
  pendingDues: number;
  overdueAmount: number;
  commissionPayable: number;
  monthlyExpenses: number;
  netProfit: number;
  gstPayable: number;
}

export interface BookingPayment {
  id: string;
  receiptNo: string;
  clientName: string;
  phone: string;
  unitNo: string;
  project: string;
  amount: number;
  paymentMode: "Cheque" | "NEFT/RTGS" | "UPI" | "Demand Draft" | "Card";
  bankRef: string;
  date: string;
  status: "Cleared" | "Pending Clearance" | "Bounced" | "Refunded";
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  clientName: string;
  unitNo: string;
  project: string;
  date: string;
  dueDate: string;
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  status: "Paid" | "Unpaid" | "Partially Paid" | "Overdue";
}

export interface PaymentScheduleItem {
  id: string;
  clientName: string;
  unitNo: string;
  project: string;
  milestone: string;
  percentage: number;
  dueDate: string;
  dueAmount: number;
  paidAmount: number;
  status: "Completed" | "Pending" | "Upcoming" | "Overdue";
}

export interface PendingDue {
  id: string;
  clientName: string;
  phone: string;
  unitNo: string;
  project: string;
  amountDue: number;
  dueDate: string;
  daysOverdue: number;
  lastReminderDate: string;
  status: "Critical" | "Warning" | "Grace Period";
}

export interface BrokerCommission {
  id: string;
  brokerName: string;
  agency: string;
  bookingRef: string;
  unitNo: string;
  project: string;
  bookingValue: number;
  commissionPercentage: number;
  commissionAmount: number;
  paidAmount: number;
  balancePayable: number;
  status: "Approved" | "Pending Approval" | "Paid" | "On Hold";
  dueDate: string;
}

export interface VendorExpense {
  id: string;
  voucherNo: string;
  vendorName: string;
  category: "Construction Material" | "Contractor Fees" | "Marketing & Ads" | "Legal & Statutory" | "Office Admin";
  invoiceRef: string;
  amount: number;
  date: string;
  paymentMode: "Bank Transfer" | "Cheque" | "Online";
  status: "Approved" | "Pending Approval" | "Processed";
}

export interface PayrollSyncItem {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  month: string;
  grossSalary: number;
  deductions: number;
  incentives: number;
  netPayable: number;
  status: "Verified" | "Pending HR Confirmation" | "Disbursed";
}

export interface GstTaxReport {
  period: string;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  itcClaimed: number;
  netGstPayable: number;
  status: "Filed" | "Ready to File" | "Draft";
}

export interface BankReconciliationItem {
  id: string;
  bankName: string;
  accountNumber: string;
  bookBalance: number;
  bankBalance: number;
  uncreditedCheques: number;
  unpresentedCheques: number;
  difference: number;
  reconciliationDate: string;
  status: "Balanced" | "Attention Required";
}

export interface LedgerEntry {
  id: string;
  date: string;
  voucherNo: string;
  accountHead: string;
  particulars: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface RefundCancellation {
  id: string;
  bookingId: string;
  clientName: string;
  unitNo: string;
  project: string;
  totalPaid: number;
  deductionAmount: number;
  netRefundAmount: number;
  requestDate: string;
  approvalDate: string;
  status: "Approved" | "Processing" | "Completed" | "Rejected";
}

// Initial Mock Data
export const initialAccountantKpi: AccountantKpi = {
  totalRevenue: 184000000,
  collectionsToday: 1450000,
  pendingDues: 28000000,
  overdueAmount: 6820000,
  commissionPayable: 1940000,
  monthlyExpenses: 3280000,
  netProfit: 42000000,
  gstPayable: 2850000,
};

export const initialMonthlyCollections = [
  { month: "Jan", target: 20000000, collected: 21500000 },
  { month: "Feb", target: 22000000, collected: 23200000 },
  { month: "Mar", target: 25000000, collected: 28400000 },
  { month: "Apr", target: 30000000, collected: 31200000 },
  { month: "May", target: 32000000, collected: 34800000 },
];

export const initialRevenueByProject = [
  { project: "Vrindavan Heights", revenue: 82000000, percentage: 44.5, color: "#4f20d8" },
  { project: "Green Valley Forest Villas", revenue: 54000000, percentage: 29.3, color: "#2459d6" },
  { project: "Cyber Techpark Tower", revenue: 31000000, percentage: 16.8, color: "#10b981" },
  { project: "Radha Govind City Plots", revenue: 17000000, percentage: 9.4, color: "#f59e0b" },
];

export const initialExpenseSplit = [
  { category: "Construction & Cement", amount: 14800000, color: "#4f20d8" },
  { category: "Contractor Labour", amount: 6400000, color: "#2459d6" },
  { category: "Channel Partner Commission", amount: 3900000, color: "#10b981" },
  { category: "Marketing & Lead Gen Ads", amount: 4800000, color: "#f59e0b" },
  { category: "Staff Salaries & Admin", amount: 2900000, color: "#ec4899" },
];

export const initialAgingReport = [
  { range: "0 - 30 Days (Current)", amount: 14500000, count: 24, color: "#10b981" },
  { range: "31 - 60 Days", amount: 6700000, count: 11, color: "#f59e0b" },
  { range: "61 - 90 Days", amount: 4200000, count: 5, color: "#ef4444" },
  { range: "90+ Days (Critical)", amount: 2600000, count: 2, color: "#7f1d1d" },
];

export const initialBookingPayments: BookingPayment[] = [
  {
    id: "PAY-901",
    receiptNo: "RCPT-2026-089",
    clientName: "Dr. Anirudh Kulkarni",
    phone: "+91 98234 11200",
    unitNo: "A-1204 (3 BHK)",
    project: "Vrindavan Heights",
    amount: 750000,
    paymentMode: "NEFT/RTGS",
    bankRef: "HDFC982341908",
    date: "2026-04-18",
    status: "Cleared",
  },
  {
    id: "PAY-902",
    receiptNo: "RCPT-2026-090",
    clientName: "Meenakshi Sundaram",
    phone: "+91 97110 54321",
    unitNo: "Villa-22 (4 BHK)",
    project: "Green Valley Villas",
    amount: 1500000,
    paymentMode: "Cheque",
    bankRef: "ICICI CHQ #002914",
    date: "2026-04-18",
    status: "Pending Clearance",
  },
  {
    id: "PAY-903",
    receiptNo: "RCPT-2026-091",
    clientName: "Vikas Aggarwal & Sons",
    phone: "+91 99880 12345",
    unitNo: "Office-402 (Commercial)",
    project: "Cyber Techpark Tower",
    amount: 1200000,
    paymentMode: "NEFT/RTGS",
    bankRef: "SBIN00481928",
    date: "2026-04-17",
    status: "Cleared",
  },
  {
    id: "PAY-904",
    receiptNo: "RCPT-2026-092",
    clientName: "Rameshwar Prasad",
    phone: "+91 98390 99881",
    unitNo: "Plot-108",
    project: "Radha Govind City",
    amount: 350000,
    paymentMode: "UPI",
    bankRef: "UPI/39102941029",
    date: "2026-04-17",
    status: "Cleared",
  },
  {
    id: "PAY-905",
    receiptNo: "RCPT-2026-093",
    clientName: "Kavita Singhal",
    phone: "+91 94150 77123",
    unitNo: "B-501 (2 BHK)",
    project: "Vrindavan Heights",
    amount: 450000,
    paymentMode: "Cheque",
    bankRef: "PNB CHQ #881230",
    date: "2026-04-15",
    status: "Bounced",
  },
];

export const initialInvoices: Invoice[] = [
  {
    id: "INV-101",
    invoiceNo: "INV-2026-0045",
    clientName: "Dr. Anirudh Kulkarni",
    unitNo: "A-1204",
    project: "Vrindavan Heights",
    date: "2026-04-10",
    dueDate: "2026-04-25",
    baseAmount: 1800000,
    gstAmount: 90000,
    totalAmount: 1890000,
    status: "Partially Paid",
  },
  {
    id: "INV-102",
    invoiceNo: "INV-2026-0046",
    clientName: "Meenakshi Sundaram",
    unitNo: "Villa-22",
    project: "Green Valley Villas",
    date: "2026-04-12",
    dueDate: "2026-04-27",
    baseAmount: 3200000,
    gstAmount: 160000,
    totalAmount: 3360000,
    status: "Unpaid",
  },
  {
    id: "INV-103",
    invoiceNo: "INV-2026-0047",
    clientName: "Sanjay Singhania",
    unitNo: "B-804",
    project: "Vrindavan Heights",
    date: "2026-04-01",
    dueDate: "2026-04-15",
    baseAmount: 1250000,
    gstAmount: 62500,
    totalAmount: 1312500,
    status: "Paid",
  },
  {
    id: "INV-104",
    invoiceNo: "INV-2026-0048",
    clientName: "Rajeev Goel",
    unitNo: "A-302",
    project: "Vrindavan Heights",
    date: "2026-03-20",
    dueDate: "2026-04-05",
    baseAmount: 950000,
    gstAmount: 47500,
    totalAmount: 997500,
    status: "Overdue",
  },
];

export const initialPaymentSchedules: PaymentScheduleItem[] = [
  {
    id: "SCH-01",
    clientName: "Dr. Anirudh Kulkarni",
    unitNo: "A-1204",
    project: "Vrindavan Heights",
    milestone: "On Booking Confirmation",
    percentage: 10,
    dueDate: "2026-01-15",
    dueAmount: 850000,
    paidAmount: 850000,
    status: "Completed",
  },
  {
    id: "SCH-02",
    clientName: "Dr. Anirudh Kulkarni",
    unitNo: "A-1204",
    project: "Vrindavan Heights",
    milestone: "On Completion of Plinth Level",
    percentage: 15,
    dueDate: "2026-03-10",
    dueAmount: 1275000,
    paidAmount: 1275000,
    status: "Completed",
  },
  {
    id: "SCH-03",
    clientName: "Dr. Anirudh Kulkarni",
    unitNo: "A-1204",
    project: "Vrindavan Heights",
    milestone: "On 7th Floor Slab Casting",
    percentage: 15,
    dueDate: "2026-04-25",
    dueAmount: 1275000,
    paidAmount: 750000,
    status: "Pending",
  },
  {
    id: "SCH-04",
    clientName: "Dr. Anirudh Kulkarni",
    unitNo: "A-1204",
    project: "Vrindavan Heights",
    milestone: "On Brickwork & Internal Plaster",
    percentage: 20,
    dueDate: "2026-06-30",
    dueAmount: 1700000,
    paidAmount: 0,
    status: "Upcoming",
  },
];

export const initialPendingDues: PendingDue[] = [
  {
    id: "DUE-01",
    clientName: "Rajeev Goel",
    phone: "+91 98112 00491",
    unitNo: "A-302 (3 BHK)",
    project: "Vrindavan Heights",
    amountDue: 997500,
    dueDate: "2026-04-05",
    daysOverdue: 13,
    lastReminderDate: "2026-04-16",
    status: "Critical",
  },
  {
    id: "DUE-02",
    clientName: "Deepak Chawla",
    phone: "+91 97200 44921",
    unitNo: "Tower B-902",
    project: "Vrindavan Heights",
    amountDue: 640000,
    dueDate: "2026-04-10",
    daysOverdue: 8,
    lastReminderDate: "2026-04-17",
    status: "Warning",
  },
  {
    id: "DUE-03",
    clientName: "Alok Narang",
    phone: "+91 98970 88219",
    unitNo: "Plot-44",
    project: "Radha Govind City",
    amountDue: 280000,
    dueDate: "2026-04-14",
    daysOverdue: 4,
    lastReminderDate: "2026-04-18",
    status: "Grace Period",
  },
];

export const initialBrokerCommissions: BrokerCommission[] = [
  {
    id: "COM-01",
    brokerName: "Sunil Bajaj",
    agency: "Apex Realtors Private Ltd",
    bookingRef: "BK-VH-1092",
    unitNo: "A-1204",
    project: "Vrindavan Heights",
    bookingValue: 8500000,
    commissionPercentage: 2.5,
    commissionAmount: 212500,
    paidAmount: 100000,
    balancePayable: 112500,
    status: "Approved",
    dueDate: "2026-04-25",
  },
  {
    id: "COM-02",
    brokerName: "Mahesh Chordia",
    agency: "Dream Home Advisors",
    bookingRef: "BK-GV-2041",
    unitNo: "Villa-22",
    project: "Green Valley Villas",
    bookingValue: 16000000,
    commissionPercentage: 3.0,
    commissionAmount: 480000,
    paidAmount: 0,
    balancePayable: 480000,
    status: "Pending Approval",
    dueDate: "2026-04-30",
  },
  {
    id: "COM-03",
    brokerName: "Pooja Malhotra",
    agency: "Key Stone Property Hub",
    bookingRef: "BK-CT-3081",
    unitNo: "Office-402",
    project: "Cyber Techpark Tower",
    bookingValue: 12000000,
    commissionPercentage: 2.0,
    commissionAmount: 240000,
    paidAmount: 240000,
    balancePayable: 0,
    status: "Paid",
    dueDate: "2026-04-10",
  },
];

export const initialVendorExpenses: VendorExpense[] = [
  {
    id: "VEXP-01",
    voucherNo: "VCH-2026-0182",
    vendorName: "UltraTech Cement Supplies",
    category: "Construction Material",
    invoiceRef: "UTC/INV/9921",
    amount: 850000,
    date: "2026-04-14",
    paymentMode: "Bank Transfer",
    status: "Processed",
  },
  {
    id: "VEXP-02",
    voucherNo: "VCH-2026-0183",
    vendorName: "Tata Tiscon TMT Steel Agency",
    category: "Construction Material",
    invoiceRef: "TTS/2026/0491",
    amount: 1420000,
    date: "2026-04-16",
    paymentMode: "Cheque",
    status: "Approved",
  },
  {
    id: "VEXP-03",
    voucherNo: "VCH-2026-0184",
    vendorName: "Google India Pvt Ltd (AdWords)",
    category: "Marketing & Ads",
    invoiceRef: "GOOG/APR/2026",
    amount: 350000,
    date: "2026-04-17",
    paymentMode: "Online",
    status: "Processed",
  },
];

export const initialPayrollSync: PayrollSyncItem[] = [
  {
    id: "PAYROLL-01",
    employeeId: "EMP-102",
    name: "Vikram Rathore",
    role: "Senior Sales Manager",
    department: "Sales",
    month: "March 2026",
    grossSalary: 65000,
    deductions: 5200,
    incentives: 28000,
    netPayable: 87800,
    status: "Disbursed",
  },
  {
    id: "PAYROLL-02",
    employeeId: "EMP-108",
    name: "Anjali Saxena",
    role: "Telecalling Lead",
    department: "Telecalling",
    month: "March 2026",
    grossSalary: 38000,
    deductions: 3200,
    incentives: 14500,
    netPayable: 49300,
    status: "Disbursed",
  },
  {
    id: "PAYROLL-03",
    employeeId: "EMP-114",
    name: "Rajeshwar Pandey",
    role: "Civil Site Engineer",
    department: "Construction",
    month: "March 2026",
    grossSalary: 52000,
    deductions: 4500,
    incentives: 5000,
    netPayable: 52500,
    status: "Disbursed",
  },
];

export const initialGstReports: GstTaxReport[] = [
  {
    period: "March 2026 (GSTR-3B)",
    taxableValue: 56800000,
    cgst: 1420000,
    sgst: 1420000,
    igst: 0,
    totalTax: 2840000,
    itcClaimed: 940000,
    netGstPayable: 1900000,
    status: "Filed",
  },
  {
    period: "April 2026 (Provisional)",
    taxableValue: 62400000,
    cgst: 1560000,
    sgst: 1560000,
    igst: 0,
    totalTax: 3120000,
    itcClaimed: 1120000,
    netGstPayable: 2000000,
    status: "Ready to File",
  },
];

export const initialBankReconciliation: BankReconciliationItem[] = [
  {
    id: "REC-01",
    bankName: "HDFC Bank (Escrow RERA A/c)",
    accountNumber: "50200039102914",
    bookBalance: 42800000,
    bankBalance: 43250000,
    uncreditedCheques: 1500000,
    unpresentedCheques: 1050000,
    difference: 0,
    reconciliationDate: "2026-04-18",
    status: "Balanced",
  },
  {
    id: "REC-02",
    bankName: "State Bank of India (Current A/c)",
    accountNumber: "389201940129",
    bookBalance: 12400000,
    bankBalance: 12400000,
    uncreditedCheques: 0,
    unpresentedCheques: 0,
    difference: 0,
    reconciliationDate: "2026-04-18",
    status: "Balanced",
  },
];

export const initialLedgerEntries: LedgerEntry[] = [
  {
    id: "LDG-01",
    date: "2026-04-18",
    voucherNo: "RCPT-089",
    accountHead: "Dr. Anirudh Kulkarni (Buyer)",
    particulars: "Installment against Unit A-1204 (7th Floor slab)",
    debit: 0,
    credit: 750000,
    balance: 750000,
  },
  {
    id: "LDG-02",
    date: "2026-04-17",
    voucherNo: "VCH-182",
    accountHead: "UltraTech Cement Supplies (Creditor)",
    particulars: "Payment via RTGS for 400 Bags Grade-53 Cement",
    debit: 850000,
    credit: 0,
    balance: -100000,
  },
  {
    id: "LDG-03",
    date: "2026-04-16",
    voucherNo: "RCPT-091",
    accountHead: "Vikas Aggarwal & Sons (Buyer)",
    particulars: "Commercial Office booking token amount",
    debit: 0,
    credit: 1200000,
    balance: 1100000,
  },
];
