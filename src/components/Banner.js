import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import { FiRepeat } from "@react-icons/all-files/fi/FiRepeat";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

function Banner () {
  const [cambiarBanner, setCambiarBanner] = useState(false);
  const [noBanner, setNoBanner] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const [nuevoBanner, setNuevoBanner] = useState('https://pbs.twimg.com/media/GH0WHHPW0AAXnA6?format=jpg&name=large');
  const inputRef = useRef(null);

  const fade = useSpring({
    opacity: cambiarBanner ? 1 : 0,
    transform: cambiarBanner ? "translateY(0%)" : "translateY(50%)",
    gap: "8px"
  });

  const handleNewBanner = () => {
    const newImage = inputRef.current.value;
    setCambiarBanner(false);
    if (newImage !== '') {
      setNoBanner(false)
      setNuevoBanner(newImage);
    }
  }

  const handleClearInput = () => {
    inputRef.current.value = '';
  }

  const handleRemoveBanner = () => {
    setNuevoBanner('');
    setNoBanner(true)
  }

  const handleMouseEnter = () => {
    setChipVisible(true);
  };

  const handleMouseLeave = () => {
    setChipVisible(false);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: noBanner ? '10vh' : '20vh', overflow: "hidden" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`bottom-right text-bar ${chipVisible ? 'visible' : ''}`} style={{ width: 'fit-content' }}>
        <animated.div style={fade} className='text-bar-input'  >
          <input ref={inputRef} type="text" name="banner-link" id="banner-link" placeholder='Pega aquí el link del nuevo banner' style={{ width: "15rem" }} />

          <div className='ic-container' onClick={handleClearInput}>
            <FiDelete />
          </div>
          <div className='ic-container' onClick={handleNewBanner}>
            <FiCheck />
          </div>
        </animated.div>

        <div className='chip' style={{ background: 'none' }}>
          <div className='text-bar-input' style={{ backdropFilter: 'blur(10px)', aspectRatio: '1/1', width: 'fit-content', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}>
            <div className='ic-container' onClick={() => setCambiarBanner(!cambiarBanner)}>
              {cambiarBanner ? <FiX /> : <FiRepeat />}
            </div>
          </div>

          <div className='text-bar-input' style={{ backdropFilter: 'blur(10px)', aspectRatio: '1/1', width: 'fit-content', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}>
            <div className='ic-container' onClick={handleRemoveBanner}>
              <FiTrash />
            </div>
          </div>
        </div>
      </div>
      <img src={nuevoBanner} style={{ margin: "0", left: "0" }} />
    </div >
  )
}

export default Banner;
