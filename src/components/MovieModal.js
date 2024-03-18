import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiAlertTriangle } from "@react-icons/all-files/fi/FiAlertTriangle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";

const MovieModal = ({ showMovieModal, setShowMovieModal, myFavMovies, setMyFavMovies, myMovies, setMyMovies }) => {
  const [search, setSearch] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(myFavMovies);
  const [showLimit, setShowLimit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedFavMovies = sessionStorage.getItem('myFavMovies');
    if (savedFavMovies) {
      setMyFavMovies(JSON.parse(savedFavMovies));
    }

    const savedMovies = sessionStorage.getItem('myMovies');
    if (savedMovies) {
      setMyMovies(JSON.parse(savedMovies));
    }
  }, []);

  useEffect(() => {
    if (myFavMovies.length > 0) {
      sessionStorage.setItem('myFavMovies', JSON.stringify(myFavMovies));
    }
  }, [myFavMovies]);

  useEffect(() => {
    if (myMovies.length > 0) {
      sessionStorage.setItem('myMovies', JSON.stringify(myMovies));
    }
  }, [myMovies]);

  useEffect(() => {
    if (showMovieModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showMovieModal]);

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

  const handleAddFavourite = (movie) => {
    if (myFavMovies.length >= 3) {
      console.log('Límite excedido');
      setShowLimit(true);
      setTimeout(() => {
        setShowLimit(false);
      }, 2000);
    } else {
      setMyFavMovies([...myFavMovies, movie]);
    }
  };

  const handleRemoveFavourite = (movieToRemove) => {
    const updatedMovies = myFavMovies.filter(movie => movie !== movieToRemove);
    setMyFavMovies(updatedMovies);
  };

  const handleAddMovie = (movie) => {
    setMyMovies([...myMovies, movie]);
  };

  const handleRemoveMovie = (movieToRemove) => {
    const updatedMovies = myMovies.filter(movie => movie !== movieToRemove);
    setMyMovies(updatedMovies);
  };

  const handleSelectView = (collection) => {
    const moviesDivs = document.querySelectorAll('.movie');
    moviesDivs.forEach(movieDiv => {
      movieDiv.classList.remove('visible');
      console.log('Se ha eliminado la clase .visible')
    });

    setTimeout(() => {
      setSelectedCollection(collection);

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

  return (
    <div>
      <div className={`modal-screen ${showLimit ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }} >
        <div className={`modal-message ${showLimit ? 'visible' : ''}`} style={{ zIndex: '201', visibility: showLimit ? 'visible' : 'hidden', opacity: showLimit ? 1 : 0 }}>
          <div className="ic-container" style={{ width: '64px', height: '64px' }} >
            <FiAlertTriangle fill='white' stroke='rgb(222, 0, 0)' />
          </div>
          <p>Límite de favoritos: 3.</p>
          <p>Elimine un favorito para continuar</p>
        </div>
      </div>
      <div className={`modal-screen ${showMovieModal ? 'visible' : ''}`} >

        <div className="modal">
          <div className="search-bar">
            <div className='search-bar-input'>
              <input ref={inputRef} type="text" name="movie-search" id="movie-search" placeholder='Search for your favourite movies...' value={search} onChange={handleInputChange} />
              <div className='ic-container' onClick={handleClearInput}>
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
                      if (myFavMovies.some(favMovie => favMovie.id === movie.id)) {
                        handleRemoveFavourite(movie);
                      } else {
                        handleAddFavourite(movie);
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
                      onClick={() => handleAddMovie(movie)}
                      stroke='gray'
                    />
                  )
                  }
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', padding: '0', paddingLeft: '16px', paddingBottom: '0px', height: 'fit-content' }}>
            <div className={`heading-toggle ${selectedCollection === myFavMovies ? 'selected' : ''}`} onClick={() => handleSelectView(myFavMovies)}>
              <h3>My favourites</h3>
            </div>
            <div className='heading-toggle'>
              <h3>/</h3>
            </div>
            <div className={`heading-toggle ${selectedCollection === myMovies ? 'selected' : ''}`} onClick={() => handleSelectView(myMovies)}>
              <h3>My collection</h3>
            </div>
          </div>

          <div className="fav-movies masked-overflow">
            {selectedCollection.map((movie, index) => (
              <div className="movie">
                <div key={index} className='cover'>
                  {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FiImage />
                    </div>
                  )}
                </div>

                <p>{movie.title}</p>

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
            ))}
          </div>
        </div>

        <div style={{ minHeight: '5vh' }}></div>
      </div>
    </div>
  )
}

export default MovieModal;
