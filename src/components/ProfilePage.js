import { useEffect, useState } from 'react';
import Banner from "./Banner"
import ProfilePic from './ProfilePic';
import Description from './Description';
import PostsPlaceholder from './PostsPlaceholder';
import Bookshelf from './books/Bookshelf';
import BookModal from './modals/BookModal';
import MoviesShowcase from './movies/MoviesShowcase';
import MovieModal from './modals/MovieModal';
import AlbumShelf from './albums/AlbumShelf';
import AlbumModal from './modals/AlbumModal';
import PostModal from './modals/PostModal';
import DescModal from './modals/DescModal';
import ChangeProfilePic from './modals/ChangeProfilePic';
import { getUsuarioData } from '../services/UsersServices';

function ProfilePage ({ currentUser }) {
  const [profilePic, setProfilePic] = useState('')
  const [showProfilePicModal, setShowProfilePicModal] = useState(false)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [showDescModal, setShowDescModal] = useState(false)
  const [datosUsuario, setDatosUsuario] = useState([]);

  const [myBooks, setMyBooks] = useState([])
  const [myFavBooks, setMyFavBooks] = useState([])
  const [myMovies, setMyMovies] = useState([])
  const [myFavMovies, setMyFavMovies] = useState([])
  const [myAlbums, setMyAlbums] = useState([])
  const [myFavAlbums, setMyFavAlbums] = useState([])
  const [desc, setDesc] = useState('')
  const [myPosts, setMyPosts] = useState([]);

  const [showBookModal, setShowBookModal] = useState(false)
  const [showMovieModal, setShowMovieModal] = useState(false)
  const [showAlbumModal, setShowAlbumModal] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getUsuarioData(currentUser);
        setDatosUsuario(userData);

        // Aquí actualizamos profilePic después de recibir los datos del usuario
        setProfilePic(userData.foto_perfil);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

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
            currentUser={currentUser}
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
            currentUser={currentUser}
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
            currentUser={currentUser}
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
            datosUsuario={datosUsuario}
            currentUser={currentUser}
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

      <Banner datosUsuario={datosUsuario} />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around' }}>
        <div style={{ width: "36%", padding: "0 6rem", gap: "32px", display: "flex", flexDirection: "column" }}>
          <ProfilePic
            setShowProfilePicModal={setShowProfilePicModal}
            datosUsuario={datosUsuario}
          />
          <Description
            desc={desc}
            setDesc={setDesc}
            setShowDescModal={setShowDescModal}
            datosUsuario={datosUsuario}
          />
          <PostsPlaceholder
            profilePic={profilePic}
            showNewPostModal={showNewPostModal}
            setShowNewPostModal={setShowNewPostModal}
            myPosts={myPosts}
            setMyPosts={setMyPosts}
            currentUser={currentUser}
          />
        </div>

        <div style={{ width: "50%", padding: "0 6rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem", marginTop: "2rem", width: '100%' }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center', gap: "3vw", width: '34vw' }}>
              <Bookshelf
                myBooks={myBooks}
                setMyBooks={setMyBooks}
                myFavBooks={myFavBooks}
                setMyFavBooks={setMyFavBooks}
                showBookModal={showBookModal}
                setShowBookModal={setShowBookModal}
                currentUser={currentUser}
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

export default ProfilePage;
