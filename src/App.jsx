import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import TrendingVideos from "./TrendingVideos";
import SearchVideos from "./SearchVideos";

function App() {
  return (
    <>
      <Header />

      <SearchVideos />

      <TrendingVideos />

      <Footer />
    </>
  );
}

export default App;
