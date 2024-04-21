import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiAlertTriangle } from "@react-icons/all-files/fi/FiAlertTriangle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import Movie from '../movies/Movie';
import { addElemento, deleteElemento, getElementosUsuario, editElemento } from '../../services/CollectionsServices';

const MovieModal = ({ showMovieModal, setShowMovieModal, myFavMovies, setMyFavMovies, myMovies, setMyMovies, currentUser }) => {
  const [search, setSearch] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState([...myFavMovies]);
  const [showLimit, setShowLimit] = useState(false);
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    showMovieModal === true && setModalVisible(true);

    setTimeout(() => {
      let delay = 100;
      const moviesDivs = document.querySelectorAll('.movie');
      moviesDivs.forEach(movieDiv => {
        setTimeout(() => {
          movieDiv.classList.add('visible');
        }, delay);

        delay += 100;
      });
    }, 500);
  }, []);

  useEffect(() => {
    if (modalVisible === true) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalVisible]);

  const handleCloseModal = () => {
    setShowMovieModal(!showMovieModal);
  };

  const searchMovie = async () => {
    try {
      const response = await getMovieRequest(search);
      setMovieData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getMovieRequest = async (searchValue) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmRiY2QzMzRiYWI5MjViMjg5MTEwNDY1YTg4MDZkNiIsInN1YiI6IjY1NGRmM2I0NDFhNTYxMzM2YzVmYjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HY7VrsbpUBeQtEhGzZC1NYNRrU29_KsLVW-NmyH_8EU',
      },
    };

    const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=es-ES&page=1`;
    return await axios.get(url, options);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    searchMovie();
  };

  const handleClearInput = () => {
    setSearch('');
    setMovieData([]);
  };

  const handleAddMovie = async (movie) => {
    try {
      if (!myMovies.some(favMovie => favMovie.id_api === movie.id)) {
        const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

        await addElemento(currentUser, 5, movie.title, movie.original_title, moviePoster, movie.id, 0);
        await getMovies();
      }
    } catch (error) {
      console.error('Error al agregar la publicación: ', error);
    }
  }

  const handleRemoveMovie = async (movieToRemove) => {
    try {
      await deleteElemento(movieToRemove.id);
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
        if (!myMovies.some(favMovie => favMovie.id_api === movie.id)) {
          await handleAddMovie(movie); // Espera a que handleAddMovie se complete
        }
        await editElemento(movie.id, 1); // Llama a editElemento después de que handleAddMovie se haya completado
        await getMoviesFavoritos();
      } catch (error) {
        console.error('Error al agregar la publicación: ', error);
      }
    }
  }

  const handleRemoveFavourite = async (movieToRemove) => {
    try {
      await editElemento(movieToRemove.id, 0);
      getMoviesFavoritos();
    } catch (error) {
      console.error('Error al eliminar la publicación: ', error);
    }
  }

  const handleSelectView = (collection, e) => {
    const moviesDivs = document.querySelectorAll('.movie');
    moviesDivs.forEach(movieDiv => {
      movieDiv.classList.remove('visible');
    });

    const headingToggleElements = document.querySelectorAll('.heading-toggle');
    headingToggleElements.forEach(headingToggle => {
      headingToggle.classList.remove('selected');
    });

    setTimeout(() => {
      e.target.parentElement.classList.add('selected');
      setSelectedCollection([...collection]);

      setTimeout(() => {
        let delay = 100;
        const moviesDivs = document.querySelectorAll('.movie');
        moviesDivs.forEach(movieDiv => {
          setTimeout(() => {
            movieDiv.classList.add('visible');
          }, delay);

          delay += 100;
        });
      }, 50);
    }, 300);
  }

  const handleClickExterior = (event) => {
    if (event.target.classList.contains('modal-screen')) {
      setModalVisible(false)
      setTimeout(() => {
        setShowMovieModal(false);
      }, 1000);
    }
  }

  return (
    <div>
      <div className={`modal-screen ${showLimit ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }} onClick={handleClickExterior} >
        <div className={`modal-message ${showLimit ? 'visible' : ''}`} style={{ zIndex: '201', visibility: showLimit ? 'visible' : 'hidden', opacity: showLimit ? 1 : 0 }}>
          <div className="ic-container" style={{ width: '64px', height: '64px' }} >
            <FiAlertTriangle fill='white' stroke='rgb(222, 0, 0)' />
          </div>
          <p>Límite de favoritos: 3.</p>
          <p>Elimine un favorito para continuar</p>
        </div>
      </div>

      <div className={`modal-screen ${modalVisible === true ? 'visible' : ''}`} onClick={handleClickExterior} >
        <div className="modal">
          <div className="text-bar">
            <div className='text-bar-input'>
              <input ref={inputRef} type="text" name="movie-search" id="movie-search" placeholder='Search for your favourite movies...' value={search} onChange={handleInputChange} />
              <div className='ic-container' onClick={handleClearInput} style={{ width: '16px', height: '16px' }}>
                <FiDelete />
              </div>
            </div>

            <div className="ic-container" onClick={handleCloseModal} >
              <FiX />
            </div>
          </div>

          <div className={`movies-list ${movieData.length > 0 ? 'visible' : ''}`}>
            {movieData.map((movie, index) => (
              <div key={index} className='movie-result'>
                <div className='movie-cover'>
                  {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FiImage />
                    </div>
                  )}
                </div>

                <p style={{ maxWidth: '50%', marginRight: 'auto' }}>{movie.title}</p>
                <p style={{ color: 'gray' }}>{movie.release_date}</p>

                <div className='ic-container' >
                  <FiStar
                    onClick={() => {
                      if (myFavMovies.some(favMovie => favMovie.id_api === movie.id)) {
                        handleRemoveFavourite(movie);
                      } else {
                        handleAddFavourite(movie);
                      }
                    }}
                    fill={myFavMovies.some(favMovie => favMovie.id_api === movie.id) ? 'gray' : 'none'}
                  />

                </div>
                <div className='ic-container' >
                  {!myMovies.some(favMovie => favMovie.id_api === movie.id) ? (
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
            ))}
          </div>

          <div className="movies-list visible" style={{ padding: '0px', margin: '0', gap: '0', minHeight: '80px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', height: 'fit-content', padding: '32px 0 0 32px' }}>
              <div className={`heading-toggle ${selectedCollection === myFavMovies ? 'selected' : ''}`} onClick={(e) => handleSelectView(myFavMovies, e)}>
                <h3>My favourites</h3>
              </div>
              <div className='heading-toggle'>
                <h3>/</h3>
              </div>
              <div className={`heading-toggle ${selectedCollection === myMovies ? 'selected' : ''}`} onClick={(e) => handleSelectView(myMovies, e)}>
                <h3>My collection</h3>
              </div>
            </div>

            <div className="fav-movies masked-overflow" >
              {selectedCollection.map((movie) => (
                <Movie
                  movie={movie}
                  myMovies={myMovies}
                  myFavMovies={myFavMovies}
                  setMyMovies={setMyMovies}
                  setMyFavMovies={setMyFavMovies}
                  currentUser={currentUser}
                  setShowLimit={setShowLimit}
                />
              ))}
            </div>
          </div>

          <div style={{ minHeight: '5vh' }}></div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal;
