import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../..";
import "./SingleVideo.css";

function SingleVideo() {
  const { videoID } = useParams();
  const { state, dispatch, isAddedToWatchLater } = useContext(AppContext);
  const [notesWindow, setNotesWindow] = useState({
    showNotesWindow: false,
    noteText: "",
  });
  const [addToPlayList, setAddToPlaylist] = useState({
    showPlaylistBox: false,
    name: "",
    desc: "",
    showAddNewPlayListBox: false,
  });

  const [editWindow, setEditWindow] = useState({
    showEditWindow: false,
    editText: state.editNoteData,
  });

  const { _id, title, views, chips, thumbnail, src, category, creator, notes } =
    state.singleVideoData;

  useEffect(() => {
    const getVideo = state.videosData.find((video) => videoID == video._id);
    dispatch({ type: "SET_SINGLE_VIDEO", payload: getVideo });
  }, [videoID, state.videosData, state.playLists, dispatch]);

  return (
    <div className="main-page">
      <div className="video-page">
        <div className="video-container">
          <iframe
            className="vidoe-main"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="single-video-info">
          <img
            src="http://bit.ly/42Zm7tM"
            alt="user"
            className="video-thumbnail-small"
          />
          <p>{title}</p>
          <div className="single-video-tools">
            {isAddedToWatchLater(_id) ? (
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: _id })
                }
                className="single-video-tools-button"
              >
                <i className="fa-solid fa-clock"></i>
              </button>
            ) : (
              <button
                onClick={() =>
                  dispatch({ type: "ADD_TO_WATCH_LATER", payload: _id })
                }
                className="single-video-tools-button"
              >
                <i className="fa-solid fa-clock-rotate-left"></i>
              </button>
            )}
            <button
              className="single-video-tools-button"
              onClick={() => {
                setAddToPlaylist((event) => ({
                  ...addToPlayList,
                  showPlaylistBox: !addToPlayList.showPlaylistBox,
                }));
              }}
            >
              <i className="fa-solid fa-sliders"></i>
            </button>
            {addToPlayList.showPlaylistBox && (
              <div className="modal-page">
                <div className="modal-box">
                  <header className="modal-header">
                    <h3 className="modal-heading">Add to Playlist</h3>
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => {
                        setAddToPlaylist(() => ({
                          ...addToPlayList,
                          showPlaylistBox: false,
                          name: "",
                          desc: "",
                        }));
                      }}
                    ></i>
                  </header>
                  <button
                    className="add-new-playlist-btn"
                    onClick={() =>
                      setAddToPlaylist(() => ({
                        ...addToPlayList,
                        showAddNewPlayListBox:
                          !addToPlayList.showAddNewPlayListBox,
                      }))
                    }
                  >
                    <i className="fa-solid fa-plus"></i>
                    Add New Playlist
                  </button>
                  {addToPlayList.showAddNewPlayListBox && (
                    <div className="modal-page">
                      <div className="modal-box">
                        <header className="modal-header">
                          <h3 className="modal-heading">Create New Playlist</h3>
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
                  {state.playLists.length ? (
                    <ul className="playlist-list">
                      <p className="list-heading">Select Playlist</p>
                      {state.playLists?.map((playlist) => {
                        return (
                          <li className="playlist-list-item">
                            <button
                              onClick={() =>
                                dispatch({
                                  type: playlist.videos.some(
                                    (video) => video._id === _id
                                  )
                                    ? "REMOVE_FROM_PLAYLIST"
                                    : "ADD_TO_PLAYLIST",
                                  payload: {
                                    _id: _id,
                                    playListName: playlist.name,
                                  },
                                })
                              }
                              style={{
                                color: playlist.videos.some(
                                  (video) => video._id === _id
                                )
                                  ? "#f7f7f7"
                                  : "#202020",
                                backgroundColor: playlist.videos.some(
                                  (video) => video._id === _id
                                )
                                  ? "#202020"
                                  : "#f7f7f7",
                              }}
                            >
                              {playlist.name}
                            </button>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "DELETE_PLAYLIST",
                                  payload: playlist.name,
                                })
                              }
                            >
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    "No Playlists Found"
                  )}
                </div>
              </div>
            )}
            <button
              className="single-video-tools-button"
              onClick={() => {
                setNotesWindow(() => ({
                  ...notesWindow,
                  showNotesWindow: !notesWindow.showNotesWindow,
                }));
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            {notesWindow.showNotesWindow && (
              <div className="modal-page">
                <div className="modal-box">
                  <header className="modal-header">
                    <h3 className="modal-heading">Enter Notes</h3>
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => {
                        setNotesWindow(() => ({
                          ...notesWindow,
                          showNotesWindow: false,
                          noteText: "",
                        }));
                      }}
                    ></i>
                  </header>

                  <label htmlFor="enter-note">
                    <textarea
                      cols={40}
                      rows={4}
                      name="notes"
                      placeholder="Enter Notes...!"
                      required
                      onChange={(event) => {
                        setNotesWindow(() => ({
                          ...notesWindow,
                          noteText: event.target.value,
                        }));
                      }}
                    ></textarea>
                  </label>
                  <button
                    type="submit"
                    className="modal-save-btn"
                    onClick={() => {
                      if (notesWindow.noteText) {
                        setNotesWindow(() => ({
                          ...notesWindow,
                          showNotesWindow: false,
                          noteText: "",
                        }));
                        dispatch({
                          type: "ADD_NOTE_TO_VIDEO",
                          payload: { text: notesWindow.noteText, _id: _id },
                        });
                      }
                    }}
                  >
                    Add Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="video-notes">
          <h1>My Notes</h1>
          <ul className="notes-list">
            {state.singleVideoData?.notes &&
              state.singleVideoData.notes.map((note, index) => {
                return (
                  <div>
                    <li key={index} className="notes-list-item">
                      <p className="notes-list-item-content">{note}</p>
                      <div className="single-video-tools">
                        <button
                          className="single-video-tools-button"
                          onClick={() => {
                            setEditWindow(() => ({
                              ...editWindow,
                              showEditWindow: !editWindow.showEditWindow,
                            }));
                            dispatch({
                              type: "UPDATE_EDIT_NOTE_DATA",
                              payload: note,
                            });
                          }}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>{" "}
                        <button
                          className="single-video-tools-button"
                          onClick={() => {
                            dispatch({
                              type: "DELETE_NOTE",
                              payload: {
                                note: note,
                                _id: _id,
                              },
                            });
                          }}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </li>
                  </div>
                );
              })}
          </ul>
        </div>
        {editWindow.showEditWindow && (
          <div className="modal-page">
            <div className="modal-box">
              <header className="modal-header">
                <h3 className="modal-heading">Edit Note</h3>
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => {
                    setEditWindow(() => ({
                      ...editWindow,
                      editText: "",
                      showEditWindow: false,
                    }));
                  }}
                ></i>
              </header>

              <label htmlFor="edit-note">
                <textarea
                  cols={40}
                  rows={4}
                  name="notes"
                  required
                  defaultValue={state.editNoteData}
                  onChange={(event) => {
                    setEditWindow(() => ({
                      ...editWindow,
                      editText: event.target.value,
                    }));
                  }}
                ></textarea>
              </label>
              <button
                type="submit"
                className="modal-save-btn"
                onClick={() => {
                  setEditWindow(() => ({
                    ...editWindow,
                    showEditWindow: false,
                    editTextText: "",
                  }));
                  dispatch({
                    type: "EDIT_NOTE",
                    payload: {
                      text: editWindow.editText,
                      originalText: state.editNoteData,
                      _id: _id,
                    },
                  });
                }}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleVideo;
