import crypto from "crypto";

const secret = process.env.TOTP_ENCRYPTION_KEY;
if (!secret) throw new Error("Missing TOTP_ENCRYPTION_KEY");

const algorithm = "aes-256-gcm";
const key = crypto.createHash("sha256").update(secret).digest();

export function decrypt(payload: string): string {
    const [ivHex, tagHex, encrypted] = payload.split(":");

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, "hex"));

    decipher.setAuthTag(Buffer.from(tagHex, "hex"));

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}
