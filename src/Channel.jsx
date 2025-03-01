import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./Channel.css";
import { Link } from "react-router-dom";

const Channel = () => {
  const { channelId } = useParams();
  const [channelInfo, setChannelInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channelId) return;

    const fetchChannelData = async () => {
      try {
        setLoading(true);

        const channelRes = await fetch(`https://invidious.artemrudenko.com/api/v1/channels/${channelId}`);
        const channelData = await channelRes.json();
        setChannelInfo(channelData);

        const videosRes = await fetch(`https://invidious.artemrudenko.com/api/v1/channels/${channelId}/videos`);
        const videosData = await videosRes.json();

        console.log("Videos API Response:", videosData);

        if (Array.isArray(videosData)) {
          setVideos(videosData.slice(0, 6));
        } else if (videosData && videosData.videos) {
          setVideos(videosData.videos.slice(0, 6));
        } else {
          console.error("Error: videosData no tiene el formato esperado:", videosData);
          setVideos([]);
        }

        const playlistsRes = await fetch(`https://invidious.artemrudenko.com/api/v1/channels/${channelId}/playlists`);
        const playlistsData = await playlistsRes.json();
        setPlaylists(Array.isArray(playlistsData) ? playlistsData.slice(0, 6) : []);

        const podcastsData = Array.isArray(playlistsData)
          ? playlistsData.filter((playlist) => playlist.title.toLowerCase().includes("podcast")).slice(0, 6)
          : [];
        setPodcasts(podcastsData);

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos del canal:", error);
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [channelId]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) return <p>Cargando...</p>;
  if (!channelInfo) return <p>No se encontró el canal.</p>;

  return (
    <div className="channel-container">
      <Header />
      <div className="channel-info">
        <h2>{channelInfo.author}</h2>
        <p>👥 {channelInfo.subCount} suscriptores</p>
        <p>📹 {channelInfo.description}</p>
      </div>

      <section>
        <h3>🎥 Videos recientes</h3>
        <div className="videos-grid">
          {videos.map((video) => (
            <div key={video.videoId} className="video-card">
              <h4>{video.title}</h4>
              <p>Publicado el: {formatDate(video.published)}</p>
              <p>Duración: {formatDuration(video.lengthSeconds)} minutos</p>
              <p>👀 {video.viewCount} vistas</p>
              <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
                Ver en YouTube
              </a>
              <Link to={`/videos/${video.videoId}`}>Ver Comentarios</Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>📋 Playlists</h3>
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div key={playlist.playlistId} className="playlist-card">
              <h4>{playlist.title}</h4>
              <p>🎵 {playlist.videoCount} videos</p>
              <a href={`https://www.youtube.com/playlist?list=${playlist.playlistId}`} target="_blank" rel="noopener noreferrer">
                Ver en YouTube
              </a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>📢 Podcast</h3>
        <div className="podcast-grid">
          {podcasts.map((playlist) => (
            <div key={playlist.playlistId} className="podcast-card">
              <h4>{playlist.title}</h4>
              <p>🎵 {playlist.videoCount} videos</p>
              <a href={`https://www.youtube.com/playlist?list=${playlist.playlistId}`} target="_blank" rel="noopener noreferrer">
                Ver en YouTube
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Channel;
