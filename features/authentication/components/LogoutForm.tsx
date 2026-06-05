"use client";

import { useAuth } from "../hooks/authHooks";
import { useRouter } from "next/navigation";

export function LogoutForm() {
    const router = useRouter();
    const { logout, loading } = useAuth();

    const handleLogout = async () => {
        await logout();

        router.push("/login");
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="cursor-pointer w-full rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700 py-2 px-6"
        >
            Logout
        </button>
    );
}
