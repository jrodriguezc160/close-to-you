import "./index.css"
import Banner from "./components/Banner"
import ProfilePic from './components/ProfilePic';
import Description from './components/Description';
import PostsPlaceholder from './components/PostsPlaceholder';
import Bookshelf from './components/Bookshelf';

function App () {
  return (
    <div>
      <Banner />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%", padding: "0 64px", gap: "32px", display: "flex", flexDirection: "column" }}>
          <ProfilePic />
          <Description />
          <PostsPlaceholder />
        </div>

        <div style={{ width: "50%", padding: "0 64px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "128px", marginTop: "32px" }}>
            <Bookshelf />
            <Bookshelf />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
