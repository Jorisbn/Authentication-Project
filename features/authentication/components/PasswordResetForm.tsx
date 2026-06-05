"use client";

import { useState } from "react";
import { useAuth } from "../hooks/authHooks";
import Link from "next/link";

export function PasswordResetForm() {
    const { loading, error, resetToken, forgotPassword } = useAuth();
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const data = { email };

        await forgotPassword(data);
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="max-w-md bg-white rounded-2xl shadow-xl p-8">
                <Link
                    className="underline mb-2.5 text-mist-600"
                    href="/login"
                >
                    Go back to login
                </Link>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 w-full"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-zinc-800">Forgot Password</h2>
                    </div>

                    <div className="flex flex-col gap-2 text-zinc-700">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium"
                        >
                            Email address
                        </label>

                        <input
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Working..." : "Reset Password"}
                    </button>

                    {error && <p className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-600">{error}</p>}

                    {resetToken && (
                        <p>
                            Please go <Link href={`/reset-password?resetToken=${resetToken}`}>here</Link> to change your password
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
