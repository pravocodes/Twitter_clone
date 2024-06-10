// src/components/Tweet.js
import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import TweetForm from "./TweetForm";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Tweet.module.css"

const Tweet = ({ tweet, setTweets }) => {
  const { auth } = useAuth();

  //   const handleDelete = async () => {
  //     try {
  //       await axios.delete(
  //         `${process.env.REACT_APP_API_URL}/api/tweets/${tweet._id}`
  //       );
  //       setTweets((prevTweets) => prevTweets.filter((t) => t._id !== tweet._id));
  //     } catch (error) {
  //       console.error("Failed to delete tweet", error);
  //     }
  //   };

  return (
    <div className={styles.main}>

      <h3 className={styles.username}>{tweet.userId.username}</h3>
      <p>{tweet.content}</p>
      <button>
        <Link to={`/tweet/${tweet._id}`} className="btn btn-primary">
          Read More
        </Link>
      </button>
    </div>
  );
};

export default Tweet;
