import "../styles/moviesshowcase.css";
import React, { useEffect, useRef, useState } from 'react';
import VerticalIconBar from './VerticalIconBar';

const ImageSlider = () => {
  const [queue, setQueue] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
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

    setChipVisible(false)
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
        setChipVisible(true)
      }, timeout[0]);
    }, timeout[1]);
  };

  const handleMouseEnter = () => {
    setChipVisible(true);
  };

  const handleMouseLeave = () => {
    setChipVisible(false);
  };

  return (
    <div style={{ width: "fit-content", height: "200px", display: "flex", gap: "16px" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div >
        <VerticalIconBar chipVisible={chipVisible} />
      </div>

      <div ref={imagesRef} className="posters" onClick={handleImageClick} style={{ width: "200px", height: "200px", display: "flex", justifyContent: "left", alignItems: "center" }}>
        <div className="poster">
          <img src="https://preview.redd.it/dune-part-two-poster-me-photoshop-v0-mw10p307xcx91.png?width=640&crop=smart&auto=webp&s=9dbec8211c6608e5c0f1bba257dc98bca285c7ac" alt="poster" />
        </div>

        <div className="poster">
          <img src="https://lh3.googleusercontent.com/proxy/R2QPLrUcpYtKJMJN2D3dYiyNP-nhXdWDGNjguBvoA4tCi2el07y0OABc6jf-Sdn4flY1NnMObQ6TvPgGMJ4CWIDYjHLojD59uLq-fqyxYqarxVt869HJpW3-" alt="poster" />
        </div>

        <div className="poster">
          <img src="https://m.media-amazon.com/images/M/MV5BOTkzYmMxNTItZDAxNC00NGM0LWIyODMtMWYzMzRkMjIyMTE1XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_FMjpg_UX1000_.jpg" alt="poster" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
