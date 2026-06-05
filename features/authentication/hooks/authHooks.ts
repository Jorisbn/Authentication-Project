import { useState } from "react";
import { User } from "@prisma/client";
import * as authService from "../services/authApi";
import type { AuthStep, Verify2FAUser, ChangePasswordUser } from "../types/authTypes";

export function useAuth() {
    const [step, setStep] = useState<AuthStep>("LOGIN");
    const [transId, setTransId] = useState<string | null>(null);
    const [qrCode, setQrCode] = useState<string | null>(null);

    // UseState for password reset token due to not having SMTP //
    const [resetToken, setResetToken] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown) => {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unexpected error occurred");
        }
    };

    const login = async (data: Pick<User, "email" | "password">) => {
        setLoading(true);
        setError(null);

        try {
            const res = await authService.loginUser(data);
            setTransId(res.data.transId);

            if (res.state === "SETUP_2FA") {
                setQrCode(res.data.qrCode);
                setStep("SETUP_2FA");
            }

            if (res.state === "VERIFY_2FA") {
                setStep("VERIFY_2FA");
            }

            return res;
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const verify2FA = async (data: Verify2FAUser) => {
        setLoading(true);
        setError(null);

        if (!transId) throw new Error("Missing transId");

        try {
            const res = await authService.verify2FAUser(data);
            return res;
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            await authService.LogoutUser();
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: Pick<User, "email" | "password">) => {
        setLoading(true);
        setError(null);

        try {
            await authService.registerUser(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (data: Pick<User, "email">) => {
        setLoading(true);
        setError(null);

        try {
            const res = await authService.forgotPasswordUser(data);

            setResetToken(res.resetToken);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (data: ChangePasswordUser) => {
        setLoading(true);
        setError(null);

        try {
            await authService.changePassword(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        step,
        transId,
        qrCode,
        loading,
        error,
        resetToken,

        login,
        verify2FA,
        logout,
        register,
        forgotPassword,
        changePassword,
    };
}
