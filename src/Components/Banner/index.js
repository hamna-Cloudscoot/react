import React from "react";
import classes from "./index.module.scss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import bannerImg from "../../Images/banner01.jpg";
import { useSelector } from "react-redux";

const Banner = (props) => {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <div className={`${classes.banner} ${props.HomerBanner ? "" : `${classes.innerBanner}`} ${props.dots ? `${classes.removeDot}` : ''} `}>
                <Container>
                    <div className={classes.bannerHolder}>
                        <div className={classes.col}>
                            <h1>{props.title}</h1>
                            {props.termCondition ? <p style={{ maxWidth: "500px" }}>{props.description}</p> : <p>{props.description}</p>}
                            {user ? '' :
                                <> {props.buttonText ? <> <Link to={props.buttonUrl} className={classes.btn}>{props.buttonText} <i className={"fal fa-long-arrow-right mx-2"}></i> </Link></> : null} </>
                            }

                        </div>
                        {props.HomerBanner ?
                            <div className={classes.col}>
                                <div className={classes.imgBox}>
                                    <img src={bannerImg} alt={props.title} />
                                </div>
                            </div>
                            : null}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Banner;
