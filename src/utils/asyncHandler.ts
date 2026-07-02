import { Request, Response, NextFunction } from "express";

// this is a function that will return a function
// this will enable us to write the controllers functions without putting try-catch every time
export function asyncHandler(fn: (req: Request, res: Response) => Promise<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res)).catch(next);
    }
}