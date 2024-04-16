import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import { FiRepeat } from "@react-icons/all-files/fi/FiRepeat";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function Banner ({ datosUsuario }) {
  const [cambiarBanner, setCambiarBanner] = useState(false);
  const [noBanner, setNoBanner] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const [nuevoBanner, setNuevoBanner] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    setNuevoBanner(datosUsuario.banner)
  }, [])

  const fade = useSpring({
    opacity: cambiarBanner ? 1 : 0,
    transform: cambiarBanner ? "translateY(0%)" : "translateY(50%)",
    gap: "8px",
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
    <div style={{ position: "relative", width: "100vw", height: noBanner ? '10vh' : '28vh', overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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

        <div className='chip text-bar-input' style={{ width: 'fit-content', padding: '0 8px', height: '24px' }}>
          <div className='ic-container' onClick={() => setCambiarBanner(!cambiarBanner)} style={{ width: '14px' }}>
            {cambiarBanner ? <FiX /> : <FiRepeat />}
          </div>

          <div className='ic-container' onClick={handleRemoveBanner} style={{ width: '14px' }}>
            <FiTrash />
          </div>
        </div>
      </div>
      <img src={datosUsuario.banner} style={{ margin: "0", left: "0", width: '100%', height: 'auto' }} />
    </div >
  )
}

export default Banner;
