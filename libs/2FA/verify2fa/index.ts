import speakeasy from "speakeasy";
import { decrypt } from "../crypto/decryption";

export function verify2FA(base32: string, token: string) {
    if (!base32) return;

    const decrypedBase32 = decrypt(base32);

    return speakeasy.totp.verify({
        secret: decrypedBase32,
        encoding: "base32",
        token,
        window: 1,
    });
}
