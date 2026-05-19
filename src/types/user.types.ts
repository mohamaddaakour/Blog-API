export interface User {
    userId?: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}

export interface LoginResponse {
    user: User;
    token: string;
}