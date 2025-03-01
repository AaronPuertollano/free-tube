import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import PopularVideos from "./PopularVideos";
import SearchVideos from "./SearchVideos";

function App() {
  return (
    <>
      <Header />

      <SearchVideos />

      <PopularVideos />

      <Footer />
    </>
  );
}

export default App;