import { findUserByEmail, updateUser } from "@/features/authentication/repositories/userRepository";
import { User } from "@prisma/client";
import { randomBytes } from "crypto";
import { rateLimit } from "@/libs/RateLimiter";

export async function POST(request: Request) {
    const { email }: { email: string } = await request.json();

    if (!email) return Response.json({ message: "Email is missing" }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote_addr") || "unknown";
    const result = await rateLimit(ip);
    if (!result.success) return new Response(JSON.stringify({ message: "Too many requests", retryAfter: result.retryAfter }), { status: 429, headers: { "Content-Type": "application/json" } });

    const lowerCaseEmail = email.toLowerCase();
    try {
        const user = await findUserByEmail(lowerCaseEmail);
        if (!user) return Response.json({ message: "Email not found" }, { status: 400 });

        const resetToken = randomBytes(32).toString("hex");

        const updatedData: Partial<User> = {
            resetToken,
        };

        await updateUser(user.id, updatedData);

        // Due to not having SMTP reset token is now send to frontend, with SMTP send this using Email.

        return Response.json({ message: "message send", data: { resetToken } }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Unexpected server error" }, { status: 500 });
    }
}
