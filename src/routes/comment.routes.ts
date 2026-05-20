import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createComment, deleteComment, getCommentsByPost, updateComment } from "../controllers/comment.controller";
import { protect } from "../middlewares/auth.middleware";

const commentRoutes: Router = Router();

commentRoutes.post("/create", protect ,asyncHandler(createComment));
commentRoutes.get("/post/:postId", asyncHandler(getCommentsByPost));
commentRoutes.patch("/:postId", protect, asyncHandler(updateComment));
commentRoutes.delete("/:commentId", protect, asyncHandler(deleteComment));

export default commentRoutes;