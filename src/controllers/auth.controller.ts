import { Request, Response } from "express";
import type { LoginResponse, User } from "../types/user.types";
import { loginService, registerService } from "../services/auth.service";

export async function register(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;

    const newUser: User = await registerService(username, email, password);

    if (!newUser) {
        return res.status(400).json({ success: false, message: "Error in creating the user" });
    }

    return res.status(201).json({ success: true, data: newUser });
}

export async function login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user: LoginResponse = await loginService(email, password);

    res.cookie("token", user.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ success: true, data: user.user });
}