import { encrypt } from "@/libs/2FA/crypto/encryption";
import { generate2FA } from "@/libs/2FA/enable2fa";
import bcrypt from "bcrypt";
import { sessionService } from "./sessionService";
import { Session } from "@prisma/client";

export async function verifyPassword(input: string, hash: string) {
    return bcrypt.compare(input, hash);
}

export async function setup2FA(userEmail: string) {
    const twoFAData = await generate2FA(userEmail);

    return {
        encryptedSecret: encrypt(twoFAData.base32),
        qrCode: twoFAData?.qrCode,
    };
}

export async function createSession({ userId, browser, os, deviceType, ipAddress }: Pick<Session, "userId" | "browser" | "os" | "deviceType" | "ipAddress">) {
    const session = await sessionService.createSession(userId, browser, os, deviceType, ipAddress);

    return {
        sessionId: session.sessionId,
        expiresAt: session.expiresAt,
    };
}
