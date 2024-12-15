import { Request, Response } from "express";
import { Post } from "../models/post";
import { validatePost } from "../validations/postValidation";
import mongoose from "mongoose";
import { CustomRequest } from "../interfaces/requestInterfaces";

class PostController {
  /**
   * Create a new post
   */
  async createPost(req: CustomRequest, res: Response) {
    try {
      // Validate incoming post data
      const { error, value: payload } = validatePost(req.body);
      if (error) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }

      // Create a new post, associate with authenticated user if applicable
      const post = new Post({
        ...payload,
        user_id: req.user?.id, // Associate user if authentication is implemented
      });

      // Save the post to the database
      const savedPost = await post.save();

      res.status(201).json({
        message: "Post created successfully",
        post: savedPost,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  /**
   * Get all posts
   */
  async getPosts(req: Request, res: Response) {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json({
        message: "Posts retrieved successfully",
        count: posts.length,
        posts,
      });
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  /**
   * Get a single post by ID
   */
  async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({
        message: "Post retrieved successfully",
        post,
      });
    } catch (error) {
      console.error("Error retrieving post:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  /**
   * Update a post by ID
   */
  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      // Validate the incoming post data
      const { error, value: payload } = validatePost(req.body);
      if (error) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }

      // Update the post in the database
      const updatedPost = await Post.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true, // Ensure validation runs on update
      });

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({
        message: "Post updated successfully",
        post: updatedPost,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  /**
   * Delete a post by ID
   */
  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }

      // Delete the post from the database
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}

export default new PostController();
