import Follower from "../models/Follower.js";
import User from "../models/User.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

// Follow a user
export const followUserController = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.body;

    const existingFollower = await Follower.findOne({ userId, followerId });
    if (existingFollower) {
      return res
        .status(409)
        .json({ message: "You are already following this user" });
    }

    const follower = new Follower({ userId, followerId });
    await follower.save();
    res.status(201).json({ message: "Followed user successfully", follower });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to follow user", error: error.message });
  }
};

// Unfollow a user
export const unfollowUserController = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.body;

    const existingFollower = await Follower.findOneAndDelete({
      userId,
      followerId,
    });
    if (!existingFollower) {
      return res
        .status(404)
        .json({ message: "You are not following this user" });
    }

    res.status(200).json({ message: "Unfollowed user successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to unfollow user", error: error.message });
  }
};

// Get Followers of a User
export const getFollowersController = async (req, res) => {
  try {
    const { userId } = req.params;
    const followers = await Follower.find({ userId }).populate(
      "followerId",
      "username"
    );
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get followers", error: error.message });
  }
};

// Get Users followed by a User
export const getFollowingController = async (req, res) => {
  try {
    const { userId } = req.params;
    const following = await Follower.find({ followerId: userId }).populate(
      "userId",
      "username"
    );
    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get following users", error: error.message });
  }
};

export const getuserController = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
