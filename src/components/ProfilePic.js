import { FiFilePlus } from "@react-icons/all-files/fi/FiFilePlus";
import "../index.css"

function ProfilePic () {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className='profile-pic' style={{ margin: "32px 64px 32px 0px" }}>
        <div className='ic-container' style={{ height: "32px", width: "32px" }}>
          <FiFilePlus />
        </div>
      </div>

      <div className='profile-text'>
        <h1>RODLEYY</h1>
        <h3 style={{ fontWeight: "normal" }}>@rodleyy</h3>
      </div>
    </div>
  )
}

export default ProfilePic;