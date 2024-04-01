import { useState, useRef, useEffect } from 'react';

const PostModal = ({ showNewPostModal, setShowNewPostModal, profilePic }) => {
  const [savedProfilePics, setSavedProfilePics] = useState([])
  const [iconVisible, setIconVisible] = useState(false)
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    showNewPostModal === true && setModalVisible(true);

    setTimeout(() => {
      let delay = 100;
      const booksDivs = document.querySelectorAll('.book');
      booksDivs.forEach(bookDiv => {
        setTimeout(() => {
          bookDiv.classList.add('visible');
        }, delay);

        delay += 100;
      });
    }, 500);
  }, [showNewPostModal])

  const handleClickExterior = (event) => {
    console.log('Click exteriors')
    if (event.target.classList.contains('modal-screen')) {
      setModalVisible(false)
      setTimeout(() => {
        setShowNewPostModal(false);
      }, 1000);
    }
  }

  return (
    <div>
      <div className={`modal-screen ${modalVisible === true ? 'visible' : ''}`} onClick={handleClickExterior} >
        <div className="modal" style={{ top: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '400' }}>
          <div className='post modal-glass' style={{ backgroundColor: '#80808005', alignItems: 'start', width: '25vw', height: '10vw' }}>
            <div className='post-profile'>
              <div className='post-profile-pic'>
                {profilePic ? (<img src={profilePic} />) : ('')}
              </div>
              <div style={{ padding: "8px 0" }}>
                <b>RODLEYY</b>&nbsp; @rodleyy
              </div>
            </div>

            <div className='post-input'>
              <input ref={inputRef} type="text" placeholder='wassup dogg' style={{ outline: 'none', border: 'none', background: 'none' }} />
            </div>
          </div>
        </div>

        <div style={{ minHeight: '5vh' }}></div>
      </div>
    </div>
  )
}

export default PostModal;
