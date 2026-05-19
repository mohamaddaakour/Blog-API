import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { login, register } from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/register", asyncHandler(register));
authRoutes.post("/login", asyncHandler(login));

export default authRoutes;