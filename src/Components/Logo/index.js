import React from "react";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import logo from "../../Images/openadvisorlogo.svg";
import { useSelector } from "react-redux";

const Logo = () => {
    const { accessToken } = useSelector((state) => state.auth);

    return (
        <>
            <div className={classes.logo}>
                <Link to={accessToken ? '/' : '/'}>
                    <img src={logo} alt={"openadvisorlogo"} />
                </Link>
            </div>
        </>
    )
}

export default Logo;