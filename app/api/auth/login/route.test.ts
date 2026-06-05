import { describe, it, expect } from "vitest";
import { POST } from "./route";
import { User } from "@prisma/client";

const createRequest = (body: Pick<User, "email" | "password">) => {
    return new Request("http://localhost/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
    });
};

const callApi = async (body: Pick<User, "email" | "password">) => {
    const request = createRequest(body);

    const response = await POST(request);
    const data = await response.json();

    return { response, data };
};

describe("POST /api/login", () => {
    // Invalid credentials
    it.each([[{ email: "test@example.com" }], [{ password: "test" }], [{ email: "", password: "" }], [{}]])("Reject with 400: %o", async (body) => {
        // @ts-expect-error body missing required values
        const { response, data } = await callApi(body);
        expect(response.status).toBe(400);
        expect(data.message).toBe("Email and password are required");
    });

    // Wrong credentials
    it("Reject with 400 wrong credentials", async () => {
        const { response, data } = await callApi({
            email: "test@example.com",
            password: "test",
        });

        expect(response.status).toBe(400);
        expect(data.message).toBe("Email or password is incorrect");
    });
});
