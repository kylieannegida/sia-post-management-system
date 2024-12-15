import mongoose from "mongoose";

// User Interface
export interface IUser extends mongoose.Document {
  email: string; // User's email address (used for login)
  password: string; // User's hashed password
  firstName: string; // User's first name
  lastName: string; // User's last name
}

// Post Interface
export interface IPost extends mongoose.Document {
  _id: string; // Unique identifier for the post
  user_id: string; // Reference to the user who created the post
  email: string; // User's email (optional field for verification or logging)
  content: {
    type: "image" | "video" | "text"; // Type of the content
    data: string; // Content data (URL for image/video or text for a text post)
  };
  createdAt?: Date; // Timestamp for when the post was created
  updatedAt?: Date; // Timestamp for when the post was last updated
}
