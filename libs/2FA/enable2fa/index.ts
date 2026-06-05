import spreakeasy from "speakeasy";
import QRCode from "qrcode";

export async function generate2FA(userEmail: string) {
    const secret = spreakeasy.generateSecret({
        name: `Authentication project (${userEmail})`,
    });

    if (!secret.otpauth_url) {
        throw new Error("Failed to generate otpauth URL");
    }

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    return {
        base32: secret.base32,
        qrCode,
    };
}
