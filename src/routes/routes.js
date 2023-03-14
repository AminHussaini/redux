import { Route, Routes } from "react-router-dom";
import AddPostForm from "../features/posts/AddPostForm";
import PostList from "../features/posts/PostList";

const Routing = () => {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/add-post" element={<AddPostForm />} />
        {/* 👇️ handle dynamic path */}
        {/* <Route path="/users/:userId" element={<Users />} /> */}
        {/* 👇️ only match this when no other routes match */}
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found etc</h2>
            </div>
          }
        />
      </Routes>
    </main>
  );
};
export default Routing;
