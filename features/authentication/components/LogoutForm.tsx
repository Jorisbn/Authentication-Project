"use client";

import Button from "@/ui/button";
import { useAuth } from "../hooks/authHooks";
import { useRouter } from "next/navigation";

export function LogoutForm() {
    const router = useRouter();
    const { logout, loading } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();

            router.push("/login");
        } catch {}
    };

    return (
        <Button
            onClick={handleLogout}
            disabled={loading}
            loadingText="Logging out"
        >
            Logout
        </Button>
    );
}
