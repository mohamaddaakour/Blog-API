import { Request, Response } from "express";
import { getAllUsersService, getUserByIdService, updateUserByIdService, deleteUserByIdService } from "../services/user.service";
import type { User } from "../types/user.types";

export async function getAllUsers(req: Request, res: Response): Promise<Response> {
    const users: Omit<User, "password">[] = await getAllUsersService();

    return res.status(200).json({ success: true, data: users });
}

export async function getUserById(req: Request, res: Response): Promise<Response> {
    const userId: number = Number(req.params.userId);

    const user: Omit<User, "password"> | null = await getUserByIdService(userId);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
}

export async function updateUserById(req: Request, res: Response): Promise<Response> {
    const userId: number = Number(req.params.userId);
    const { username, email } = req.body;

    const user: User = await updateUserByIdService(userId, username, email);

    return res.status(200).json({ success: true, data: user });
}

export async function deleteUserById(req: Request, res: Response): Promise<Response> {
    const userId: number = Number(req.params.userId);

    await deleteUserByIdService(userId);

    return res.status(200).json({ success: true, message: "User deleted successfully" });
}