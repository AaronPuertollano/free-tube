import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Perfil from "./Perfil";
import Popular from "./Popular";
import Video from "./Video";
import Channel from "./Channel";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/videos/:videoId" element={<Video />} />
      <Route path="/user/:username" element={<Perfil />} />
      <Route path="/channel/:channelId" element={<Channel />} />
    </Routes>
  </BrowserRouter>
);
