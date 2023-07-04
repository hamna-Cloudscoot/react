import React from "react";
import {Nav} from "react-bootstrap";
import classes from "./index.module.scss";
import {NavLink} from "react-router-dom";

const FooterNav=()=>{
    const data = [

        {
            title: "Home",
            url: "/"
        },
        {
            title: "Blogs",
            url: "/blogs"
        },
        {
            title: "Terms of Use",
            url: "/terms-of-use"
        },
        {
            title: "Terms & Conditions",
            url: "/terms-conditions"
        },
        {
            title: "Support",
            url: "/support"
        },
    ]
    return(
        <>
            <Nav className={classes.quickLinks}>
                {data.map((data) => (
                    <li><NavLink to={data.url}>{data.title}</NavLink></li>
                ))}
            </Nav>
        </>
    )
}

export default FooterNav;