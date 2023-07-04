import React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import classes from "./index.module.scss";
import paymentCards from "../../../Images/paymentCards.svg";
import SelectDropDown from "../../../Components/SelectDropDown";

const options = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "Pakistan", label: "Pakistan" },
];

const PaymentSetting = () => {

    return(
        <>
            <Card>
                <Card.Body>
                    <Card.Title className={classes.cardTitle}>Add Payment Details</Card.Title>
                    <Form className={"p-5"}>
                        <div className={'mb-5'}>
                            <img src={paymentCards} alt={'payment Cards'} width={250} />
                        </div>
                        <Card className={"mb-3"}>
                            <Card.Title className={classes.formTitle}>Personal Information</Card.Title>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="text" placeholder={"Type here"} />
                                        <Form.Label>First Name </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="text" placeholder={"Type here"} />
                                        <Form.Label>Last Name </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card>
                        <Card className={"mb-3"}>
                            <Card.Title className={classes.formTitle}>Card Information</Card.Title>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="text" placeholder={"Card Number"} />
                                        <Form.Label>Required </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="date" placeholder={"MM / YYYY"} />
                                        <Form.Label>Expires </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="text" placeholder={"Security Code"} />
                                        <Form.Label>CVV </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <SelectDropDown
                                            //isSearchable
                                            placeHolder="Select here"
                                            options={options}
                                            onChange={(value) => console.log(value)}
                                        />
                                        <Form.Label>Country </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card>
                        <Card className={"mb-3"}>
                            <Card.Title className={classes.formTitle}>Billing Address</Card.Title>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="text" placeholder={"Type here"} />
                                        <Form.Label>Address 1 </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="text" placeholder={"Type here"} />
                                        <Form.Label>Address 2 </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <SelectDropDown
                                            //isSearchable
                                            placeHolder="Select here"
                                            options={options}
                                            onChange={(value) => console.log(value)}
                                        />
                                        <Form.Label>City </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <SelectDropDown
                                            //isSearchable
                                            placeHolder="Select here"
                                            options={options}
                                            onChange={(value) => console.log(value)}
                                        />
                                        <Form.Label>Country </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="text" placeholder={"Type here"} />
                                        <Form.Label>Postal/Zip Code </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className={'form-group'}>
                                        <Form.Control type="tel" placeholder={"Type here"} />
                                        <Form.Label>Phone </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col md={6} className={'offset-md-3 pt-5'}>
                                    <Form.Group className={classes.btnRow}>
                                        <Button variant={'secondary'}>Add Payment</Button>
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Card>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default PaymentSetting;