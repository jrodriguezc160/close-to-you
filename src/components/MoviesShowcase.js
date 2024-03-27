import "../styles/moviesshowcase.css";
import React, { useEffect, useRef, useState } from 'react';
import VerticalIconbar from './VerticalIconBar';

const MoviesShowcase = ({ setShowMovieModal, showMovieModal, myFavMovies, setMyFavMovies, myMovies, setMyMovies }) => {
  const [queue, setQueue] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const touch = document.documentElement.ontouchstart !== undefined;
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  useEffect(() => {
    const savedFavMovies = localStorage.getItem('myFavMovies');
    if (savedFavMovies) {
      setMyFavMovies(JSON.parse(savedFavMovies));
    }

    const savedMovie = localStorage.getItem('myMovies');
    if (savedMovie) {
      setMyMovies(JSON.parse(savedMovie));
    }
  }, []);

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
    <div style={{ width: "11vw", height: "12vw", display: "flex", gap: ".5rem", justifyContent: 'center', marginRight: '0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ marginTop: '.5rem', marginRight: '0' }}>
        <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} movie={myFavMovies && myFavMovies.length > 0 ? myFavMovies[0] : null} />
      </div>

      <div style={{ width: '12vw', height: '12vw', position: 'relative', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ bottom: '-0.5vw', right: '3.2vw', zIndex: '20', width: '2vw', height: '2vw', position: 'absolute' }} >
          <img src='https://em-content.zobj.net/source/apple/391/film-frames_1f39e-fe0f.png' style={{ width: 'inherit', height: 'inherit' }} />
        </div>
        <div ref={imagesRef} className={`posters`} onClick={handleImageClick} style={{ width: "12vw", display: "flex", justifyContent: "center", alignItems: "center", marginRight: '4vw' }}>
          {myFavMovies && myFavMovies.length > 0 && myFavMovies.map((movie, index) => (
            <div key={index} className={`poster`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesShowcase;
