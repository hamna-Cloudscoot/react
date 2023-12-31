import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import logo from "Images/openadvisor.png";

import classes from "./style.module.scss";

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const Loader = ({ isLoading }) => (
  <div
    className={classNames({
      [classes.loaderComponent]: true,
      [classes.showLoader]: isLoading || false,
    })}
  >
    <img src={logo} alt="Loading..." />
  </div>
);

Loader.propTypes = propTypes;

export default Loader;
