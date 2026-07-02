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

// this middleware enable using the cookies
app.use(cookieParser());

// server health endpoint
app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Server is listening successfully" });
});

// the middleware executes in order one after the other until we send the HTTP response
// so first it will check the express.json, cookieParser and health, after that it will check these routes, and after that
// it will check the not foundError
// if an error happens and you pass it to next(error) Express changes behavior and go immediately into
// the error middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(notFoundError);

app.use(errorMiddleware);

export default app;