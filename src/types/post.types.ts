export interface Post {
    postId?: number;
    title: string;
    content: string;
    createdAt?: Date;
    authorId: number;
}