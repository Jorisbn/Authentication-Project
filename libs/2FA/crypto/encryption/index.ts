import crypto from "crypto";

const secret = process.env.TOTP_ENCRYPTION_KEY;
if (!secret) throw new Error("Missing TOTP_ENCRYPTION_KEY");

const algorithm = "aes-256-gcm";
// 32-byte key for encrypting
const key = crypto.createHash("sha256").update(secret).digest();

export function encrypt(text: string): string {
    if (typeof text !== "string") throw new Error("Invalid input: expected string");
    if (text.length === 0) throw new Error("Can't encrypt an empty string");

    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const tag = cipher.getAuthTag();

    return [iv.toString("hex"), tag.toString("hex"), encrypted].join(":");
}
