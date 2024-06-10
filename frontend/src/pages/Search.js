import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let id = searchParams.get("username");
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/search/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const follow = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/follow`,
        { userId: id }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };
  const unfollow = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/unfollow`,
        { userId: id }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {user && (
        <>
          <div>
            <img
              className="w-25"
              style={{ objectFit: "contain" }}
              src={
                process.env.REACT_APP_API_URL +
                user.profileImagePath.replace("public", "")
              }
            />
          </div>
          <hr></hr>
          <h3>Username: {user.username}</h3>
          <h3>Name: {user.firstName + " " + user.lastName}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Phone: {user.phoneNumber}</h3>
          {JSON.parse(localStorage.getItem("user")).username !=
            user.username && (
            <>
              <button
                className="btn btn-primary me-5"
                onClick={() => follow(user._id)}
              >
                Follow
              </button>
              <button
                className="btn btn-danger"
                onClick={() => unfollow(user._id)}
              >
                Unfollow
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Search;
