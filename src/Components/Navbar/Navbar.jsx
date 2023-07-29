import React, { useContext, useState } from "react";
import { NavLink, activeclassname } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../..";

function Navbar() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <nav className="navbar">
      <div className="nav-section">
        <div className="nav-items-section">
          <NavLink to="/" activeclassname="active" className="nav-item">
            <i className="fa-solid fa-house"></i> <p>Home</p>
          </NavLink>
          <NavLink to="/explore" activeclassname="active" className="nav-item">
            <i className="fa-solid fa-bolt"></i> <p>Explore</p>
          </NavLink>
          <NavLink to="/playlist" activeclassname="active" className="nav-item">
            <i className="fa-solid fa-sliders"></i>
            <p>Playlist</p>
          </NavLink>

          <NavLink
            to="/watchlater"
            activeclassname="active"
            className="nav-item"
          >
            <i className="fa-solid fa-clock-rotate-left"></i>
            <p>Watch Later</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
