import { useSelector } from "react-redux";
// import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { memo } from "react";
import { selectPostById } from "./postsSlice";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  // if (!post) { 

  // }

  return (
    <h1>Single Post </h1>
    // <article>
    //   <h2>{post.title}</h2>
    //   <p>{post.body}</p>
    //   <p className="postCredit">
    //     <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
    //     <PostAuthor userId={post.userId} />
    //     <TimeAgo timestamp={post.date} />
    //   </p>
    //   <ReactionButtons post={post} />
    // </article>
  );
};

export default SinglePostPage;
