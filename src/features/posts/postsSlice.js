import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// import { sub } from 'date-fns';
// {
//   id: 1,
//   title: "Learning Redux Toolkit",
//   content: "I've heard good things.",
//   date: sub(new Date(), { minutes: 10 }).toISOString(),
//   reactions: {
//     thumbsUp: 0,
//     wow: 0,
//     heart: 0,
//     rocket: 0,
//     coffee: 0,
//   },
// },
// {
//   id: 2,
//   title: "Slices...",
//   content: "The more I say slice, the more I want pizza.",
//   date: sub(new Date(), { minutes: 5 }).toISOString(),
//   reactions: {
//     thumbsUp: 0,
//     wow: 0,
//     heart: 0,
//     rocket: 0,
//     coffee: 0,
//   },
// },

const postUrl = 'https://shopping-bcd0a-default-rtdb.firebaseio.com/newPost.json'

const initialState = {
  posts: [],
  status: "idle", //'idle'  | 'loading' | 'succeeded' | 'failed'
  error:null
};

// try catch method 
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => { 
  try {
    const res = await axios.get(postUrl);
    console.log("Slicer post " ,res.data)
    return[...res.data]
  } catch (err) { 
    return err.message;
  }
})

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postAdded : {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title,content, userId) {
        return {
          payload: {
            id:nanoid(),
            userId,
            title,
            content,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            },
            date: new Date().toISOString()
          }
        }
      },
    },
    reactionAdded(state,action){
      const {postId,reaction} = action.payload;
      const existingPost = state.posts.find(post => post.id === postId)
          if (existingPost) {
              existingPost.reactions[reaction]++
          } 
    },
    extraReducers(builder) {
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "loading"
      }).addCase(fetchPosts.pending, (state, action) => {
        state.status = "succeeded"
        // 
        console.log(action.payload)
      }).addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
    }
  },
});

// Add the post 
export const {postAdded,reactionAdded} = postsSlice.actions;

// For all the post
export const selectAllPosts = (state) => state.posts.posts;

// 
export const getPostsStatus = (state) => state.posts.status;

export const getPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
