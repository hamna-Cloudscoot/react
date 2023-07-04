import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import Packages from "../../Components/Packages";
import "react-credit-cards/es/styles-compiled.css";
import CredeitCards from "../../Components/CredeitCards";


const Payment = (props) => {


    const data = [
        {
            price:"30",
            duration:"Per Month",
            text: "Legal Documents Only Plan ",
            childData: [
                {
                    option:"Access to all legal documents",
                },
                {
                    option:"Download in .DOC format",
                }
            ]
        }
    ]

    return(
        <>
            <section>
                <Container>
                    <Row>
                        <Col md={6} className={"offset-md-3"}>
                            <div className={"mb-5"}>
                                {data.map((data) => (
                                    <Packages data={data} />
                                ))}
                            </div>
                            <CredeitCards />
                            <Button variant={"secondary w-100"}>Pay</Button>

                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Payment;