import { describe, it, expect } from "vitest";
import speakeasy from "speakeasy";
import { encrypt } from "../crypto/encryption";

import { verify2FA } from ".";

describe("verify2FA", () => {
    it("returns true for a valid token", () => {
        // Create a secret
        const secret = speakeasy.generateSecret();

        const token = speakeasy.totp({
            secret: secret.base32,
            encoding: "base32",
        });

        // Encrypt base32 like in DB
        const encryptedSecret = encrypt(secret.base32);

        const result = verify2FA(encryptedSecret, token);

        expect(result).toBe(true);
    });

    it("returns false for invalid token", () => {
        const secret = speakeasy.generateSecret();

        const encryptedSecret = encrypt(secret.base32);
        const result = verify2FA(encryptedSecret, "123456");

        expect(result).toBe(false);
    });
});
