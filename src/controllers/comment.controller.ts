import { Request, Response } from "express";

import { createCommentService, deleteCommentService, getCommentsByPostService, updateCommentService } from "../services/comment.service";

import { AuthRequest } from "../middlewares/auth.middleware";

export async function createComment(req: AuthRequest, res: Response) {
    const { content, postId } = req.body;

    const comment = await createCommentService(content, Number(postId), req.user.userId);

    res.status(201).json({ success: true, data: comment });
};

export async function getCommentsByPost(req: Request, res: Response) {
    const comments = await getCommentsByPostService(Number(req.params.postId));

    res.status(200).json({ success: true, data: comments });
};

export async function updateComment(req: AuthRequest, res: Response) {
    const { content } = req.body;

    const comment = await updateCommentService(Number(req.params.postId), req.user.userId, content);

    res.status(200).json({ success: true, data: comment });
};

export async function deleteComment(req: AuthRequest, res: Response) {
    await deleteCommentService(Number(req.params.postId),req.user.userId);

    res.status(200).json({ success: true, message: "Comment deleted successfully" });
};