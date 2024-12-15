import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/postInterfaces";

// Define the schema for the Post model
export const postSchema = new Schema(
  {
    // User ID field
    id: { type: String, required: true, unique: true },

    // Email field - required, validated for email format
    email: { 
      type: String, 
      required: true, 
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"] // Regex for email validation
    },

    // Password field - required
    password: { type: String, required: true },

    // Content field - required, supports image, video, or text data
    content: {
      type: {
        type: String,
        required: true,
        enum: ["image", "video", "text"], // Restrict content types
      },
      data: {
        type: String, // For text or file paths
        required: true,
      },
    },
  },
  // Enable automatic timestamp fields (createdAt and updatedAt)
  { timestamps: true }
);

// Create and export the Post model
export const Post = mongoose.model<IPost>("Posts", postSchema);




// example

// {
//   "user_id": "12345",
//   "email": "user@example.com",
//   "password": "hashed_password",
//   "content": {
//     "type": "image",
//     "data": "/path/to/image.jpg"
//   }
// }

// {
//   "user_id": "12345",
//   "email": "user@example.com",
//   "password": "hashed_password",
//   "content": {
//     "type": "text",
//     "data": "This is a sample post content."
//   }
// }  
