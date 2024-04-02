import { FiCheck } from '@react-icons/all-files/fi/FiCheck';
import { useState, useRef, useEffect } from 'react';

const DescModal = ({ showDescModal, setShowDescModal, desc, setDesc }) => {
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('desc', JSON.stringify(desc));
  }, [desc]);

  useEffect(() => {
    showDescModal === true && setModalVisible(true);
    console.log('holiiii')
  }, [showDescModal]);

  useEffect(() => {
    if (modalVisible === true) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalVisible]);

  const handleCheck = () => {
    const newDesc = inputRef.current.value;
    setDesc(newDesc);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const handleClickExterior = (event) => {
    console.log('Click exteriors')
    if (event.target.classList.contains('modal-screen')) {
      setModalVisible(false)
      setTimeout(() => {
        setShowDescModal(false);
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
        <div className='post modal-glass' style={{ backgroundColor: '#80808005', alignItems: 'start', width: '30vw', height: 'fit-content', padding: '16px', borderRadius: '24px' }}>
          <div className='post-textarea' style={{ paddingLeft: '0', width: '100%' }}>
            <textarea ref={inputRef} type="text" placeholder='wassup dogg' rows={1} onInput={handleInput} />

            <div className='text-bar' style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
              <div className='text-bar-input' style={{ background: 'rgb(128, 128, 128, 0.15)', backdropFilter: 'blur(10px)', aspectRatio: '1/1', width: '12px', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '14px' }} onClick={handleCheck} onKeyDown={handleKeyDown}>
                <div className='ic-container'>
                  <FiCheck style={{ marginTop: '1px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DescModal;
