import { FiFilePlus } from "@react-icons/all-files/fi/FiFilePlus";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import "../index.css"

function ProfilePic ({ setShowProfilePicModal, profilePic }) {

  const handleClick = () => {
    setShowProfilePicModal(true)
  }

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "32px" }}>
      <div className="ic-container" style={{ position: 'relative', zIndex: '999' }}>
        <FiEdit2 />
      </div>
      <div className='profile-pic' style={{ marginRight: "64px" }}>
        {!profilePic
          ? (<div className='ic-container' style={{ height: "32px", width: "32px" }} onClick={handleClick}>
            <FiFilePlus />
          </div>)
          : (<img src={profilePic} style={{ width: 'inherit', height: 'inherit' }} />)}
      </div>

      <div className='profile-text'>
        <h1>RODLEYY</h1>
        <h3 style={{ fontWeight: "normal" }}>@rodleyy</h3>
      </div>
    </div>
  )

}

export default ProfilePic;