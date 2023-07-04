import React from "react";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";

const PostCol = (props) => {

    return (
        <>
            {props.data?.map((data, index) => (
                <section className={`section ${classes.section}`} key={index}>
                    <Container>
                        <Row className={`d-flex align-items-center ${data.videoUrl ? `${classes.video}` : ''}`}>
                            <Col md={6}>
                                <div className={`${classes.imgBox}`}>
                                    <img src={data.imageUrl} />
                                    {data.videoUrl ? <Button variant={"video"}><i className={"fas fa-play"}></i></Button> : null}
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className={classes.textBox}>
                                    <h2>{data.title}</h2>
                                    {data.description ? <p>{data.description}</p> : null}
                                    {data.buttonOneUrl ? <Link to={data.buttonOneUrl} className={"btn btn-primary m-1"}>{props.buttonOneText}</Link> : null}
                                    {data.buttonTwoUrl ? <Link to={data.buttonTwoUrl} className={"btn btn-secondary m-1"}>{props.buttonTwoText}</Link> : null}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            ))}
        </>
    )
}

export default PostCol;