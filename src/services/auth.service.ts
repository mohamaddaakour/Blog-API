import prisma from "../config/prisma";
import { LoginResponse, User } from "../types/user.types";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerService(username: string, email: string, password: string): Promise<User> {
    const isUserExist: User | null = await prisma.user.findFirst({
        where: {
            OR: [{ email }, {username}]
        }
    });

    if (isUserExist) {
        throw new AppError(400, "User is already taken");
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user: User = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        },
        select: {
            userId: true,
            username: true,
            email: true,
            password: true,
            createdAt: true
        }
    });

    return user;
}

export async function loginService(email: string, password: string): Promise<LoginResponse> {
    const user: User | null = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        throw new AppError(401, "No user with this credentials");
    }

    const isPassword: boolean = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        throw new AppError(401, "Incorrect credentials");
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET as string, { expiresIn: "7d" } );

    return { user, token };
}