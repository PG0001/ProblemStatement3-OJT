# ProblemStatement3-OJT

# Project Tracker

Lightweight Project Tracker to create projects, add tasks, assign people, and track progress. Designed to practice realistic backend design decisions (DTOs, validation, authentication, mapping, error handling) and provide a clean REST API.

---

## Table of contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech stack](#tech-stack)
4. [System architecture & data model](#system-architecture--data-model)
5. [Authentication & Authorization](#authentication--authorization)
6. [API Reference (summary)](#api-reference-summary)
7. [DTOs & Example JSON payloads](#dtos--example-json-payloads)
8. [Validation rules & business logic](#validation-rules--business-logic)
9. [Pagination, Filtering & Sorting](#pagination-filtering--sorting)
10. [Errors & HTTP codes](#errors--http-codes)
11. [Testing](#testing)
12. [Development & Running locally](#development--running-locally)
13. [Deployment](#deployment)
14. [Contributing](#contributing)
15. [License](#license)

---

## Overview

This service provides a REST API for managing projects, tasks, and comments with role-based access (Employee, Manager, Admin). The API is JWT-secured and returns well-formed DTOs.

Primary flows:

* Create and manage projects (Manager/Admin)
* Create and manage tasks inside projects (Managers and allowed users)
* Comment on tasks (any authenticated user)
* Dashboard summary for project progress

---

## Features

* CRUD for Projects and Tasks
* Task assignment and status/priority updates
* Comments on tasks
* Dashboard endpoint with counts and completion percentage
* JWT authentication and role-based authorization
* Pagination, filtering, and sorting for lists
* Input validation and explicit error responses

---

## Tech stack

Example stack used while developing this project (adjust to your stack):

* Language: C# (.NET 7/8)
* Web framework: ASP.NET Core Web API
* Authentication: JWT (Microsoft.AspNetCore.Authentication.JwtBearer)
* Database: PostgreSQL / SQL Server / SQLite (EF Core)
* ORM: Entity Framework Core
* Mapping: AutoMapper
* Testing: xUnit / NUnit
* Containerization: Docker (optional)

---

## System architecture & data model

### Entities (ER summary)

**Employee**

* EmployeeId (PK)
* Name
* Email
* Role (Employee/Manager/Admin)

**Project**

* ProjectId (PK)
* Name
* Description
* StartDate
* EndDate
* ManagerId (FK -> Employee)

**TaskItem**

* TaskId (PK)
* ProjectId (FK -> Project)
* Title
* Description
* AssignedToId (FK -> Employee)
* Status (ToDo/InProgress/Done)
* Priority (Low/Medium/High)
* DueDate
* CreatedAt
* UpdatedAt

**Comment**

* CommentId (PK)
* TaskId (FK -> TaskItem)
* EmployeeId (FK -> Employee)
* Text
* CreatedAt

Relationships:

* Project 1..* TaskItem
* TaskItem 1..* Comment
* Employee 1..* TaskItem (assignment)

ER diagram: implement as a simple diagram in your docs workspace or use an online tool (dbdiagram, draw.io).

---

## Authentication & Authorization

* `POST /api/auth/login` — Accepts `{ email, password }`, returns JWT containing `sub` (employee id), `email`, and `role` claim.
* `POST /api/auth/register` — Admin only (optional)

Roles:

* `Employee` — basic user; can read projects/tasks, add comments, and update tasks they are assigned to (if allowed)
* `Manager` — can create/update projects, create tasks, assign tasks
* `Admin` — full access, including deleting projects and managing users

Authorization is enforced with role-based policies on controllers/actions.

Sample JWT claims:

```json
{
  "sub": "123",
  "email": "alice@example.com",
  "role": "Manager",
  "iat": 1699999999,
  "exp": 1702601999
}
```

---

## API Reference (summary)

> All requests to protected endpoints require header: `Authorization: Bearer <token>`

### Auth

* `POST /api/auth/login` — body: `{ email, password }` -> 200 OK with `{ token }` or 401
* `POST /api/auth/register` — Admin only; body: employee create DTO

### Projects

* `POST /api/projects` — Create project (Manager/Admin). 201 Created.
* `GET /api/projects` — Get paginated list. 200 OK.
* `GET /api/projects/{id}` — Get project details + summary. 200 OK / 404
* `PUT /api/projects/{id}` — Update project (Manager/Admin). 200 OK / 400 / 403
* `DELETE /api/projects/{id}` — Delete project (Admin). 204 No Content / 403

### Tasks

* `POST /api/projects/{projectId}/tasks` — Create task. 201 Created.
* `GET /api/projects/{projectId}/tasks` — List tasks for project (filters & pagination). 200 OK.
* `GET /api/tasks/{taskId}` — Task details with comments. 200 OK / 404.
* `PUT /api/tasks/{taskId}` — Update task (status change, assignment). 200 OK / 400.
* `DELETE /api/tasks/{taskId}` — Delete task (Manager/Admin). 204 No Content / 403

### Comments

* `POST /api/tasks/{taskId}/comments` — Add comment (any authenticated user). 201 Created.
* `GET /api/tasks/{taskId}/comments` — List comments. 200 OK.

### Dashboard

* `GET /api/dashboard/project-summary/{projectId}` — Returns:

```json
{
  "totalTasks": 42,
  "completedCount": 10,
  "inProgressCount": 20,
  "todoCount": 12,
  "overdueCount": 5,
  "completionPercentage": 23.8
}
```

---

## DTOs & Example JSON payloads

### ProjectCreateDto

```json
{
  "name": "Website Redesign",
  "description": "Landing page revamp",
  "startDate": "2025-10-01",
  "endDate": "2025-12-31",
  "managerId": 5
}
```

### ProjectReadDto

```json
{
  "projectId": 1,
  "name": "Website Redesign",
  "description": "...",
  "startDate": "2025-10-01",
  "endDate": "2025-12-31",
  "manager": { "employeeId": 5, "name": "Alice" },
  "summary": { "totalTasks": 12, "completed": 2 }
}
```

### TaskCreateDto

```json
{
  "title": "Design hero section",
  "description": "Create mockups",
  "assignedToId": 8,
  "priority": "High",
  "dueDate": "2025-10-15"
}
```

### TaskUpdateDto

```json
{
  "title": "Design hero section v2",
  "status": "InProgress",
  "assignedToId": 8,
  "dueDate": "2025-10-20"
}
```

### CommentCreateDto

```json
{ "text": "Please follow the design system for spacing." }
```

---

## Validation rules & business logic

1. **Project EndDate >= StartDate** — return 400 Bad Request with field-level error if violated.
2. **Task DueDate >= today** — cannot create a task with a past due date.
3. **Status transitions must be linear** — allowed transitions: `ToDo` → `InProgress` → `Done`. Disallow reverse jumps or skipping (e.g., `ToDo` → `Done`) unless explicitly permitted by an Admin override endpoint.
4. **Only Managers/Admins** can create or edit projects. **Delete project**: Admin only.
5. **Task create**: Managers and users assigned to the project (or Admin) can create tasks.
6. **Overdue calculations**: a task is overdue if `DueDate` < today's date and `Status` != `Done`.

Validation responses should contain a consistent shape:

```json
{
  "errors": {
    "dueDate": ["Due date must be today or later."],
    "endDate": ["End date must be after or equal to start date."]
  }
}
```

---

## Pagination, Filtering & Sorting

Use common query parameters:

* `page` (default 1), `pageSize` (default 20)
* `search` (for text search on name/title)
* `status` (ToDo, InProgress, Done)
* `assignedTo` (employeeId)
* `manager` (employeeId)
* `sortBy` (e.g., `dueDate`, `createdAt`, `priority`), `sortDir` (`asc`/`desc`)

Response shape for paginated endpoints:

```json
{
  "items": [ ... ],
  "page": 1,
  "pageSize": 20,
  "totalCount": 123,
  "totalPages": 7
}
```

---

## Errors & HTTP codes

* `200 OK` — successful GET/PUT
* `201 Created` — resource created
* `204 No Content` — successful delete
* `400 Bad Request` — validation errors
* `401 Unauthorized` — no or invalid token
* `403 Forbidden` — lacks role/permission
* `404 Not Found` — resource not found
* `409 Conflict` — concurrency or uniqueness constraint
* `500 Internal Server Error` — unexpected errors (log and return sanitized message)

Include a consistent error envelope (see Validation responses above).

---

## Testing

* Unit tests for services and validators (xUnit)
* Integration tests for controllers using an in-memory database (SQLite in-memory or EFCore InMemory provider)
* Authentication/Authorization test coverage for role behavior
* Example tests:

  * Creating a project with invalid dates returns 400
  * Task status transition validation
  * Dashboard summary correctness

---

## Development & Running locally

1. Clone repository
2. Configure appsettings (connection string, JWT secret):

```json
{
  "ConnectionStrings": { "DefaultConnection": "..." },
  "Jwt": { "Key": "super-secret-key", "Issuer": "ProjectTracker", "Audience": "ProjectTrackerUsers" }
}
```

3. Run database migrations: `dotnet ef database update`
4. Run the API: `dotnet run` or via Visual Studio
5. (Optional) Seed a few users and projects for manual testing

---

## Deployment

* Containerize the app with a `Dockerfile` and push to registry.
* Use environment variables for production secrets (do not commit secrets).
* Example orchestration: Docker Compose (Postgres + API) or deploy to cloud provider (Azure App Service, AWS ECS, Google Cloud Run).

---

## Contributing

* Follow the existing code style and patterns
* Open a PR with tests for new features/bug fixes
* Use meaningful commit messages

---

## Appendix — Example cURL snippets

Create project (Manager/Admin):

```bash
curl -X POST "https://api.example.com/api/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Project","startDate":"2025-10-01","endDate":"2025-12-01","managerId":5}'
```

Get project summary:

```bash
curl -H "Authorization: Bearer $TOKEN" "https://api.example.com/api/dashboard/project-summary/1"
```

---



