import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Blog API running successfully"
    });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;