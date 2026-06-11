import { sessionRepository } from "../repositories/sessionRepository";

export const sessionService = {
    async createSession(userId: string, browser: string | null, os: string | null, deviceType: string | null, ipAddress: string | null) {
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day

        const session = await sessionRepository.create({
            userId,
            browser,
            os,
            deviceType,
            ipAddress,
            expiresAt,
        });

        return {
            sessionId: session.id,
            expiresAt: session.expiresAt,
        };
    },

    deleteSession(sessionId: string) {
        return sessionRepository.delete(sessionId);
    },

    getSession(sessionId: string) {
        return sessionRepository.findById(sessionId);
    },
};
