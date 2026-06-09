"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../hooks/authHooks";

import Field from "@/ui/field";
import Input from "@/ui/input";
import Button from "@/ui/button";
import Link from "next/link";
import Alert from "@/ui/alert";

export function ChangePasswordForm() {
    const searchParams = useSearchParams();
    const resetToken = searchParams.get("resetToken");
    const { loading, error, changePassword } = useAuth();
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            if (!resetToken) throw new Error("Missing reset token");
            if (password !== confirmPassword) throw new Error("Passwords are not the same");

            const data = {
                resetToken,
                password,
            };

            await changePassword(data);

            setMessage("Password changed successfully");
        } catch {}
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="max-w-md bg-white rounded-2xl shadow-xl p-8">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 w-full"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-zinc-800">Update Password</h2>
                    </div>

                    <Field
                        label="password"
                        htmlFor="password"
                    >
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Field>

                    <Field
                        label="Confirm Password"
                        htmlFor="confirmPassword"
                    >
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Field>

                    {!message && (
                        <Button
                            type="submit"
                            loading={loading}
                            loadingText="Resetting..."
                        >
                            Reset Password
                        </Button>
                    )}

                    {error && <Alert variant="error">{error}</Alert>}

                    {message && (
                        <Alert variant="info">
                            {message}{" "}
                            <Link
                                className="underline"
                                href="/login"
                            >
                                Back to login
                            </Link>
                        </Alert>
                    )}
                </form>
            </div>
        </div>
    );
}
