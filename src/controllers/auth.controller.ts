import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

import {
    loginUser,
    registerUser
} from "../services/auth.service";

export const register = async (
    req: Request,
    res: Response
) => {
    const { username, email, password } = req.body;

    const user = await registerUser(
        username,
        email,
        password
    );

    res.status(201).json({
        success: true,
        data: user
    });
};

export const login = async (
    req: Request,
    res: Response
) => {
    const { email, password } = req.body;

    const data = await loginUser(
        email,
        password
    );

    res.status(200).json({
        success: true,
        data
    });
};

export const getMe = async (
    req: AuthRequest,
    res: Response
) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
};