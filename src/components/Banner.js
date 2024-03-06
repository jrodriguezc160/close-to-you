import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import { FiRepeat } from "@react-icons/all-files/fi/FiRepeat";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

function Banner () {
  const [cambiarBanner, setCambiarBanner] = useState(false);

  const fade = useSpring({
    opacity: cambiarBanner ? 1 : 0,
    transform: cambiarBanner ? "translateY(0%)" : "translateY(50%)",
  });

  return (
    <div style={{ position: "relative", width: "100vw", height: "20vh", overflow: "hidden" }}>
      <div className='bottom-right'>
        <animated.div style={fade} className='text-chip'>
          <p>Cambiando banner...</p>
        </animated.div>

        <div className='chip'>
          <div className='ic-container' onClick={() => setCambiarBanner(!cambiarBanner)}>
            {cambiarBanner ? <FiX /> : <FiRepeat />}
          </div>
          <div className='ic-container'>
            <FiTrash />
          </div>
        </div>
      </div>
      <img src="https://pbs.twimg.com/media/GH0WHHPW0AAXnA6?format=jpg&name=large" alt="Banner" style={{ margin: "0", left: "0" }} />
    </div>
  )
}

export default Banner;
