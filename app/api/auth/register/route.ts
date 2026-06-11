import { createUser, findUserByEmail } from "@/features/authentication/repositories/userRepository";
import { createHash } from "@/libs/2FA/crypto/hashing";
import { rateLimit } from "@/libs/RateLimiter";

export async function POST(request: Request) {
    const { email, password }: { email: string; password: string } = await request.json();

    if (!email || !password) return Response.json({ message: "Email and password are required" }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote_addr") || "unknown";
    const result = await rateLimit(ip);
    if (!result.success) return new Response(JSON.stringify({ message: "Too many requests", retryAfter: result.retryAfter }), { status: 429, headers: { "Content-Type": "application/json" } });

    const lowerCaseEmail = email.toLowerCase();
    try {
        const user = await findUserByEmail(lowerCaseEmail);

        if (user) return Response.json({ message: "This email is already in use" }, { status: 400 });

        const hashedPassword = await createHash(password);

        createUser(lowerCaseEmail, hashedPassword);

        return Response.json({ message: "Account created" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Unexpected server error" }, { status: 500 });
    }
}
