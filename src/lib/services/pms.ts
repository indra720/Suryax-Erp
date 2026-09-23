// src/lib/services/pms.ts
// Comprehensive Project Management System (PMS) service matching CrmAttendance2 schema

export type ProjectStatus = "active" | "planned" | "completed" | "on-hold";
export type SprintStatus = "Draft" | "Planned" | "Active" | "Frozen" | "Completed" | "Archived";
export type SprintType = "Planning" | "Development" | "Testing" | "Release";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "To Do" | "In Progress" | "Review" | "Done" | "Blocked";
export type MilestoneStatus = "not_started" | "in_progress" | "completed" | "blocked";

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
  email: string;
  user_name?: string;
  project_name?: string;
  user?: number;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  slug?: string;
  progress: number;
  status: ProjectStatus;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  client: string;
  members: ProjectMember[];
}

export interface SprintTask {
  id: string;
  title: string;
  type: "Feature" | "Bug" | "Improvement";
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Todo" | "In Progress" | "Review" | "Done" | "Blocked";
  assigneeId?: string;
  assigneeName?: string;
  storyPoints: number;
  sprintId?: string;
  projectId?: string;
  projectName?: string;
  deadline?: string;
}

export interface Sprint {
  id: string;
  project_id: string;
  project_name: string;
  name: string;
  sprint_number: string;
  sprint_type: SprintType;
  goal: string;
  duration_weeks: number;
  start_date: string;
  end_date: string;
  story_points_target: number;
  status: SprintStatus;
  progress?: number;
  tasks?: SprintTask[];
}

export interface SuccessCriterion {
  id: string;
  text: string;
  checked: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  code: string;
  project: string;
  project_name: string;
  sprint?: string;
  sprint_name?: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  due_date: string;
  status: MilestoneStatus;
  progress: number;
  owner: string;
  owner_name?: string;
  criteria: SuccessCriterion[];
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  project_id: string;
  project_name: string;
  assignee_id: string;
  assignee_name: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: TaskStatus;
  story_points: number;
  estimated_hours: number;
  due_date: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  avatar?: string;
  projects: string[];
  tasksAssigned: number;
  completedTasks?: number;
  lastActivity: string;
  department?: string;
}

// -------------------------------------------------------------
// Initial Seed Data (Directly matching CrmAttendance2 PMS)
// -------------------------------------------------------------

export const initialProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "Vrindavan Greens Plotted Township",
    slug: "vrindavan-greens",
    progress: 75,
    status: "active",
    description: "Township infrastructure development, plotted layout demarcations, arterial asphalt roads, and avenue landscaping.",
    startDate: "2025-01-15",
    endDate: "2026-06-30",
    budget: 8500000,
    client: "Vrindavan Developers",
    members: [
      { id: "USR-1", name: "Sarah Chen", role: "Project Manager", email: "sarah.chen@vrindavan.com" },
      { id: "USR-3", name: "Elena Rodriguez", role: "Lead Architect", email: "elena.r@vrindavan.com" },
      { id: "USR-6", name: "Pramod Sharma", role: "Chief Site Engineer", email: "pramod.civil@vrindavan.com" },
    ],
  },
  {
    id: "PRJ-002",
    name: "Radha Enclave Commercial Hub",
    slug: "radha-enclave",
    progress: 90,
    status: "active",
    description: "Commercial complex with showroom plots, retail arcade, underground electrical substation, and dedicated visitor parking.",
    startDate: "2025-02-01",
    endDate: "2026-05-31",
    budget: 6200000,
    client: "Radha Enclave Pvt Ltd",
    members: [
      { id: "USR-2", name: "Marcus Johnson", role: "Product Owner", email: "marcus.j@vrindavan.com" },
      { id: "USR-4", name: "David Kim", role: "MEP Engineer", email: "david.k@vrindavan.com" },
    ],
  },
  {
    id: "PRJ-003",
    name: "Govardhan Royal Luxury Villas",
    slug: "govardhan-royal",
    progress: 40,
    status: "active",
    description: "Gated duplex villa community, club house construction, swimming pool, landscape water bodies, and smart security barrier.",
    startDate: "2025-07-01",
    endDate: "2026-10-31",
    budget: 12000000,
    client: "Govardhan Infrastructure",
    members: [
      { id: "USR-1", name: "Sarah Chen", role: "Project Manager", email: "sarah.chen@vrindavan.com" },
      { id: "USR-5", name: "Alex Wong", role: "Quality Assurance", email: "alex.wong@vrindavan.com" },
      { id: "USR-6", name: "Pramod Sharma", role: "Chief Site Engineer", email: "pramod.civil@vrindavan.com" },
    ],
  },
  {
    id: "PRJ-004",
    name: "CRM Telecalling Cloud Integration",
    slug: "crm-telecalling-cloud",
    progress: 100,
    status: "completed",
    description: "Automated IVR calling integration, WhatsApp campaign webhook synchronization, and staff daily incentive calculators.",
    startDate: "2024-09-01",
    endDate: "2025-01-31",
    budget: 1800000,
    client: "Vrindavan Sales Wing",
    members: [
      { id: "USR-3", name: "Elena Rodriguez", role: "Lead Architect", email: "elena.r@vrindavan.com" },
      { id: "USR-4", name: "David Kim", role: "MEP Engineer", email: "david.k@vrindavan.com" },
    ],
  },
  {
    id: "PRJ-005",
    name: "NH-19 Expressway Gateway Towers",
    slug: "nh19-gateway-towers",
    progress: 20,
    status: "planned",
    description: "High-rise commercial executive suites, hypermarket spaces, rooftop banquet terrace, and EV charging bays.",
    startDate: "2026-08-15",
    endDate: "2027-12-31",
    budget: 24000000,
    client: "Highway Logistics Corp",
    members: [
      { id: "USR-2", name: "Marcus Johnson", role: "Product Owner", email: "marcus.j@vrindavan.com" },
    ],
  },
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: "USR-1",
    name: "Sarah Chen",
    role: "Project Manager",
    email: "sarah.chen@vrindavan.com",
    phone: "9876543001",
    projects: ["Vrindavan Greens", "Govardhan Royal"],
    tasksAssigned: 6,
    completedTasks: 18,
    lastActivity: "10 mins ago",
    department: "Civil & Project Operations",
  },
  {
    id: "USR-2",
    name: "Marcus Johnson",
    role: "Product Owner",
    email: "marcus.j@vrindavan.com",
    phone: "9876543002",
    projects: ["Radha Enclave", "NH-19 Gateway"],
    tasksAssigned: 4,
    completedTasks: 12,
    lastActivity: "1 hour ago",
    department: "Executive Strategy",
  },
  {
    id: "USR-3",
    name: "Elena Rodriguez",
    role: "Lead Architect",
    email: "elena.r@vrindavan.com",
    phone: "9876543003",
    projects: ["Vrindavan Greens", "CRM Telecalling"],
    tasksAssigned: 9,
    completedTasks: 24,
    lastActivity: "25 mins ago",
    department: "Architecture & Design",
  },
  {
    id: "USR-4",
    name: "David Kim",
    role: "MEP & Electrical Engineer",
    email: "david.k@vrindavan.com",
    phone: "9876543004",
    projects: ["Radha Enclave", "CRM Telecalling"],
    tasksAssigned: 7,
    completedTasks: 15,
    lastActivity: "2 hours ago",
    department: "Engineering Infrastructure",
  },
  {
    id: "USR-5",
    name: "Alex Wong",
    role: "Quality Assurance & Surveyor",
    email: "alex.wong@vrindavan.com",
    phone: "9876543005",
    projects: ["Govardhan Royal"],
    tasksAssigned: 5,
    completedTasks: 11,
    lastActivity: "Yesterday",
    department: "Survey & Quality Check",
  },
  {
    id: "USR-6",
    name: "Pramod Sharma",
    role: "Chief Site Engineer",
    email: "pramod.civil@vrindavan.com",
    phone: "9876543006",
    projects: ["Vrindavan Greens", "Govardhan Royal"],
    tasksAssigned: 8,
    completedTasks: 32,
    lastActivity: "Active Now",
    department: "Site Construction",
  },
];

export const initialSprints: Sprint[] = [
  {
    id: "SP-001",
    project_id: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    name: "Sprint 14: Phase-2 Boundary Wall & Security Entrance",
    sprint_number: "Sprint 14",
    sprint_type: "Development",
    goal: "Complete grand entrance arch, perimeter boundary wall, and CCTV surveillance posts.",
    duration_weeks: 3,
    start_date: "2026-03-01",
    end_date: "2026-03-31",
    story_points_target: 28,
    status: "Active",
    progress: 72,
    tasks: [
      { id: "TASK-103", title: "Survey Plot Boundary Pegs for Sector B", type: "Feature", priority: "Urgent", status: "In Progress", storyPoints: 8, assigneeName: "Pramod Sharma" },
      { id: "TASK-106", title: "Complete Paver Blocks on 30ft Internal Road", type: "Improvement", priority: "Medium", status: "In Progress", storyPoints: 5, assigneeName: "Pramod Sharma" },
      { id: "TASK-108", title: "Landscaping Palm Trees along Grand Entrance", type: "Improvement", priority: "Low", status: "Todo", storyPoints: 3, assigneeName: "Marcus Johnson" },
    ],
  },
  {
    id: "SP-002",
    project_id: "PRJ-002",
    project_name: "Radha Enclave Commercial Hub",
    name: "Sprint 15: 25KVA Substation & Water Pump House",
    sprint_number: "Sprint 15",
    sprint_type: "Development",
    goal: "Erect 25KVA electrical transformer, underground distribution cabling, and high-pressure water pump.",
    duration_weeks: 4,
    start_date: "2026-03-15",
    end_date: "2026-04-15",
    story_points_target: 32,
    status: "Active",
    progress: 45,
    tasks: [
      { id: "TASK-104", title: "Install 25 KVA Transformer at Gate 2", type: "Feature", priority: "High", status: "Todo", storyPoints: 8, assigneeName: "David Kim" },
      { id: "TASK-101", title: "Underground Cable Pulling for Showroom Arcade", type: "Feature", priority: "High", status: "In Progress", storyPoints: 5, assigneeName: "David Kim" },
    ],
  },
  {
    id: "SP-003",
    project_id: "PRJ-003",
    project_name: "Govardhan Royal Luxury Villas",
    name: "Sprint 16: Club House Foundation & Olympic Pool Excavation",
    sprint_number: "Sprint 16",
    sprint_type: "Planning",
    goal: "Finalize structural reinforcement drawings, soil compaction test, and begin excavation.",
    duration_weeks: 3,
    start_date: "2026-04-01",
    end_date: "2026-04-30",
    story_points_target: 24,
    status: "Planned",
    progress: 10,
    tasks: [],
  },
];

export const initialMilestones: Milestone[] = [
  {
    id: "ML-001",
    title: "Land Acquisition & Revenue Registry Clearance",
    code: "RERA-01",
    project: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    sprint: "SP-001",
    sprint_name: "Sprint 14",
    description: "All land parcels surveyed, 7/12 extract registry completed, and municipal NOC received.",
    priority: "critical",
    due_date: "2026-01-15",
    status: "completed",
    progress: 100,
    owner: "USR-2",
    owner_name: "Marcus Johnson",
    criteria: [
      { id: "c1", text: "Revenue title search 30-year report passed", checked: true },
      { id: "c2", text: "Mathura municipal registry stamp duty completed", checked: true },
      { id: "c3", text: "Village panchayat demarcation NOC documented", checked: true },
    ],
  },
  {
    id: "ML-002",
    title: "Township Master Layout Sanction & RERA Sanction",
    code: "RERA-02",
    project: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    sprint: "SP-001",
    sprint_name: "Sprint 14",
    description: "Official RERA registration certificate issued and town planning master blueprint approved.",
    priority: "critical",
    due_date: "2026-02-10",
    status: "completed",
    progress: 100,
    owner: "USR-1",
    owner_name: "Sarah Chen",
    criteria: [
      { id: "c4", text: "Town planner 1:500 layout approval signed", checked: true },
      { id: "c5", text: "State RERA portal certificate active & public", checked: true },
    ],
  },
  {
    id: "ML-003",
    title: "Underground Drainage & Water Sewer Lines",
    code: "INFRA-01",
    project: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    sprint: "SP-001",
    sprint_name: "Sprint 14",
    description: "Laying 4.5km of reinforced concrete sewer lines and rainwater harvesting catch pits.",
    priority: "high",
    due_date: "2026-03-28",
    status: "in_progress",
    progress: 85,
    owner: "USR-6",
    owner_name: "Pramod Sharma",
    criteria: [
      { id: "c6", text: "Excavation and pipe bedding complete", checked: true },
      { id: "c7", text: "Hydraulic pressure testing complete", checked: true },
      { id: "c8", text: "Chamber manhole cover installations", checked: false },
    ],
  },
  {
    id: "ML-004",
    title: "25KVA Commercial Substation & HT Line Connection",
    code: "ELEC-01",
    project: "PRJ-002",
    project_name: "Radha Enclave Commercial Hub",
    sprint: "SP-002",
    sprint_name: "Sprint 15",
    description: "Civil base for 25KVA transformer, lightning arrestors, and electricity board sanction.",
    priority: "high",
    due_date: "2026-04-10",
    status: "in_progress",
    progress: 50,
    owner: "USR-4",
    owner_name: "David Kim",
    criteria: [
      { id: "c9", text: "Discom load sanction letter obtained", checked: true },
      { id: "c10", text: "Transformer plinth foundation casted", checked: true },
      { id: "c11", text: "HT line overhead cable tie-in", checked: false },
    ],
  },
  {
    id: "ML-005",
    title: "60ft Arterial Boulevard Asphalt Carpet Paving",
    code: "ROAD-01",
    project: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    sprint: "SP-001",
    sprint_name: "Sprint 14",
    description: "Heavy-duty dual carriage asphalt road with stormwater curb gutters.",
    priority: "medium",
    due_date: "2026-04-25",
    status: "not_started",
    progress: 25,
    owner: "USR-6",
    owner_name: "Pramod Sharma",
    criteria: [
      { id: "c12", text: "Sub-base roller compaction passed", checked: true },
      { id: "c13", text: "Bitumen prime coat application", checked: false },
      { id: "c14", text: "Final hot-mix asphalt carpeting", checked: false },
    ],
  },
];

export const initialTasks: TaskItem[] = [
  {
    id: "TASK-101",
    title: "Underground Cable Pulling for Showroom Arcade",
    description: "Pull 4-core armored copper cables from main electrical room to Commercial Blocks A & B.",
    project_id: "PRJ-002",
    project_name: "Radha Enclave Commercial Hub",
    assignee_id: "USR-4",
    assignee_name: "David Kim",
    priority: "high",
    status: "In Progress",
    story_points: 5,
    estimated_hours: 32,
    due_date: "2026-03-29",
    created_at: "2026-03-10",
  },
  {
    id: "TASK-102",
    title: "Design Commercial Entrance Arch & Lighting Mockups",
    description: "3D architectural render for LED backlit signage and security boom barriers.",
    project_id: "PRJ-002",
    project_name: "Radha Enclave Commercial Hub",
    assignee_id: "USR-3",
    assignee_name: "Elena Rodriguez",
    priority: "medium",
    status: "Review",
    story_points: 3,
    estimated_hours: 16,
    due_date: "2026-03-28",
    created_at: "2026-03-12",
  },
  {
    id: "TASK-103",
    title: "Survey Plot Boundary Pegs for Sector B",
    description: "Total station laser survey to hammer concrete boundary markers for plots B-01 to B-45.",
    project_id: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    assignee_id: "USR-6",
    assignee_name: "Pramod Sharma",
    priority: "urgent",
    status: "In Progress",
    story_points: 8,
    estimated_hours: 48,
    due_date: "2026-03-30",
    created_at: "2026-03-15",
  },
  {
    id: "TASK-104",
    title: "Install 25 KVA Transformer at Gate 2",
    description: "Crane placement of step-down transformer on reinforced plinth with silica gel breather.",
    project_id: "PRJ-002",
    project_name: "Radha Enclave Commercial Hub",
    assignee_id: "USR-4",
    assignee_name: "David Kim",
    priority: "high",
    status: "To Do",
    story_points: 8,
    estimated_hours: 40,
    due_date: "2026-04-05",
    created_at: "2026-03-18",
  },
  {
    id: "TASK-105",
    title: "Finalize Municipal Water Connection Pipeline Hookup",
    description: "Execute municipal water meter tapping on 150mm main ductile iron header line.",
    project_id: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    assignee_id: "USR-6",
    assignee_name: "Pramod Sharma",
    priority: "urgent",
    status: "Done",
    story_points: 8,
    estimated_hours: 36,
    due_date: "2026-03-22",
    created_at: "2026-03-05",
  },
  {
    id: "TASK-106",
    title: "Complete Paver Blocks on 30ft Internal Road",
    description: "Lay 80mm heavy-duty interlocking concrete pavers with sand bedding along Lane 4.",
    project_id: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    assignee_id: "USR-6",
    assignee_name: "Pramod Sharma",
    priority: "medium",
    status: "In Progress",
    story_points: 5,
    estimated_hours: 28,
    due_date: "2026-04-02",
    created_at: "2026-03-16",
  },
  {
    id: "TASK-107",
    title: "Quality Audit on Soil Compaction & Concrete Cube Test",
    description: "Lab testing report for 28-day curing strength on clubhouse footings.",
    project_id: "PRJ-003",
    project_name: "Govardhan Royal Luxury Villas",
    assignee_id: "USR-5",
    assignee_name: "Alex Wong",
    priority: "high",
    status: "Review",
    story_points: 3,
    estimated_hours: 14,
    due_date: "2026-03-31",
    created_at: "2026-03-17",
  },
  {
    id: "TASK-108",
    title: "Landscaping Palm Trees & Grass Turf along Avenue",
    description: "Plantation of 120 Royal Palm saplings and Mexican grass turf along median dividers.",
    project_id: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    assignee_id: "USR-2",
    assignee_name: "Marcus Johnson",
    priority: "low",
    status: "To Do",
    story_points: 2,
    estimated_hours: 20,
    due_date: "2026-04-12",
    created_at: "2026-03-20",
  },
  {
    id: "TASK-109",
    title: "RERA Phase-2 Compliance Filing Dossier",
    description: "Quarterly chartered engineer completion certificate submission on UP RERA portal.",
    project_id: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    assignee_id: "USR-1",
    assignee_name: "Sarah Chen",
    priority: "urgent",
    status: "Blocked",
    story_points: 5,
    estimated_hours: 22,
    due_date: "2026-03-27",
    created_at: "2026-03-14",
  },
  {
    id: "TASK-110",
    title: "Plot Allotment Map CAD Drafting for Sales Office",
    description: "Color-coded AutoCAD plot availability plan (booked, available, token received).",
    project_id: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    assignee_id: "USR-3",
    assignee_name: "Elena Rodriguez",
    priority: "medium",
    status: "Done",
    story_points: 3,
    estimated_hours: 12,
    due_date: "2026-03-20",
    created_at: "2026-03-08",
  },
];

export const burndownChartData = [
  { day: "Day 1", ideal: 28, actual: 28 },
  { day: "Day 2", ideal: 25.2, actual: 27 },
  { day: "Day 3", ideal: 22.4, actual: 24 },
  { day: "Day 4", ideal: 19.6, actual: 21 },
  { day: "Day 5", ideal: 16.8, actual: 18 },
  { day: "Day 6", ideal: 14.0, actual: 15 },
  { day: "Day 7", ideal: 11.2, actual: 11 },
  { day: "Day 8", ideal: 8.4, actual: 9 },
  { day: "Day 9", ideal: 5.6, actual: 6 },
  { day: "Day 10", ideal: 2.8, actual: 3 },
  { day: "Day 11", ideal: 0, actual: 0 },
];

// -------------------------------------------------------------
// State Store Helpers with LocalStorage Persistence
// -------------------------------------------------------------

function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`vrindavan_pms_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`vrindavan_pms_${key}`, JSON.stringify(value));
    window.dispatchEvent(new Event("vrindavan-pms-change"));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function getPmsProjects(): Project[] {
  return getStorage("projects", initialProjects);
}

export function savePmsProjects(projects: Project[]): void {
  setStorage("projects", projects);
}

export function addPmsProject(project: Omit<Project, "id">): Project {
  const current = getPmsProjects();
  const newProject: Project = {
    ...project,
    id: `PRJ-${String(current.length + 1).padStart(3, "0")}`,
  };
  savePmsProjects([newProject, ...current]);
  return newProject;
}

export function getPmsTeamMembers(): TeamMember[] {
  return getStorage("team_members", initialTeamMembers);
}

export function savePmsTeamMembers(members: TeamMember[]): void {
  setStorage("team_members", members);
}

export function addPmsTeamMember(member: Omit<TeamMember, "id">): TeamMember {
  const current = getPmsTeamMembers();
  const newMember: TeamMember = {
    ...member,
    id: `USR-${current.length + 1}`,
    tasksAssigned: 0,
    completedTasks: 0,
    lastActivity: "Just now",
  };
  savePmsTeamMembers([newMember, ...current]);
  return newMember;
}

export function getPmsSprints(): Sprint[] {
  return getStorage("sprints", initialSprints);
}

export function savePmsSprints(sprints: Sprint[]): void {
  setStorage("sprints", sprints);
}

export function addPmsSprint(sprint: Omit<Sprint, "id">): Sprint {
  const current = getPmsSprints();
  const newSprint: Sprint = {
    ...sprint,
    id: `SP-${String(current.length + 1).padStart(3, "0")}`,
  };
  savePmsSprints([newSprint, ...current]);
  return newSprint;
}

export function getPmsMilestones(): Milestone[] {
  return getStorage("milestones", initialMilestones);
}

export function savePmsMilestones(milestones: Milestone[]): void {
  setStorage("milestones", milestones);
}

export function addPmsMilestone(milestone: Omit<Milestone, "id">): Milestone {
  const current = getPmsMilestones();
  const newMilestone: Milestone = {
    ...milestone,
    id: `ML-${String(current.length + 1).padStart(3, "0")}`,
  };
  savePmsMilestones([newMilestone, ...current]);
  return newMilestone;
}

export function getPmsTasks(): TaskItem[] {
  return getStorage("tasks", initialTasks);
}

export function savePmsTasks(tasks: TaskItem[]): void {
  setStorage("tasks", tasks);
}

export function addPmsTask(task: Omit<TaskItem, "id" | "created_at">): TaskItem {
  const current = getPmsTasks();
  const newTask: TaskItem = {
    ...task,
    id: `TASK-${current.length + 101}`,
    created_at: new Date().toISOString().slice(0, 10),
  };
  savePmsTasks([newTask, ...current]);
  return newTask;
}

export function updatePmsTaskStatus(taskId: string, newStatus: TaskStatus): void {
  const current = getPmsTasks();
  const updated = current.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
  savePmsTasks(updated);
}

export function updatePmsTask(taskId: string, patch: Partial<TaskItem>): void {
  const current = getPmsTasks();
  const updated = current.map((t) => (t.id === taskId ? { ...t, ...patch } : t));
  savePmsTasks(updated);
}

export function deletePmsTask(taskId: string): void {
  const current = getPmsTasks();
  savePmsTasks(current.filter((t) => t.id !== taskId));
}

export function updatePmsMilestone(milestoneId: string, patch: Partial<Milestone>): void {
  const current = getPmsMilestones();
  const updated = current.map((m) => (m.id === milestoneId ? { ...m, ...patch } : m));
  savePmsMilestones(updated);
}

export function deletePmsMilestone(milestoneId: string): void {
  const current = getPmsMilestones();
  savePmsMilestones(current.filter((m) => m.id !== milestoneId));
}

export function toggleMilestoneCriterion(milestoneId: string, criterionId: string): void {
  const current = getPmsMilestones();
  const updated = current.map((m) => {
    if (m.id !== milestoneId) return m;
    const newCriteria = m.criteria.map((c) =>
      c.id === criterionId ? { ...c, checked: !c.checked } : c
    );
    const completedCount = newCriteria.filter((c) => c.checked).length;
    const progress = newCriteria.length > 0 ? Math.round((completedCount / newCriteria.length) * 100) : m.progress;
    const newStatus: MilestoneStatus =
      progress === 100 ? "completed" : progress > 0 ? "in_progress" : "not_started";
    return {
      ...m,
      criteria: newCriteria,
      progress,
      status: newStatus,
    };
  });
  savePmsMilestones(updated);
}

export function deletePmsTeamMember(memberId: string): void {
  const current = getPmsTeamMembers();
  savePmsTeamMembers(current.filter((m) => m.id !== memberId));
}

export function updatePmsTeamMember(memberId: string, patch: Partial<TeamMember>): void {
  const current = getPmsTeamMembers();
  savePmsTeamMembers(current.map((m) => (m.id === memberId ? { ...m, ...patch } : m)));
}
