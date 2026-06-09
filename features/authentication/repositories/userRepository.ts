import { prisma } from "@/libs/prisma";
import { User } from "@prisma/client";

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function findUserByTransId(token: string) {
    return prisma.user.findUnique({
        where: { transId: token },
    });
}

export async function findUserByResetToken(token: string) {
    return prisma.user.findUnique({
        where: { resetToken: token },
    });
}

export async function updateUser(id: string, data: Partial<User>) {
    return prisma.user.update({
        where: { id },
        data,
    });
}

export async function createUser(email: string, password: string) {
    return prisma.user.create({
        data: {
            email,
            password,
        },
    });
}

export async function clearUserTransId(id: string) {
    return prisma.user.update({
        where: { id },
        data: {
            transId: null,
        },
    });
}
