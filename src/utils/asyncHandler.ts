import { Request, Response, NextFunction } from "express";

export function asyncHandler(fn: (req: Request, res: Response) => Promise<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res)).catch(next);
    }
}