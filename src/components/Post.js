import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { FiRepeat } from "@react-icons/all-files/fi/FiRepeat";
import { FiSend } from "@react-icons/all-files/fi/FiSend";
import "../index.css"

function Post ({ profilePic, content }) {
  return (
    <div className='post'>
      <div className='post-profile'>
        <div className='post-profile-pic'>
          {profilePic ? (<img src={profilePic} />) : ('')}
        </div>
        <div style={{ padding: "8px 0" }}>
          <b>RODLEYY</b>&nbsp; @rodleyy
        </div>
      </div>

      <div className='post-text'>
        <p>{content}</p>
      </div>

      <div className='post-icons'>
        <div className="ic-container">
          <FiHeart />
          162
        </div>

        <div className="ic-container">
          <FiRepeat />
          64
        </div>

        <div className="ic-container">
          <FiSend />
        </div>
      </div>
    </div>
  )
}

export default Post;