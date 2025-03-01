import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PopularVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://invidious.artemrudenko.com/api/v1/popular")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los videos populares", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Videos Populares</h2>
      {loading ? (
        <p>Cargando videos populares...</p>
      ) : (
        <div>
          <ul>
            {videos.length > 0 ? (
              videos.map((video) => (
                <li key={video.videoId}>
                  <img
                    src={video.videoThumbnails[0].url}
                    alt={video.title}
                    width="150"
                  />
                  <h4>{video.title}</h4>
                  <p>👤 {video.author}</p>
                  <p>👀 {video.viewCount} vistas</p>
                  <Link
                    to={`/channel/${video.authorId}`}
                    className="channel-link"
                  >
                    Ver Canal
                  </Link>
                  <Link to={`/videos/${video.videoId}`}>Ver video</Link>
                </li>
              ))
            ) : (
              <p>No hay videos populares disponibles.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopularVideos;
