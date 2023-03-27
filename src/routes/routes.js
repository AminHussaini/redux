import { Route, Routes } from "react-router-dom";
import AddPostForm from "../features/posts/AddPostForm";
import SinglePostPage from "../features/posts/SinglePostPage";
import PostList from "../features/posts/PostList";

const Routing = () => {
  return (
    <main className="App">
      <Routes>
        <Route path="/redux" element={<PostList />} />
        
        {/* 👇️ handle dynamic path */}
        <Route path="post" element={<AddPostForm />} />
        <Route path="redux/post/:postId" element={<SinglePostPage />} />
        {/* <Route path="post">
        </Route> */}

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
