# Vrindavan-ERP: Backend API Reference & Contract Specification

Base URL: `http://127.0.0.1:8000`  
Authentication: `Authorization: Token <token>` (stored in `localStorage.getItem("authToken")`)  
Content-Type: `application/json`

---

## 1. Authentication & Profile Endpoints

### 1.1 `fetchCurrentUserProfile()`
* **Endpoint**: `GET /accounts/profile/`
* **Headers**: `Authorization: Token <token>`
* **Description**: Returns the current logged-in user profile, permissions, branch, and role.
* **Response**:
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@vrindavan.com",
  "role": "superadmin",
  "name": "Indrajeet",
  "avatar": "https://..."
}
```

### 1.2 `toggleUserActiveStatus(userId, userType, isActive)`
* **Endpoint**: `POST /accounts/users/toggle-active/`
* **Payload**:
```json
{
  "user_id": 12,
  "user_type": "staff",
  "is_active": true
}
```
* **Description**: Activates or deactivates a user account.

---

## 2. Lead Management & Telecalling CRM

### 2.1 `fetchAdminLeadsByTag(tag)`
* **Endpoint**: `GET /accounts/admin-leads/${tag}/`
* **Tags Supported**: `interested`, `not_interested`, `not_picked`, `other_location`, `visit`, `today_followups`, `tomorrow_followups`, `pending`
* **Response**:
```json
{
  "staff_leads": [...],
  "team_leads": [...]
}
```

### 2.2 `updateLeadStatusAndFollowUp(leadId, payload)`
* **Endpoint**: `POST /accounts/lead/status-and-followup/`
* **Payload**:
```json
{
  "lead_id": "101",
  "status": "interested",
  "remarks": "Customer wants 3BHK flat on 4th floor",
  "next_followup_date": "2026-09-20",
  "next_followup_time": "14:30"
}
```

### 2.3 `fetchLeadsForStaff(tag)`
* **Endpoint**: `GET /accounts/leads-for-staff/` (Query: `?tag=${tag}`)
* **Description**: Returns all leads assigned to the logged-in telecaller.

### 2.4 `fetchLeadHistory(leadId)`
* **Endpoint**: `GET /accounts/lead-history/${leadId}/`
* **Description**: Returns calling history, previous follow-ups, and notes for a lead.

### 2.5 `addAdminLead(leadData)`
* **Endpoint**: `POST /accounts/admin/add-lead/`
* **Payload**:
```json
{
  "name": "Ramesh Sharma",
  "phone": "+919876543210",
  "email": "ramesh@gmail.com",
  "source": "Website Campaign",
  "budget": "50L - 75L",
  "project": "Vrindavan Heights",
  "assigned_to": 5
}
```

---

## 3. Team Management & Subordinate Reporting

### 3.1 `fetchTeamLeaders()`
* **Endpoint**: `GET /accounts/team-leaders/`
* **Description**: Returns all active team leaders.

### 3.2 `fetchAdmins()`
* **Endpoint**: `GET /accounts/admins/`
* **Description**: Returns list of all branch admins.

### 3.3 `fetchTeamLeaderStaffList()`
* **Endpoint**: `GET /accounts/team-leader-staff-list/`
* **Description**: Returns list of staff members reporting to the logged-in team leader.

### 3.4 `fetchAdminStaffReport(tag, dateRange)`
* **Endpoint**: `GET /accounts/admin-staff-report/`
* **Description**: Detailed call conversion and activity metrics for all staff.

---

## 4. Agile PMS (Project Management System)

### 4.1 `fetchProjects()`
* **Endpoint**: `GET /projects/`
* **Response**: Array of projects with team member lists and milestones.

### 4.2 `fetchSprints(projectId)`
* **Endpoint**: `GET /sprints/?project_id=${projectId}`
* **Response**: Active and completed sprints with goal, start date, end date, and story points.

### 4.3 `createSprint(sprintData)`
* **Endpoint**: `POST /sprints/`
* **Payload**:
```json
{
  "name": "Sprint 14: Booking Gateway",
  "project_id": "1",
  "start_date": "2026-09-18",
  "end_date": "2026-10-02",
  "goal": "Finalize payment disbursements and draft templates"
}
```

### 4.4 `createTask(taskData)`
* **Endpoint**: `POST /tasks/`
* **Payload**:
```json
{
  "title": "Build ID Card Studio canvas",
  "description": "Render employee badge with QR code",
  "status": "to_do",
  "priority": "high",
  "assignee_id": 4,
  "sprint_id": 14,
  "story_points": 5
}
```

### 4.5 `moveTaskApi(taskId, newStatus)`
* **Endpoint**: `PATCH /tasks/${taskId}/move/`
* **Payload**:
```json
{
  "status": "in_progress"
}
```
* **Status values**: `to_do`, `in_progress`, `review`, `done`, `blocked`

### 4.6 `getTaskComments(taskId)` & `createTaskComment(taskId, comment)`
* **Endpoints**:
  * `GET /tasks/${taskId}/comments/`
  * `POST /tasks/${taskId}/comments/`

### 4.7 `fetchSprintBurndownData(sprintId)`
* **Endpoint**: `GET /sprints/${sprintId}/burndown/`
* **Response**: Daily ideal vs actual story point burn rate.

---

## 5. HRMS & Attendance Endpoints

### 5.1 Manual Attendance Log
* **Endpoint**: `POST /accounts/attendance/manual/`
* **Payload**:
```json
{
  "employee_id": 15,
  "date": "2026-09-18",
  "check_in": "09:30",
  "check_out": "18:30",
  "status": "present",
  "notes": "Logged by HR"
}
```

### 5.2 Employees Directory
* **Endpoint**: `GET /accounts/employees/`
* **Description**: Returns employee profiles, designations, shifts, and document verification status.
