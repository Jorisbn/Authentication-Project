# Commands

- Visual DB `npx prisma studio`
- Generate Prisma client `npx prisma generate`
- Validate Schema `npx prisma validate`
- Create database from schema with name `npx prisma migrate dev --name init`

# Todo

- Unit Tests
    - Utilities
    - Validators
    - Permissions
- Integration Tests
    - Login flow
    - Registration flow
    - Password reset flow

- E2E Playwright

- Session Management.
    - Store theme preference in db for cross device use
    - Active sessions list
    - Logout all devices
    - Current Session indicator
    - Device/browser info.

- UI components
    - Modal
    - Toast
    - Dropdown

# Ideas

- User profile management
    - Update profile information
    - Upload avatar
    - Change email
    - Change password
    - Manage 2FA settings
    - Delete account

- Role based authorization
    - Users access `/dashboard`
    - Admins access `/admin`
    - Middleware for role check
    - UI hides unauthorized actions

- Dashboard features.
    - Notes application
    - Task manager
    - Project tracker
    - Expense tracker
    - Habit tracker

- Server Actions and API Design
    - Server Actions
    - Route Handlers
    - Data validation
    - Error boundaries

- Audit Logging to track
    - User logged in
    - User changed password
    - User enabled 2FA
    - User deleted account

- CI/CD pipeline using Github actions
    - Linting
    - Type checking
    - Unit tests
    - Build verification

# Playwright tests

## Register

- User can register account.
- Duplicate email shows error.

## Login

- User can login
- Invalid credentials show error.

## Logout

- User can logout and is redirected out of protected routes.

## Password reset

- User can request reset
- User can reset password

## 2FA

- Login with valid 2FA code
- Invalid 2FA code shows error

## Protected Routes

- Unauthenticated user redirected to login
- Authenticated user can access /dashboard.
