import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../..";

function PlayListCard({ playlist }) {
  const { state, dispatch } = useContext(AppContext);

  const { thumbnail, name, desc } = playlist;

  return (
    <div>
      <div className="playlist-card">
        <button
          onClick={() =>
            dispatch({
              type: "DELETE_PLAYLIST",
              payload: name,
            })
          }
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <header className="playlist-card-header">
          <Link to={`/playlist/${name}`}>
            <img src={thumbnail} alt="playlist-card" />
          </Link>
        </header>
        <Link to={`/playlist/${name}`} className="video-details">
          <div className="video-info">
            <h3>{name}</h3>
            <p>{desc}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PlayListCard;
