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
                            <Col md={7}>
                                <div className={classes.textBox}>
                                    <h3>{data.title}</h3>
                                    {data.description ? <p>{data.description}</p> : null}
                                </div>
                            </Col>
                            <Col md={5} className={"p-0"}>
                            <div className={`${classes.imgBox}`}>
                                <img src={data.imageUrl} />
                                {data.videoUrl ? <Button variant={"video"}><i className={"fas fa-play"}></i></Button> : null}
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