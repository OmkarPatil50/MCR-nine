import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../..";
import VideoCard from "../../Components/Cards/VideoCard/VideoCard";

function SinglePlayList() {
  const { playlistName } = useParams();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getPlaylist = state.playLists.find(
      (item) => playlistName == item.name
    );
    dispatch({ type: "SET_SINGLE_PLAYLIST", payload: getPlaylist });
  }, [playlistName, state.videosData, state.playLists, dispatch]);

  const { name, videos } = state.singlePlaylist;

  return (
    <div className="main-page">
      <h3 className="page-heading">{name}</h3>
      <section className="videos-section">
        <ul className="videos-list">
          {videos?.map((video) => {
            return (
              <li id={video._id}>
                <VideoCard videoData={video} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default SinglePlayList;
