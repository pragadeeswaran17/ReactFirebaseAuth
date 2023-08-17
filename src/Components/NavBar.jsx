import React from "react";
import { isAuthendicated } from "../services/auth";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mr-3">
      <i className="navbar-brand ">Praga</i>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-3 ">
          {!isAuthendicated() ? (
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          ) : null}
          {!isAuthendicated() ? (
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          ) : null}
          {isAuthendicated() ? (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          ) : null}
          {isAuthendicated() ? (
            <li>
              <p onClick={props.logOutUser} className="nav-link">
                Logout
              </p>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
