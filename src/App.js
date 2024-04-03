import "./index.css"
import { useState } from 'react';
import Banner from "./components/Banner"
import ProfilePic from './components/ProfilePic';
import Description from './components/Description';
import PostsPlaceholder from './components/PostsPlaceholder';
import Bookshelf from './components/books/Bookshelf';
import BookModal from './components/modals/BookModal';
import MoviesShowcase from './components/movies/MoviesShowcase';
import MovieModal from './components/modals/MovieModal';
import AlbumShelf from './components/albums/AlbumShelf';
import AlbumModal from './components/modals/AlbumModal';
import PostModal from './components/modals/PostModal';
import DescModal from './components/modals/DescModal';
import ChangeProfilePic from './components/modals/ChangeProfilePic';
import CardStack from './components/books/BookStack';

function App () {
  const [profilePic, setProfilePic] = useState('')
  const [showProfilePicModal, setShowProfilePicModal] = useState(false)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [showDescModal, setShowDescModal] = useState(false)

  const [myBooks, setMyBooks] = useState([])
  const [myFavBooks, setMyFavBooks] = useState([])
  const [myMovies, setMyMovies] = useState([])
  const [myFavMovies, setMyFavMovies] = useState([])
  const [myAlbums, setMyAlbums] = useState([])
  const [myFavAlbums, setMyFavAlbums] = useState([])
  const [desc, setDesc] = useState('')
  const [myPosts, setMyPosts] = useState(() => {
    const savedPosts = localStorage.getItem('myPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

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
            myPosts={myPosts}
            setMyPosts={setMyPosts}
          />
        ) : ('')}

      {showDescModal === true
        ? (
          <DescModal
            showDescModal={showDescModal}
            setShowDescModal={setShowDescModal}
            profilePic={profilePic}
            desc={desc}
            setDesc={setDesc}
          />
        ) : ('')}

      <ChangeProfilePic
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        showProfilePicModal={showProfilePicModal}
        setShowProfilePicModal={setShowProfilePicModal}
      />

      <Banner />

      <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around' }}>
        <div style={{ width: "36%", padding: "0 6rem", gap: "32px", display: "flex", flexDirection: "column" }}>
          <ProfilePic
            setShowProfilePicModal={setShowProfilePicModal}
            profilePic={profilePic}
          />
          <Description
            desc={desc}
            setDesc={setDesc}
            setShowDescModal={setShowDescModal}
          />
          <PostsPlaceholder
            profilePic={profilePic}
            showNewPostModal={showNewPostModal}
            setShowNewPostModal={setShowNewPostModal}
            myPosts={myPosts}
            setMyPosts={setMyPosts}
          />
        </div>

        <div style={{ width: "50%", padding: "0 6rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4rem", marginTop: "2rem", width: '100%' }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: "3vw", width: '34vw' }}>
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
      </div >
    </div >
  );
}

export default App;
