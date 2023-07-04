import React, {useState} from "react";
import classes from "./index.module.scss";
import Logo from "../Logo";
import Navigation from "../Nav";
import {Button} from "react-bootstrap";


const Header = (props) => {
    const [isActive, setActive] = useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };


    return(
      <header id={classes.header} className={`${isActive ? `${'navActive'}` : ''}`}>
            <div className={classes.container}>
                <Logo />
                {props.dashboard ?
                    <Navigation dashboard />
                :
                    <Navigation />
                }
                <Button variant={'navOpener'} onClick={toggleClass}><i className={'fal fa-bars'}></i> </Button>
            </div>
      </header>
  )
};

export default Header;
