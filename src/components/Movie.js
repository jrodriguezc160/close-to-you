import { useState } from 'react';
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import '../styles/favourites.css'

const Movie = ({ movie, index, myMovies, myFavMovies, handleAddFavourite, handleRemoveFavourite, handleAddMovie, handleRemoveMovie }) => {
  const [addVisible, setAddVisible] = useState(false);
  const [onHover, setOnHover] = useState('');

  const handleOnHover = (e) => {
    setTimeout(() => {
      setOnHover(e)

      setTimeout(() => {
        setAddVisible(true)
      }, 100);
    }, 100);
  }

  const handleHoverLeave = () => {
    setAddVisible(false)
    setTimeout(() => {
      setOnHover('')
    }, 100);
  }

  return (
    <div className="movie" onMouseEnter={() => handleOnHover(movie.title)} onMouseLeave={() => handleHoverLeave()}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>


          <div key={index} className='cover'>
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ zIndex: '2' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FiImage />
              </div>
            )}

            {onHover === movie.title ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={`ambilight ${addVisible === true ? 'visible' : ''}`} />
            ) : ('')}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <div className='ic-container' >
              <FiStar
                onClick={() => {
                  if (!myFavMovies.some(favMovie => favMovie.id === movie.id)) {
                    handleAddFavourite(movie);
                  } else {
                    handleRemoveFavourite(movie);
                  }
                }}
                fill={myFavMovies.some(favMovie => favMovie.id === movie.id) ? 'gray' : 'none'}
              />
            </div>
            <div className='ic-container' >
              {!myMovies.some(favMovie => favMovie.id === movie.id) ? (
                <FiPlusCircle
                  onClick={() => handleAddMovie(movie)}
                  stroke='gray'
                />
              ) : (
                <FiCheckCircle
                  onClick={() => handleRemoveMovie(movie)}
                  stroke='gray'
                />
              )
              }
            </div>
          </div>
        </div>
        <div className="text">
          <h3>{movie.title}</h3>
          {movie.overview}
        </div>
      </div>
    </div>
  )
}

export default Movie;