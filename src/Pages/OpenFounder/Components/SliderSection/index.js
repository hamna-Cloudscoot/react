import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import classes from "./index.module.scss";
import img1 from "../../../../Images/sliderprofile01.png"
import img2 from "../../../../Images/sliderprofile02.png"
import img3 from "../../../../Images/sliderprofile03.png"

const slideData = [
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
    {
        text: "“ OpenAdvisor makes life easier to me. With OpenAdvisor you can browse expert advisors within seconds and connect with them. 5 stars!!! ”",
    },
];


const cardSliderData =[
    {
        imgUrl: img1,
        name:"Mellonie Amen",
        designation:"Marketing",
    },
    {
        imgUrl: img2,
        name:"Andrei Castro",
        designation:"Manager",
    },
    {
        imgUrl: img3,
        name:"Rayan Artecona",
        designation:"Development",
    },


]

export default class SliderSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2,
        });
    }

    render() {

        const setting ={
            asNavFor:this.state.nav1,
            ref:(slider) => (this.slider2 = slider),
            slidesToShow:3,
            swipeToSlide:true,
            focusOnSelect:true,
            dots:false,
            arrows:true,
            responsive: [

                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        }



        return (
            <section className={classes.section}>
                <Container>
                    <Slider
                        dots={false}
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                        asNavFor={this.state.nav2}
                        ref={(slider) => (this.slider1 = slider)}
                    >
                        {slideData.map((slideData, index) => (
                            <div key={index}>
                                <div>
                                    <div className={classes.textBox}>
                                        <h3>{slideData.text}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <Slider
                        {...setting}
                    >
                        {cardSliderData.map((cardSliderData, index) => (
                            <div key={index}>
                                <Card className={classes.card}>
                                    <div className={classes.avatar}>
                                        <img src={cardSliderData.imgUrl} alt="img" />
                                    </div>
                                    <div className={classes.CardtextBox}>
                                        <h6>{cardSliderData.name}</h6>
                                        <p>{cardSliderData.designation}</p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </Container>
            </section>
        );
    }
}
