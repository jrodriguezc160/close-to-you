import { useState } from 'react';
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import '../styles/favourites.css'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const Movie = ({ movie, index, myMovies, myFavMovies, handleAddFavourite, handleRemoveFavourite, handleAddMovie, handleRemoveMovie }) => {
  const [addVisible, setAddVisible] = useState(false);
  const [onHover, setOnHover] = useState('');

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#efefef7d',
      backdropFilter: 'blur(10px)',
      color: 'rgba(0, 0, 0, 0.5)',
      boxShadow: '0 2px 5px rgba (30, 30, 30, 0.25)',
      fontSize: 11,
    },
  }));

  return (
    <div className="movie">
      <LightTooltip title={movie.title} followCursor >
        <div key={index} className='cover'>
          {movie.poster_path ? (
            <>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ zIndex: '2' }} />
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='ambilight' />
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FiImage />
            </div>
          )}

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
        {/*
      <div className="text">
          <h3 style={{ height: 'fit-content', padding: '0', marginTop: '0' }}>{movie.title}</h3>
          {movie.overview}
        </div>
        */}
      </LightTooltip >
    </div>
  )
}

export default Movie;