# Persona Registry (Fixture)

Generated: 2026-04-11
Source: feature-build-skill test fixture

## PERSONA REGISTRY

ID: P1
Role: Admin
Goal: Manage users, configure settings, monitor system health
Auth: admin@test.com / password123
Entry point: /login → /admin
Frequency: Daily
Permissions: Full CRUD on users, system config, role assignment

ID: P2
Role: New User
Goal: Sign up, complete onboarding, create first project
Auth: Signs up fresh
Entry point: /signup
Frequency: First time
Permissions: Basic project CRUD, read own profile
