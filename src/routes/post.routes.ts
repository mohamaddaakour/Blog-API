import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post.controller";
import { protect } from "../middlewares/auth.middleware";

const postRoutes: Router = Router();

postRoutes.post("/create/:authorId", asyncHandler(createPost));
postRoutes.get("/allPosts", asyncHandler(getAllPosts));
postRoutes.get("/post/:id", asyncHandler(getPostById));
postRoutes.put("/update/:id", protect, asyncHandler(updatePost));
postRoutes.delete("/delete/:postId", protect, asyncHandler(deletePost));

export default postRoutes;