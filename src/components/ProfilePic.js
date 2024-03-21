import { FiFilePlus } from "@react-icons/all-files/fi/FiFilePlus";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import "../index.css"
import { useState } from 'react';

function ProfilePic ({ setShowProfilePicModal, profilePic }) {
  const [iconVisible, setIconVisible] = useState(false)

  const handleClick = () => {
    setShowProfilePicModal(true)
  }

  const handleMouseEnter = () => {
    setIconVisible(true);
  };

  const handleMouseLeave = () => {
    setIconVisible(false);
  };


  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "32px" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '8rem', height: '8rem', marginRight: '4rem' }}>
        <div className={`ic-container ${iconVisible === true && profilePic !== '' ? ('visible') : ('hidden-icon')}`} style={{ position: 'absolute', top: 0, right: 0, zIndex: '999' }}>
          <FiEdit2 />
        </div>
        <div className='profile-pic'>
          {!profilePic
            ? (<div className='ic-container' style={{ height: "32px", width: "32px" }} onClick={handleClick}>
              <FiFilePlus />
            </div>)
            : (<img src={profilePic} style={{ width: 'inherit', height: 'inherit' }} />)}
        </div>
      </div>
      <div className='profile-text'>
        <h1>RODLEYY</h1>
        <h3 style={{ fontWeight: "normal" }}>@rodleyy</h3>
      </div>
    </div >
  )
}


export default ProfilePic;