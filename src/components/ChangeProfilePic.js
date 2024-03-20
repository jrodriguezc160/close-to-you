import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiAlertTriangle } from "@react-icons/all-files/fi/FiAlertTriangle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import { FiFilePlus } from "@react-icons/all-files/fi/FiFilePlus";

const ChangeProfilePic = ({ profilePic, setProfilePic, showProfilePicModal, setShowProfilePicModal }) => {
  const inputRef = useRef(null);

  const handleNewBanner = () => {
    const newImage = inputRef.current.value;
    setProfilePic(newImage)
  }

  const handleClearInput = () => {
    inputRef.current.value = '';
  }

  const handleClickExterior = (event) => {
    if (event.target.classList.contains('modal-screen')) {
      setShowProfilePicModal(false);
    }
  }

  useEffect(() => {
    const profilePicLocal = localStorage.getItem('profilePic');
    if (profilePicLocal) {
      setProfilePic(profilePicLocal);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('profilePic', profilePic)
  }, [profilePic])

  return (
    <div>
      <div className={`modal-screen ${showProfilePicModal === true ? 'visible' : ''}`} onClick={handleClickExterior} >
        <div className="modal" style={{ top: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '400' }}>
          <div className='modal-glass' style={{ backgroundColor: '#80808005' }}>
            <h3 style={{ fontWeight: 'normal' }}>¡Vamos a cambiar tu foto de perfil!</h3>

            <div className='glass'>
              <div className='ic-container' style={{ height: "5rem", width: "5rem" }}>
                <FiFilePlus strokeWidth={'1.15'} stroke='lightgray' />
              </div>
              <p>Sube tu propia imagen</p>
            </div>

            <p>o pega su url</p>
            <div className='text-bar' style={{ width: '28vw' }}>
              <div className='text-bar-input' style={{ background: 'rgb(128, 128, 128, 0.15)', backdropFilter: 'blur(10px)' }}>
                <input ref={inputRef} type="text" placeholder='Pega aquí la url de tu nueva foto de perfil' />

                <div className='ic-container' onClick={handleClearInput}>
                  <FiDelete />
                </div>
                <div className='ic-container' onClick={handleNewBanner}>
                  <FiCheck />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ minHeight: '5vh' }}></div>
      </div>
    </div>
  )
}

export default ChangeProfilePic;
