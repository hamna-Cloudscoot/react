import React from "react";
import classes from "./index.module.scss";
import {Link} from "react-router-dom";

const ContactList=()=>{
    const data = [
        {
            title: "support@openadvisor.com",
            icon: "envelope"
        },
    ]
    return(
        <>
            <ul className={classes.contactList}>
                {data.map((data) => (
                    <li><i className={`fal fa-${data.icon}`}></i>{data.title}</li>
                ))}
            </ul>
        </>
    )
}

export default ContactList;
