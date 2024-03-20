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
    imageWidthRef.current = imagesRef?.current?.firstElementChild?.offsetWidth;
    imageOffsetRef.current = imagesRef?.current?.firstElementChild?.offsetLeft;
  }, []);

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
    <div style={{ width: "11vw", height: "12vw", display: "flex", gap: "2rem" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ marginTop: '.5rem', marginRight: '1rem' }}>
        <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} movie={myFavMovies && myFavMovies.length > 0 ? myFavMovies[0] : null} />
      </div>

      <div ref={imagesRef} className={`posters`} onClick={handleImageClick} style={{ width: "12vw", display: "flex", justifyContent: "center", alignItems: "center", marginRight: '4vw' }}>
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
