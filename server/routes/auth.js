import express from "express"
import { register, login } from "../controllers/auth.js"
import upload from "../utils/fileUpload.js";

const router = express.Router();

// router.post("/auth/register", register);

router.post("/register", upload.single("picture"), register);
router.post("/login", login);

export default router;
