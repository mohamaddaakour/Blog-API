import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

// the error middleware must contain these 4 parameters
// the error middleware is a special middleware and it's role is to handle the errors
export function errorMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction): Response {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: "Internal server error" });
}