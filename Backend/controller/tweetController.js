import User from "../models/User.js";
import Follower from "../models/Follower.js";
import Tweet from "../models/Tweet.js";
import Reply from "../models/Reply.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

// Create a new Tweet
export const createTweetController = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    const tweet = new Tweet({ userId, content });
    await tweet.save();
    res.status(201).json({ message: "Tweet created successfully!", tweet });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create tweet", error: error.message });
  }
};

// Edit a Tweet
export const editTweetController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const tweet = await Tweet.findOneAndUpdate(
      { _id: id, userId },
      { content },
      { new: true }
    );

    if (!tweet) {
      return res
        .status(404)
        .json({ message: "Tweet not found or not authorized" });
    }
    res.status(200).json({ message: "Tweet updated successfully!", tweet });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update tweet", error: error.message });
  }
};

// Delete a Tweet
export const deleteTweetController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const tweet = await Tweet.findOneAndDelete({ _id: id, userId });
    if (!tweet) {
      return res
        .status(404)
        .json({ message: "Tweet not found or not authorized" });
    }
    res.status(200).json({ message: "Tweet deleted successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete tweet", error: error.message });
  }
};

// Get Tweets by User
export const getUserTweetsController = async (req, res) => {
  try {
    const userId = req.params.id;
    const tweets = await Tweet.find({ userId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get tweets", error: error.message });
  }
};

// Get Timeline (Tweets from followed users)
export const getTimelineController = async (req, res) => {
  try {
    const user = req.user.id;

    const following = await Follower.find({ followerId: user }).select(
      "userId"
    );
    const followingIds = following.map((f) => f.userId);

    const tweets = await Tweet.find({ userId: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .populate("userId", "username");

    res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get timeline", error: error.message });
  }
};

// Get Tweet by ID
export const getTweetByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findById(id)
      .populate("userId", "username profileImagePath")
      .populate({
        path: "replies",
        populate: {
          path: "userId",
          select: "username profileImagePath",
        },
      });
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get tweet", error: error.message });
  }
};

// Like a Tweet
export const likeTweetController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    if (tweet.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this tweet" });
    }
    console.log(id, userId);
    tweet.likes += 1;
    tweet.likedBy.push(userId);
    await tweet.save();

    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to like tweet", error: error.message });
  }
};

// Reply to a Tweet
export const replyToTweetController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const newReply = {
      userId,
      content,
      createdAt: new Date(),
    };

    const tweet = await Tweet.findByIdAndUpdate(
      id,
      { $push: { replies: newReply } },
      { new: true }
    ).populate({
      path: "replies.userId",
      select: "username profileImagePath",
    });

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    res.status(201).json(tweet);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to reply to tweet", error: error.message });
  }
};

// export const unlikeTweetController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;

//     const tweet = await Tweet.findById(id);

//     if (!tweet) {
//       return res.status(404).json({ message: "Tweet not found" });
//     }

//     // Check if the user has already liked the tweet
//     if (!tweet.likedBy.includes(userId)) {
//       return res.status(400).json({ message: "You have not liked this tweet" });
//     }

//     // Unlike the tweet
//     tweet.likes -= 1;
//     tweet.likedBy = tweet.likedBy.filter(
//       (userId) => userId.toString() !== userId
//     );
//     await tweet.save();

//     res.status(200).json(tweet);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Failed to unlike tweet", error: error.message });
//   }
// };
