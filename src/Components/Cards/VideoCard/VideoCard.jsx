import React, { useContext } from "react";
import "./VideoCard.css";
import { AppContext } from "../../..";
import { Link, useLocation } from "react-router-dom";

function VideoCard({ videoData }) {
  const { _id, title, views, chips, thumbnail, src, category, creator } =
    videoData;
  const { state, dispatch, isAddedToWatchLater } = useContext(AppContext);

  const location = useLocation();

  return (
    <div className="video-card">
      <header className="video-card-header">
        <Link to={`/videos/${_id}`}>
          <img src={thumbnail} alt="video-card" />
        </Link>
        {isAddedToWatchLater(_id) ? (
          <button
            onClick={() =>
              dispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: _id })
            }
          >
            <i className="fa-solid fa-clock"></i>
          </button>
        ) : (
          <button
            onClick={() =>
              dispatch({ type: "ADD_TO_WATCH_LATER", payload: _id })
            }
          >
            <i className="fa-solid fa-clock-rotate-left"></i>
          </button>
        )}
        {location.pathname.includes("/playlist") && (
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_PLAYLIST",
                payload: {
                  _id: _id,
                  playListName: state.singlePlaylist.name,
                },
              })
            }
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </header>
      <Link to={`/videos/${_id}`} className="video-details">
        <img
          src="http://bit.ly/42Zm7tM"
          alt="user"
          className="video-thumbnail-small"
        />
        <div className="video-info">
          <h3>{title}</h3>
          <h3>{category}</h3>
          <p>{`${views} Views | ${creator}`}</p>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;
