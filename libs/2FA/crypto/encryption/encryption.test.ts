import { describe, it, expect } from "vitest";
import { encrypt } from ".";
import { decrypt } from "../decryption";

describe("Encryption", () => {
    it("Returns true for valid encryption", () => {
        const string = "Hello";

        const encrypted = encrypt(string);

        const parts = encrypted.split(":");

        expect(parts).toHaveLength(3);
        expect(parts[0]).toBeTruthy(); // IV
        expect(parts[1]).toBeTruthy(); // auth tag
        expect(parts[2]).toBeTruthy(); // ciphertext
    });

    it("Returns true for same string encrypted and decypted", () => {
        const value = "Hello";

        const encryped = encrypt(value);
        const decrypted = decrypt(encryped);

        expect(decrypted).toBe(value);
    });

    it("throws on empty string", () => {
        expect(() => encrypt("")).toThrow("Can't encrypt an empty string");
    });

    it("throws on non-string input", () => {
        // @ts-expect-error Invalid input: expected string
        expect(() => encrypt(1)).toThrow("Invalid input: expected string");
    });
});
