import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 15 * 60, // 15 minutes
});

export async function rateLimit(ip: string) {
    try {
        await rateLimiter.consume(ip);
        return { success: true };
    } catch (rejRes: unknown) {
        const retryAfter = typeof rejRes === "object" && rejRes !== null && "msBeforeNext" in rejRes ? Math.round((rejRes as { msBeforeNext: number }).msBeforeNext / 1000) : 60;

        return {
            success: false,
            retryAfter,
        };
    }
}
