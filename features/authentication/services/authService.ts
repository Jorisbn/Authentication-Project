import { encrypt } from "@/libs/2FA/crypto/encryption";
import { generate2FA } from "@/libs/2FA/enable2fa";
import bcrypt from "bcrypt";
import { createSessionId } from "../repositories/sessionRepository";

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

export async function createSession(userId: string) {
    const session = await createSessionId(userId);

    return {
        sessionId: session.id,
        expiresAt: session.expiresAt,
    };
}
