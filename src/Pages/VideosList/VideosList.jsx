import React, { useContext } from "react";
import { AppContext } from "../..";
import { Link } from "react-router-dom";
import VideoCard from "../../Components/Cards/VideoCard/VideoCard";

function VideosList() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="main-page">
      <h3 className="page-heading">{state.filterByCategory}</h3>
      <section className="videos-section">
        <ul className="videos-list">
          {state.filteredList?.map((video) => {
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

export default VideosList;
