import "./index.css"
import Banner from "./components/Banner"
import ProfilePic from './components/ProfilePic';
import Description from './components/Description';
import PostsPlaceholder from './components/PostsPlaceholder';

function App () {
  return (
    <div>
      <Banner />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%", paddingLeft: "64px", gap: "0", display: "flex", flexDirection: "column" }}>
          <ProfilePic />
          <Description />
          <PostsPlaceholder />
        </div>

        <div style={{ width: "50%" }}>
        </div>
      </div>
    </div>
  );
}

export default App;
