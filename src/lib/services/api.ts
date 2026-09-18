// Vrindavan-ERP API Service Layer
// Communicates with Django REST backend running at VITE_API_BASE_URL (http://127.0.0.1:8000)

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function getAuthHeader(isFormData = false): Record<string, string> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers: Record<string, string> = {
    ...getAuthHeader(isFormData),
    ...(options.headers as Record<string, string> || {}),
  };

  if (isFormData && headers["Content-Type"]) {
    delete headers["Content-Type"];
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  let data: any;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      (typeof data === "object" && (data?.message || data?.detail || data?.error)) ||
      `HTTP error ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  return data as T;
}

// -------------------------------------------------------------------
// 1. Authentication & Session
// -------------------------------------------------------------------

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    token_detail: string;
    email: string;
    id: number;
    name: string;
    is_admin?: boolean;
    is_team_leader?: boolean;
    is_hr?: boolean;
    is_staff_new?: boolean;
    is_freelancer?: boolean;
  };
}

export async function loginUser(credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/accounts/apilogin/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function forgotPassword(email: string): Promise<any> {
  return apiRequest("/accounts/forgot-password/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// -------------------------------------------------------------------
// 2. User Management & Provisioning
// -------------------------------------------------------------------

export async function fetchAdmins(): Promise<any[]> {
  try {
    const res: any = await apiRequest("/accounts/dashboard/super-admin/");
    return res?.users || [];
  } catch {
    return apiRequest("/accounts/admin/list/");
  }
}

export async function fetchAdminStaffs(): Promise<any[]> {
  return apiRequest("/accounts/admin/staffs/");
}

export async function fetchTeamLeaderStaffList(): Promise<any[]> {
  return apiRequest("/accounts/team-leader-staff-list/");
}

export async function fetchUsers(): Promise<any[]> {
  return apiRequest("/accounts/users/");
}

export async function fetchSuperuserDashboard(): Promise<any> {
  return apiRequest("/accounts/dashboard/super-admin/");
}

export async function fetchSuperuserTeamLeaders(): Promise<any[]> {
  try {
    const res: any = await apiRequest("/accounts/api/superuser/team-leader-dashboard/");
    return Array.isArray(res) ? res : res?.results || [];
  } catch {
    return apiRequest("/accounts/team-leaders/");
  }
}

export async function fetchSuperuserStaffList(): Promise<any[]> {
  try {
    const res: any = await apiRequest("/accounts/api/superuser/staff-report/");
    return Array.isArray(res) ? res : res?.staff_list || res?.results || [];
  } catch {
    return apiRequest("/accounts/admin/staffs/");
  }
}

export async function fetchItStaffList(): Promise<any[]> {
  return apiRequest("/accounts/users/it-staff/");
}

export async function toggleUserActiveStatus(
  userId: number | string,
  userType: string,
  isActive: boolean
): Promise<any> {
  return apiRequest("/accounts/users/toggle-active/", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      user_type: userType,
      is_active: isActive,
    }),
  });
}

export function createFormData(dataObj: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(dataObj).forEach(([key, val]) => {
    if (val !== null && val !== undefined && val !== "") {
      if (val instanceof File) {
        formData.append(key, val);
      } else {
        formData.append(key, String(val));
      }
    }
  });
  return formData;
}

export async function addStaffMemberUser(formData: any): Promise<any> {
  const body = formData instanceof FormData ? formData : createFormData(formData);
  return apiRequest("/accounts/users/staff/add/", {
    method: "POST",
    body,
  });
}

export async function editStaffMemberUser(id: number | string, formData: any): Promise<any> {
  const body = formData instanceof FormData ? formData : createFormData(formData);
  return apiRequest(`/accounts/users/staff/edit/${id}/`, {
    method: "PATCH",
    body,
  });
}

export async function addTeamLeaderUser(formData: any): Promise<any> {
  const body = formData instanceof FormData ? formData : createFormData(formData);
  return apiRequest("/accounts/users/team-leader/add-new/", {
    method: "POST",
    body,
  });
}

export async function editTeamLeader(id: number | string, formData: any): Promise<any> {
  const body = formData instanceof FormData ? formData : createFormData(formData);
  return apiRequest(`/accounts/users/team-leader/edit/${id}/`, {
    method: "PATCH",
    body,
  });
}

export async function addAdminUser(formData: any): Promise<any> {
  const body = formData instanceof FormData ? formData : createFormData(formData);
  return apiRequest("/accounts/users/admin/add/", {
    method: "POST",
    body,
  });
}

export async function editAdminUser(id: number | string, formData: any): Promise<any> {
  const body = formData instanceof FormData ? formData : createFormData(formData);
  return apiRequest(`/accounts/users/admin/edit/${id}/`, {
    method: "PATCH",
    body,
  });
}

export async function addHrUser(formData: any): Promise<any> {
  const body = formData instanceof FormData ? formData : createFormData(formData);
  return apiRequest("/accounts/hr/create/", {
    method: "POST",
    body,
  });
}

export async function addFreelancerUser(formData: any): Promise<any> {
  const body = formData instanceof FormData ? formData : createFormData(formData);
  return apiRequest("/accounts/api/add-freelancer/", {
    method: "POST",
    body,
  });
}

// -------------------------------------------------------------------
// 3. Leads & Telecalling CRM
// -------------------------------------------------------------------

export interface Lead {
  id: string | number;
  name: string;
  phone?: string;
  email?: string;
  status?: string;
  source?: string;
  project?: string;
  budget?: string;
  assigned_to?: string;
  created_at?: string;
  last_call?: string;
  remarks?: string;
  [key: string]: any;
}

export async function fetchAdminLeadsByTag(
  tag: string
): Promise<{ staff_leads: Lead[]; team_leads: Lead[] }> {
  return apiRequest(`/accounts/admin-leads/${encodeURIComponent(tag)}/`);
}

export async function updateLeadStatusAndFollowUp(payload: {
  lead_id: string | number;
  status: string;
  remarks?: string;
  next_followup_date?: string;
  next_followup_time?: string;
}): Promise<any> {
  return apiRequest("/accounts/lead/status-and-followup/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchLeadsForStaff(tag: string = "all"): Promise<Lead[]> {
  return apiRequest(`/accounts/leads-for-staff/?tag=${encodeURIComponent(tag)}`);
}

export async function fetchSuperuserStaffLeadsByTag(tag: string): Promise<any> {
  return apiRequest(`/accounts/superuser/staff-leads/?tag=${encodeURIComponent(tag)}`);
}

export async function fetchSuperuserTeamLeaderLeadsByTag(tag: string): Promise<any> {
  return apiRequest(`/accounts/superuser/team-leader-leads/?tag=${encodeURIComponent(tag)}`);
}

export async function fetchLeadHistory(leadId: string | number): Promise<any[]> {
  return apiRequest(`/accounts/lead-history/${leadId}/`);
}

export async function fetchAdminLeadHistoryById(leadId: string | number): Promise<any> {
  return apiRequest(`/accounts/admin/lead-history/${leadId}/`);
}

export async function addAdminLead(leadData: Partial<Lead>): Promise<any> {
  return apiRequest("/accounts/admin/add-lead/", {
    method: "POST",
    body: JSON.stringify(leadData),
  });
}

export async function fetchAdminTotalLeads(): Promise<any> {
  return apiRequest("/accounts/admin/total-leads/");
}

export async function fetchTeamLeaderVisitLeads(): Promise<any> {
  return apiRequest("/accounts/team-leader/visit-leads/");
}

export async function fetchTeamLeaderAllLeadsByTag(tag: string): Promise<any> {
  return apiRequest(`/accounts/team-leader/all-leads/?tag=${encodeURIComponent(tag)}`);
}

export async function exportTeamLeaderLeads(payload: {
  tag: string;
  format?: string;
}): Promise<Blob> {
  const url = `${API_BASE_URL}/accounts/team-leader/export-leads/`;
  const response = await fetch(url, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(payload),
  });
  return response.blob();
}

export interface StaffDashboardData {
  results: Array<{
    id: number;
    name: string;
    call: string;
    status: string;
    project: number | null;
    message?: string;
  }>;
  projects: Array<{
    id: number;
    name: string;
  }>;
  counts: {
    total_leads: number;
    total_visits_leads: number;
    total_interested_leads: number;
    total_not_interested_leads: number;
    total_other_location_leads: number;
    total_not_picked_leads: number;
  };
}

export async function fetchStaffDashboardData(
  startDate?: string,
  endDate?: string
): Promise<StaffDashboardData> {
  let url = "/accounts/api/staff/dashboard/";
  if (startDate && endDate) {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    });
    url += `?${params.toString()}`;
  }
  return apiRequest<StaffDashboardData>(url);
}

export async function updateStaffLeadStatus(
  leadId: number | string,
  status: string,
  message?: string
): Promise<any> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const data = new FormData();
  data.append("status", status);
  if (message) {
    data.append("message", message);
  }

  const response = await fetch(
    `${API_BASE_URL}/accounts/api/staff/update-lead/${leadId}/`,
    {
      method: "POST",
      headers: { Authorization: `Token ${token}` },
      body: data,
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Failed to update lead status");
  }
  return response.json();
}

export async function updateStaffLeadProject(
  leadId: number | string,
  projectId: number
): Promise<any> {
  return apiRequest(`/accounts/api/staff/update-lead-project/${leadId}/`, {
    method: "POST",
    body: JSON.stringify({ project_id: projectId }),
  });
}

export async function createStaffLead(leadData: {
  name: string;
  mobile: string;
  email?: string;
  status: string;
  description?: string;
  project?: number | string;
}): Promise<any> {
  return apiRequest("/accounts/api/staff/create-lead/", {
    method: "POST",
    body: JSON.stringify(leadData),
  });
}

// -------------------------------------------------------------------
// 4. Reports & Performance Analytics
// -------------------------------------------------------------------

export async function fetchAdminStaffReport(tag: string = "all"): Promise<any> {
  return apiRequest(`/accounts/admin-staff-report/?tag=${encodeURIComponent(tag)}`);
}

export async function fetchStaffLeadsReport(tag: string): Promise<any> {
  return apiRequest(`/accounts/staff-leads-report/?tag=${encodeURIComponent(tag)}`);
}

export async function fetchTeamLeaderInterestedLeadsReport(): Promise<any> {
  return apiRequest("/accounts/team-leader/interested-leads-report/");
}

export async function fetchTeamLeaderLostLeadsReport(): Promise<any> {
  return apiRequest("/accounts/team-leader/lost-leads-report/");
}

export async function fetchAdminStaffIncentive(): Promise<any> {
  return apiRequest("/accounts/admin/staff-incentive/");
}

export async function fetchAdminStaffLeadsKpiCountByTag(tag: string): Promise<any> {
  return apiRequest(`/accounts/admin/staff-leads-kpi-count/?tag=${encodeURIComponent(tag)}`);
}

// -------------------------------------------------------------------
// 5. Agile PMS (Project Management System)
// -------------------------------------------------------------------

export interface Project {
  id: string | number;
  name: string;
  description?: string;
  status?: string;
  members?: any[];
  [key: string]: any;
}

export interface Sprint {
  id: string | number;
  name: string;
  projectId?: string | number;
  startDate?: string;
  endDate?: string;
  status?: string;
  goal?: string;
  [key: string]: any;
}

export interface TaskPayload {
  id?: string | number;
  title: string;
  description?: string;
  status: "to_do" | "in_progress" | "review" | "done" | "blocked";
  priority?: "low" | "medium" | "high" | "urgent";
  assigneeId?: number | string;
  sprintId?: number | string;
  projectId?: number | string;
  storyPoints?: number;
  [key: string]: any;
}

export async function fetchProjects(): Promise<Project[]> {
  return apiRequest("/projects/");
}

export async function fetchSprints(projectId?: string | number): Promise<Sprint[]> {
  const query = projectId ? `?project_id=${projectId}` : "";
  return apiRequest(`/sprints/${query}`);
}

export async function createSprint(sprintData: any): Promise<Sprint> {
  return apiRequest("/sprints/", {
    method: "POST",
    body: JSON.stringify(sprintData),
  });
}

export async function fetchMilestones(projectId?: string | number): Promise<any[]> {
  const query = projectId ? `?project_id=${projectId}` : "";
  return apiRequest(`/milestones/${query}`);
}

export async function createMilestone(milestoneData: any): Promise<any> {
  return apiRequest("/milestones/", {
    method: "POST",
    body: JSON.stringify(milestoneData),
  });
}

export async function createTask(taskData: TaskPayload): Promise<any> {
  return apiRequest("/tasks/", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function moveTaskApi(
  taskId: string | number,
  newStatus: string
): Promise<any> {
  return apiRequest(`/tasks/${taskId}/move/`, {
    method: "PATCH",
    body: JSON.stringify({ status: newStatus }),
  });
}

export async function getTaskComments(taskId: string | number): Promise<any[]> {
  return apiRequest(`/tasks/${taskId}/comments/`);
}

export async function createTaskComment(
  taskId: string | number,
  content: string
): Promise<any> {
  return apiRequest(`/tasks/${taskId}/comments/`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function deleteTaskComment(commentId: string | number): Promise<void> {
  return apiRequest(`/comments/${commentId}/`, {
    method: "DELETE",
  });
}

export async function fetchSprintBurndownData(
  sprintId: string | number
): Promise<any> {
  return apiRequest(`/sprints/${sprintId}/burndown/`);
}

export async function fetchSprintCapacityVelocity(
  sprintId: string | number
): Promise<any> {
  return apiRequest(`/sprints/${sprintId}/velocity/`);
}

export async function fetchActiveDashboardTasks(): Promise<any[]> {
  return apiRequest("/tasks/dashboard/");
}

export async function fetchUpcomingDeadlines(): Promise<any[]> {
  return apiRequest("/tasks/deadlines/");
}

export async function fetchTeamWorkload(): Promise<any[]> {
  return apiRequest("/tasks/workload/");
}
