import { useParams } from "react-router-dom";
import VideoComments from "./VideoComments";
import Header from "./Header";
import VideoSuggestions from "./VideoSuggestions";

const Video = () => {
  const { videoId } = useParams();

  return (
    <>
      <Header />
      <div>
        <h2>🎥 Video: {videoId}</h2>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en YouTube
        </a>

        <p>Comentarios</p>
        <VideoComments videoId={videoId} />
        <p>Videos recomendades</p>
        <VideoSuggestions videoId={videoId} />
      </div>
    </>
  );
};

export default Video;
