import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TrendingVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://invidious.artemrudenko.com/api/v1/trending")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.slice(0, 6));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los videos", error);
        setLoading(false);
      });
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <h2>Videos en Tendencia</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video.videoId}>
              <h3>{video.title}</h3>
              <p>
                {video.author} | {video.viewCount} vistas
              </p>
              <p>Publicado el: {formatDate(video.published)}</p>
              <p>Duración: {formatDuration(video.lengthSeconds)} minutos</p>

              <Link to={`/channel/${video.authorId}`} className="channel-link">
                Ver Canal
              </Link>

              <Link to={`/videos/${video.videoId}`}>Ver Comentarios</Link>
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en YouTube
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingVideos;
