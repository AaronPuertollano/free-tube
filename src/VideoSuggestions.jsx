import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const VideoSuggestions = ({ videoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://invidious.artemrudenko.com/api/v1/videos/${videoId}`,
        );

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: No se pudieron obtener videos relacionados`,
          );
        }

        const data = await response.json();

        if (!data.recommendedVideos || data.recommendedVideos.length === 0) {
          throw new Error("No hay videos sugeridos.");
        }

        setRelatedVideos(data.recommendedVideos.slice(0, 6));
      } catch (error) {
        console.error("Error al obtener videos relacionados:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchRelatedVideos();
    }
  }, [videoId]);

  if (loading) return <p>Cargando sugerencias...</p>;
  if (error) return <p>{error}</p>;
  if (relatedVideos.length === 0)
    return <p>No hay videos sugeridos disponibles.</p>;

  return (
    <div className="video-suggestions">
      <h3>🎥 Videos Relacionados</h3>
      <div className="videos-grid">
        {relatedVideos.map((video) => (
          <div key={video.videoId} className="video-card">
            <img
              src={video.videoThumbnails?.[0]?.url || ""}
              alt={video.title}
            />
            <h4>{video.title}</h4>
            <p>👤 {video.author}</p>
            <p>👀 {video.viewCountText}</p>
            <Link to={`/videos/${video.videoId}`}>Ver Video</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

VideoSuggestions.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoSuggestions;
