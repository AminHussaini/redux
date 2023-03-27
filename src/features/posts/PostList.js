import { memo, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const getErrors = useSelector(getPostsError);

  const fetching_posts = async () => {
    return await dispatch(fetchPosts());
  };

  useEffect(() => {
    if (postStatus === "idle") {
      fetching_posts();
    }
  }, [postStatus, dispatch]);

  let content = [];
  if (postStatus === "loading") {
    content = <p> loading... </p>;
  } else if (postStatus === "succeeded") {
    // sort with date
    // const renderedPosts = Object.values(posts)?.slice()?.sort((a, b) => b.date.localeCompare(a.date));
    const renderedPosts = posts
      ?.slice()
      ?.sort((a, b) => b.date.localeCompare(a.date));
    content = renderedPosts.map((post) => (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p className="postCredit">
          
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
        <br />
        <h5>
          <Link Link style={{color:"white",display:"inline-block"}} to={`post/${post.id}`}>View Post</Link>
        </h5>
      </article>
    ));
  } else if (postStatus === "failed") {
    console.log("error", postStatus, getErrors);
    content = <p> {getErrors} </p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default memo(PostList);
