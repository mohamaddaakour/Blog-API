export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "App Error";

        // this is used to keep the stack trace clean
        Error.captureStackTrace(this, this.constructor);
    }
}