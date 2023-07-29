import React, { useContext, useState } from "react";
import { AppContext } from "../..";
import PlayListCard from "../../Components/Cards/PlayListCard/PlayListCard";
import "./PlayList.css";

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
      <section className="videos-section">
        <ul className="videos-list">
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
          className="btn-new-playlist"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        {addToPlayList.showAddNewPlayListBox && (
          <div className="modal-page">
            <div className="modal-box">
              <header className="modal-header">
                <h3 className="modal-heading">Add New Playlist</h3>
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => {
                    setAddToPlaylist(() => ({
                      ...addToPlayList,
                      showAddNewPlayListBox: false,
                      name: "",
                      desc: "",
                    }));
                  }}
                ></i>
              </header>
              <label htmlFor="playlist-name">
                <textarea
                  cols={40}
                  rows={2}
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
                  cols={40}
                  rows={5}
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
                className="modal-save-btn"
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
          </div>
        )}
      </section>
    </div>
  );
}

export default PlayList;
