import { Request, Response } from "express";
import type { Post } from "../types/post.types";
import { createPostService, getAllPostsService, getPostByIdService, updatePostService } from "../services/post.service";
import { AppError } from "../utils/AppError";
import type { AuthRequest } from "../middlewares/auth.middleware";

export async function createPost(req: Request, res: Response): Promise<Response> {
    const authorId: number = Number(req.params.authorId);
    const { title, content } = req.body;

    const newPost: Post = await createPostService(authorId, title, content);

    if (!newPost) {
        throw new AppError(400, "Bad request creating a new post");
    }

    return res.status(201).json({ success: true, data: newPost });
}

export async function getAllPosts(req: Request, res: Response): Promise<Response> {
    const page: number = Number(req.query.page);
    const nbPostsInPage: number = Number(req.query.nbPostsInPage);
    const search: string = req.query.search as string;

    const posts = await getAllPostsService(page, nbPostsInPage, search);

    return res.status(200).json({ success: true, data: posts });
}

export async function getPostById(req: Request, res: Response) {
    const post = await getPostByIdService(Number(req.params.id));

    res.status(200).json({ success: true, data: post });
};

export async function updatePost(req: AuthRequest, res: Response) {
    const { title, content } = req.body;

    const post = await updatePostService(Number(req.params.id), req.user.id, title, content);

    res.status(200).json({ success: true, data: post });
};