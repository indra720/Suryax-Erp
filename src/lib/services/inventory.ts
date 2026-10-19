// src/lib/services/inventory.ts
// Data & Mock Service for Inventory / Property Manager Portal

export interface InventoryKpi {
  totalInventoryUnits: number;
  unitsAvailable: number;
  unitsSold: number;
  unitsOnHold: number;
  inventoryOccupancyRate: number; // %
  totalRealizedRevenue: number; // INR
  unsoldStockValue: number; // INR
  fastestSellingTower: string;
}

export interface InventoryProject {
  id: string;
  name: string;
  location: string;
  totalTowers: number;
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  heldUnits: number;
  reraNumber: string;
  launchDate: string;
  possessionTarget: string;
}

export interface InventoryTower {
  id: string;
  projectId: string;
  projectName: string;
  towerName: string;
  floorsCount: number;
  unitsPerFloor: number;
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  heldUnits: number;
  constructionStage: string;
}

export interface UnitGridItem {
  id: string;
  unitNo: string;
  tower: string;
  floor: number;
  unitType: "2 BHK" | "3 BHK" | "3 BHK + Servant" | "4 BHK Villa" | "Commercial Retail";
  superBuiltUpArea: number; // sq.ft
  carpetArea: number; // sq.ft
  facing: "Park Facing" | "Road Facing" | "Corner Lake View" | "Club Facing";
  basePrice: number; // INR
  totalCost: number; // INR
  status: "Available" | "Booked" | "On Hold" | "Management Blocked";
  customerName?: string;
  salesExecutive?: string;
  holdExpiresAt?: string;
}

export interface PricingSlab {
  id: string;
  unitType: string;
  baseRatePerSqFt: number;
  floorRiseRate: number; // per floor after 4th floor
  parkFacingPlc: number;
  cornerPlc: number;
  coveredCarParking: number;
  clubMembershipFee: number;
  sampleCost: number;
}

export interface HeldUnitRecord {
  id: string;
  unitNo: string;
  tower: string;
  unitType: string;
  holdReason: "Customer Token Verification" | "Broker 48-Hour Priority" | "Director Quota" | "Legal Discrepancy Check";
  heldFor: string;
  heldByExecutive: string;
  heldDate: string;
  expiresInHours: number;
  status: "Active Hold" | "Expiring Soon" | "Released";
}

export const mockInventoryKpi: InventoryKpi = {
  totalInventoryUnits: 480,
  unitsAvailable: 112,
  unitsSold: 342,
  unitsOnHold: 26,
  inventoryOccupancyRate: 76.7,
  totalRealizedRevenue: 3245000000, // 324.5 Cr
  unsoldStockValue: 1148000000,    // 114.8 Cr
  fastestSellingTower: "Tower B (88% Sold Out)",
};

export const mockInventoryProjects: InventoryProject[] = [
  {
    id: "IPRJ-01",
    name: "Vrindavan Heights",
    location: "Shaheed Path, Gomti Nagar Extn, Lucknow",
    totalTowers: 3,
    totalUnits: 280,
    availableUnits: 58,
    soldUnits: 206,
    heldUnits: 16,
    reraNumber: "UPRERAPRJ882419",
    launchDate: "Jan 2024",
    possessionTarget: "Dec 2026",
  },
  {
    id: "IPRJ-02",
    name: "Vrindavan Green Valley",
    location: "Kisan Path, Sultanpur Road, Lucknow",
    totalTowers: 2,
    totalUnits: 90,
    availableUnits: 19,
    soldUnits: 66,
    heldUnits: 5,
    reraNumber: "UPRERAPRJ993102",
    launchDate: "Jun 2023",
    possessionTarget: "May 2026",
  },
  {
    id: "IPRJ-03",
    name: "Vrindavan Commercial Plaza",
    location: "Vibhuti Khand, Gomti Nagar, Lucknow",
    totalTowers: 1,
    totalUnits: 60,
    availableUnits: 15,
    soldUnits: 42,
    heldUnits: 3,
    reraNumber: "UPRERAPRJ660412",
    launchDate: "Nov 2024",
    possessionTarget: "Oct 2026",
  },
  {
    id: "IPRJ-04",
    name: "Vrindavan Royale",
    location: "Sector 7, Amar Shaheed Path, Lucknow",
    totalTowers: 2,
    totalUnits: 50,
    availableUnits: 20,
    soldUnits: 28,
    heldUnits: 2,
    reraNumber: "UPRERAPRJ771203",
    launchDate: "Jan 2025",
    possessionTarget: "Jun 2027",
  },
];

export const mockInventoryTowers: InventoryTower[] = [
  {
    id: "ITWR-01",
    projectId: "IPRJ-01",
    projectName: "Vrindavan Heights",
    towerName: "Tower A (Skyline Crest)",
    floorsCount: 22,
    unitsPerFloor: 4,
    totalUnits: 88,
    availableUnits: 24,
    soldUnits: 58,
    heldUnits: 6,
    constructionStage: "16th Floor Slab Poured",
  },
  {
    id: "ITWR-02",
    projectId: "IPRJ-01",
    projectName: "Vrindavan Heights",
    towerName: "Tower B (Imperial Heights)",
    floorsCount: 22,
    unitsPerFloor: 4,
    totalUnits: 88,
    availableUnits: 11,
    soldUnits: 73,
    heldUnits: 4,
    constructionStage: "Finishing & MEP",
  },
  {
    id: "ITWR-03",
    projectId: "IPRJ-01",
    projectName: "Vrindavan Heights",
    towerName: "Tower C (Royal Pavilion)",
    floorsCount: 18,
    unitsPerFloor: 4,
    totalUnits: 72,
    availableUnits: 23,
    soldUnits: 45,
    heldUnits: 4,
    constructionStage: "11th Floor Slab Casting",
  },
  {
    id: "ITWR-04",
    projectId: "IPRJ-02",
    projectName: "Vrindavan Green Valley",
    towerName: "Villas Sector 1",
    floorsCount: 3,
    unitsPerFloor: 1,
    totalUnits: 45,
    availableUnits: 8,
    soldUnits: 34,
    heldUnits: 3,
    constructionStage: "Interior Finishing Ready",
  },
];

export const mockUnitGrid: UnitGridItem[] = [
  // Floor 14 sample
  { id: "UG-1401", unitNo: "1401", tower: "Tower A", floor: 14, unitType: "3 BHK + Servant", superBuiltUpArea: 1850, carpetArea: 1380, facing: "Corner Lake View", basePrice: 9250000, totalCost: 9800000, status: "Available" },
  { id: "UG-1402", unitNo: "1402", tower: "Tower A", floor: 14, unitType: "3 BHK + Servant", superBuiltUpArea: 1850, carpetArea: 1380, facing: "Park Facing", basePrice: 9250000, totalCost: 9500000, status: "Booked", customerName: "Amitabh Chaturvedi", salesExecutive: "Rajesh Malhotra" },
  { id: "UG-1403", unitNo: "1403", tower: "Tower A", floor: 14, unitType: "3 BHK", superBuiltUpArea: 1620, carpetArea: 1210, facing: "Club Facing", basePrice: 8100000, totalCost: 8400000, status: "On Hold", holdExpiresAt: "24h left", salesExecutive: "Pooja Verma" },
  { id: "UG-1404", unitNo: "1404", tower: "Tower A", floor: 14, unitType: "2 BHK", superBuiltUpArea: 1280, carpetArea: 950, facing: "Road Facing", basePrice: 6400000, totalCost: 6650000, status: "Available" },

  // Floor 15 sample
  { id: "UG-1501", unitNo: "1501", tower: "Tower A", floor: 15, unitType: "3 BHK + Servant", superBuiltUpArea: 1850, carpetArea: 1380, facing: "Corner Lake View", basePrice: 9350000, totalCost: 9900000, status: "Booked", customerName: "Dr. K. K. Srivastava", salesExecutive: "Vikas Saxena" },
  { id: "UG-1502", unitNo: "1502", tower: "Tower A", floor: 15, unitType: "3 BHK + Servant", superBuiltUpArea: 1850, carpetArea: 1380, facing: "Park Facing", basePrice: 9350000, totalCost: 9600000, status: "Available" },
  { id: "UG-1503", unitNo: "1503", tower: "Tower A", floor: 15, unitType: "3 BHK", superBuiltUpArea: 1620, carpetArea: 1210, facing: "Club Facing", basePrice: 8200000, totalCost: 8500000, status: "Management Blocked" },
  { id: "UG-1504", unitNo: "1504", tower: "Tower A", floor: 15, unitType: "2 BHK", superBuiltUpArea: 1280, carpetArea: 950, facing: "Road Facing", basePrice: 6480000, totalCost: 6730000, status: "Available" },

  // Floor 16 sample
  { id: "UG-1601", unitNo: "1601", tower: "Tower A", floor: 16, unitType: "4 BHK Villa", superBuiltUpArea: 2600, carpetArea: 2050, facing: "Corner Lake View", basePrice: 15600000, totalCost: 16800000, status: "Available" },
  { id: "UG-1602", unitNo: "1602", tower: "Tower A", floor: 16, unitType: "3 BHK + Servant", superBuiltUpArea: 1850, carpetArea: 1380, facing: "Park Facing", basePrice: 9450000, totalCost: 9700000, status: "On Hold", holdExpiresAt: "12h left", salesExecutive: "Rajesh Malhotra" },
  { id: "UG-1603", unitNo: "1603", tower: "Tower A", floor: 16, unitType: "3 BHK", superBuiltUpArea: 1620, carpetArea: 1210, facing: "Club Facing", basePrice: 8300000, totalCost: 8600000, status: "Booked", customerName: "Col. Sanjeev Rawat", salesExecutive: "Rajesh Malhotra" },
  { id: "UG-1604", unitNo: "1604", tower: "Tower A", floor: 16, unitType: "2 BHK", superBuiltUpArea: 1280, carpetArea: 950, facing: "Road Facing", basePrice: 6550000, totalCost: 6800000, status: "Available" },
];

export const mockPricingSlabs: PricingSlab[] = [
  {
    id: "PS-01",
    unitType: "2 BHK Luxury (1,280 sq.ft)",
    baseRatePerSqFt: 5000,
    floorRiseRate: 35,
    parkFacingPlc: 200,
    cornerPlc: 150,
    coveredCarParking: 300000,
    clubMembershipFee: 150000,
    sampleCost: 6800000,
  },
  {
    id: "PS-02",
    unitType: "3 BHK Executive (1,620 sq.ft)",
    baseRatePerSqFt: 5100,
    floorRiseRate: 40,
    parkFacingPlc: 250,
    cornerPlc: 200,
    coveredCarParking: 300000,
    clubMembershipFee: 150000,
    sampleCost: 8600000,
  },
  {
    id: "PS-03",
    unitType: "3 BHK Premium + Servant (1,850 sq.ft)",
    baseRatePerSqFt: 5200,
    floorRiseRate: 45,
    parkFacingPlc: 300,
    cornerPlc: 250,
    coveredCarParking: 350000,
    clubMembershipFee: 200000,
    sampleCost: 9800000,
  },
  {
    id: "PS-04",
    unitType: "4 BHK Royal Penthouse (2,600 sq.ft)",
    baseRatePerSqFt: 6000,
    floorRiseRate: 50,
    parkFacingPlc: 400,
    cornerPlc: 350,
    coveredCarParking: 500000,
    clubMembershipFee: 250000,
    sampleCost: 16800000,
  },
];

export const mockHeldUnits: HeldUnitRecord[] = [
  {
    id: "HLD-01",
    unitNo: "1403",
    tower: "Tower A",
    unitType: "3 BHK",
    holdReason: "Customer Token Verification",
    heldFor: "Sunita Singhania",
    heldByExecutive: "Pooja Verma",
    heldDate: "2026-04-18 14:00",
    expiresInHours: 24,
    status: "Active Hold",
  },
  {
    id: "HLD-02",
    unitNo: "1602",
    tower: "Tower A",
    unitType: "3 BHK + Servant",
    holdReason: "Broker 48-Hour Priority",
    heldFor: "Apex Realtors (Lead: Deepak Rastogi)",
    heldByExecutive: "Rajesh Malhotra",
    heldDate: "2026-04-19 10:30",
    expiresInHours: 36,
    status: "Active Hold",
  },
  {
    id: "HLD-03",
    unitNo: "1503",
    tower: "Tower A",
    unitType: "3 BHK",
    holdReason: "Director Quota",
    heldFor: "CMD Office Reservation",
    heldByExecutive: "Inventory Head",
    heldDate: "2026-04-01 10:00",
    expiresInHours: 120,
    status: "Active Hold",
  },
];

export const inventoryService = {
  getKpi: () => mockInventoryKpi,
  getProjects: () => mockInventoryProjects,
  getTowers: () => mockInventoryTowers,
  getUnitGrid: () => mockUnitGrid,
  getPricingSlabs: () => mockPricingSlabs,
  getHeldUnits: () => mockHeldUnits,
};
