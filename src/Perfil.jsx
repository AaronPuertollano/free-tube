import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Perfil.css";
import Footer from "./Footer";

function Perfil() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error al cargar usuario:", error));
  }, [username]);

  const formatUnixTime = (unix) => {
    return new Date(unix * 1000).toLocaleDateString();
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div className="perfil-container">
        <h1>Porfile of {user.id}</h1>
        <p>Member from: {formatUnixTime(user.created)}</p>
        <p>Karma: {user.karma}</p>
        <Link to="/">BACK</Link>
      </div>

      <Footer />
    </>
  );
}

export default Perfil;
