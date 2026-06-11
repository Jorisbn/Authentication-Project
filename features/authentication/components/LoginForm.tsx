"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/authHooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Field from "@/ui/field";
import Input from "@/ui/input";
import Button from "@/ui/button";
import Alert from "@/ui/alert";

export function LoginForm() {
    const router = useRouter();
    const { login, verify2FA, loading, error, qrCode, transId, step } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [twoFaCode, setTwoFaCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (step === "VERIFY_2FA" || step === "SETUP_2FA") {
            inputsRef.current[0]?.focus();
        }
    }, [step]);

    const handleInputChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Only allow numbers as input

        const updated = [...twoFaCode];
        updated[index] = value;

        setTwoFaCode(updated);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        const fullCode = updated.join("");

        if (fullCode.length === 6 && !updated.includes("")) {
            submitVerification(fullCode);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // On backspace go to previous inputfield
        if (e.key === "Backspace" && !twoFaCode[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

        if (pasted.length === 6) {
            const split = pasted.split("");

            setTwoFaCode(split);

            submitVerification(pasted);

            inputsRef.current[5]?.focus();
        }
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const data = { email, password };
            await login(data);
        } catch {}
    };

    const handleVerification = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const code = twoFaCode.join("");

        submitVerification(code);
    };

    const submitVerification = async (code: string) => {
        if (code.length !== 6) return;
        if (transId === null) throw new Error("No transID");

        const numberCode = parseInt(code);

        try {
            await verify2FA({
                transId: transId,
                code: numberCode,
            });

            router.push("/dashboard");
        } catch {}
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="max-w-md bg-white rounded-2xl shadow-xl p-8">
                {step === "LOGIN" && (
                    <>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 w-full mb-4"
                        >
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-zinc-800">Log in</h2>
                                <p className="text-zinc-500 mt-2">Welcome back</p>
                            </div>

                            <Field
                                label="Email address"
                                htmlFor="email"
                            >
                                <Input
                                    id="email"
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
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Field>

                            <Button
                                type="submit"
                                loading={loading}
                                loadingText="Logging in..."
                            >
                                Login
                            </Button>

                            {error && <Alert variant="error">{error}</Alert>}
                        </form>
                        <div className="flex gap-2 text-mist-600">
                            <Link
                                className="underline"
                                href="/register"
                            >
                                Register
                            </Link>

                            <Link
                                className="underline"
                                href="/forgot-password"
                            >
                                Forgot Password
                            </Link>
                        </div>
                    </>
                )}

                {step === "SETUP_2FA" && (
                    <form
                        onSubmit={handleVerification}
                        className="space-y-6 text-center"
                    >
                        {qrCode && (
                            <>
                                <div>
                                    <h2 className="text-3xl font-bold text-zinc-800">Set up 2FA</h2>

                                    <p className="mt-2 text-zinc-500">Scan this QR code with your Authenticator app</p>
                                </div>

                                <div className="flex justify-center">
                                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                                        <Image
                                            src={qrCode}
                                            alt="QR Code"
                                            width={220}
                                            height={220}
                                            className="rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 text-zinc-700">
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="twofa"
                                    >
                                        Verification code
                                    </label>

                                    <div className="flex gap-1.5">
                                        {twoFaCode.map((digit, index) => (
                                            <Input
                                                id="twofa"
                                                key={index}
                                                ref={(el) => {
                                                    inputsRef.current[index] = el;
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleInputChange(e.target.value, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onPaste={handlePaste}
                                                className="h-14 w-14 rounded-xl border border-zinc-300 text-center text-2xl font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 "
                                            />
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    loading={loading}
                                    loadingText="Verifing..."
                                >
                                    Verify
                                </Button>

                                {error && <Alert variant="error">{error}</Alert>}
                            </>
                        )}
                    </form>
                )}

                {step === "VERIFY_2FA" && (
                    <form
                        onSubmit={handleVerification}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-zinc-800">Two-Factor Authentication</h2>

                            <p className="mt-2 text-zinc-500">Enter the 6-digit code from your Authenticator app</p>
                        </div>

                        <div className="flex flex-col gap-2 text-zinc-700">
                            <label
                                className="text-sm font-medium"
                                htmlFor="twofa"
                            >
                                Verification code
                            </label>

                            <div className="flex gap-1.5">
                                {twoFaCode.map((digit, index) => (
                                    <Input
                                        id="twofa"
                                        key={index}
                                        ref={(el) => {
                                            inputsRef.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        className="h-14 w-14 rounded-xl border border-zinc-300 text-center text-2xl font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 "
                                    />
                                ))}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            loading={loading}
                            loadingText="Verifing..."
                        >
                            Verify
                        </Button>

                        {error && <Alert variant="error">{error}</Alert>}
                    </form>
                )}
            </div>
        </div>
    );
}
