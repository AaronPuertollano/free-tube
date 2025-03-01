import { useState } from "react";
import { Link } from "react-router-dom";

const SearchVideos = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    setLoading(true);
    fetch(`https://invidious.artemrudenko.com/api/v1/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error en la búsqueda", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>🔎 Buscar Videos</h2>
      <input
        type="text"
        placeholder="Buscar videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {loading && <p>Cargando...</p>}

      <ul>
        {videos.map((video) => (
          <li key={video.videoId || Math.random()}>
            {video.videoThumbnails && video.videoThumbnails.length > 0 ? (
              <img src={video.videoThumbnails[0].url} alt={video.title} width="200" />
            ) : (
              <p>Sin imagen</p>
            )}
            <h3>{video.title || "Sin título"}</h3>
            <p>👤 {video.author || "Desconocido"} | 👀 {video.viewCount || 0} vistas</p>
            <Link to={`/videos/${video.videoId || ""}`}>
              Ver Comentarios
            </Link>
            {video.videoId && (
              <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
                Ver en YouTube
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchVideos;
