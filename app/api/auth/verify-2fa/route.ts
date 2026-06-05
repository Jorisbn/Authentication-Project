import { clearUserTransId, findUserByTransId } from "@/features/authentication/repositories/userRepository";
import { createSession } from "@/features/authentication/services/authService";
import { verify2FA } from "@/libs/2FA/verify2fa";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { transId, code }: { transId: string; code: string } = await request.json();
    if (!transId || !code) return Response.json({ state: "Error", message: "Missing token or code" }, { status: 400 });

    try {
        const user = await findUserByTransId(transId);
        if (!user) return Response.json({ state: "Error", message: "Invalid Authtoken" }, { status: 400 });

        const secret = user.base32 || "";

        const verification = verify2FA(secret, code);
        if (!verification) return Response.json({ state: "Error", message: "Incorrect authentication code" }, { status: 400 });

        await clearUserTransId(user.id);

        const { sessionId, expiresAt } = await createSession(user.id);

        const response = NextResponse.json({ state: "Success", message: "Success" }, { status: 200 });

        response.cookies.set("session", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        });

        return response;
    } catch (err) {
        return Response.json({ state: "Error", message: `Unexpected server error: ${err}` }, { status: 500 });
    }
}
