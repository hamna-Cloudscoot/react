import React from "react";
import PageTitle from "../../Components/PageTitle";
import {Container, Tab, Tabs} from "react-bootstrap";
import starRatingImg from "../../Images/starRatingImg.svg";
import ReviewsList from "../../Components/ReviewsList";

const Reviews=(props)=>{

    return(
        <>
            <PageTitle title={`All Reviews`} StarRating totalReviews={"34"} rating={"4.7"}  />
            <section className={"pt-0"}>
                <Container>
                    <Tabs
                        defaultActiveKey="home"
                        justify
                    >
                        <Tab eventKey="home" title={<span>5 <i className="fas fa-star text-yellow font-10" /> </span>}>
                            <ReviewsList Page  />
                        </Tab>
                        <Tab eventKey="home1" title={<span>4 <i className="fas fa-star text-yellow font-10" /> </span>}>
                            <ReviewsList Page />
                        </Tab>
                        <Tab eventKey="home2" title={<span>3 <i className="fas fa-star text-yellow font-10" /> </span>}>
                            <ReviewsList Page />
                        </Tab>
                        <Tab eventKey="home3" title={<span>2 <i className="fas fa-star text-yellow font-10" /> </span>}>
                            <ReviewsList Page />
                        </Tab>
                        <Tab eventKey="home4" title={<span>1 <i className="fas fa-star text-yellow font-10" /> </span>}>
                            <ReviewsList Page />
                        </Tab>
                    </Tabs>
                </Container>
            </section>
        </>
    )
}

export default Reviews;