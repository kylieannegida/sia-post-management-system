import { Router } from "express";
import { PostController } from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Create instance of PostController to handle route logic
const postController = new PostController();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post endpoints
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               content:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [image, video, text]
 *                   data:
 *                     type: string
 *             required:
 *               - user_id
 *               - email
 *               - password
 *               - content
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 *
 *   put:
 *     summary: Update post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               content:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [image, video, text]
 *                   data:
 *                     type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *
 *   delete:
 *     summary: Delete post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */

// POST /api/posts - Create a new post
router.post("/", PostController.createPost);

// GET /api/posts - Get all posts
router.get("/", PostController.getAllPosts);

// GET /api/posts/:id - Get a single post by ID
router.get("/:id", PostController.getPostById);

// PUT /api/posts/:id - Update an existing post
router.put("/:id", PostController.updatePost);

// DELETE /api/posts/:id - Delete a post
router.delete("/:id", PostController.deletePost);

export default router;
