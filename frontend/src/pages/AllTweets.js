import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllTweets = () => {
  const [tweets, settweets] = useState([]);
  const navigate = useNavigate();
  const fetchtweets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/tweet/timeline`
      );
      settweets(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchtweets();
  }, []);
  return (
    <>
      {tweets &&
        tweets.map((tweet) => {
          return (
            <div
              className="border w-50 rounded my-3"
              onClick={() => navigate(`/tweet?id=${tweet._id}`)}
            >
              <h1>{tweet.userId.username}</h1>
              <h3>{tweet.content}</h3>
              <div className="d-flex">
                <p className="me-2">Likes: {tweet.likes}</p>
                <p className="ms-2">retweets: {tweet.retweets}</p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default AllTweets;
