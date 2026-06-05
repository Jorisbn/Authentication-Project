import { User } from "@prisma/client";
import { ChangePasswordUser, Verify2FAUser } from "../types/authTypes";

export async function loginUser({ email, password }: Pick<User, "email" | "password">) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

export async function LogoutUser() {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json", credentials: "include" },
    });

    if (!res.ok) throw new Error("Logout failed");
    return res.json();
}

export async function registerUser({ email, password }: Pick<User, "email" | "password">) {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Registration failed");
    return res.json();
}

export async function forgotPasswordUser({ email }: Pick<User, "email">) {
    const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Forgot password failed");
    return res.json();
}

export async function updatePasswordUser({ email, password }: Pick<User, "email" | "password">) {
    const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Updating password failed");
    return res.json();
}

export async function verify2FAUser({ transId, code }: Verify2FAUser) {
    const res = await fetch("/api/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transId, code }),
    });

    if (!res.ok) throw new Error("Verification failed");
    return res.json();
}

export async function changePassword({ resetToken, password }: ChangePasswordUser) {
    const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, password }),
    });

    if (!res.ok) throw new Error("Password change failed");
    return res.json();
}
