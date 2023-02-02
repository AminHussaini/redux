import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import { selectAllPosts,getPostsError , getPostsStatus,fetchPosts  } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const getErrors = useSelector(getPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
    console.log({posts})
  }, [postStatus, dispatch])
  
  let content = [0];
  if (postStatus === "loading") {
    content = <p> loading... </p>;
  } else if (postStatus === "success") {
    // sort with date
    const renderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content  = renderedPosts.map((post) => (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0,100)}</p>
        <p className="postCredit">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post}/>
      </article>
    ));
  } else { 
    content = <p> { getErrors } </p>;
  }

  

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default PostList;
