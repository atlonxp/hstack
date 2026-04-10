# Gap Report — Persona P1 (Admin)

Session: 20260411-090000
Persona: P1 (Admin)
Expected workflows: 5
Target URL: http://localhost:3000
Dev server: LIVE (full gap analysis)

## Summary

| Workflow ID | Name                        | Verdict          | Completeness | Priority  |
|-------------|-----------------------------|------------------|--------------|-----------|
| P1-EW1      | Admin logs in               | PRESENT_COMPLETE | 5/5          | —         |
| P1-EW2      | Admin lists users           | PRESENT_PARTIAL  | 3/5          | Critical  |
| P1-EW3      | Admin resets user password  | ABSENT           | 0/5          | Critical  |
| P1-EW4      | Admin edits user role       | ABSENT           | 0/5          | Important |
| P1-EW5      | Admin views audit log       | ABSENT           | 0/5          | Edge      |

## Features

FEATURE: F-P1-001
Name: "User list pagination and search"
Persona: P1 (Admin)
Expected workflow ID: P1-EW2
Completeness: 3/5 (route=1, form=1, handler=1, persist=0, feedback=0)
Verdict: PRESENT_PARTIAL
Priority: Critical
Dependencies: []
Dependency rationale: "Login already works (P1-EW1); list view exists but search/pagination missing"
Acceptance criteria:
  - Admin navigates to /admin/users
  - Admin types in search box; list filters by email/name
  - Pagination controls visible when >20 users
  - Admin clicks page 2; list updates
Codebase anchors (likely touched):
  - app/routes/admin/users/list.tsx
  - app/lib/users/query.ts
Feature design doc: ~/.gstack/projects/$SLUG/atlonxp-main-feature-design-admin-user-list-20260411-090000.md
Plan file: (filled after autoplan runs)
Build status: pending
Commit range: (filled after build)

FEATURE: F-P1-002
Name: "Password reset workflow"
Persona: P1 (Admin)
Expected workflow ID: P1-EW3
Completeness: 0/5 (route=0, form=0, handler=0, persist=0, feedback=0)
Verdict: ABSENT
Priority: Critical
Dependencies: [F-P1-001]
Dependency rationale: "User list must exist before password reset can target a user"
Acceptance criteria:
  - Admin navigates from user detail to "Reset password"
  - Admin submits new password or triggers email flow
  - Target user can log in with new credential
  - Admin sees confirmation
Codebase anchors (likely touched):
  - app/routes/admin/users/[id]/password.tsx
  - app/lib/auth/password.ts
Feature design doc: ~/.gstack/projects/$SLUG/atlonxp-main-feature-design-admin-password-reset-20260411-090000.md
Plan file: (filled after autoplan runs)
Build status: pending
Commit range: (filled after build)

FEATURE: F-P1-003
Name: "Edit user role"
Persona: P1 (Admin)
Expected workflow ID: P1-EW4
Completeness: 0/5 (route=0, form=0, handler=0, persist=0, feedback=0)
Verdict: ABSENT
Priority: Important
Dependencies: [F-P1-001]
Dependency rationale: "Edit action targets a user from the list"
Acceptance criteria:
  - Admin opens user detail
  - Admin selects new role
  - Admin confirms; role persists
  - Target user's permissions change on next login
Codebase anchors (likely touched):
  - app/routes/admin/users/[id]/role.tsx
  - app/lib/auth/roles.ts
Feature design doc: ~/.gstack/projects/$SLUG/atlonxp-main-feature-design-admin-edit-role-20260411-090000.md
Plan file: (filled after autoplan runs)
Build status: pending
Commit range: (filled after build)

FEATURE: F-P1-004
Name: "Admin audit log view"
Persona: P1 (Admin)
Expected workflow ID: P1-EW5
Completeness: 0/5 (route=0, form=0, handler=0, persist=0, feedback=0)
Verdict: ABSENT
Priority: Edge
Dependencies: []
Dependency rationale: "Independent view; depends only on existing audit events table"
Acceptance criteria:
  - Admin navigates to /admin/audit
  - Admin sees chronological list of privileged actions
  - Admin filters by actor/target/action type
Codebase anchors (likely touched):
  - app/routes/admin/audit/index.tsx
  - app/lib/audit/query.ts
Feature design doc: ~/.gstack/projects/$SLUG/atlonxp-main-feature-design-admin-audit-log-20260411-090000.md
Plan file: (filled after autoplan runs)
Build status: pending
Commit range: (filled after build)

## DAG (topologically sorted)

1. F-P1-001 (User list — root, Critical)
2. F-P1-002 (Password reset — depends on F-P1-001, Critical)
3. F-P1-003 (Edit role — depends on F-P1-001, Important)
4. F-P1-004 (Audit log — independent, Edge)
