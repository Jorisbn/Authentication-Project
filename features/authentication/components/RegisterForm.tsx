"use client";

import { useState } from "react";
import { useAuth } from "../hooks/authHooks";
import Link from "next/link";

export function RegisterForm() {
    const { loading, error, register } = useAuth();
    const [message, setMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) throw new Error("Passwords must match");

        await register({ email, password });

        setMessage("Registering Successful");
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
                        <h2 className="text-3xl font-bold text-zinc-800">Register</h2>
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
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 text-zinc-700">
                        <label
                            htmlFor="passwordConfirm"
                            className="text-sm font-medium"
                        >
                            Confirm password
                        </label>
                        <input
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            type="password"
                            name="passwordConfirm"
                            placeholder=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    {error && <p>{error}</p>}

                    {message && (
                        <div className="flex-flex-col-gap-2 text-zinc-700">
                            <p>{message}</p>
                            <Link href="/login">Go to login</Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
