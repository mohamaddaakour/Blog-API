import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function createCommentService(content: string, postId: number, authorId: number) {
    const post = await prisma.post.findUnique({
        where: {
            postId
        }
    });

    if (!post) {
        throw new AppError(404, "Post not found");
    }

    return prisma.comment.create({
        data: {
            content,
            postId,
            authorId
        },
        include: {
            author: {
                select: {
                    userId: true,
                    username: true
                }
            },
            post: {
                select: {
                    postId: true,
                    title: true
                }
            }
        }
    });
};

export async function getCommentsByPostService(postId: number) {
    const post = await prisma.post.findUnique({
        where: {
            postId
        }
    });

    if (!post) {
        throw new AppError(404, "Post not found");
    }

    return prisma.comment.findMany({
        where: {
            postId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: {
                    userId: true,
                    username: true
                }
            }
        }
    });
};

export async function updateCommentService(commentId: number, userId: number, content: string) {
    const comment =
        await prisma.comment.findUnique({
            where: {
                commentId
            }
        });

    if (!comment) {
        throw new AppError(404, "Comment not found");
    }

    if (comment.authorId !== userId) {
        throw new AppError(403, "Not authorized to update this comment");
    }

    return prisma.comment.update({
        where: {
            commentId
        },
        data: {
            content
        }
    });
};

export async function deleteCommentService(commentId: number, userId: number) {
    const comment =
        await prisma.comment.findUnique({
            where: {
                commentId
            }
        });

    if (!comment) {
        throw new AppError(404, "Comment not found");
    }

    if (comment.authorId !== userId) {
        throw new AppError(403, "Not authorized to delete this comment");
    }

    await prisma.comment.delete({
        where: {
            commentId
        }
    });
};