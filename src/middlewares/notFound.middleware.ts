import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function notFoundError(req: Request, _res: Response, next: NextFunction): void {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
}