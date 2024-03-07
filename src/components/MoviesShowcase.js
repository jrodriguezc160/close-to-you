import "../styles/moviesshowcase.css"
import React, { useEffect, useRef, useState } from 'react';

const ImageSlider = () => {
  const [queue, setQueue] = useState(false);
  const touch = document.documentElement.ontouchstart !== undefined;
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  const cssTransition = () => {
    const body = document.body || document.documentElement;
    const style = body.style;
    const vendors = ['Moz', 'Webkit', 'O'];

    if (typeof style.transition === 'string') {
      return true;
    }

    for (let i = 0; i < vendors.length; i++) {
      const vendor = vendors[i];
      if (typeof style[vendor + 'Transition'] === 'string') {
        return true;
      }
    }

    return false;
  };

  const timeout = cssTransition() ? [300, 400] : [0, 0];

  useEffect(() => {
    imageWidthRef.current = imagesRef.current.firstElementChild.offsetWidth;
    imageOffsetRef.current = imagesRef.current.firstElementChild.offsetLeft;
  }, []);

  const handleImageClick = (event) => {
    if (queue) {
      return;
    }

    setQueue(true);

    const direction =
      (touch ? event.changedTouches[0].pageX : event.pageX) - imageOffsetRef.current > imageWidthRef.current / 2
        ? 'slide-left'
        : 'slide-left';

    const lastClassList = imagesRef.current.lastElementChild.classList;
    lastClassList.add(direction);

    setTimeout(() => {
      lastClassList.remove(direction);
      lastClassList.add('back');

      setTimeout(() => {
        imagesRef.current.insertBefore(imagesRef.current.lastElementChild, imagesRef.current.firstElementChild);
        lastClassList.remove('back');
        setQueue(false);
      }, timeout[0]);
    }, timeout[1]);
  };

  return (
    <div ref={imagesRef} className="posters" onClick={handleImageClick} style={{ width: "50%", height: "200px", display: "flex", justifyContent: "left", alignItems: "center" }}>
      <img class="poster" src="https://preview.redd.it/dune-part-two-poster-me-photoshop-v0-mw10p307xcx91.png?width=640&crop=smart&auto=webp&s=9dbec8211c6608e5c0f1bba257dc98bca285c7ac" />
      <img class="poster" src="https://lh3.googleusercontent.com/proxy/iCzikyQcEyXhBWLePOAq223XOu3l16qH0Sa3N_mILtekPsw_gMePFl1ArBvhspDbec-s_KS9bLnrIQP9MThLMkm0MGkVyXvd4Tcj_BLsAPgsDRgFIg" />
      <img class="poster" src="https://m.media-amazon.com/images/M/MV5BOTkzYmMxNTItZDAxNC00NGM0LWIyODMtMWYzMzRkMjIyMTE1XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_FMjpg_UX1000_.jpg" />
    </div>
  );
};

export default ImageSlider;
