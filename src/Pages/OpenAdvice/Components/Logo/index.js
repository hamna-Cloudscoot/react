import React from "react";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import logo from "../../../../Images/openadvice.png";
const Logo = () => {
  return (
    <>
      <div className={classes.logo}>
        <Link to={"/"}>
          <img src={logo} alt={"openadvisorlogo"} />
        </Link>
      </div>
    </>
  );
};

export default Logo;
