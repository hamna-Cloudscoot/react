import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import ContactList from "../ContactList";
import SocialLinks from "../SocialLinks";
import SubscribeForm from "../SubscribeForm";
import FooterNav from "./FooterNav";
import classes from "./index.module.scss"

const Footer = (props) => {
    return (
        <footer id={`${classes.footer}`}>
            <Container>
                <Row className={"mb-4"}>
                    <Col lg={7}>
                        <SubscribeForm />
                        <FooterNav />
                    </Col>
                    <Col lg={5}>
                        <div className={classes.extraPadding}>
                            <h6 className={"text-white fontfamily-source font-18"}>Contact Us</h6>
                            <ContactList />
                            <SocialLinks
                                facebook
                            />
                        </div>
                    </Col>
                </Row>
                <div className={classes.copyright}>
                    Open Founder 2022, All Rights Reserved
                </div>
            </Container>

        </footer>
    );
};

export default Footer;
