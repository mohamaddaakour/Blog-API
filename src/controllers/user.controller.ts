import { Request, Response } from "express";
import { getAllUsers } from "../services/user.service";

export async function getUsers(req: Request, res: Response) {
    const users = await getAllUsers();

    res.status(200).json({ success: true, data: users });
}