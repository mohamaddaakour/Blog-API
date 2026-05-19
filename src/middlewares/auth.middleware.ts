import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export interface AuthRequest extends Request {
    user?: any;
}

export async function protect(req: AuthRequest, _res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return next(new AppError(401, "Not authorized"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };

        const user = await prisma.user.findUnique({
            where: {
                userId: decoded.userId
            },
            select: {
                userId: true,
                username: true,
                email: true
            }
        });

        if (!user) {
            return next(new AppError(401, "User no longer exists"));
        }

        req.user = user;

        next();
    } catch {
        return next(new AppError(401, "Invalid token"));
    }
};