import { FiSend } from '@react-icons/all-files/fi/FiSend';
import { useState, useRef, useEffect } from 'react';
import { addPublicacion } from '../../services/PostsServices';

const PostModal = ({ showNewPostModal, setShowNewPostModal, profilePic, myPosts, setMyPosts }) => {
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('myPosts', JSON.stringify(myPosts));
  }, [myPosts]);

  useEffect(() => {
    showNewPostModal === true && setModalVisible(true);
  }, [showNewPostModal]);

  useEffect(() => {
    if (modalVisible === true) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalVisible]);

  const handleSend = async () => {
    const newPost = inputRef.current.value;

    try {
      await addPublicacion(2, newPost);
      setMyPosts(prevPosts => [newPost, ...prevPosts]);
      setModalVisible(false)

      setTimeout(() => {
        setShowNewPostModal(false);
      }, 1000);
    } catch (error) {
      console.error('Error al agregar la publicación: ', error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

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
    <div className={`modal-screen ${modalVisible === true ? 'visible' : ''}`} onClick={handleClickExterior} >
      <div className="modal" style={{ top: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '400', width: 'fit-content' }}>
        <div className='post modal-glass' style={{ backgroundColor: '#80808005', alignItems: 'start', width: '30vw', height: 'fit-content', paddingRight: '4px', paddingBottom: '4px', borderRadius: '18px' }}>
          <div className='post-profile'>
            <div className='post-profile-pic'>
              {profilePic ? (<img src={profilePic} />) : ('')}
            </div>
            <div style={{ padding: "8px 0" }}>
              <b>RODLEYY</b>&nbsp; @rodleyy
            </div>
          </div>

          <div className='post-textarea'>
            <textarea ref={inputRef} type="text" placeholder='wassup dogg' rows={1} onInput={handleInput} onKeyDown={handleKeyDown} />

            <div className='text-bar' style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
              <div className='text-bar-input' style={{ background: 'rgb(128, 128, 128, 0.15)', backdropFilter: 'blur(10px)', aspectRatio: '1/1', width: '12px', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '14px' }} onClick={handleSend}>
                <div className='ic-container'>
                  <FiSend style={{ marginTop: '1px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostModal;
