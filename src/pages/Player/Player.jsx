import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playerKey, setPlayerKey] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzQ3N2Y3MDI1Yzk4OTg2M2FlNzRhNWJhNDEwNDEzMSIsIm5iZiI6MTcyMTM2NDg0MC4zMDg3NzEsInN1YiI6IjY1MmY2MmQ2YTgwMjM2MDBjMzE2M2FjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AdGB14-0vpvCbRhQFion_WZmzi09rIUafVoubJJRuw4",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setPlayerKey(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-2)} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${playerKey.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{playerKey.published_at.slice(0, 10)}</p>
        <p>{playerKey.name}</p>
        <p>{playerKey.type}</p>
      </div>
    </div>
  );
};

export default Player;
