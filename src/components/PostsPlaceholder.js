import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import Post from './Post';
import { useEffect } from 'react';

function PostsPlaceholder ({ profilePic, showNewPostModal, setShowNewPostModal, myPosts, setMyPosts }) {

  useEffect(() => {
    const savedPosts = localStorage.getItem('myPosts');
    console.log('savedPosts', savedPosts)
    if (savedPosts) {
      setMyPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleClick = () => {
    setShowNewPostModal(true);
  }

  return (
    <div className='posts-placeholder'>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h3>POSTS</h3>
        <div className="chip-button" onClick={handleClick}>
          <p>&nbsp;&nbsp;</p>
          <FiEdit3 />
          <p>&nbsp;&nbsp;Nuevo post&nbsp;&nbsp;</p>
        </div>
      </div>

      {myPosts.map((content, index) => (
        <Post key={index} profilePic={profilePic} content={content} />
      ))}
    </div>
  )
}

export default PostsPlaceholder;
