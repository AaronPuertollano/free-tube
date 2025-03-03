import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const VideoComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    setLoading(true);
    fetch(`https://invidious.artemrudenko.com/api/v1/comments/${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los comentarios", error);
        setLoading(false);
      });
  }, [videoId]);

  return (
    <div>
      {loading ? (
        <p>Cargando comentarios...</p>
      ) : (
        <ul>
          {comments.length === 0 ? (
            <p>No hay comentarios disponibles.</p>
          ) : (
            comments.map((comment, index) => (
              <li key={index}>
                <p>
                  <strong>{comment.author}</strong> ({comment.publishedText})
                </p>
                <p>{comment.content}</p>
                <p>👍 {comment.likeCount}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

VideoComments.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoComments;
