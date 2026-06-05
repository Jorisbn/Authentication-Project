"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { changePassword } from "../services/authApi";

export function ChangePasswordForm() {
    const searchParams = useSearchParams();
    const resetToken = searchParams.get("resetToken");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!resetToken) throw new Error("Missing reset token");
        if (password !== confirmPassword) throw new Error("Passwords are not the same");

        const data = {
            resetToken,
            password,
        };

        await changePassword(data);
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="max-w-md bg-white rounded-2xl shadow-xl p-8">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 w-full"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-zinc 800">Update Password</h2>
                    </div>

                    <div className="flex flex-col gap-2 text-zinc-700">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Password
                        </label>

                        <input
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 text-zinc-700">
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium"
                        >
                            Confirm password
                        </label>

                        <input
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
