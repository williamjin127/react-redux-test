import React from "react";
import { useDispatch } from "react-redux";
import Logo from "../assets/images/logo.svg";
import { TOKEN_LOCALSTORE_KEY } from "../constants/constants";
import { LOGOUT_REQUEST } from "../redux/actionTypes";

const Header = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch({
      type: LOGOUT_REQUEST,
      payload: {},
    });
    localStorage.removeItem(TOKEN_LOCALSTORE_KEY);
  };

  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item">
          <img src={Logo} width="130" height="40" />
        </a>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a onClick={signOut} className="button is-light">
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
