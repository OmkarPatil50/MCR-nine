import React, { useContext, useEffect } from "react";
import { AppContext } from "../..";
import { Link } from "react-router-dom";
import VideoCard from "../../Components/Cards/VideoCard/VideoCard";

function WatchLater() {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {}, [state.watchLaterList]);
  return (
    <div className="main-page">
      <h3 className="page-heading">Watch Later</h3>
      <section className="categories-section">
        <ul className="categories-list">
          {state.watchLaterList?.map((video) => {
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

export default WatchLater;
