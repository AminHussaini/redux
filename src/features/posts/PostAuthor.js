import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/userSlice'

const PostAuthor = ({userId}) => {
  console.log(userId)
  const users = useSelector(selectAllUsers); 
  
  const user = users.find(user => user.id === Number(userId) );
  console.log(user)
  return <span>By {user ? user.name :"Unknown User"}</span>
}

export default PostAuthor