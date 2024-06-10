import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext, useAuth } from "../context/AuthContext";

const TweetDetail = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let id = searchParams.get("id");

  console.log(id); // Outputs: 6664a4be0f3e074216a2cd
  const [tweet, setTweet] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const { auth } = useAuth();

  const fetchTweet = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/tweet/${id}`
      );
      setTweet(response.data);
      setHasLiked(response.data.likedBy.includes(auth.user._id));
    } catch (error) {
      console.error("Failed to fetch tweet", error);
    }
  };
  useEffect(() => {
    fetchTweet();
  }, [id, auth.user._id]);

  const handleLike = async () => {
    try {
      if (hasLiked) return;

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tweet/${id}/like`,
        {},
        {
          headers: {
            Authorization: ` ${localStorage.getItem("token")}`,
          },
        }
      );
      setTweet((prev) => ({ ...prev, likes: prev.likes + 1 }));
      setHasLiked(true);
    } catch (error) {
      console.error("Failed to like tweet", error);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tweet/${id}/reply`,
        { content: replyContent },
        {
          headers: {
            Authorization: ` ${localStorage.getItem("token")}`,
          },
        }
      );
      setTweet((prevTweet) => {
        return {
          ...prevTweet,
          replies: [...prevTweet.replies, response.data],
        };
      });
      fetchTweet();
      setReplyContent("");
    } catch (error) {
      console.error("Failed to reply", error);
    }
  };

  if (!tweet) return <div>Loading...</div>;

  return (
    <div>
      <h2>{tweet.content}</h2>
      <button
        onClick={handleLike}
        style={{ color: hasLiked ? "red" : "black" }}
      >
        Like ({tweet.likes})
      </button>
      <form onSubmit={handleReply}>
        <input
          type="text"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Write a reply..."
        />
        <button type="submit">Reply</button>
      </form>
      <hr />
      <h3>Replies</h3>
      <hr />
      {tweet.replies.map((reply, index) => (
        <div
          key={`${reply._id}-${index}`}
          className="d-flex justify-content-around"
        >
          <h3>{reply.content}</h3>
          <h6>by {reply.userId.username}</h6>
        </div>
      ))}
    </div>
  );
};

export default TweetDetail;
