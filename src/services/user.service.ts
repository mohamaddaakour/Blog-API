import prisma from "../config/prisma";

export async function getAllUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true
        }
    });
}