import { describe, it, expect } from "vitest";
import { decrypt } from ".";
import { encrypt } from "../encryption";

describe("Decryption", () => {
    it("Invalid format", () => {
        expect(() => decrypt("invalid")).toThrow();
    });
    it("Missing Parts", () => {
        expect(() => decrypt("abc:def")).toThrow();
    });
    it("Corrupted IV/Tag", () => {
        const encrypted = encrypt("hello");
        const corrupted = encrypted.replace(/.$/, "x");

        expect(() => decrypt(corrupted)).toThrow();
    });
});
