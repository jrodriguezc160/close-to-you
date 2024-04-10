import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { FiRepeat } from "@react-icons/all-files/fi/FiRepeat";
import { FiSend } from "@react-icons/all-files/fi/FiSend";
import "../index.css"

function Post ({ profilePic, post }) {
  return (
    <div className='post'>
      <div className='post-profile'>
        <div className='post-profile-pic'>
          {profilePic ? (<img src={profilePic} />) : ('')}
        </div>
      </div>

      <div className='post-content'>
        <div className='post-username'>
          <b>RODLEYY</b>&nbsp;&nbsp;@rodleyy
        </div>

        <div className='post-text'>
          {post.contenido}
        </div>

        <div className='post-icons' >
          <div className="ic-container" >
            <FiHeart style={{ height: '14px', width: '14px' }} />
            162
          </div>

          <div className="ic-container">
            <FiRepeat style={{ height: '14px', width: '14px' }} />
            64
          </div>

          <div className="ic-container">
            <FiSend style={{ height: '14px', width: '14px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;