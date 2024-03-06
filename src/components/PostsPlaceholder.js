import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import { FiRepeat } from "@react-icons/all-files/fi/FiRepeat";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { useEffect, useState } from 'react';
import Post from './Post';

function PostsPlaceholder () {

  return (
    <div className='posts-placeholder'>
      <h3>POSTS</h3>

      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default PostsPlaceholder;
