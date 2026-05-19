// create a new Error type that handles status code and message
export class AppError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}