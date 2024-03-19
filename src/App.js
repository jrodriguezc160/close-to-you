import "./index.css"
import { useEffect, useState } from 'react';
import Banner from "./components/Banner"
import ProfilePic from './components/ProfilePic';
import Description from './components/Description';
import PostsPlaceholder from './components/PostsPlaceholder';
import Bookshelf from './components/Bookshelf';
import BookModal from './components/BookModal';
import MoviesShowcase from './components/MoviesShowcase';
import MovieModal from './components/MovieModal';
import AlbumShelf from './components/AlbumShelf';
import AlbumModal from './components/AlbumModal';

function App () {
  const [myBooks, setMyBooks] = useState([])
  const [myFavBooks, setMyFavBooks] = useState([])
  const [myMovies, setMyMovies] = useState([])
  const [myFavMovies, setMyFavMovies] = useState([])
  const [myAlbums, setMyAlbums] = useState([])
  const [myFavAlbums, setMyFavAlbums] = useState([])

  const [showBookModal, setShowBookModal] = useState(false)
  const [showMovieModal, setShowMovieModal] = useState(false)
  const [showAlbumModal, setShowAlbumModal] = useState(false)

  return (
    <div>
      <BookModal
        showBookModal={showBookModal}
        setShowBookModal={setShowBookModal}
        myFavBooks={myFavBooks}
        setMyFavBooks={setMyFavBooks}
        myBooks={myBooks}
        setMyBooks={setMyBooks}
      />

      <MovieModal
        showMovieModal={showMovieModal}
        setShowMovieModal={setShowMovieModal}
        myFavMovies={myFavMovies}
        setMyFavMovies={setMyFavMovies}
        myMovies={myMovies}
        setMyMovies={setMyMovies}
      />

      <AlbumModal
        showAlbumModal={showAlbumModal}
        setShowAlbumModal={setShowAlbumModal}
        myFavAlbums={myFavAlbums}
        setMyFavAlbums={setMyFavAlbums}
        myAlbums={myAlbums}
        setMyAlbums={setMyAlbums}
      />

      <Banner />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%", padding: "0 64px", gap: "32px", display: "flex", flexDirection: "column" }}>
          <ProfilePic />
          <Description />
          <PostsPlaceholder />
        </div>

        <div style={{ width: "50%", padding: "0 64px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "64px", marginTop: "42px" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "64px" }}>
              <Bookshelf
                myBooks={myBooks}
                setMyBooks={setMyBooks}
                myFavBooks={myFavBooks}
                setMyFavBooks={setMyFavBooks}
                showBookModal={showBookModal}
                setShowBookModal={setShowBookModal}
              />

              <MoviesShowcase
                myMovies={myMovies}
                setMyMovies={setMyMovies}
                myFavMovies={myFavMovies}
                setMyFavMovies={setMyFavMovies}
                showMovieModal={showMovieModal}
                setShowMovieModal={setShowMovieModal}
              />
            </div>

            <div>
              <AlbumShelf
                myAlbums={myAlbums}
                setMyAlbums={setMyAlbums}
                myFavAlbums={myFavAlbums}
                setMyFavAlbums={setMyFavAlbums}
                showAlbumModal={showAlbumModal}
                setShowAlbumModal={setShowAlbumModal}
              />
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
