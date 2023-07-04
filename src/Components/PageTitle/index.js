import React from "react";
import classes from "./index.module.scss";
import { Container, Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import starRatingImg from "../../Images/starRatingImg.svg";
import MeetingPopup from "Pages/MeetingRoom/MeetingPopup";


const PageTitle = (props) => {
    const location = useLocation();
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <div className={`${classes.pageTitle} ${props.bgWhite ? `${classes.bgWhite}` : ''} ${props.onlyTitle ? `${classes.onlyTitle}` : ''} ${props.smallText ? `${classes.smallText}` : ''} `}>
                <Container className={props.withBtn? "d-flex align-items-center justify-content-between" : ""}>
                    {
                        props.smallText ? <h6>{props.smallerText}</h6>
                            : ""
                    }
                    {props.onlyTitle ? '' :
                        <div className={classes.backBtn}>
                            <Link to={props.backBtnUrl || "/"}><i className={"far fa-long-arrow-left fa-fw"}></i> </Link>
                        </div>
                    }
                    <h1>
                        {props.title}
                        
                        {props.totalReviews ? <>({props.totalReviews})</> : ''}
                        {props.StarRating ? <img width={"100"} src={starRatingImg} alt={"#"} /> : ''}
                        {props.rating ? <span className={'font-20'}> {props.rating} </span> : ''}
                    </h1>
                    {props.onlyTitle ? '' :
                        <>
                            {props.date ? <time className={"text-muted mb-3 d-block"}>{props.date}</time> : null}
                            <Breadcrumb className={classes.breadCrumbs}>
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </>
                    }
                    {
                        props.withBtn ? <Link to={"#"} onClick={() => setModalShow(true)}   className={"btn btn-secondary"}><i style={{fontWeight: "500"}} className={"fal fa-plus me-1 font-16"}></i> Create Meeting</Link>
                            :
                            ""
                    }

                </Container>
            </div>
            <MeetingPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default PageTitle;