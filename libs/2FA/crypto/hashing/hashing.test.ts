import { describe, it, expect } from "vitest";
import { createHash } from ".";

describe("Hashing", () => {
    it("returns a valid bcrypt hash", async () => {
        const password = "string";

        const hash = await createHash(password);

        expect(hash).toBeDefined();
        expect(typeof hash).toBe("string");
        expect(hash.length).toBeGreaterThan(10);
    });

    it("same input produces different hashes (bcrypt uses random salt)", async () => {
        const password = "string";

        const hash1 = await createHash(password);
        const hash2 = await createHash(password);

        expect(hash1).not.toBe(hash2);
    });
});
