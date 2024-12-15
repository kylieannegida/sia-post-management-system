import Joi from "joi"; // Import Joi validation library

// Define a validation schema for post data
const postValidationSchema = Joi.object({
  // User ID validation - no longer required
  user_id: Joi.string().messages({
    "any.required": "User ID is required",
  }),

  // Email validation
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  // Password validation
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),

  // Content validation (required and must include type and data)
  content: Joi.object({
    type: Joi.string()
      .valid("image", "video", "text")
      .required()
      .messages({
        "any.only": "Content type must be one of 'image', 'video', or 'text'",
        "any.required": "Content type is required",
      }),
    data: Joi.string().required().messages({
      "any.required": "Content data is required",
    }),
  }).required().messages({
    "any.required": "Content is required",
  }),
});

// Helper function to validate post data
export const validatePost = (postData: any) => {
  return postValidationSchema.validate(postData, { abortEarly: false });
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - content
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID of the user creating the post (optional)
 *           example: "507f1f77bcf86cd799439011"
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user creating the post
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user creating the post
 *           example: "securepassword123"
 *         content:
 *           type: object
 *           required:
 *             - type
 *             - data
 *           properties:
 *             type:
 *               type: string
 *               enum: [image, video, text]
 *               description: Type of the content
 *               example: "text"
 *             data:
 *               type: string
 *               description: Actual content data (e.g., text, URL for media)
 *               example: "This is a sample post."
 *     PostResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Post's unique identifier
 *         user_id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         content:
 *           $ref: '#/components/schemas/Post/properties/content'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 */
