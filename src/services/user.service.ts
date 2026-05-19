import type { User } from "../types/user.types";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function getAllUsersService() {
    const users: Omit<User, "password">[]  = await prisma.user.findMany({
        select: {
            userId: true,
            username: true,
            email: true
        }
    });

    return users;
}

export async function getUserByIdService(userId: number): Promise<Omit<User, "password"> | null> {
    const user: Omit<User, "password"> | null = await prisma.user.findFirst({
        where: { userId },

        select: {
            userId: true,
            username: true,
            email: true
        }
    });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    return user;
}

export async function updateUserByIdService(userId: number, username?: string, email?: string): Promise<User> {
    const findUser: User | null = await prisma.user.findFirst({
        where: { userId }
    });

    if (!findUser) {
        throw new AppError(404, "User not found");
    }

    const updatedUser: User = await prisma.user.update({
        where: { userId },
        data: {
            username,
            email
        }
    });

    return updatedUser;
}

export async function deleteUserByIdService(userId: number): Promise<void> {
    const findUser: User | null = await prisma.user.findFirst({
        where: { userId }
    });

    if (!findUser) {
        throw new AppError(404, "User not found");
    }

    await prisma.user.delete({
        where: { userId }
    });
}