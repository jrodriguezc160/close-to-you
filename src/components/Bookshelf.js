import "../styles/bookshelf.css"
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
        ? 'slide-right'
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
    <div ref={imagesRef} className="images" onClick={handleImageClick} style={{ width: "50%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img class="image" src="https://chronicle.durhamcollege.ca/wp-content/uploads/2022/10/dune-novel-cover.jpeg" />
      <img class="image" src="https://media.s-bol.com/R03O4K4200Zw/Rp6k3z/779x1200.jpg" />
      <img class="image" src="https://i.etsystatic.com/9837436/r/il/56f900/1197017746/il_570xN.1197017746_jbuw.jpg" />
    </div>
  );
};

export default ImageSlider;
