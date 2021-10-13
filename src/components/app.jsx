import React, { Fragment } from "react";
import Loader from "../layout/loader";
import Header from "../layout/header";
import { ToastContainer } from "react-toastify";
import { withRouter } from "react-router-dom";

const App = ({ children }) => {
  return (
    <Fragment>
      <div>
        <Header />
        <div>{children}</div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};
export default withRouter(App);
