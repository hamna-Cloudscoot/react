import React from "react";
import classes from "./index.module.scss";

const SectionTitle = ({
        title=null,
        description=null
    }) => {
    return(
        <>
            <div className={classes.sectionHeader}>
                <h2>{title}</h2>
                {description != null ? <p>{description}</p> : null}
            </div>
        </>
    )
}

export default SectionTitle;

