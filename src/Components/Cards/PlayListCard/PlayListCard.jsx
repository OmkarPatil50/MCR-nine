import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../..";
import "./PlayListCard.css";

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
          className="btn-delete"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <header className="playlist-card-header">
          <Link to={`/playlist/${name}`}>
            <img
              src={thumbnail}
              alt="playlist-card"
              className="playlist-thumbnail"
            />
          </Link>
        </header>
        <Link to={`/playlist/${name}`} className="video-details">
          <div className="video-info">
            <h3 className="playlist-card-name">{name}</h3>
            <p className="playlist-card-category">{desc}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PlayListCard;
