import bcrypt from "bcrypt";

export function createHash(password: string) {
    return bcrypt.hash(password, 10);
}
