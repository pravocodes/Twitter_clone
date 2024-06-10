import express from "express";
import {
  createTweetController,
  editTweetController,
  deleteTweetController,
  getUserTweetsController,
  getTimelineController,
  getTweetByIdController,
  likeTweetController,
  replyToTweetController,
  // unlikeTweetController,
} from "../controller/tweetController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireSignIn, createTweetController);
router.put("/:id", requireSignIn, editTweetController);
router.delete("/:id", requireSignIn, deleteTweetController);
router.get("/user/:id", getUserTweetsController);
router.get("/timeline", requireSignIn, getTimelineController);
router.get("/:id", getTweetByIdController);
router.post("/:id/like", requireSignIn, likeTweetController);
// router.delete("/:id/like", requireSignIn, unlikeTweetController);
router.post("/:id/reply", requireSignIn, replyToTweetController);

export default router;
