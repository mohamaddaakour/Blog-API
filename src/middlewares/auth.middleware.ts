import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {
        return next(
            new AppError(
                "Not authorized",
                401
            )
        );
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {
            userId: number;
        };

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });

        if (!user) {
            return next(
                new AppError(
                    "User no longer exists",
                    401
                )
            );
        }

        req.user = user;

        next();
    } catch {
        return next(
            new AppError(
                "Invalid token",
                401
            )
        );
    }
};