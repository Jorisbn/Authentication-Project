import { deleteSession } from "@/features/authentication/repositories/sessionRepository";
import { cookies } from "next/headers";

export async function POST() {
    const cookiestore = await cookies();
    const sessionCookie = cookiestore.get("session");

    if (!sessionCookie) return Response.json({ status: "ERROR", message: "No cookie found to delete" }, { status: 400 });

    const sessionID = sessionCookie.value;
    cookiestore.delete("session");

    try {
        await deleteSession(sessionID);

        return Response.json({ status: "SUCCESS", message: "Cookie Deleted" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ status: "ERROR", message: "Unexpected server error" }, { status: 500 });
    }
}
