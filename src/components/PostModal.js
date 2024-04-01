import { useState, useRef, useEffect } from 'react';

const PostModal = ({ showNewPostModal, setShowNewPostModal, profilePic }) => {
  const [savedProfilePics, setSavedProfilePics] = useState([])
  const [iconVisible, setIconVisible] = useState(false)
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    showNewPostModal === true && setModalVisible(true);
  }, [showNewPostModal])

  useEffect(() => {
    if (modalVisible === true) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalVisible]);

  const handleClickExterior = (event) => {
    console.log('Click exteriors')
    if (event.target.classList.contains('modal-screen')) {
      setModalVisible(false)
      setTimeout(() => {
        setShowNewPostModal(false);
      }, 1000);
    }
  }

  const handleInput = (e) => {
    const maxLength = 256;

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${e.target.scrollHeight - 2}px`;

      if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
    }
  };


  return (
    <div>
      <div className={`modal-screen ${modalVisible === true ? 'visible' : ''}`} onClick={handleClickExterior} >
        <div className="modal" style={{ top: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '400' }}>
          <div className='post modal-glass' style={{ backgroundColor: '#80808005', alignItems: 'start', width: '25vw', height: 'fit-content' }}>
            <div className='post-profile'>
              <div className='post-profile-pic'>
                {profilePic ? (<img src={profilePic} />) : ('')}
              </div>
              <div style={{ padding: "8px 0" }}>
                <b>RODLEYY</b>&nbsp; @rodleyy
              </div>
            </div>

            <div className='post-textarea'>
              <textarea ref={inputRef} type="text" placeholder='wassup dogg' rows={1} onInput={handleInput} />
            </div>
          </div>
        </div>

        <div style={{ minHeight: '5vh' }}></div>
      </div>
    </div>
  )
}

export default PostModal;
