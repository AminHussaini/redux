import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import { selectAllPosts,getPostsError , getPostsStatus,fetchPosts } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const getErrors = useSelector(getPostsError);

  const fetching_posts = async () => {
    const data = await dispatch(fetchPosts());
    console.log(posts);
    return data;
  }
      
  useEffect( () => {
    if (postStatus === "idle") {
      console.log("in")
      fetching_posts();
    
    }
    }, [postStatus, dispatch])
  
  let content = [];
  if (postStatus === "loading") {
    console.log("loading ",posts);
    content = <p> loading... </p>;
  } else if (postStatus === "succeeded") {
    // sort with date
    // console.log("post ", posts);
    
    
    const renderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    console.log({renderedPosts})
    // content = renderedPosts.map((post) => (
    //   <article key={post.id}>
    //     <h3>{post.title}</h3>
    //     <p>{post.content.substring(0,100)}</p>
    //     <p className="postCredit">
    //       <PostAuthor userId={post.userId} />
    //       <TimeAgo timestamp={post.date} />
    //     </p>
    //     <ReactionButtons post={post}/>
    //   </article>
    // ));

  } else if (postStatus === "failed") { 
    console.log("error",postStatus , getErrors);
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
