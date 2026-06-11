import { cookies } from "next/headers";
import { sessionService } from "../services/sessionService";

export async function getSessionFromRequest() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;

    if (!sessionId) return null;

    const session = await sessionService.getSession(sessionId);

    if (!session) return null;

    if (session.expiresAt < new Date()) {
        await sessionService.deleteSession(sessionId);
        return null;
    }

    return session;
}

export async function getCurrentUser() {
    const session = await getSessionFromRequest();
    return session?.user ?? null;
}
