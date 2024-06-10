import express from "express";
import {
  followUserController,
  getFollowersController,
  getFollowingController,
  getuserController,
  unfollowUserController,
} from "../controller/followerController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/follow", requireSignIn, followUserController);
router.post("/unfollow", requireSignIn, unfollowUserController);
router.get("/:userId/followers", getFollowersController);
router.get("/:userId/following", getFollowingController);
router.get("/search/:username", getuserController);

export default router;
