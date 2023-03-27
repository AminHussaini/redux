import { useSelector } from "react-redux";
// import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { memo, useEffect } from "react";
import { selectPostById,selectAllPosts } from "./postsSlice";

const SinglePostPage = () => {
  const { postId } = useParams();
  // console.log(selectPostById());
  // useEffect(() => {
    
  // }, [])
  console.log("asdasd" ,selectAllPosts());

  const post = useSelector(selectAllPosts);
  let singlePost =  post.find(item => {
    return item.id === postId
  })
  if (!post) { 
    return(
    <section>
      <h1>No Post Found</h1>
    </section>)
  }

  return (
    <>
    <h1>Single Post</h1>
    <article>
      <h2>{singlePost.title} asd</h2>
      <p>{singlePost.content}</p>
      <p className="postCredit">
          <Link style={{color:"#fff"}} to={`/post/edit/${singlePost.id}`}>Edit Post</Link> &nbsp;&nbsp;
          
        <PostAuthor userId={singlePost.userId} />
        <TimeAgo timestamp={singlePost.date} />
      </p>
      <ReactionButtons post={singlePost} />
    </article>
    </>
  );
};

export default SinglePostPage;
