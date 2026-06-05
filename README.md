# Commands

- Visual DB `npx prisma studio`
- Generate Prisma client `npx prisma generate`
- Validate Schema `npx prisma validate`
- Create database from schema with name `npx prisma migrate dev --name init`

# Todo

- Light/Darkmode switch with NextJS and Tailwind. (+ high contast mode )

# Playwright tests.

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
