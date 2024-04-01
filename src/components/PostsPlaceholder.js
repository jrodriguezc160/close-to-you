import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import Post from './Post';
import { useState } from 'react';

function PostsPlaceholder ({ profilePic, showNewPostModal, setShowNewPostModal }) {

  const handleClick = () => {
    setShowNewPostModal(true);
  }

  return (
    <div className='posts-placeholder'>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h3>POSTS</h3>
        <div className="chip-button" onClick={handleClick}>
          <FiEdit3 />
          <p>&nbsp;&nbsp;Nuevo post</p>
        </div>
      </div>

      <Post profilePic={profilePic} />
      <Post profilePic={profilePic} />
      <Post profilePic={profilePic} />
    </div>
  )
}

export default PostsPlaceholder;
