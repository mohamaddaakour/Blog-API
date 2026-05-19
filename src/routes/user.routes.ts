import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteUserById, getAllUsers, getUserById, updateUserById } from "../controllers/user.controller";

const userRoutes: Router = Router();

userRoutes.get("/allUsers", asyncHandler(getAllUsers));
userRoutes.get("/user/:userId", asyncHandler(getUserById));
userRoutes.put("/update/:userId", asyncHandler(updateUserById));
userRoutes.delete("/delete/:userId", asyncHandler(deleteUserById));

export default userRoutes;