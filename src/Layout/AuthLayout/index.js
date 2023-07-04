import React from "react";
import classes from "./index.module.scss";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import authLogo from "../../Images/authLogo.svg";

const AuthLayout = ({ children }) => {
  return (
    <div id={classes.wrapper}>
      <Header />
      <main id={classes.main}>
          <section className={'section'}>
              <Container>
                  <Row>
                      <Col lg={6} className={"offset-lg-3"}>
                          <div className={classes.logo}>
                              <Link to={"/"}>
                                  <img src={authLogo} alt={"open advisor"} />
                              </Link>
                          </div>
                          {children}
                      </Col>
                  </Row>
              </Container>
          </section>
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
