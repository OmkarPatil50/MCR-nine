import React, { useContext, useState } from "react";
import { AppContext } from "../..";
import PlayListCard from "../../Components/Cards/PlayListCard";

function PlayList() {
  const { state, dispatch } = useContext(AppContext);
  const [addToPlayList, setAddToPlaylist] = useState({
    name: "",
    desc: "",
    showAddNewPlayListBox: false,
  });

  return (
    <div className="main-page">
      <h3 className="page-heading">Playlists</h3>
      <section className="playlist-section">
        <ul className="categories-list">
          {state.playLists?.map((playlist, index) => {
            return (
              <li id={index}>
                <PlayListCard playlist={playlist} />
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            setAddToPlaylist(() => ({
              ...addToPlayList,
              showAddNewPlayListBox: !addToPlayList.showAddNewPlayListBox,
            }));
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        {addToPlayList.showAddNewPlayListBox && (
          <div className="add-new-playlist-box">
            <label htmlFor="playlist-name">
              <textarea
                name="playlist-name"
                value={addToPlayList.name}
                placeholder="Enter title of your playlist"
                required
                onChange={(event) => {
                  setAddToPlaylist(() => ({
                    ...addToPlayList,
                    name: event.target.value,
                  }));
                }}
              ></textarea>
            </label>
            <label htmlFor="playlist-desc">
              <textarea
                name="playlist-desc"
                value={addToPlayList.desc}
                placeholder="Write a Description"
                required
                onChange={(event) => {
                  setAddToPlaylist(() => ({
                    ...addToPlayList,
                    desc: event.target.value,
                  }));
                }}
              ></textarea>
            </label>
            <button
              className="btn-new-playlist"
              onClick={() => {
                if (addToPlayList.name) {
                  dispatch({
                    type: "ADD_NEW_PLAYLIST",
                    payload: {
                      name: addToPlayList.name,
                      desc: addToPlayList.desc,
                    },
                  });
                  setAddToPlaylist(() => ({
                    ...addToPlayList,
                    showAddNewPlayListBox: false,
                    name: "",
                    desc: "",
                  }));
                }
              }}
            >
              Create New Playlist
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default PlayList;
