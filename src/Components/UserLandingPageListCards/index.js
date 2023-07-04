import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import { sliceLongText } from "GlobalHelperFunctions";
import avatar from "Images/avatar.png";

const UserLandingPageListCard = (props) => {
    var settings = {
        dots: props.dots,
        infinite: false,
        speed: 500,
        slidesToShow: props.slidesShow,
        slidesToScroll: props.slidesScroll,
        arrows: props.arrows,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <>
            <Slider {...settings} className={classes.slickSlider}>
                {props.data?.map((data, index) => (
                    <div key={index}>
                        <div className={classes.col}>
                            <div className={classes.imgBox}>
                                <img src={data.profilePic?.path || avatar} alt={data.firstName} />
                            </div>
                            <div className={classes.description}>
                                <h3 className={`font-18 fw-semibold ${classes.title}`}>{data.firstName} {data.lastName}</h3>
                                <p>{sliceLongText(data.about)}</p>
                                <Link to={`/all-profession/profile/${data.id}`} target={'_parent'} className={"text-green"}>Show More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <Link to={`/${props.btnUrl}`} className={`btn ${props.variant ? `btn-${props.variant}` : 'btn-light'} ${classes.sliderBtn}`} target={'_self'}>{props.buttonText}</Link>
        </>
    )

}

export default UserLandingPageListCard;