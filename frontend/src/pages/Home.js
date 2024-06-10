// src/pages/Home.js
import React, { useState, useEffect, useContext } from "react";
import Tweet from "../components/Tweet";
import TweetForm from "../components/TweetForm";
import axios from "axios";

const Home = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/tweet/timeline`
        );
        setTweets(response.data);
      } catch (error) {
        console.error("Failed to fetch timeline", error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      {/* <TweetForm /> */}
      {tweets.map((tweet) => (
        <Tweet key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Home;
