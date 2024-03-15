import "../styles/moviesshowcase.css";
import React, { useEffect, useRef, useState } from 'react';
import VerticalIconbar from './VerticalIconBar';

const ImageSlider = ({ setShowMovieModal, showMovieModal, myFavMovies, setMyFavMovies }) => {
  const [queue, setQueue] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const touch = document.documentElement.ontouchstart !== undefined;
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  const handleRemoveFavourite = () => {
    const updatedMovies = [...myFavMovies];
    updatedMovies.shift(); // Remove the first Movie
    setMyFavMovies(updatedMovies);
  };

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
    if (imagesRef.current && imagesRef.current.firstElementChild) {
      imageWidthRef.current = imagesRef.current.firstElementChild.offsetWidth;
      imageOffsetRef.current = imagesRef.current.firstElementChild.offsetLeft;
    }
  }, [myFavMovies]);

  const handleImageClick = (event) => {
    if (!myFavMovies || myFavMovies.length === 0 || queue) {
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

  const handleEdit = () => {
    setShowMovieModal(!showMovieModal)
  }

  return (
    <div style={{ width: "fit-content", height: "150px", display: "flex", gap: "16px" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div >
        <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} movie={myFavMovies && myFavMovies.length > 0 ? myFavMovies[0] : null} />      </div>

      <div ref={imagesRef} className={`posters`} onClick={handleImageClick} style={{ width: "200px", height: "150px", display: "flex", justifyContent: "left", alignItems: "center" }}>
        {myFavMovies && myFavMovies.length > 0 && myFavMovies.map((movie, index) => (
          <div key={index} className={`poster`}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
