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
            <Nav.Item as="li"> <NavLink to="/blogs">Blogs</NavLink></Nav.Item>
            <Nav.Item as="li"> <NavLink to="/term-of-use">Terms of Use</NavLink></Nav.Item>
            <Nav.Item as="li"><NavLink to="/term-and-condition">Terms & Conditions</NavLink></Nav.Item>
            <Nav.Item as="li"><NavLink to="/contact-us">Contact Us</NavLink></Nav.Item>
          </>
        </Nav>

        <div className={classes.btnList}>
          <Link to={"/login"} className={`btn btn-link text-white ${classes.btn}`}>
            Login
          </Link>
          <Link to={"/signup"} className="btn btn-secondary blueColor fw-bold">
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
