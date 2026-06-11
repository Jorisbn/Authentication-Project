export function normalizeIp(ip: string) {
    return ip.replace(/^::ffff:/, "");
}
