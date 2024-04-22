import { useState, useRef, useEffect } from 'react';
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import { FiFilePlus } from "@react-icons/all-files/fi/FiFilePlus";
import { editProfilePic } from '../../services/UsersServices';

const ChangeProfilePic = ({ profilePic, setProfilePic, showProfilePicModal, setShowProfilePicModal, currentUser }) => {
  const [savedProfilePics, setSavedProfilePics] = useState([])
  const [iconVisible, setIconVisible] = useState(false)
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    showProfilePicModal === true && setModalVisible(true);

    setTimeout(() => {
      let delay = 100;
      const booksDivs = document.querySelectorAll('.glass-images');
      booksDivs.forEach(bookDiv => {
        setTimeout(() => {
          bookDiv.classList.add('visible');
        }, delay);

        delay += 100;
      });
    }, 500);
  }, [showProfilePicModal])

  const handleNewProfilePic = async () => {
    const newImage = inputRef.current.value;

    try {
      await editProfilePic(currentUser, newImage);

      setTimeout(() => {
        setModalVisible(false)
      }, 500);
    } catch (error) {
      if (newImage) {
        setProfilePic(newImage);
      }
      console.error('Error al agregar la publicación: ', error)
    }
  }

  const handleChangeProfilePic = async (pic, index) => {
    console.log('Cambiando PFP...', pic);

    try {
      await editProfilePic(currentUser, pic);

      setTimeout(() => {
        setModalVisible(false)
      }, 500);
    } catch (error) {
      if (pic) {
        setProfilePic(savedProfilePics[index]);
      }
      console.error('Error al agregar la publicación: ', error)
    }
  };


  const handleClearInput = () => {
    inputRef.current.value = '';
  }

  const handleClickExterior = (event) => {
    console.log('Click exteriors')
    if (event.target.classList.contains('modal-screen')) {
      setModalVisible(false)
      setTimeout(() => {
        setShowProfilePicModal(false);
      }, 1000);
    }
  }

  const handleMouseEnter = () => {
    setIconVisible(true);
  };

  const handleMouseLeave = () => {
    setIconVisible(false);
  };

  useEffect(() => {
    const savedProfilePicsLocal = JSON.parse(localStorage.getItem('savedProfilePics')) || [];
    setSavedProfilePics(savedProfilePicsLocal);
    setTimeout(() => {
      const profilePicLocal = JSON.parse(localStorage.getItem('profilePic')) || '';
      setProfilePic(profilePicLocal);
    }, 200);
  }, []);

  useEffect(() => {
    if (profilePic) {
      // Verificar si el profilePic no está duplicado y no es vacío
      if (!savedProfilePics.includes(profilePic)) {
        const newSavedProfilePics = [profilePic, ...savedProfilePics.filter(pic => pic && pic !== profilePic).slice(0, 2)];
        setSavedProfilePics(newSavedProfilePics);
        localStorage.setItem('savedProfilePics', JSON.stringify(newSavedProfilePics));
      }
    }
  }, [profilePic, savedProfilePics]);

  return (
    <div>
      <div className={`modal-screen ${modalVisible === true ? 'visible' : ''}`} onClick={handleClickExterior} >
        <div className="modal" style={{ top: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '400' }}>
          <div className='modal-glass' style={{ backgroundColor: '#80808005' }}>
            <h3 style={{ fontWeight: 'normal', margin: '0', margin: '8px 0 14px 0' }}>¡Vamos a cambiar tu foto de perfil!</h3>

            <div className='text-bar' style={{ width: '100%', height: 'fit-content' }}>
              <div className='text-bar-input' style={{ background: 'rgb(128, 128, 128, 0.15)', backdropFilter: 'blur(10px)', aspectRatio: '1/1', width: 'fit-content', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}>
                <div className='ic-container'>
                  <FiFilePlus />
                </div>
              </div>
              <div className='text-bar-input' style={{ background: 'rgb(128, 128, 128, 0.15)', backdropFilter: 'blur(10px)' }}>
                <input ref={inputRef} type="text" placeholder='Pega aquí la url de tu nueva foto de perfil' />

                <div className='ic-container' onClick={handleClearInput}>
                  <FiDelete />
                </div>
                <div className='ic-container' onClick={handleNewProfilePic}>
                  <FiCheck />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', width: '100%', justifyContent: 'center', margin: '8px 44px 0px 44px' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

              {savedProfilePics.length > 2 ? savedProfilePics.map((pic, index) => (
                pic !== "" && pic !== null
                  ? (
                    <div style={{ width: '8vw', height: '8vw', position: 'relative' }} key={index}>
                      {pic === profilePic
                        ? (
                          <div className={`ic-container hidden-icon profile-pic ${iconVisible === true ? ('visible') : ('')}`} style={{ top: '-4px', right: '-4px' }}>
                            <FiCheck />
                          </div>
                        )
                        : (
                          <div className={`ic-container hidden-icon profile-pic ${iconVisible === true ? ('visible') : ('')}`} style={{ top: '-4px', right: '-4px' }} onClick={() => handleChangeProfilePic(pic, index)} >
                            <FiPlus />
                          </div>
                        )}


                      <div className="glass images" >
                        <img src={pic} />
                      </div>
                    </div>
                  )
                  : ('')

              )) : ('')}
            </div>
          </div>
        </div>

        <div style={{ minHeight: '5vh' }}></div>
      </div>
    </div>
  )
}

export default ChangeProfilePic;
