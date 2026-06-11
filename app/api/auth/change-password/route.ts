import { findUserByResetToken, updateUser } from "@/features/authentication/repositories/userRepository";
import { createHash } from "@/libs/2FA/crypto/hashing";

export async function PATCH(request: Request) {
    const { password, token }: { password: string; token: string } = await request.json();
    if (!password || !token) return Response.json({ message: "Password or Token is missing" }, { status: 400 });

    try {
        const user = await findUserByResetToken(token);
        if (!user) return Response.json({ message: "No user found" }, { status: 400 });

        const hashedPassword = await createHash(password);

        const updatedData = {
            password: hashedPassword,
            resetToken: null,
        };

        await updateUser(user.id, updatedData);

        return Response.json({ message: "Password Updated" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Unexpected Server Error" }, { status: 500 });
    }
}
