// src/App.js
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoute from "./route/PrivateRoute";
import Layout from "./pages/Layout";
import SingleTweet from "./pages/SingleTweet";
import AllTweets from "./pages/AllTweets";
import Search from "./pages/Search";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="tweet" element={<SingleTweet />} />
          <Route path="home" element={<AllTweets />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
