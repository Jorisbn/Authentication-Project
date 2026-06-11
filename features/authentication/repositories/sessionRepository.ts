import { prisma } from "@/libs/prisma";
import type { Session } from "@prisma/client";

export const sessionRepository = {
    create: ({ userId, browser, deviceType, ipAddress, expiresAt, os }: Omit<Session, "id" | "createdAt">) =>
        prisma.session.create({
            data: { userId, browser, deviceType, ipAddress, expiresAt, os },
        }),

    findById: (id: string) =>
        prisma.session.findUnique({
            where: { id },
            include: { user: true },
        }),

    delete: (id: string) =>
        prisma.session.delete({
            where: { id },
        }),

    deleteByUserId: (userId: string) =>
        prisma.session.deleteMany({
            where: { userId },
        }),
};
