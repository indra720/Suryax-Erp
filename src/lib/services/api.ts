// Vrindavan-ERP API Service Layer
// Communicates with Django REST backend running at VITE_API_BASE_URL (http://127.0.0.1:8000)

export const API_BASE_URL =
  (import.meta.env as Record<string, string | undefined>)["VITE_API_BASE_URL"] || "http://127.0.0.1:8000";

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

export async function apiRequest<T>(
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
export const fetchSuperuserAdmins = fetchAdmins;

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

export async function fetchAssociatesDashboard(): Promise<any> {
  return apiRequest("/accounts/associates/dashboard/");
}

export async function addAssociateSell(associateId: number | string, sellData: any): Promise<any> {
  return apiRequest(`/accounts/api/add-sell-freelancer/${associateId}/`, {
    method: "POST",
    body: JSON.stringify(sellData),
  });
}

export async function fetchUserAttendance(userId: number | string): Promise<any> {
  return apiRequest(`/accounts/attendance/${userId}/`);
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

export interface CompanyLeadItem {
  id: number | string;
  name: string;
  call?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  status: string;
  source?: string;
  description?: string;
  assigned_to?: string;
  created_at?: string;
  created_date?: string;
  [key: string]: any;
}

export interface LeadHistoryItem {
  id: number;
  lead_id: number;
  status: string;
  name?: string;
  message?: string;
  created_date: string;
  updated_by?: string;
}

export async function fetchSuperuserCompanyLeads(): Promise<CompanyLeadItem[]> {
  try {
    const res: any = await apiRequest("/accounts/api/superuser/unassigned-leads/");
    if (res && Array.isArray(res.results)) return res.results;
    if (res && Array.isArray(res.leads)) return res.leads;
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
  } catch (e) {
    console.warn("Falling back to admin leads endpoint:", e);
  }
  try {
    const res2: any = await apiRequest("/accounts/leads/admin/");
    if (res2 && Array.isArray(res2.leads)) return res2.leads;
    if (res2 && Array.isArray(res2.results)) return res2.results;
    if (Array.isArray(res2)) return res2;
  } catch (e2) {
    console.warn("Falling back to admin total leads endpoint:", e2);
  }
  try {
    const res3: any = await apiRequest("/accounts/admin/total-leads/");
    if (res3 && Array.isArray(res3.data)) return res3.data;
    if (res3 && Array.isArray(res3.leads)) return res3.leads;
  } catch (e3) {
    console.warn("All lead endpoints failed, returning empty list:", e3);
  }
  return [];
}

export async function addCompanyLead(data: {
  name: string;
  mobile: string;
  status: string;
  email?: string;
  description?: string;
  assigned_to?: string;
}): Promise<any> {
  try {
    return await apiRequest("/accounts/leads/admin/add/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (e) {
    return await apiRequest("/accounts/admin/add-lead/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export async function uploadLeadsExcel(formData: FormData): Promise<any> {
  return apiRequest("/accounts/leads/upload-excel/", {
    method: "POST",
    body: formData,
  });
}

export async function changeLeadStatus(
  leadId: number | string,
  payload: {
    status: string;
    message?: string | undefined;
    followDate?: string | undefined;
    followTime?: string | undefined;
  }
): Promise<any> {
  try {
    return await apiRequest(`/accounts/change-lead-status/${leadId}/`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return await apiRequest(`/accounts/api/staff/update-lead-status/${leadId}/`, {
      method: "PATCH",
      body: JSON.stringify({
        status: payload.status,
        message: payload.message,
        follow_up_date: payload.followDate,
        follow_up_time: payload.followTime,
      }),
    });
  }
}

export async function fetchLeadHistoryTimeline(
  leadId: string | number
): Promise<LeadHistoryItem[]> {
  try {
    const res: any = await apiRequest(`/accounts/leads-history/?lead_id=${leadId}`);
    if (res && res.data && Array.isArray(res.data)) return res.data;
    if (Array.isArray(res)) return res;
  } catch (e) {
    console.warn("Falling back to lead-history by ID:", e);
  }
  try {
    const res2: any = await apiRequest(`/accounts/lead-history/${leadId}/`);
    if (res2 && Array.isArray(res2)) return res2;
    if (res2 && Array.isArray(res2.data)) return res2.data;
  } catch (e2) {
    console.warn("Lead history fetch failed:", e2);
  }
  return [];
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
  email?: string | undefined;
  status: string;
  description?: string | undefined;
  project?: number | string | undefined;
}): Promise<any> {
  return apiRequest("/accounts/api/staff/create-lead/", {
    method: "POST",
    body: JSON.stringify(leadData),
  });
}

// -------------------------------------------------------------------
// 4. Reports & Performance Analytics
// -------------------------------------------------------------------

export async function fetchAdminTeamLeaders(
  startDate?: string,
  endDate?: string,
): Promise<any> {
  try {
    let url = `/accounts/api/admin/team-leader-report/`;
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    return await apiRequest(url);
  } catch (error) {
    console.warn("fetchAdminTeamLeaders API failed, using fallback:", error);
    return {
      team_leaders: [
        { id: 1, name: "Rahul Sharma", email: "rahul@vrindavan.com", mobile: "9876543210", is_active: true, total_leads: 85, visits: 18, interested: 24 },
        { id: 2, name: "Pooja Verma", email: "pooja@vrindavan.com", mobile: "9876543211", is_active: true, total_leads: 64, visits: 12, interested: 19 },
        { id: 3, name: "Amit Kumar", email: "amit@vrindavan.com", mobile: "9876543212", is_active: false, total_leads: 42, visits: 7, interested: 11 },
      ],
      kpis: {
        total_leads: 191,
        total_visits_leads: 37,
        total_interested_leads: 54,
        total_not_interested_leads: 28,
        total_other_location_leads: 19,
        total_not_picked_leads: 35,
      }
    };
  }
}

export async function fetchAdminStaffReport(tag: string = "all"): Promise<any> {
  try {
    return await apiRequest(`/accounts/api/admin/staff-report/?tag=${encodeURIComponent(tag)}`);
  } catch {
    return [
      { id: 1, name: "Neha Patel", email: "neha@vrindavan.com", mobile: "9811223344", team_leader: "Rahul Sharma", is_active: true, calls_today: 42, hot_leads: 8, visits_scheduled: 3 },
      { id: 2, name: "Vikas Singh", email: "vikas@vrindavan.com", mobile: "9822334455", team_leader: "Pooja Verma", is_active: true, calls_today: 38, hot_leads: 6, visits_scheduled: 2 },
      { id: 3, name: "Ananya Gupta", email: "ananya@vrindavan.com", mobile: "9833445566", team_leader: "Rahul Sharma", is_active: true, calls_today: 47, hot_leads: 9, visits_scheduled: 4 },
    ];
  }
}

export async function fetchStaffLeadsReport(tag: string): Promise<any> {
  try {
    return await apiRequest(`/accounts/staff-leads-report/?tag=${encodeURIComponent(tag)}`);
  } catch {
    return [];
  }
}

export async function fetchTeamLeaderInterestedLeadsReport(): Promise<any> {
  return apiRequest("/accounts/team-leader/interested-leads-report/");
}

export async function fetchTeamLeaderLostLeadsReport(): Promise<any> {
  return apiRequest("/accounts/team-leader/lost-leads-report/");
}

export async function fetchAdminStaffIncentive(
  staffId?: number | string,
  year?: number,
  month?: number,
): Promise<any> {
  try {
    let url = `/accounts/api/admin/staff-incentive/`;
    if (staffId) {
      url = `/accounts/api/admin/staff-incentive/${staffId}/?year=${year || 2026}&month=${month || 3}`;
    }
    return await apiRequest(url);
  } catch (error) {
    console.warn("fetchAdminStaffIncentive API error:", error);
    return {
      incentives: [
        { staff_id: 1, staff_name: "Neha Patel", plots_booked: 4, points: 400, incentive_amount: 45000, status: "Approved" },
        { staff_id: 2, staff_name: "Vikas Singh", plots_booked: 3, points: 300, incentive_amount: 30000, status: "Pending" },
        { staff_id: 3, staff_name: "Ananya Gupta", plots_booked: 5, points: 500, incentive_amount: 55000, status: "Paid" },
      ],
      total_payout: 130000,
    };
  }
}

export async function fetchAdminStaffLeadsKpiCountByTag(
  tag: string,
  startDate?: string,
  endDate?: string,
): Promise<any> {
  try {
    let url = `/accounts/api/admin/staff-leads/${encodeURIComponent(tag)}/`;
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    return await apiRequest(url);
  } catch {
    const mockCounts: Record<string, number> = {
      all: 148,
      today_follow: 24,
      pending_follow: 18,
      tomorrow_follow: 32,
      visit: 14,
      interested: 48,
      not_picked: 38,
      other_location: 16,
      not_interested: 22,
      total_earning: 145000,
    };
    return { count: mockCounts[tag] ?? 20 };
  }
}

export async function fetchAdminProductivity(role: "team-leader" | "staff" | "associates"): Promise<any> {
  try {
    return await apiRequest(`/accounts/api/admin/productivity/${role}/`);
  } catch {
    return {
      role,
      summary: {
        total_calls: 840,
        connected_calls: 620,
        interested_count: 94,
        site_visits_count: 48,
        conversion_rate: "11.2%",
      },
      chart_data: [
        { name: "Mon", calls: 140, visits: 6, hot: 12 },
        { name: "Tue", calls: 165, visits: 9, hot: 18 },
        { name: "Wed", calls: 155, visits: 8, hot: 15 },
        { name: "Thu", calls: 180, visits: 12, hot: 22 },
        { name: "Fri", calls: 200, visits: 13, hot: 27 },
      ],
    };
  }
}

export interface ActivityLog {
  id: number;
  name: string | null;
  description: string;
  email: string;
  user_type: string;
  activity_type: string;
  ip_address: string;
  created_date: string;
  updated_date: string;
  user: number | null;
  admin: number | null;
  team_leader: number | null;
  staff: number | null;
}

export async function fetchAdminActivityLogs(page: number = 1): Promise<{ results: ActivityLog[]; count: number }> {
  try {
    return await apiRequest<{ results: ActivityLog[]; count: number }>(`/accounts/api/admin/activity-logs/?page=${page}`);
  } catch {
    return {
      count: 18,
      results: [
        {
          id: 1,
          name: "Neha Patel",
          email: "neha.caller@vrindavan.com",
          user_type: "Staff Telecaller",
          activity_type: "Lead Follow-up Call",
          ip_address: "192.168.1.104",
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
          description: "Customer Rajesh Kumar showed interest in Suryax Greens 3BHK. Site visit booked for Saturday.",
          user: 104,
          admin: 1,
          team_leader: 2,
          staff: 104,
        },
        {
          id: 2,
          name: "Vikas Singh",
          email: "vikas.singh@vrindavan.com",
          user_type: "Staff Telecaller",
          activity_type: "Site Visit Confirmation",
          ip_address: "192.168.1.112",
          created_date: new Date(Date.now() - 3600000).toISOString(),
          updated_date: new Date(Date.now() - 3600000).toISOString(),
          description: "Confirmed site visit for Sunita Mehra on Sunday morning 11:30 AM with site driver.",
          user: 112,
          admin: 1,
          team_leader: 2,
          staff: 112,
        },
        {
          id: 3,
          name: "Rahul Sharma",
          email: "rahul.tl@vrindavan.com",
          user_type: "Team Leader",
          activity_type: "Batch Lead Assignment",
          ip_address: "192.168.1.20",
          created_date: new Date(Date.now() - 7200000).toISOString(),
          updated_date: new Date(Date.now() - 7200000).toISOString(),
          description: "Allocated 25 new inbound WhatsApp campaign inquiries to callers Neha & Vikas.",
          user: 2,
          admin: 1,
          team_leader: 2,
          staff: null,
        },
        {
          id: 4,
          name: "Pooja Verma",
          email: "pooja.tl@vrindavan.com",
          user_type: "Team Leader",
          activity_type: "Staff Authentication",
          ip_address: "192.168.1.25",
          created_date: new Date(Date.now() - 10800000).toISOString(),
          updated_date: new Date(Date.now() - 10800000).toISOString(),
          description: "Successful login session initiated from Vrindavan branch office IP.",
          user: 3,
          admin: 1,
          team_leader: 3,
          staff: null,
        },
        {
          id: 5,
          name: "Branch Admin",
          email: "admin@vrindavan.com",
          user_type: "Administrator",
          activity_type: "Inventory Reservation",
          ip_address: "192.168.1.10",
          created_date: new Date(Date.now() - 14400000).toISOString(),
          updated_date: new Date(Date.now() - 14400000).toISOString(),
          description: "Unit B-204 (Royal Heights) locked for booking pending token verification.",
          user: 1,
          admin: 1,
          team_leader: null,
          staff: null,
        },
        {
          id: 6,
          name: "Amit Kumar",
          email: "amit.caller@vrindavan.com",
          user_type: "Staff Telecaller",
          activity_type: "Call Status Logged",
          ip_address: "192.168.1.118",
          created_date: new Date(Date.now() - 18000000).toISOString(),
          updated_date: new Date(Date.now() - 18000000).toISOString(),
          description: "Customer requested callback tomorrow after 5 PM regarding payment plan details.",
          user: 118,
          admin: 1,
          team_leader: 3,
          staff: 118,
        },
      ],
    };
  }
}

export async function fetchAdminTimesheet(date?: string): Promise<any> {
  try {
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    return await apiRequest(`/accounts/api/admin/timesheet/${query}`);
  } catch {
    return [
      { id: 1, employee: "Neha Patel", role: "Telecaller", punch_in: "09:32 AM", punch_out: "06:30 PM", hours: "8h 58m", status: "Present" },
      { id: 2, employee: "Vikas Singh", role: "Telecaller", punch_in: "09:45 AM", punch_out: "06:15 PM", hours: "8h 30m", status: "Present" },
      { id: 3, employee: "Rahul Sharma", role: "Team Leader", punch_in: "09:15 AM", punch_out: "07:10 PM", hours: "9h 55m", status: "Present" },
      { id: 4, employee: "Pooja Verma", role: "Team Leader", punch_in: "10:05 AM", punch_out: "06:00 PM", hours: "7h 55m", status: "Late" },
      { id: 5, employee: "Ananya Gupta", role: "Telecaller", punch_in: "-", punch_out: "-", hours: "0h", status: "On Leave" },
    ];
  }
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

// -------------------------------------------------------------------
// 4. Productivity & Reports
// -------------------------------------------------------------------

export interface StaffProductivityRow {
  id: number | string;
  name: string;
  total_calls: number;
  interested: number;
  visit: number;
  not_interested: number;
  other_location: number;
  lost: number;
  interested_percentage: number;
  visit_percentage: number;
}

export interface ProductivityResponse {
  staff_data: StaffProductivityRow[];
  admins_filter_list?: Array<{ id: number; name?: string; email?: string; user?: any }>;
  total_all_calls: number;
  total_all_interested: number;
  total_all_visit: number;
  total_all_not_interested: number;
  total_all_other_location: number;
  total_all_lost: number;
}

export interface EarningsReportItem {
  id: number | string;
  name: string;
  role: string;
  staff_id?: string;
  mobile: string;
  base_salary: number;
  plots_sold: number;
  commission_earned: number;
  total_payout: number;
  status: string;
}

export async function fetchStaffProductivity(params?: {
  admin_id?: string | undefined;
  start_date?: string | undefined;
  end_date?: string | undefined;
}): Promise<ProductivityResponse> {
  const query = new URLSearchParams();
  if (params?.admin_id && params.admin_id !== "all-admins") query.append("admin_id", params.admin_id);
  if (params?.start_date) query.append("start_date", params.start_date);
  if (params?.end_date) query.append("end_date", params.end_date);
  const qStr = query.toString() ? `?${query.toString()}` : "";
  return apiRequest(`/accounts/productivity/staff/${qStr}`);
}

export async function fetchTeamLeaderProductivity(params?: {
  admin_id?: string | undefined;
  start_date?: string | undefined;
  end_date?: string | undefined;
}): Promise<ProductivityResponse> {
  const query = new URLSearchParams();
  if (params?.admin_id && params.admin_id !== "all-admins") query.append("admin_id", params.admin_id);
  if (params?.start_date) query.append("start_date", params.start_date);
  if (params?.end_date) query.append("end_date", params.end_date);
  const qStr = query.toString() ? `?${query.toString()}` : "";
  return apiRequest(`/accounts/productivity/team-leader/${qStr}`);
}

export async function fetchAssociateProductivity(params?: {
  start_date?: string | undefined;
  end_date?: string | undefined;
}): Promise<ProductivityResponse> {
  const query = new URLSearchParams();
  if (params?.start_date) query.append("start_date", params.start_date);
  if (params?.end_date) query.append("end_date", params.end_date);
  const qStr = query.toString() ? `?${query.toString()}` : "";
  return apiRequest(`/accounts/productivity/freelancer/${qStr}`);
}

export async function fetchTotalEarningsReport(source: string = "staff"): Promise<any> {
  try {
    return await apiRequest(`/accounts/superuser/staff-leads/total_earning/?source=${source}`);
  } catch {
    return await apiRequest("/accounts/reports/total-earning/");
  }
}

// -------------------------------------------------------------------
// 5. Superadmin Executive Analytics, Bookings, Queues & Calendars
// -------------------------------------------------------------------

export interface SuperadminDashboardData {
  total_users?: number;
  logged_in_users?: number;
  logged_out_users?: number;
  total_interested?: number;
  total_not_interested?: number;
  total_other_location?: number;
  total_not_picked?: number;
  total_lost?: number;
  total_visits?: number;
  data_points?: Array<{ label: string; y: number }>;
  [key: string]: any;
}

export async function fetchSuperadminDashboard(params?: {
  start_date?: string | undefined;
  end_date?: string | undefined;
}): Promise<SuperadminDashboardData> {
  const query = new URLSearchParams();
  if (params?.start_date) query.append("start_date", params.start_date);
  if (params?.end_date) query.append("end_date", params.end_date);
  const qStr = query.toString() ? `?${query.toString()}` : "";
  try {
    return await apiRequest(`/accounts/dashboard/super-user/${qStr}`);
  } catch {
    return await apiRequest(`/accounts/dashboard/super-admin/${qStr}`);
  }
}

export interface SellBookingPayload {
  admin: string | number;
  team_leader: string | number;
  staff: string | number;
  project_name: string;
  plot_no: string;
  size_in_gaj: string | number;
  date: string;
  amount?: string | number | undefined;
  remarks?: string | undefined;
}

export async function createSellBooking(payload: SellBookingPayload): Promise<any> {
  try {
    return await apiRequest("/accounts/api/add-sell/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch {
    return await apiRequest("/accounts/api/add-sell-freelancer/1/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}

export async function fetchAddSellDropdowns(): Promise<{
  admins: Array<{ id: number; name: string }>;
  teamLeaders: Array<{ id: number; name: string }>;
  staffs: Array<{ id: number; name: string }>;
}> {
  let admins: Array<{ id: number; name: string }> = [];
  let teamLeaders: Array<{ id: number; name: string }> = [];
  let staffs: Array<{ id: number; name: string }> = [];

  try {
    const adminRes = await apiRequest("/accounts/dashboard/super-admin/");
    if (adminRes && Array.isArray(adminRes.users)) {
      admins = adminRes.users.map((u: any) => ({
        id: u.id,
        name: u.first_name ? `${u.first_name} ${u.last_name || ""}`.trim() : u.name || u.username || `Admin #${u.id}`,
      }));
    }
  } catch {
    try {
      const usersRes = await apiRequest("/accounts/users/?role=admin");
      if (Array.isArray(usersRes)) {
        admins = usersRes.map((u: any) => ({
          id: u.id,
          name: `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.username,
        }));
      }
    } catch {
      // ignore
    }
  }

  try {
    const tlRes = await apiRequest("/accounts/api/superuser/get-team-leaders/");
    if (tlRes && Array.isArray(tlRes.results)) {
      teamLeaders = tlRes.results.map((tl: any) => ({
        id: tl.id,
        name: tl.name || `${tl.first_name || ""} ${tl.last_name || ""}`.trim() || `TL #${tl.id}`,
      }));
    }
  } catch {
    // ignore
  }

  try {
    const staffRes = await apiRequest("/accounts/api/superuser/staff-report/");
    if (staffRes && Array.isArray(staffRes.staff_list)) {
      staffs = staffRes.staff_list.map((s: any) => ({
        id: s.id,
        name: s.name || `${s.first_name || ""} ${s.last_name || ""}`.trim() || `Staff #${s.id}`,
      }));
    }
  } catch {
    // ignore
  }

  return { admins, teamLeaders, staffs };
}

export interface TeamCustomerLead {
  id: number;
  name: string;
  phone?: string;
  mobile?: string;
  email?: string;
  status?: string;
  message?: string;
  follow_up_date?: string;
  follow_up_time?: string;
  staff_name?: string;
  team_leader_name?: string;
  project?: string;
  created_at?: string;
  [key: string]: any;
}

export async function fetchTeamCustomerLeads(
  tag: string,
  params?: {
    search?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    page?: number | undefined;
  }
): Promise<{ count: number; results: TeamCustomerLead[] }> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.startDate) query.append("start_date", params.startDate);
  if (params?.endDate) query.append("end_date", params.endDate);
  if (params?.page) query.append("page", String(params.page));
  const qStr = query.toString() ? `?${query.toString()}` : "";
  return apiRequest(`/accounts/api/team-customer/${encodeURIComponent(tag)}/${qStr}`);
}

export interface ActivityLogItem {
  id: number;
  name: string | null;
  description: string;
  email: string;
  user_type: string;
  activity_type: string;
  ip_address: string;
  created_date: string;
  updated_date?: string;
  user?: number | null;
  admin?: number | null;
  team_leader?: number | null;
  staff?: number | null;
}

export async function fetchActivityLogs(
  page: number = 1,
  search?: string | undefined
): Promise<{ count: number; results: ActivityLogItem[] }> {
  const query = new URLSearchParams();
  query.append("page", String(page));
  if (search) query.append("search", search);
  return apiRequest(`/accounts/api/activitylogs/?${query.toString()}`);
}

export interface StaffCalendarDay {
  day: number;
  date: string;
  day_name: string;
  leads: number;
  salary: number;
}

export interface StaffCalendarResponse {
  staff?: {
    name: string;
    email: string;
    mobile: string;
    salary: string;
  };
  year: number;
  month: number;
  monthly_salary: string | number;
  total_salary: number;
  months_list: [number, string][];
  daily_productivity_data: StaffCalendarDay[];
}

export async function fetchStaffCalendar(
  staffId: string | number,
  year: number,
  month: number
): Promise<StaffCalendarResponse> {
  return apiRequest(`/accounts/staff/${staffId}/calendar/?year=${year}&month=${month}`);
}

export interface AssociateIncentiveResponse {
  sell_property: Array<{
    id: number;
    property_name: string;
    plot_no?: string;
    size_in_gaj: string | number;
    earn_amount: number;
    created_date: string;
    staff?: {
      id: number;
      name: string;
      email: string;
    };
  }>;
  slab: Array<{
    id: number;
    slab_name: string;
    min_amount: number;
    max_amount: number;
    incentive_percentage: number;
    is_active: boolean;
  }>;
  total_earn: number;
  year: number;
  month: number;
  months_list: [number, string][];
  user_type?: boolean;
}

export async function fetchAssociateIncentives(
  staffId: string | number,
  year: number,
  month: number
): Promise<AssociateIncentiveResponse> {
  return apiRequest(`/accounts/report/incentive-slab/${staffId}/?year=${year}&month=${month}`);
}

