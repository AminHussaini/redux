import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

import firebase from 'firebase'
import { connect } from 'react-firebase'


firebase.initializeApp({
  databaseURL: 'https://shopping-bcd0a-default-rtdb.firebaseio.com/'
})

console.log(sub(new Date(), { minutes: 5 }).toISOString());
// const postUrl =
//   "https://shopping-bcd0a-default-rtdb.firebaseio.com/newPost.json";

const initialState = {
  posts: [],
  status: "idle", //'idle'  | 'loading' | 'succeeded' | 'failed'
  error: null,
};
const mapFirebaseToProps = {
  todos: 'todos'
}
console.log("Re ",initialState)

// try catch method
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(postUrl);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const publishPost = createAsyncThunk(
  "posts/publishPost",
  async (val) => {
    try {
      let { title, content, userId } = val;
      console.log("Pub ",initialState)
      let items = [
          ...initialState.posts,
          {
            id: nanoid(),
            userId,
            title,
            content,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
            date: new Date().toISOString(),
          },
        ];
      const data = await axios.post(postUrl, items);
      return items;
    } catch (err) {
      console.log({ err });
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            userId,
            title,
            content,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
            date: new Date().toISOString(),
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        console.log("fulfilled");
        console.log(action.payload);
        if (action.payload !== null) {
          console.log("asd" ,action.payload);
          state.posts = [...action.payload];
        }
        console.log("state " ,state.posts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("rejected");
      })
      .addCase(publishPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...state.posts,...action.payload];
        console.log(state.posts)
        console.log("PublishPost succeeded ",state.posts);
      });
  },
});

// Add the post
export const { postAdded, reactionAdded } = postsSlice.actions;

// For all the post
export const selectAllPosts = (state) => state.posts.posts;

//
export const getPostsStatus = (state) => state.posts.status;

export const getPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
