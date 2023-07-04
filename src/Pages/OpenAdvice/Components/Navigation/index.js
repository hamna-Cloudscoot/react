import React from "react";
import classes from "./index.module.scss";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
const Navigation = (props) => {
  return (
    <>
      <nav id={`${classes.nav}`} className={`${props.dashboard ? `${classes.dashboardNav}` : ""}`}>
        <Nav as="ul">
          <>
            <Nav.Item as="li">
              <NavLink className={"active"} to="/">Home</NavLink>
            </Nav.Item>
          </>
        </Nav>

        <div className={classes.btnList}>
          <Link to={"/login"} className={"btn btn-link text-white"}>
            Login
          </Link>
          <Link to={"/signup"} className="btn btn-light-blue fw-bold">
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
