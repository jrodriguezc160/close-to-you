import { FiFilePlus } from "@react-icons/all-files/fi/FiFilePlus";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import "../index.css"
import { useEffect, useState } from 'react';
import { useSpring, animated, easings } from 'react-spring';
import { easeInOut, easeOut } from 'framer-motion';

function ProfilePic ({ setShowProfilePicModal, profilePic }) {
  const [iconVisible, setIconVisible] = useState(false)
  const [isProfilePicLoaded, setIsProfilePicLoaded] = useState(false);

  useEffect(() => {
    if (profilePic) {
      setIsProfilePicLoaded(true);
    } else {
      setIsProfilePicLoaded(false);
    }
  }, [profilePic]);

  const fade = useSpring({
    opacity: isProfilePicLoaded ? 1 : 0,
    transform: isProfilePicLoaded ? "translateY(0%)" : "translateY(50%)",
    gap: "8px",
    config: { duration: 400, easing: easeOut }
  });

  const handleClick = () => {
    setShowProfilePicModal(true);
  }

  const handleMouseEnter = () => {
    setIconVisible(true);
  };

  const handleMouseLeave = () => {
    setIconVisible(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "32px" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '8rem', height: '8rem', marginRight: '2rem' }}>
        <div className={`ic-container ${iconVisible === true && profilePic ? ('visible') : ('hidden-icon')}`} style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClick}>
          <FiEdit2 />
        </div>
        {!profilePic
          ? (
            <animated.div style={fade} className='profile-pic'>
              <div className='ic-container' style={{ height: "32px", width: "32px" }} onClick={handleClick}>
                <FiFilePlus />
              </div>
            </animated.div>
          )
          : (
            <animated.div style={fade} className='profile-pic'>
              <img onLoad={() => setIsProfilePicLoaded(true)} src={profilePic} style={{ width: 'inherit', height: 'inherit' }} />
            </animated.div>
          )}
      </div>

      <div className='profile-text'>
        <h1>RODLEYY</h1>
        <h3 style={{ fontWeight: "normal" }}>@rodleyy</h3>
      </div>
    </div>
  )
}

export default ProfilePic;
