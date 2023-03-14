import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import AddPostForm from "./features/posts/AddPostForm";
import PostList from "./features/posts/PostList";
import Routing from "./routes/routes";

export default function App() {
  return (
      <div>
        <nav>
          <Header/>
      </nav>
      <Routing />
        {/* 👇️ Wrap your Route components in a Routes component */}
        
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
