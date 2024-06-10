// // src/components/TweetForm.js
// import React, { useState } from "react";
// import axiosInstance from "../axios";

// const TweetForm = ({ tweet, setTweets }) => {
//   const [content, setContent] = useState(tweet ? tweet.content : "");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (tweet) {
//         await axiosInstance.put(`/tweets/${tweet._id}`, { content });
//         setTweets((prevTweets) =>
//           prevTweets.map((t) => (t._id === tweet._id ? { ...t, content } : t))
//         );
//       } else {
//         const response = await axiosInstance.post("/tweets", { content });
//         setTweets((prevTweets) => [response.data, ...prevTweets]);
//       }
//       setContent("");
//     } catch (error) {
//       console.error("Failed to submit tweet", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         required
//       />
//       <button type="submit">{tweet ? "Update" : "Tweet"}</button>
//     </form>
//   );
// };

// export default TweetForm;
