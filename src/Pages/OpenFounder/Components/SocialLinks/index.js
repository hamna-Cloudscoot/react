import React from "react";
import {Link} from "react-router-dom";
import classes from "./index.module.scss";



const SocialLinks=(props)=>{
    const data = [
        {
            title: "twitter",
            url: "facebook.com"
        },
        {
            title: "facebook-f",
            url: "facebook.com"
        },
        {
            title: "youtube",
            url: "facebook.com"
        },
        {
            title: "linkedin",
            url: "facebook.com"
        },
        {
            title: "instagram",
            url: "facebook.com"
        },
    ]
    return(
        <>
            <ul className={`${classes.socialLinks} ${props.blogs ? `${classes.yellow}` : null}`}>

                {props.blogs ? <li className={"mx-3 font-16 fw-bold"}>Share on </li> : null}
                {data.map((data) => (
                    <li><Link to={data.url}><i className={`fab fa-${data.title}`}></i> </Link></li>
                ))}
            </ul>
        </>
    )
}

export default SocialLinks;