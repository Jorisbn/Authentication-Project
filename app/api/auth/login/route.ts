import { User } from "@prisma/client";
import { findUserByEmail, updateUser } from "@/features/authentication/repositories/userRepository";
import { randomBytes } from "crypto";
import { setup2FA, verifyPassword } from "@/features/authentication/services/authService";
import { rateLimit } from "@/libs/RateLimiter";

export async function POST(request: Request) {
    const { email, password }: { email: string; password: string } = await request.json();
    if (!email || !password) return Response.json({ state: "Error", message: "Email and password are required" }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote_addr") || "unknown";
    const result = await rateLimit(ip);
    if (!result.success) return new Response(JSON.stringify({ message: "Too many requests", retryAfter: result.retryAfter }), { status: 429, headers: { "Content-Type": "application/json" } });

    const lowerCaseEmail = email.toLowerCase();
    try {
        const user = await findUserByEmail(lowerCaseEmail);
        if (!user) return Response.json({ message: "Email or password is incorrect" }, { status: 400 });

        const passwordCheck = await verifyPassword(password, user.password);
        if (!passwordCheck) return Response.json({ message: "Email or password is incorrect" }, { status: 400 });

        const transId = randomBytes(32).toString("hex");

        const updatedData: Partial<User> = {
            transId,
        };

        if (!user.twoFactorEnabled) {
            const { encryptedSecret, qrCode } = await setup2FA(user.email);
            updatedData.base32 = encryptedSecret;

            await updateUser(user.id, updatedData);

            return Response.json({ state: "SETUP_2FA", data: { qrCode, transId } }, { status: 200 });
        }

        await updateUser(user.id, updatedData);

        return Response.json({ state: "VERIFY_2FA", data: { transId } }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: `Unexpected server error` }, { status: 500 });
    }
}
