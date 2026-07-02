import prisma from "../config/prisma";
import type { Post } from "../types/post.types";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";

export async function createPostService(authorId: number, title: string, content: string): Promise<Post> {
    const post: Post = await prisma.post.create({
        data: {
            authorId,
            title,
            content
        },
        include: {
            author: {
                select: {
                    userId: true,
                    username: true,
                    email: true,
                }
            }
        }
    });
    
    return post;
}

export async function getAllPostsService(page: number, nbPostsInPage: number, search?: string) {
    const skip: number = (page * nbPostsInPage) - nbPostsInPage;

        const whereClause = search ? {
              OR: [
                  {
                      title: {
                          contains: search,
                          mode: Prisma.QueryMode.insensitive
                      }
                  },

                  {
                      content: {
                          contains: search,
                          mode: Prisma.QueryMode.insensitive
                      }
                  }
              ]
          }
        : {};

    const posts = await prisma.post.findMany({
        where: whereClause,

        skip,
        take: nbPostsInPage,
        orderBy: {
            createdAt: "desc"
        },

        include: {
            author: {
                select: {
                    userId: true,
                    username: true,
                    email: true
                }
            },
            comments: true
        }
    });

    const totalPosts: number = await prisma.post.count({
        where: whereClause
    });

    return {
        pagination: {
            total: totalPosts,
            page,
            nbPostsInPage
        },
        posts
    }
}

export async function getPostByIdService(postId: number) {
    const post = await prisma.post.findUnique({
        where: {
            postId
        },
        include: {
            author: {
                select: {
                    userId: true,
                    username: true
                }
            },
            comments: {
                include: {
                    author: {
                        select: {
                            userId: true,
                            username: true
                        }
                    }
                }
            }
        }
    });

    if (!post) {
        throw new AppError(404, "Post not found");
    }

    return post;
};

export async function updatePostService(postId: number, userId: number, title?: string, content?: string) {
    const existingPost = await prisma.post.findUnique({
        where: {
            postId
        }
    });

    if (!existingPost) {
        throw new AppError(404, "Post not found");
    }

    if (existingPost.authorId !== userId) {
        throw new AppError(403, "Not authorized to update this post");
    }

    return prisma.post.update({
        where: {
            postId
        },
        data: {
            title,
            content
        }
    });
};

export async function deletePostService(postId: number, userId: number) {
    const existingPost = await prisma.post.findUnique({
        where: {
            postId
        }
    });

    if (!existingPost) {
        throw new AppError(404, "Post not found");
    }

    if (existingPost.authorId !== userId) {
        throw new AppError(403, "Not authorized to delete this post");
    }

    await prisma.post.delete({
        where: {
            postId
        }
    });
};