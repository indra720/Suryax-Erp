// src/lib/services/marketing.ts
// Service & Mock Data for Marketing Portal

export interface MarketingKpi {
  totalLeads: number;
  totalLeadsGrowth: number;
  costPerLead: number;
  cplReduction: number;
  activeCampaigns: number;
  conversionRate: number;
  totalAdSpend: number;
  roiMultiplier: number;
  siteVisitsBooked: number;
  bestSource: string;
}

export interface Campaign {
  id: string;
  name: string;
  project: string;
  platform: "Google Ads" | "Meta (FB/IG)" | "99acres" | "MagicBricks" | "WhatsApp" | "LinkedIn";
  status: "Active" | "Scheduled" | "Completed" | "Paused";
  budget: number;
  spent: number;
  leadsGenerated: number;
  cpl: number;
  roi: number;
  startDate: string;
  endDate: string;
}

export interface LeadSourceStat {
  source: string;
  leads: number;
  sharePercentage: number;
  cpl: number;
  color: string;
}

export interface WeeklyTrend {
  week: string;
  leads: number;
  visits: number;
  bookings: number;
  spend: number;
}

export interface SocialPost {
  id: string;
  title: string;
  platform: "Instagram" | "Facebook" | "LinkedIn" | "YouTube";
  scheduledDate: string;
  status: "Published" | "Scheduled" | "Draft";
  reach: number;
  engagement: number;
  clicks: number;
}

export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  project: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  status: "Live" | "Draft" | "Archived";
  updatedAt: string;
}

export interface MarketingEvent {
  id: string;
  name: string;
  type: "Site Visit Drive" | "Channel Partner Meet" | "NRI Webinar" | "Property Expo";
  eventDate: string;
  location: string;
  registrations: number;
  confirmedAttendance: number;
  status: "Upcoming" | "Completed" | "Planning";
}

export interface MediaAsset {
  id: string;
  title: string;
  category: "Brochure" | "Floor Plan" | "Walkthrough Video" | "Banner Ad" | "Price List";
  format: "PDF" | "MP4" | "JPG/PNG" | "ZIP";
  size: string;
  downloadCount: number;
  uploadDate: string;
}

export interface MarketingTask {
  id: string;
  task: string;
  assignee: string;
  platform: string;
  priority: "High" | "Medium" | "Urgent" | "Low";
  status: "To Do" | "In Progress" | "Review" | "Done";
  deadline: string;
}

// Initial Mock Data
export const initialMarketingKpis: MarketingKpi = {
  totalLeads: 2840,
  totalLeadsGrowth: 18.4,
  costPerLead: 420,
  cplReduction: 11.8,
  activeCampaigns: 14,
  conversionRate: 8.6,
  totalAdSpend: 1192800,
  roiMultiplier: 5.2,
  siteVisitsBooked: 326,
  bestSource: "Google Search (High Intent)",
};

export const initialLeadSources: LeadSourceStat[] = [
  { source: "Google Ads", leads: 980, sharePercentage: 34.5, cpl: 460, color: "#4f20d8" },
  { source: "Meta (FB & IG)", leads: 750, sharePercentage: 26.4, cpl: 380, color: "#2459d6" },
  { source: "99acres & MagicBricks", leads: 560, sharePercentage: 19.7, cpl: 410, color: "#10b981" },
  { source: "WhatsApp Broadcast", leads: 340, sharePercentage: 12.0, cpl: 180, color: "#f59e0b" },
  { source: "Organic & Direct", leads: 210, sharePercentage: 7.4, cpl: 0, color: "#8b5cf6" },
];

export const initialWeeklyTrends: WeeklyTrend[] = [
  { week: "Week 1", leads: 520, visits: 64, bookings: 14, spend: 220000 },
  { week: "Week 2", leads: 680, visits: 78, bookings: 19, spend: 285000 },
  { week: "Week 3", leads: 790, visits: 89, bookings: 21, spend: 310000 },
  { week: "Week 4", leads: 850, visits: 95, bookings: 24, spend: 377800 },
];

export const initialCampaigns: Campaign[] = [
  {
    id: "CMP-101",
    name: "Vrindavan Heights Luxury 3BHK Launch",
    project: "Vrindavan Heights",
    platform: "Google Ads",
    status: "Active",
    budget: 350000,
    spent: 298000,
    leadsGenerated: 692,
    cpl: 430,
    roi: 5.8,
    startDate: "2026-03-01",
    endDate: "2026-04-15",
  },
  {
    id: "CMP-102",
    name: "Green Valley Forest Villas Early Bird",
    project: "Green Valley Villas",
    platform: "Meta (FB/IG)",
    status: "Active",
    budget: 280000,
    spent: 245000,
    leadsGenerated: 645,
    cpl: 380,
    roi: 6.2,
    startDate: "2026-03-05",
    endDate: "2026-04-20",
  },
  {
    id: "CMP-103",
    name: "Cyber Park Commercial Tech Hub",
    project: "Vrindavan Cyber Tower",
    platform: "LinkedIn",
    status: "Active",
    budget: 250000,
    spent: 210000,
    leadsGenerated: 312,
    cpl: 673,
    roi: 4.4,
    startDate: "2026-03-10",
    endDate: "2026-04-30",
  },
  {
    id: "CMP-104",
    name: "Affordable Plotting Festive Carnival",
    project: "Radha Govind City",
    platform: "99acres",
    status: "Active",
    budget: 180000,
    spent: 165000,
    leadsGenerated: 480,
    cpl: 343,
    roi: 5.1,
    startDate: "2026-03-12",
    endDate: "2026-04-25",
  },
  {
    id: "CMP-105",
    name: "VIP Direct Walk-in WhatsApp Blitz",
    project: "Vrindavan Grandeur",
    platform: "WhatsApp",
    status: "Completed",
    budget: 80000,
    spent: 78500,
    leadsGenerated: 390,
    cpl: 201,
    roi: 7.9,
    startDate: "2026-02-15",
    endDate: "2026-03-15",
  },
  {
    id: "CMP-106",
    name: "NRI Investment Virtual Expo",
    project: "All Premium Projects",
    platform: "Meta (FB/IG)",
    status: "Scheduled",
    budget: 400000,
    spent: 0,
    leadsGenerated: 0,
    cpl: 0,
    roi: 0,
    startDate: "2026-04-20",
    endDate: "2026-05-10",
  },
];

export const initialFunnelData = [
  { stage: "Impressions", count: 480000, color: "#6732f2" },
  { stage: "Ad Clicks / Visits", count: 28400, color: "#4f20d8" },
  { stage: "Verified Leads", count: 2840, color: "#2459d6" },
  { stage: "Connected & Qualified", count: 1420, color: "#06b6d4" },
  { stage: "Site Visits Scheduled", count: 680, color: "#10b981" },
  { stage: "Site Visits Done", count: 326, color: "#f59e0b" },
  { stage: "Final Unit Bookings", count: 78, color: "#ef4444" },
];

export const initialLandingPages: LandingPage[] = [
  {
    id: "LP-01",
    title: "Vrindavan Heights - Luxury 3 BHK Living",
    slug: "vrindavan-heights-exclusive",
    project: "Vrindavan Heights",
    visitors: 12450,
    conversions: 890,
    conversionRate: 7.15,
    status: "Live",
    updatedAt: "2026-04-10",
  },
  {
    id: "LP-02",
    title: "Green Valley Luxury Villas Phase 2",
    slug: "green-valley-villas",
    project: "Green Valley Villas",
    visitors: 9800,
    conversions: 820,
    conversionRate: 8.37,
    status: "Live",
    updatedAt: "2026-04-12",
  },
  {
    id: "LP-03",
    title: "Vrindavan Cyber Tower - High ROI Retail & IT Office",
    slug: "cyber-tower-commercial",
    project: "Cyber Tower",
    visitors: 4500,
    conversions: 360,
    conversionRate: 8.0,
    status: "Live",
    updatedAt: "2026-04-14",
  },
];

export const initialSocialPosts: SocialPost[] = [
  {
    id: "SOC-01",
    title: "Exclusive Drone Tour: Vrindavan Heights Construction Progress",
    platform: "YouTube",
    scheduledDate: "2026-04-18 10:00 AM",
    status: "Scheduled",
    reach: 0,
    engagement: 0,
    clicks: 0,
  },
  {
    id: "SOC-02",
    title: "Sunday Open House: Complimentary Site Visit with Pickup",
    platform: "Instagram",
    scheduledDate: "2026-04-15 09:30 AM",
    status: "Published",
    reach: 24500,
    engagement: 1820,
    clicks: 412,
  },
  {
    id: "SOC-03",
    title: "Why Vrindavan Commercial Towers are giving 9.8% Rental Yield",
    platform: "LinkedIn",
    scheduledDate: "2026-04-14 02:00 PM",
    status: "Published",
    reach: 18400,
    engagement: 920,
    clicks: 340,
  },
];

export const initialEvents: MarketingEvent[] = [
  {
    id: "EVT-01",
    name: "Mega Sunday Site Visit Drive - 50 Cars Scheduled",
    type: "Site Visit Drive",
    eventDate: "2026-04-20",
    location: "Vrindavan Heights Site Office",
    registrations: 94,
    confirmedAttendance: 76,
    status: "Upcoming",
  },
  {
    id: "EVT-02",
    name: "Top 100 Channel Partners & Brokers Felicitation Meet",
    type: "Channel Partner Meet",
    eventDate: "2026-04-26",
    location: "Hotel Grand Palace Auditorium",
    registrations: 140,
    confirmedAttendance: 118,
    status: "Planning",
  },
  {
    id: "EVT-03",
    name: "Middle East NRI Virtual Investment Showcase",
    type: "NRI Webinar",
    eventDate: "2026-05-02",
    location: "Zoom Virtual Platform",
    registrations: 310,
    confirmedAttendance: 240,
    status: "Planning",
  },
];

export const initialMediaAssets: MediaAsset[] = [
  {
    id: "MED-01",
    title: "Vrindavan Heights - Official Master Brochure & Specification Sheet",
    category: "Brochure",
    format: "PDF",
    size: "14.2 MB",
    downloadCount: 1480,
    uploadDate: "2026-03-10",
  },
  {
    id: "MED-02",
    title: "Green Valley Villas - 4BHK 3D Virtual Walkthrough",
    category: "Walkthrough Video",
    format: "MP4",
    size: "42.8 MB",
    downloadCount: 960,
    uploadDate: "2026-03-22",
  },
  {
    id: "MED-03",
    title: "Unit Layouts & Floor Plans All Towers (A, B, C)",
    category: "Floor Plan",
    format: "PDF",
    size: "8.6 MB",
    downloadCount: 2150,
    uploadDate: "2026-03-15",
  },
  {
    id: "MED-04",
    title: "Digital Display Ad Creatives (1080x1080 & 1920x1080 Pack)",
    category: "Banner Ad",
    format: "ZIP",
    size: "54.1 MB",
    downloadCount: 340,
    uploadDate: "2026-04-01",
  },
];

export const initialMarketingTasks: MarketingTask[] = [
  {
    id: "TSK-01",
    task: "Design Meta carousel banners for Akshaya Tritiya special discount",
    assignee: "Rahul Sharma (Designer)",
    platform: "Meta Ads",
    priority: "Urgent",
    status: "In Progress",
    deadline: "2026-04-18",
  },
  {
    id: "TSK-02",
    task: "Optimize Google search keywords to target negative intent searches",
    assignee: "Priya Varma (PPC Specialist)",
    platform: "Google Ads",
    priority: "High",
    status: "To Do",
    deadline: "2026-04-19",
  },
  {
    id: "TSK-03",
    task: "Coordinate with drone videographer for Tower B roof slab casting footage",
    assignee: "Arun Mehra (Content)",
    platform: "YouTube",
    priority: "Medium",
    status: "Done",
    deadline: "2026-04-16",
  },
];
