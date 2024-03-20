import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import Post from './Post';

function PostsPlaceholder ({ profilePic }) {

  return (
    <div className='posts-placeholder'>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h3>POSTS</h3>
        <div className="text-chip-button">
          <FiEdit3 />
          Nuevo post
        </div>
      </div>

      <Post profilePic={profilePic} />
      <Post profilePic={profilePic} />
      <Post profilePic={profilePic} />
    </div>
  )
}

export default PostsPlaceholder;
