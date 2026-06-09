"use client";

import { useState } from "react";
import { useAuth } from "../hooks/authHooks";
import Link from "next/link";
import Field from "@/ui/field";
import Input from "@/ui/input";
import Button from "@/ui/button";
import Alert from "@/ui/alert";

export function PasswordResetForm() {
    const { loading, error, resetToken, forgotPassword } = useAuth();
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            const data = { email };

            await forgotPassword(data);
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
                        <h2 className="text-3xl font-bold text-zinc-800">Forgot Password</h2>
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

                    <Button
                        type="submit"
                        loading={loading}
                        loadingText="Working..."
                    >
                        Reset Password
                    </Button>

                    {error && <Alert variant="error">{error}</Alert>}

                    {resetToken && (
                        <Alert variant="info">
                            Please go{" "}
                            <Link
                                className="underline"
                                href={`/reset-password?resetToken=${resetToken}`}
                            >
                                here
                            </Link>{" "}
                            to change your password
                        </Alert>
                    )}
                </form>
            </div>
        </div>
    );
}
