import { Router } from "express";
import { PostController } from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Post Management Routes
router.post("/create", authMiddleware, PostController.createPost);
router.get("/", authMiddleware, PostController.getAllPosts);
router.get("/:id", authMiddleware, PostController.getPostById);
router.put("/:id", authMiddleware, PostController.updatePost);
router.delete("/:id", authMiddleware, PostController.deletePost);

export default router;
