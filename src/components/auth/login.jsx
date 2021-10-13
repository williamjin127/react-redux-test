import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/images/logo.svg";
import { LOGIN_REQUEST, CLEAR_AUTH_ERROR } from "../../redux/actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TOKEN_LOCALSTORE_KEY,
  USER_SIGNIN_INFO_LOCALSTORE_KEY,
} from "../../constants/constants";
import { withRouter } from "react-router";

const Login = (props) => {
  const dispatch = useDispatch();
  const { loading, signInUserSession, errorMessage } = useSelector(
    (state) => state.Auth
  );
  const [localErrorMessage, setLocalErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem(USER_SIGNIN_INFO_LOCALSTORE_KEY);
    if (data !== null) {
      data = JSON.parse(data);
      setEmail(data.email);
      setPassword(data.password);
      setRememberMe(data.rememberMe);
    }
  }, []);

  useEffect(() => {
    if (signInUserSession !== undefined) {
      localStorage.setItem(
        TOKEN_LOCALSTORE_KEY,
        JSON.stringify(signInUserSession)
      );
      setTimeout(() => {
        props.history.push(`/`);
      }, 200);
    }
  }, [signInUserSession]);

  useEffect(() => {
    if (errorMessage !== "") {
      setLocalErrorMessage(errorMessage.slice());
      setTimeout(() => {
        toast.error(errorMessage);
      }, 200);
      dispatch({
        type: CLEAR_AUTH_ERROR,
      });
    }
  }, [errorMessage, localErrorMessage]);

  const loginAuth = async (e) => {
    setLocalErrorMessage("");
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem(
        USER_SIGNIN_INFO_LOCALSTORE_KEY,
        JSON.stringify({
          email,
          password,
          rememberMe,
        })
      );
    }
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email,
        password,
      },
    });
  };

  return (
    <section className="hero is-fullheight">
      <ToastContainer />
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <figure className="avatar">
              <img src={Logo} />
            </figure>
            <hr className="login-hr" />
            <p className="subtitle has-text-black">Please login to proceed.</p>
            <div className="box">
              <form onSubmit={loginAuth}>
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      required={true}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  {localErrorMessage === "Missing email or username" && (
                    <p className="has-text-left help is-danger">
                      {localErrorMessage}
                    </p>
                  )}
                </div>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type={togglePassword ? "text" : "password"}
                      required={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                    <span
                      onClick={() => setTogglePassword(!togglePassword)}
                      className="icon is-small is-right"
                      style={{
                        pointerEvents: "initial",
                      }}
                    >
                      {togglePassword ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </span>
                  </div>
                  {localErrorMessage === "Missing password" && (
                    <p className="has-text-left help is-danger">
                      {localErrorMessage}
                    </p>
                  )}
                </div>
                <div className="field mt-4 mb-2 has-text-left">
                  <label className="checkbox">
                    <input
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      type="checkbox"
                    />{" "}
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="button is-block is-info is-fullwidth"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Login);
