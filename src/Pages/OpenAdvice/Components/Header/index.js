import React, {useState} from "react";
import classes from "./index.module.scss";
import {Button} from "react-bootstrap";
import Navigation from "../Navigation";
import Logo from "../Logo";

const Header = (props) => {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <header id={classes.header} className={`${isActive ? `${"navActive"}` : ""}`}>
      <div className={classes.container}>
        <Logo />
         <Navigation />
        <Button variant={"navOpener"} onClick={toggleClass}>
          <i className={"fal fa-bars"}></i>{" "}
        </Button>
      </div>
    </header>
  );
};

export default Header;