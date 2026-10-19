// src/lib/services/site-engineer.ts
// Data & Mock Service for Site Engineer / Construction Portal

export interface EngineerKpi {
  overallCompletionPct: number;
  activeLaborOnSite: number;
  concretePouredMTD: number; // in Cubic Meters
  accidentFreeDays: number;
  activeTowersCount: number;
  openMaterialIndents: number;
  qualityAuditsPassed: number;
  currentMilestone: string;
}

export interface TowerProgress {
  id: string;
  projectName: string;
  towerName: string;
  totalFloors: number;
  floorsCasted: number;
  currentActivity: string;
  targetHandover: string;
  overallPercent: number;
  structureStatus: "Foundation" | "Slab Casting" | "Brickwork" | "Finishing" | "Ready for Possession";
}

export interface FloorMatrixItem {
  id: string;
  tower: string;
  floor: string;
  rccSlab: "Completed" | "Curing" | "In Progress" | "Pending";
  brickwork: "Completed" | "In Progress" | "Pending";
  plumbing: "Completed" | "In Progress" | "Pending";
  electrical: "Completed" | "In Progress" | "Pending";
  flooringTiling: "Completed" | "In Progress" | "Pending";
  lastInspected: string;
}

export interface Contractor {
  id: string;
  agencyName: string;
  trade: "RCC & Civil" | "Electrical & Substation" | "Plumbing & Firefighting" | "Carpentry & Aluminum Glazing" | "Painting & Waterproofing";
  supervisorName: string;
  supervisorPhone: string;
  allocatedWorkers: number;
  presentToday: number;
  performanceScore: number; // %
  complianceStatus: "Compliant" | "Safety Warning" | "Under Review";
}

export interface MaterialItem {
  id: string;
  materialName: string;
  category: "Cement" | "Steel & Rebars" | "Aggregates & Sand" | "AAC Blocks & Bricks" | "Chemicals & Waterproofing";
  currentStock: number;
  unit: string;
  minimumThreshold: number;
  status: "Adequate" | "Reorder Required" | "Shipment En Route";
  lastDeliveredDate: string;
  preferredSupplier: string;
}

export interface DailyReport {
  id: string;
  dprCode: string;
  reportDate: string;
  weatherCondition: "Clear & Sunny (36°C)" | "Partly Cloudy (32°C)" | "Light Rain (28°C)";
  shift: "Morning (08:00 - 17:00)" | "Night (19:00 - 04:00)";
  majorWorkDone: string;
  machineryActive: string;
  hindrances: string;
  engineerSignoff: string;
  status: "Approved" | "Draft";
}

export interface SitePhoto {
  id: string;
  title: string;
  tower: string;
  floorZone: string;
  capturedDate: string;
  category: "Quality Inspection" | "RCC Pouring" | "Safety Audit" | "Aerial Drone";
  remarks: string;
  engineerName: string;
}

export const mockEngineerKpi: EngineerKpi = {
  overallCompletionPct: 71.4,
  activeLaborOnSite: 412,
  concretePouredMTD: 1850,
  accidentFreeDays: 485,
  activeTowersCount: 4,
  openMaterialIndents: 2,
  qualityAuditsPassed: 98.2,
  currentMilestone: "Tower A 16th Floor Slab & Club House Dome Casting",
};

export const mockTowersProgress: TowerProgress[] = [
  {
    id: "TWR-A",
    projectName: "Vrindavan Heights",
    towerName: "Tower A (Skyline Crest)",
    totalFloors: 22,
    floorsCasted: 16,
    currentActivity: "16th Floor Shuttering & Rebar Binding",
    targetHandover: "Dec 2026",
    overallPercent: 74,
    structureStatus: "Slab Casting",
  },
  {
    id: "TWR-B",
    projectName: "Vrindavan Heights",
    towerName: "Tower B (Imperial Heights)",
    totalFloors: 22,
    floorsCasted: 22,
    currentActivity: "18th Floor Internal Plastering & Conduit Laying",
    targetHandover: "Aug 2026",
    overallPercent: 88,
    structureStatus: "Finishing",
  },
  {
    id: "TWR-C",
    projectName: "Vrindavan Heights",
    towerName: "Tower C (Royal Pavilion)",
    totalFloors: 18,
    floorsCasted: 11,
    currentActivity: "11th Floor Concrete Pouring (M35 Grade)",
    targetHandover: "Mar 2027",
    overallPercent: 58,
    structureStatus: "Slab Casting",
  },
  {
    id: "VIL-GV",
    projectName: "Vrindavan Green Valley",
    towerName: "Phase 1 Luxury Villas (Row 1-5)",
    totalFloors: 3,
    floorsCasted: 3,
    currentActivity: "Teakwood Door Frames & Italian Marble Flooring",
    targetHandover: "May 2026",
    overallPercent: 92,
    structureStatus: "Ready for Possession",
  },
];

export const mockFloorMatrix: FloorMatrixItem[] = [
  { id: "FM-01", tower: "Tower A", floor: "Floor 16", rccSlab: "In Progress", brickwork: "Pending", plumbing: "Pending", electrical: "Pending", flooringTiling: "Pending", lastInspected: "2026-04-19" },
  { id: "FM-02", tower: "Tower A", floor: "Floor 15", rccSlab: "Completed", brickwork: "In Progress", plumbing: "Pending", electrical: "Pending", flooringTiling: "Pending", lastInspected: "2026-04-18" },
  { id: "FM-03", tower: "Tower A", floor: "Floor 14", rccSlab: "Completed", brickwork: "Completed", plumbing: "In Progress", electrical: "In Progress", flooringTiling: "Pending", lastInspected: "2026-04-16" },
  { id: "FM-04", tower: "Tower B", floor: "Floor 20", rccSlab: "Completed", brickwork: "Completed", plumbing: "Completed", electrical: "Completed", flooringTiling: "In Progress", lastInspected: "2026-04-19" },
  { id: "FM-05", tower: "Tower B", floor: "Floor 18", rccSlab: "Completed", brickwork: "Completed", plumbing: "Completed", electrical: "Completed", flooringTiling: "Completed", lastInspected: "2026-04-15" },
];

export const mockContractors: Contractor[] = [
  {
    id: "CON-01",
    agencyName: "Larsen Infra Structures Ltd",
    trade: "RCC & Civil",
    supervisorName: "Er. Rameshwar Dayal",
    supervisorPhone: "+91 98391 12389",
    allocatedWorkers: 190,
    presentToday: 182,
    performanceScore: 96,
    complianceStatus: "Compliant",
  },
  {
    id: "CON-02",
    agencyName: "Sterling MEP Engineers",
    trade: "Electrical & Substation",
    supervisorName: "Mohd. Aslam",
    supervisorPhone: "+91 94152 77812",
    allocatedWorkers: 65,
    presentToday: 61,
    performanceScore: 92,
    complianceStatus: "Compliant",
  },
  {
    id: "CON-03",
    agencyName: "Ganga Sanitary & Pipeline Solutions",
    trade: "Plumbing & Firefighting",
    supervisorName: "Santosh Dwivedi",
    supervisorPhone: "+91 97933 66120",
    allocatedWorkers: 50,
    presentToday: 48,
    performanceScore: 94,
    complianceStatus: "Compliant",
  },
  {
    id: "CON-04",
    agencyName: "National Aluminum & Glazing Corp",
    trade: "Carpentry & Aluminum Glazing",
    supervisorName: "Harbhajan Singh",
    supervisorPhone: "+91 99182 33410",
    allocatedWorkers: 45,
    presentToday: 41,
    performanceScore: 88,
    complianceStatus: "Compliant",
  },
];

export const mockMaterials: MaterialItem[] = [
  {
    id: "MAT-01",
    materialName: "OPC 53 Grade Ultratech Cement",
    category: "Cement",
    currentStock: 2450,
    unit: "Bags (50 kg)",
    minimumThreshold: 800,
    status: "Adequate",
    lastDeliveredDate: "2026-04-17",
    preferredSupplier: "UltraTech ReadyMix Lucknow",
  },
  {
    id: "MAT-02",
    materialName: "Tata Tiscon Fe550D TMT Rebar (16mm & 20mm)",
    category: "Steel & Rebars",
    currentStock: 34.5,
    unit: "Metric Tons",
    minimumThreshold: 15.0,
    status: "Adequate",
    lastDeliveredDate: "2026-04-14",
    preferredSupplier: "Tata Steel Authorized Stockist",
  },
  {
    id: "MAT-03",
    materialName: "Coarse River Sand (Zone II)",
    category: "Aggregates & Sand",
    currentStock: 420,
    unit: "Cubic Feet",
    minimumThreshold: 800,
    status: "Reorder Required",
    lastDeliveredDate: "2026-04-10",
    preferredSupplier: "Yamuna Sand Fleet Supplier",
  },
  {
    id: "MAT-04",
    materialName: "Autoclaved Aerated Concrete (AAC) Blocks",
    category: "AAC Blocks & Bricks",
    currentStock: 8200,
    unit: "Blocks",
    minimumThreshold: 3000,
    status: "Adequate",
    lastDeliveredDate: "2026-04-16",
    preferredSupplier: "Magicrete Blocks Depot",
  },
  {
    id: "MAT-05",
    materialName: "Fosroc Nitoproof Waterproofing Membrane",
    category: "Chemicals & Waterproofing",
    currentStock: 18,
    unit: "Drums (200L)",
    minimumThreshold: 20,
    status: "Shipment En Route",
    lastDeliveredDate: "2026-04-08",
    preferredSupplier: "Fosroc Chemicals India",
  },
];

export const mockDailyReports: DailyReport[] = [
  {
    id: "DPR-2026-0419",
    dprCode: "DPR/HGT/2026/0419",
    reportDate: "2026-04-19",
    weatherCondition: "Clear & Sunny (36°C)",
    shift: "Morning (08:00 - 17:00)",
    majorWorkDone: "Completed shuttering for 16th floor Tower A. Casted 6 columns with M35 concrete. Installed CPVC plumbing lines in Tower B floors 14-16.",
    machineryActive: "2x Tower Cranes, 1x Batching Plant, 2x Concrete Boom Placers, 1x Diesel Generator 250kVA",
    hindrances: "No hindrances recorded. All concrete cube testing samples within 28-day target strength.",
    engineerSignoff: "Er. Indrajeet Verma (Lead Site Engineer)",
    status: "Approved",
  },
  {
    id: "DPR-2026-0418",
    dprCode: "DPR/HGT/2026/0418",
    reportDate: "2026-04-18",
    weatherCondition: "Clear & Sunny (36°C)",
    shift: "Morning (08:00 - 17:00)",
    majorWorkDone: "Steel binding for Tower C 11th floor slab completed. Tower B electrical conduit routing verified by consultant architect.",
    machineryActive: "2x Tower Cranes, 1x Batching Plant",
    hindrances: "River sand delivery delayed by 3 hours due to highway traffic restrictions.",
    engineerSignoff: "Er. Indrajeet Verma",
    status: "Approved",
  },
];

export const mockSitePhotos: SitePhoto[] = [
  {
    id: "SPH-01",
    title: "Tower A 16th Floor Rebar Verification & Column Placement",
    tower: "Tower A",
    floorZone: "16th Floor Slab - Zone 2",
    capturedDate: "2026-04-19",
    category: "Quality Inspection",
    remarks: "Spacing check verified at 150mm c/c. Cover blocks of 25mm placed uniformly.",
    engineerName: "Er. Indrajeet Verma",
  },
  {
    id: "SPH-02",
    title: "Clubhouse Olympic Swimming Pool Deck Waterproofing",
    tower: "Amenities Wing",
    floorZone: "Ground Terrace",
    capturedDate: "2026-04-18",
    category: "Quality Inspection",
    remarks: "72-hour ponding test successful. No seepage detected on lower slab.",
    engineerName: "Er. Rameshwar Dayal",
  },
  {
    id: "SPH-03",
    title: "High-Resolution Drone Orthomosaic Panorama of Site",
    tower: "Entire Project Campus",
    floorZone: "Aerial Survey 120m AGL",
    capturedDate: "2026-04-15",
    category: "Aerial Drone",
    remarks: "Perimeter boundary secure, internal 40-ft bitumen road laying 80% complete.",
    engineerName: "Drone Pilot Survey Team",
  },
];

export const siteEngineerService = {
  getKpi: () => mockEngineerKpi,
  getTowers: () => mockTowersProgress,
  getFloorMatrix: () => mockFloorMatrix,
  getContractors: () => mockContractors,
  getMaterials: () => mockMaterials,
  getDailyReports: () => mockDailyReports,
  getPhotos: () => mockSitePhotos,
};
