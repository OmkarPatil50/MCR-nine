import React, { useContext, useEffect } from "react";
import { AppContext } from "../..";
import VideoCard from "../../Components/Cards/VideoCard/VideoCard";

function Explore() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: "UPDATE_SEARCH_TEXT",
      payload: "",
    });
  }, []);
  return (
    <div className="main-page">
      <h3 className="page-heading">All Videos</h3>
      <section className="categories-section">
        <ul className="categories-list">
          {state.exploreList?.map((video) => {
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

export default Explore;
