import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import Post from './Post';

function PostsPlaceholder () {

  return (
    <div className='posts-placeholder'>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h3>POSTS</h3>
        <div className="text-chip-button">
          <FiEdit3 />
          Nuevo post
        </div>
      </div>

      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default PostsPlaceholder;
