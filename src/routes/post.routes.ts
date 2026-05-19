import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createPost, getAllPosts, getPostById, updatePost } from "../controllers/post.controller";
import { protect } from "../middlewares/auth.middleware";

const postRoutes: Router = Router();

postRoutes.post("/create/:authorId", asyncHandler(createPost));
postRoutes.get("/allPosts", asyncHandler(getAllPosts));
postRoutes.get("/post/:id", asyncHandler(getPostById));
postRoutes.put("/update/:id", protect, asyncHandler(updatePost));

export default postRoutes;