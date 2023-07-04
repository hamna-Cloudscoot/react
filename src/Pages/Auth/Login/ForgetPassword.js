import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthAPIs from "APIs/auth"

import { Formik } from "formik";
import * as yup from "yup";
import validator from 'validator';

const ForgetPassword = () => {
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Required').test('Unique Email', 'Invalid Email', // <- key, message
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
    });

    const redirectToLogin = () => {
        navigate("/login");
    }

    const sendResetPasswordLink = async (data) => {
        const res = await AuthAPIs.forgetPassword(data.email, 'user');
        if (res) {
            toast.success("Thanks!, If there’s an account associated with this email, we’ll send the password reset instructions immediately.", {
                position: "top-right",
                autoClose: 2000,
            });
            setSuccess(true)
        }
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { console.log(data); sendResetPasswordLink(data) }}
                initialValues={{
                    email: '',
                }}
                enableReinitialize={true}
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
                        <h1 className={classes.formTitle}>Forgot your password?</h1>
                        {success ? <>
                            <Alert variant="success">Thanks. If there’s an account associated with this email, we’ll send the password reset instructions immediately</Alert>
                        </> : <></>}
                        <p>Enter your email below</p>
                        <Form.Group className={"form-group"}>
                            <Form.Control
                                type={"email"}
                                name={"email"}
                                placeholder={"Type here"}
                                className={"validation-success"}
                                values={values.email}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.email}
                                isValid={touched.email && !errors.email}
                            />
                            <Form.Label>Email</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Button type={'submit'} variant={"secondary w-100"}>Get New Password</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ForgetPassword;