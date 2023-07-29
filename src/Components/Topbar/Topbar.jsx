import React, { useContext, useEffect } from "react";
import "./Topbar.css";
import { AppContext } from "../..";
import { useLocation } from "react-router-dom";

function Topbar() {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <i
          className="fa-solid fa-bars "
          onClick={() => dispatch({ type: "UPDATE_FULL_NAVBAR" })}
        ></i>
        <p className="top-bar-app-info">
          <i className="fa-brands fa-youtube"></i>
        </p>
        <p className="top-bar-app-name">MeTube</p>
      </div>
      {location.pathname === "/explore" && (
        <label htmlFor="search-video" className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="search-bar-input"
            onChange={(event) =>
              dispatch({
                type: "UPDATE_SEARCH_TEXT",
                payload: event.target.value,
              })
            }
          />
        </label>
      )}
      <div className="top-bar-right">
        <button className="sign-in-btn-top-bar">
          <i className="fa-regular fa-circle-user"></i> Sign in
        </button>
      </div>
    </div>
  );
}

export default Topbar;
