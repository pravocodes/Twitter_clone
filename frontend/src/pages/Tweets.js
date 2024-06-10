import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Tweets = () => {
  const [create, setCreate] = useState(false);
  const [content, setContent] = useState("");
  const [tweets, setTweets] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTweetId, setEditTweetId] = useState(null);

  const navigate = useNavigate();

  const createTweet = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tweet/`,
        { content }
      );
      alert(response.data.message);
      setContent("");
      fetchTweets();
    } catch (error) {
      alert(error);
    }
  };

  const fetchTweets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/tweet/user/${
          JSON.parse(localStorage.getItem("user"))._id
        }`
      );
      setTweets(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const editTweet = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tweet/${editTweetId}`,
        { content: editContent }
      );
      alert(response.data.message);
      setEdit(false);
      setEditContent("");
      setEditTweetId(null);
      fetchTweets();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <button className="btn" onClick={() => setCreate(!create)}>
        Create Tweet
      </button>
      {create && (
        <div className="border rounded w-50">
          <input
            className="form-control"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="btn btn-success" onClick={createTweet}>
            Create
          </button>
        </div>
      )}
      {tweets &&
        tweets.map((tweet) => (
          <div key={tweet._id} className="border rounded mb-3">
            <h2>Username: {tweet.userId.username}</h2>
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/tweet?id=${tweet._id}`)}
            >
              Content: {tweet.content}
            </h3>
            <h5>Likes: {tweet.likes}</h5>
            <div className="d-flex justify-content-around w-25">
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.stopPropagation();
                  setEdit(!edit);
                  setEditContent(tweet.content);
                  setEditTweetId(tweet._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={async (e) => {
                  e.stopPropagation();
                  await axios.delete(
                    `${process.env.REACT_APP_API_URL}/api/tweet/${tweet._id}`
                  );
                  fetchTweets();
                }}
              >
                Delete
              </button>
            </div>
            {edit && (
              <div className="border rounded w-50 mt-3">
                <input
                  className="form-control"
                  placeholder="Edit content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button className="btn btn-success" onClick={editTweet}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEdit(false);
                    setEditContent("");
                    setEditTweetId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default Tweets;
