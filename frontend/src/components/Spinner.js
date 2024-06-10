import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location, path]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "30px" }}>
        Redirecting to you in {count} seconds
      </h1>
      <div
        style={{
          display: "inline-block",
          width: "2rem",
          height: "2rem",
          borderWidth: "0.25em",
          borderStyle: "solid",
          borderTopColor: "currentColor",
          borderRightColor: "currentColor",
          borderBottomColor: "currentColor",
          borderLeftColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.75s linear infinite",
          position: "relative", // Added for correct rendering
        }}
        role="status"
      >
        <span
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            margin: "-1px",
            padding: "0",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: "0",
          }}
        >
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
