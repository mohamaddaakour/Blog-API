import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(username: string, email: string, password: string) {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{email}, {password}]
        }
    });

    if (existingUser) {
        throw new AppError("User already exist", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true
        }
    });
    
    return user;
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

    return { token, user: { id: user.id, username: user.username, email: user.email } };
}