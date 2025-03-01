import { useState } from "react";

const ChannelContent = () => {
  const [channelId, setChannelId] = useState("");
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchChannelData = async () => {
    if (!channelId) return;
    setLoading(true);

    try {
      const res = await fetch(`https://invidious.artemrudenko.com/api/v1/channels/${channelId}`);
      const data = await res.json();
      setChannelData(data);
    } catch (error) {
      console.error("Error al obtener datos del canal", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Buscar Canal</h2>
      <input
        type="text"
        placeholder="Ingrese el ID del canal"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
      />
      <button onClick={fetchChannelData}>Buscar</button>

      {loading && <p>Cargando...</p>}

      {channelData && (
        <div>
          <h3>{channelData.author} ({channelData.subCount} suscriptores)</h3>
          <p>📹 {channelData.videoCount} videos</p>

          <h4>Últimos Videos</h4>
          <ul>
            {channelData.latestVideos.map((video) => (
              <li key={video.videoId}>
                <img src={video.videoThumbnails[0].url} alt={video.title} width="150" />
                <h5>{video.title}</h5>
                <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank">Ver en YouTube</a>
              </li>
            ))}
          </ul>

          <h4>📂 Playlists</h4>
          <ul>
            {channelData.playlists.map((playlist) => (
              <li key={playlist.playlistId}>
                <h5>{playlist.title} ({playlist.videoCount} videos)</h5>
                <a href={`https://www.youtube.com/playlist?list=${playlist.playlistId}`} target="_blank">Ver en YouTube</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChannelContent;
