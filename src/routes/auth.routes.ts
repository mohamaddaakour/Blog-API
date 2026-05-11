import { Router } from "express";
import { getMe } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

import {
    login,
    register
} from "../controllers/auth.controller";

import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
    "/register",
    asyncHandler(register)
);

router.post(
    "/login",
    asyncHandler(login)
);

router.get(
    "/me",
    protect,
    asyncHandler(getMe)
);

export default router;