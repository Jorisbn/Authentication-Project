"use client";

import { useState } from "react";
import { useAuth } from "../hooks/authHooks";
import Link from "next/link";
import Field from "@/ui/field";
import Input from "@/ui/input";
import Button from "@/ui/button";

export function RegisterForm() {
    const { loading, error, register } = useAuth();
    const [message, setMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) throw new Error("Passwords must match");

            await register({ email, password });

            setMessage("Registering Successful");
        } catch {}
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

                    <Field
                        label="Email address"
                        htmlFor="email"
                    >
                        <Input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Field>

                    <Field
                        label="Password"
                        htmlFor="password"
                    >
                        <Input
                            type="password"
                            name="password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Field>

                    <Field
                        label="Confirm password"
                        htmlFor="passwordConfirm"
                    >
                        <Input
                            type="password"
                            name="passwordConfirm"
                            placeholder=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Field>

                    <Button
                        type="submit"
                        loading={loading}
                        loadingText="Registering"
                    >
                        Register
                    </Button>

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
