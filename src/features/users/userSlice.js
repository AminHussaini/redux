import { createSlice } from "@reduxjs/toolkit";

const initialState =[
  {
    id:0,
    name:"Amin"
  },
  {
    id:1,
    name:"Ali"
  },
  {
    id:2,
    name:"Saad"
  },
]

const userSlice = createSlice({
  name:"users",
  initialState,
  reducers:{
    
  }
})

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;