import React from "react";
import classes from "./index.module.scss";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import bannerImg from "../../../../Images/banner02.png";

const Banner = (props) => {
    return(
        <>
            <div className={`${classes.banner} ${props.HomerBanner ? "" : `${classes.innerBanner}`} ${props.dots ? `${classes.removeDot}` : '' } `}>
                <Container>
                    <div className={classes.bannerHolder}>
                        <div className={classes.col}>
                            <h1>{props.title}</h1>
                            <p>{props.description}</p>
                            {props.buttonText ?<> <Link to={props.buttonUrl} className={classes.btn}>{props.buttonText} </Link></> : null}

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
