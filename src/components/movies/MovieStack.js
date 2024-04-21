import React, { useEffect } from 'react';
import '../../styles/movie-stack.css';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

const MovieStack = ({ myFavMovies, handleEdit, setChipVisible }) => {

  useEffect(() => {
    const stack = document.querySelector(".movie-stack");

    const swap = (e) => {
      const card = document.querySelector(".movie-card:last-child");
      if (e.target !== card) return;

      card.style.animation = "movie-swap 700ms forwards";
      setChipVisible(false);

      setTimeout(() => {
        card.style.animation = "";
        stack.prepend(card);
      }, 700);
    }

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, []);

  return (
    <>
      <div className='movie-stack'>
        {myFavMovies.length > 0
          ? (
            myFavMovies.map((movie, index) => (
              <div key={index} className="movie-card" style={{ backgroundImage: `url(${movie.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              </div>
            ))
          )
          : (
            <div style={{ width: '7vw', height: '11vw', border: '2px dashed lightgray', borderRadius: '8px' }}>
              <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleEdit}>
                <FiPlus style={{ width: '75%', height: '75%' }} strokeWidth={'1.5px'} />
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default MovieStack;
