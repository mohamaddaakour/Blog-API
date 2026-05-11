import { AppError } from "../utils/AppError";
import { Request, Response } from "express";

// error to handle the errors
export function errorMiddleware(err: Error, _req: Request, res: Response) {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ success: false, message: err.message });
    }

    return res.status(500).json({ success: false, message: "Internal server error" });
}