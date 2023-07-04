import React from "react";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import avatar from "Images/avatar.png";

const ColBox = (props) => {
    const shortenDescription = (des) => {
        if (des.length > 120) {
            const startStr = des.substr(0, 120)
            return `${startStr}...`
        }
        return des
    }
    return (
        <div className={`col ${classes.col}`}>
            <div className={classes.box}>
                <div className={classes.imgBox}>
                    <img src={props.data.profilePic?.path || avatar} alt={props.data.firstName} />
                </div>
                <div className={classes.description}>
                    <h3 className={`font-18 ${props.blogs ? 'fw-semibold' : null} ${classes.title}`}>{`${props.data.firstName} ${props.data.lastName} `}</h3>
                    <p>{shortenDescription(props.data?.about || "Bringing together a mentor and a mentee is hard, but it’s even harder to make sure that a mentorship can work out over my dead face") || shortenDescription("")}{props.blogs ? <Link to={props.data.url} className={"text-green"}>Show More</Link> : null}</p>
                    {props.blogs ? '' : <Link to={`/all-profession/profile/${props.data.id}`} target={'_parent'} className={"text-green"}>Action Button</Link>}

                </div>
            </div>
        </div>
    )
}

export default ColBox;