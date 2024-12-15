import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../models/post";
import { validatePost } from "../validations/postValidation";

export class PostController {
  public static async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePost(req.body);
      if (error) {
        res.status(400).json({
          message: "Validation failed",
          details: error.details.map((err) => ({
            field: err.context?.key,
            message: err.message,
          })),
        });
        return;
      }

      const postData = {
        id: uuidv4(), // Generate a unique ID
        ...payload,
      };

      const post = new Post(postData);
      const savedPost = await post.save();

      res.status(201).json({
        message: "Post created successfully",
        post: savedPost,
      });
    } catch (error: any) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  public static async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;

      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const total = await Post.countDocuments();

      res.json({
        message: "Posts retrieved successfully",
        count: posts.length,
        total,
        page: Number(page),
        limit: Number(limit),
        posts,
      });
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  public static async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const post = await Post.findOne({ id: postId });

      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.json({ message: "Post retrieved successfully", post });
    } catch (error: any) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  public static async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      const { error, value: payload } = validatePost(req.body);
      if (error) {
        res.status(400).json({
          message: "Validation failed",
          details: error.details.map((err) => ({
            field: err.context?.key,
            message: err.message,
          })),
        });
        return;
      }

      const updatedPost = await Post.findOneAndUpdate(
        { id: postId },
        payload,
        { new: true, runValidators: true }
      );

      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.json({ message: "Post updated successfully", post: updatedPost });
    } catch (error: any) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  public static async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;

      const deletedPost = await Post.findOneAndUpdate(
        { id: postId },
        { deletedAt: new Date() },
        { new: true }
      );

      if (!deletedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.json({ message: "Post deleted (soft) successfully", post: deletedPost });
    } catch (error: any) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
}
