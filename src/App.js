import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import AddPostForm from "./features/posts/AddPostForm";
import PostList from "./features/posts/PostList";
import { fetchPosts, getPostsStatus } from "./features/posts/postsSlice";
import Routing from "./routes/routes";

export default function App() {
  const dispatch = useDispatch();
  const postStatus = useSelector(getPostsStatus);
  const fetching_posts = async () => {
    
    return await dispatch(fetchPosts());
  };

  useEffect(() => {
    console.log("fetching_posts ",postStatus)
    if (postStatus === "idle") {
      console.log({postStatus});
      fetching_posts();
    }
  });
  return (
    <div>
      <nav>
        <Header />
      </nav>
      {/* 👇️ Wrap your Route components in a Routes component */}
      <Routing />
    </div>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   const params = useParams();

//   return <h2>Users: {params.userId}</h2>;
// }
