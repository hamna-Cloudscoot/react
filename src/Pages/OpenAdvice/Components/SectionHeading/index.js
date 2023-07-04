import React from 'react'
import classes from "./index.module.scss";
const SectionHeading = (props) => {
  return (
    <div className={classes.sec_heading}>
    <h2>{props.heading}</h2>
    <p>{props.description}</p>
    </div>
  )
}

export default SectionHeading