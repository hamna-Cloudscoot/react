import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import { sliceLongText, sliceLongTitle } from "GlobalHelperFunctions";

const ColSlider = (props) => {
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

    function PlainText(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        const plainText = div.innerText;

        return (
            <div>{sliceLongText(plainText)}</div>
        );
    }

    return (
        <>
            <Slider {...settings} className={classes.slickSlider}>
                {props.data?.map((data, index) => (
                    <div key={index}>
                        <div className={classes.col}>
                            <div className={classes.imgBox}>
                                <img src={data.thumbnail?.path} alt={data.title || "No image found"} />
                            </div>
                            <div className={classes.description}>
                                {data.title ?
                                    <h3 className={`font-18 ${props.BLogSlider ? 'fw-semibold' : null} ${classes.title}`}>{sliceLongTitle(data.title)}</h3>
                                    : null}
                                {data.description ?
                                    <>                                      
                                        <p>{PlainText(data.description)}</p>
                                    </>
                                    : null}
                                {props.BLogSlider ? <Link to={`/blogs/blog-detail/${data.id}`} className={"text-green"}>{props.linkText}</Link> : <Link to={`${data.url}/profile`} className={"text-green"}>{data.linkText}</Link>}
                                {/* {props.BLogSlider ? '' : <Link to={`${data.url}/profile`} className={"text-green"}>{data.linkText}</Link>} */}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <Link to={`${props.btnUrl}`} className={`btn ${props.varient ? `btn-${props.varient}` : 'btn-light'} ${classes.sliderBtn}`}>{props.buttonText}</Link>
        </>
    )

}

export default ColSlider;