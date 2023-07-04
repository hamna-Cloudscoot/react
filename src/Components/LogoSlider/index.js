import React from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import classes from "./index.module.scss";
import google from "../../Images/google.png";
import facebook from "../../Images/facebook.png";
import microsoft from "../../Images/microsoft.png";
import amazon from "../../Images/amazon.png";
import github from "../../Images/github.png";
import airbnb from "../../Images/airbnb.png";
import uber from "../../Images/uber.png";



const LogoSlider = () => {

    const logoData = [
        {
            imgUrl: google,
        },
        {
            imgUrl: microsoft,
        },
        {
            imgUrl: facebook,
        },
        {
            imgUrl: amazon,
        },
        {
            imgUrl: github,
        },
        {
            imgUrl: airbnb,
        },
        {
            imgUrl: uber,
        },
        {
            imgUrl: google,
        },
        {
            imgUrl: microsoft,
        },
        {
            imgUrl: facebook,
        },
        {
            imgUrl: amazon,
        },
        {
            imgUrl: github,
        },
        {
            imgUrl: airbnb,
        },
        {
            imgUrl: uber,
        },
    ]

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };
    return (
        <>
            <section className={classes.section}>
                <Container>
                    <Slider {...settings}>
                        {logoData.map((logoData, index) => (
                            <div key={index}>
                                <div className={classes.imgBox}>
                                    <img src={logoData.imgUrl} alt={"name"} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </Container>
            </section>
        </>
    )
}

export default LogoSlider;