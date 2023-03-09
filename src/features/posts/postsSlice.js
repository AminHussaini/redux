import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

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
console.log(sub(new Date(), { minutes: 5 }).toISOString());
const postUrl =
  "https://shopping-bcd0a-default-rtdb.firebaseio.com/";

const initialState = {
  posts: [],
  status: "idle", //'idle'  | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// try catch method
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(`${postUrl}newPost.json`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const UpdateReactions = createAsyncThunk(
  "posts/UpdateReactions",
  async (val) => {
    try {
      let config = {
        headers: { 
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Credentials': "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          withCredentials: true
        },
      }
      const response = await axios.get(`${postUrl}newPost.json`);
      let currentItem = Object.entries(response.data).find((e) => e[1].id === val.postId ? e[0] : null )
      console.log(currentItem)
      if (currentItem) {
        currentItem[1].reactions[val.reaction]++;
        const updateRes = await axios.put(`https://shopping-bcd0a-default-rtdb.firebaseio.com/newPost/${currentItem[0]}/reactions.json`, currentItem[1].reactions, config);
        return response.data
      }

    } catch (err) {
      console.log({ err });
      return err.message;
    }
  }
);
export const publishPost = createAsyncThunk(
  "posts/publishPost",
  async (val) => {
    try {
      let { title, content, userId } = val;
      let items = 
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
          }
        ;
      const data = await axios.post(`${postUrl}newPost.json`, items);
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
    // reactionAdded= (state, action) => {
    //   const { postId, reaction } = action.payload;
    //   // const response = await axios.get(postUrl);
    //   console.log(postId, reaction)
    //   async (val) => {
    //     try {
    //       let { title, content, userId } = val;
    //       let items = 
    //           {
    //             id: nanoid(),
    //             userId,
    //             title,
    //             content,
    //             reactions: {
    //               thumbsUp: 0,
    //               wow: 0,
    //               heart: 0,
    //               rocket: 0,
    //               coffee: 0,
    //             },
    //             date: new Date().toISOString(),
    //           }
    //         ;
    //       const data = await axios.post(postUrl, items);
    //       return items;
    //     } catch (err) {
    //       console.log({ err });
    //       return err.message;
    //     }
    //   }
    //   // const existingPost = state.posts.find((post) => post.id === postId);
    //   // if (existingPost) {
    //   //   console.log("2 ", postId, reaction)
    //   //   existingPost.reactions[reaction]++;
    //   // }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        if (action.payload !== null) {
          state.posts = Object.values(action.payload);
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(publishPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.posts =  [state.posts, action["payload"]];
        state.posts.push(action.payload);
      })
      .addCase(UpdateReactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload !== null) {
          state.posts = Object.values(action.payload);
        }
      })
  },
});

// Add the post
export const { postAdded } = postsSlice.actions;

// For all the post
export const selectAllPosts = (state) => state.posts.posts;

//
export const getPostsStatus = (state) => state.posts.status;

export const getPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
