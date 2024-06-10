import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState();
  return (
    <>
      <div className="d-flex justify-content-around">
        <div>
          <h1>Twitter</h1>
        </div>
        <div className="w-25 d-flex">
          <input
            placeholder="Enter username"
            className="form-control"
            onChange={(e) => setusername(e.target.value)}
          ></input>
          <button
            className="btn"
            onClick={() => navigate(`/search?username=${username}`)}
          >
            Search
          </button>
        </div>
        <div>
          <button className="btn" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="btn" onClick={() => navigate("/tweets")}>
            Tweet
          </button>
          <button
            className="btn"
            onClick={() =>
              navigate(
                `/search?username=${
                  JSON.parse(localStorage.getItem("user")).username
                }`
              )
            }
          >
            Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
