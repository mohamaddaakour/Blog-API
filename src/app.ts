import express from "express";
import type { Express } from "express";
import { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundError } from "./middlewares/notFound.middleware";
import cookieParser from "cookie-parser";

// routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import commentRoutes from "./routes/comment.routes";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Server is listening successfully" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(notFoundError);

app.use(errorMiddleware);

export default app;