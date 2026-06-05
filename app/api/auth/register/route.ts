import { createUser, findUserByEmail } from "@/features/authentication/repositories/userRepository";
import { createHash } from "@/libs/2FA/crypto/hashing";

export async function POST(request: Request) {
    const { email, password }: { email: string; password: string } = await request.json();

    if (!email || !password) return Response.json({ status: "Error", message: "Email and password are required" }, { status: 400 });

    const lowerCaseEmail = email.toLowerCase();
    try {
        const user = await findUserByEmail(lowerCaseEmail);

        if (user) return Response.json({ status: "Error", message: "This email is already in use" }, { status: 400 });

        const hashedPassword = await createHash(password);

        createUser(lowerCaseEmail, hashedPassword);

        return Response.json({ status: "Success", message: "Account created" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ status: "Error", message: "Unexpected server error" }, { status: 500 });
    }
}
