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
import PostModal from './components/PostModal';
import ChangeProfilePic from './components/ChangeProfilePic';

function App () {
  const [profilePic, setProfilePic] = useState('')
  const [showProfilePicModal, setShowProfilePicModal] = useState(false)
  const [showNewPostModal, setShowNewPostModal] = useState(false)

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
      {showBookModal === true
        ? (
          <BookModal
            showBookModal={showBookModal}
            setShowBookModal={setShowBookModal}
            myFavBooks={myFavBooks}
            setMyFavBooks={setMyFavBooks}
            myBooks={myBooks}
            setMyBooks={setMyBooks}
          />
        ) : ('')}

      {showMovieModal === true
        ? (
          <MovieModal
            showMovieModal={showMovieModal}
            setShowMovieModal={setShowMovieModal}
            myFavMovies={myFavMovies}
            setMyFavMovies={setMyFavMovies}
            myMovies={myMovies}
            setMyMovies={setMyMovies}
          />
        ) : ('')}

      {showAlbumModal === true
        ? (
          <AlbumModal
            showAlbumModal={showAlbumModal}
            setShowAlbumModal={setShowAlbumModal}
            myFavAlbums={myFavAlbums}
            setMyFavAlbums={setMyFavAlbums}
            myAlbums={myAlbums}
            setMyAlbums={setMyAlbums}
          />
        ) : ('')}

      {showNewPostModal === true
        ? (
          <PostModal
            showNewPostModal={showNewPostModal}
            setShowNewPostModal={setShowNewPostModal}
            profilePic={profilePic}
          />
        ) : ('')}

      <ChangeProfilePic profilePic={profilePic} setProfilePic={setProfilePic} showProfilePicModal={showProfilePicModal} setShowProfilePicModal={setShowProfilePicModal} />

      <Banner />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%", padding: "0 6rem", gap: "32px", display: "flex", flexDirection: "column" }}>
          <ProfilePic setShowProfilePicModal={setShowProfilePicModal} profilePic={profilePic} />
          <Description />
          <PostsPlaceholder profilePic={profilePic} showNewPostModal={showNewPostModal} setShowNewPostModal={setShowNewPostModal} />
        </div>

        <div style={{ width: "50%", padding: "0 6rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4rem", marginTop: "2rem", width: '100%' }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: "7vw", width: '34vw' }}>
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

            <AlbumShelf
              myAlbums={myAlbums}
              setMyAlbums={setMyAlbums}
              myFavAlbums={myFavAlbums}
              setMyFavAlbums={setMyFavAlbums}
              showAlbumModal={showAlbumModal}
              setShowAlbumModal={setShowAlbumModal}
            />
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
