import express from "express"
import { verifyToken } from "../middleware/auth.js";
import {createPost, getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js"
import upload from "../utils/fileUpload.js";
import { uploadImage } from "../middleware/uploads.js";

const router = express.Router();

// router.post("/auth/register", register);
router.post("/",verifyToken, upload.single("picture"), uploadImage, createPost);
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
export default router;
