import { useState } from 'react';
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import '../../styles/favourites.css'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { addElemento, deleteElemento, getElementosUsuario, editElemento } from '../../services/CollectionsServices';

const Movie = ({ movie, myMovies, myFavMovies, setMyMovies, setMyFavMovies, currentUser, setShowLimit }) => {

  const getMoviesFavoritos = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, 5, 1);
      setMyFavMovies(elementos);
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios:', error);
    }
  }

  const getMovies = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, 5);
      setMyMovies(elementos);
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios:', error);
    }
  }

  const handleAddMovie = async (movie) => {
    // console.log(movie)
    try {
      if (!myMovies.some(favMovie => favMovie.id_api === movie.id_api)) {
        await addElemento(currentUser, 1, movie.titulo, movie.autor, movie.imagen, movie.id_api, 0);
        await getMovies();
        setMyMovies([...myMovies, movie]);
      }
    } catch (error) {
      console.error('Error al agregar la publicación: ', error);
    }
  }

  const handleRemoveMovie = async (movieToRemove) => {
    try {
      await deleteElemento(movieToRemove.id_api);
      await getMovies();
      await getMoviesFavoritos();
    } catch (error) {
      console.error('Error al eliminar la publicación: ', error);
    }
  }

  const handleAddFavourite = async (movie) => {
    if (myFavMovies.length >= 3) {
      setShowLimit(true);
      setTimeout(() => {
        setShowLimit(false);
      }, 2000);
    } else {
      try {
        if (!myMovies.some(favMovie => favMovie.id_api === movie.id_api)) {
          await handleAddMovie(movie); // Espera a que handleAddMovie se complete
        }
        await editElemento(movie.id_api, 1);
        await getMoviesFavoritos();
        setMyFavMovies([...myFavMovies, movie]);
      } catch (error) {
        console.error('Error al agregar la publicación: ', error);
      }
    }
  }

  const handleRemoveFavourite = async (movieToRemove) => {
    try {
      await editElemento(movieToRemove.id_api, 0);
      await getMoviesFavoritos();
    } catch (error) {
      console.error('Error al eliminar la publicación: ', error);
    }
  }

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
      <LightTooltip title={movie.titulo} followCursor >
        <div key={movie.id} className='cover'>
          {movie.imagen ? (
            <>
              <img src={movie.imagen} alt={movie.titulo} style={{ zIndex: '2' }} />
              <img src={movie.imagen} alt={movie.titulo} className='ambilight' />
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FiImage />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          <div className='ic-container' >
            <FiStar
              onClick={() => {
                if (!myFavMovies.some(favMovie => favMovie.id_api === movie.id_api)) {
                  handleAddFavourite(movie);
                } else {
                  handleRemoveFavourite(movie);
                }
              }}
              fill={myFavMovies.some(favMovie => favMovie.id_api === movie.id_api) ? 'gray' : 'none'}
            />
          </div>
          <div className='ic-container' >
            {!myMovies.some(favMovie => favMovie.id_api === movie.id_api) ? (
              <FiPlusCircle
                onClick={() => handleAddMovie(movie)}
                stroke='gray'
              />
            ) : (
              <FiCheckCircle
                onClick={() => handleRemoveMovie(movie)}
                stroke='gray'
              />
            )}
          </div>
        </div>
      </LightTooltip >
    </div>
  )
}

export default Movie;