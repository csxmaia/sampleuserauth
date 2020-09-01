import React, { useContext } from "react";
import { AuthContext } from "../authProvider";
import { doLogout } from "../auth";

export default function Navbar(props) {
  const { user } = useContext(AuthContext);

  return (
    <div className="hero-head">
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h2 className="title">SUS</h2>
          </a>
          {/* <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div> */}
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="./">
              Repo
            </a>
          </div>
        </div>

        <div className="navbar-end">
          {user.id ? (
            <>
              <div className="navbar-item">
                <a className={`button ${props.themeParams}`} href={`/me`}>
                  <i className="fas fa-user" />
                  {user.username}
                </a>
              </div>
              <div className="navbar-item">
                <button
                  className={`button ${props.themeParams}`}
                  type="button"
                  onClick={() => doLogout()}
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="navbar-item">
                <a
                  className={`button ${props.themeParams} is-inverted`}
                  href="/signup"
                >
                  <strong>Sign up</strong>
                </a>
              </div>
              <div className="navbar-item">
                <a className={`button ${props.themeParams}`} href="/login">
                  Login
                </a>
              </div>
            </>
          )}
          {/* <div className="navbar-item">
            <a className="button is-dark" href="github.com">
              <span className="icon">
                <i className="fab fa-github"></i>
              </span>
              <span>Download</span>
            </a>
          </div> */}
        </div>
      </nav>
    </div>
  );
}
