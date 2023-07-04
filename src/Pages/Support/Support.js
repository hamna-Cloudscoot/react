import React, { useState } from "react";
import Banner from "../../Components/Banner";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SupportAPIs from "APIs/support"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Formik } from "formik";
import * as yup from "yup";
import validator from 'validator';
import Loader from "Components/Loader";

const Support = () => {

    // Support APIs
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required').test('Unique Email', 'Invalid Email', // <- key, message
            async (value) => {
                try {
                    if (validator.isEmail(value)) {
                        return true
                    }
                } catch (error) {
                    console.log(error)
                    return true
                }
            }
        ),
        name: yup.string().required('Name is required'),
        message: yup.string().required('Message is required')
    });

    const submitHandler = async (data2) => {
        setIsLoading(true);
        try {
            const res = await SupportAPIs.sendSupportRequest(data2);
            if (res) {
                toast.success("Request Submited Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.log("error")
            toast.error("Something Went Wrong", {
                position: "top-right",
                autoClose: 2000,
            });
        }
        setIsLoading(false);
    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <Banner
                dots
                title={"Support"}
                description={"Send your concerns and other inquiries to us and we will surely get back to you as soon as possible."}
            />
            <section className={"section"}>
                <Container>
                    <Row>
                        <Col md={6} className={"offset-md-3"}>

                            <Formik
                                validationSchema={schema}
                                onSubmit={(data) => {submitHandler(data)}}
                                initialValues={{
                                    email: '',
                                    name: '',
                                    message: ''
                                }}
                                enableReinitialize={true}
                                validateOnChange={false}
                            >
                                {({ handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    touched,
                                    isValid,
                                    errors,
                                    setFieldValue
                                }) => (
                                    <Form noValidate onSubmit={handleSubmit}>

                                        <Form.Group className={"form-group"}>
                                            <Form.Control type={'text'} name="name" placeholder={"Type here"} value={values.name} onChange={handleChange} isInvalid={!!errors.name} required />
                                            <Form.Label>Name</Form.Label>
                                        </Form.Group>
                                        <p className="countryerror">{errors.name}</p>
                                        <Form.Group className={"form-group"}>
                                            <Form.Control type={'email'} name="email" placeholder={"Type here"} value={values.email} onChange={handleChange} required />
                                            <Form.Label>Email</Form.Label>
                                        </Form.Group>
                                        <p className="countryerror">{errors.email}</p>
                                        <Form.Group className={"form-group"}>
                                            <Form.Control as={"textarea"} placeholder={"Type here"} name="message" value={values.message} onChange={handleChange} required />
                                            <Form.Label>Message</Form.Label>
                                        </Form.Group>
                                        <p className="countryerror">{errors.message}</p>
                                        <Form.Group className={"form-group"}>
                                            <Button type={"submit"} variant={"secondary w-100"}>Submit</Button>
                                        </Form.Group>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="py-4 phone-sec" style={{ background: "#826A17" }}>
                <Container>
                    <h6>Phone Number</h6>
                    <h4 className="mb-0">+1 (888) 979-7510</h4>
                </Container>
            </section>
        </>
    )
}

export default Support;