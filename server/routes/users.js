import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    updateProfile
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/friends", verifyToken, addRemoveFriend);
router.patch("/:id/profile", verifyToken, updateProfile)

export default router;