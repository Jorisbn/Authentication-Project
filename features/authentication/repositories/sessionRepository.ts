import { prisma } from "@/libs/prisma";

export async function createSessionId(id: string) {
    return prisma.session.create({
        data: {
            userId: id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
    });
}

export async function findSession(id: string) {
    return prisma.session.findUnique({
        where: { id },
    });
}

export async function deleteSession(id: string) {
    return prisma.session.delete({
        where: { id },
    });
}
