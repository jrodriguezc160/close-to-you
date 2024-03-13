import "./index.css"
import Banner from "./components/Banner"
import ProfilePic from './components/ProfilePic';
import Description from './components/Description';
import PostsPlaceholder from './components/PostsPlaceholder';
import MoviesShowcase from './components/MoviesShowcase';
import Bookshelf from './components/Bookshelf';
import BookModal from './components/BookModal';
import { useEffect, useState } from 'react';

function App () {
  const [myBooks, setMyBooks] = useState([])
  const [myMovies, setMyMovies] = useState([])
  const [showBookModal, setShowBookModal] = useState(false)

  useEffect(() => {
    console.log(showBookModal)
  }, [showBookModal])

  return (
    <div>
      <BookModal showBookModal={showBookModal} setShowBookModal={setShowBookModal} />

      <Banner />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%", padding: "0 64px", gap: "32px", display: "flex", flexDirection: "column" }}>
          <ProfilePic />
          <Description />
          <PostsPlaceholder />
        </div>

        <div style={{ width: "50%", padding: "0 64px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "64px", marginTop: "42px" }}>
            <Bookshelf
              showBookModal={showBookModal}
              setShowBookModal={setShowBookModal}
              myBooks={myBooks}
              setMyBooks={setMyBooks} />

            <MoviesShowcase myMovies={myMovies} setMyMovies={setMyMovies} />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
