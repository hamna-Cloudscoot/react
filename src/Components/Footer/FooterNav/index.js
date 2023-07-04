import React from "react";
import { Nav } from "react-bootstrap";
import classes from "./index.module.scss";
import { NavLink } from "react-router-dom";

const FooterNav = () => {
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
        {
            title: "Privacy Policy",
            url: "/privacy-policy"
        },
        {
            title: "FAQ",
            url: "/faq"
        },
    ]
    return (
        <>
            <Nav className={classes.quickLinks}>
                {data.map((data, index) => (
                    <li key={index}><NavLink to={data.url}>{data.title}</NavLink></li>
                ))}
            </Nav>
        </>
    )
}

export default FooterNav;