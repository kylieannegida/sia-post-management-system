import { Router } from "express";
import { PostController } from "../controllers/postController";
import postRoutes from "./postRoutes";
// import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Post Management Routes
router.use("/api/posts", postRoutes);

export default router;
