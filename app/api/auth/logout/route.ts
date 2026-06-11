import { sessionService } from "@/features/authentication/services/sessionService";
import { cookies } from "next/headers";

export async function DELETE() {
    const cookiestore = await cookies();
    const sessionCookie = cookiestore.get("session");

    if (!sessionCookie) return Response.json({ message: "No cookie found to delete" }, { status: 400 });

    try {
        await sessionService.deleteSession(sessionCookie.value);

        cookiestore.delete("session");

        return Response.json({ message: "Logged out" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Unexpected server error" }, { status: 500 });
    }
}
