import express from "express"
import { register, login } from "../controllers/auth.js"
import { uploadImage } from "../middleware/uploads.js";
// import upload from "../utils/fileUpload.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// router.post("/auth/register", register);

router.post("/register", upload.single("picture"), uploadImage, register);
router.post("/login", login);

export default router;
