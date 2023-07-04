import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthAPIs from "APIs/auth"

import { Formik } from "formik";
import * as yup from "yup";

const NewPassword = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [code, setCode] = useState('')

    const schema = yup.object().shape({
        password: yup.string()
            .min(8, 'Password is too short - should be of minimum 8 characters.')
            .max(64, 'Password is too long - should be of maximum 64 characters.')
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/, 'Password should contain capital letter, small letter, special character and number.').required('Password is required.'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    });

    const redirectToLogin = () => {
        navigate("/login");
    }

    const getCodeFromUrl = () => {
        const code = searchParams.get("code");
        if (!code) {
            redirectToLogin()
            toast.error("No code found", {
                position: "top-right",
                autoClose: 2000,
            });
            return
        }
        setCode(code)
        verifyCode(code)
    }

    const verifyCode = async (code) => {
        const res = await AuthAPIs.verifyResetPasswordCode(code)
        if (res) {
            // redirectToLogin()
        }
    }

    const changePassword = async (data) => {
        const res = await AuthAPIs.changePassword(code, data.password)
        if (res) {
            redirectToLogin()

            toast.success("Password changed successfully", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    }

    useEffect(() => {
        getCodeFromUrl()
    }, [])


    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { console.log(data); changePassword(data) }}
                initialValues={{
                    password: '',
                    confirmPassword: ''
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
                        <h1 className={classes.formTitle}>Create New Password</h1>
                        <p>Enter your new password below</p>
                        <Form.Group className={"form-group"}>
                            <Form.Control
                                type={"password"}
                                name={"password"}
                                placeholder={"Type here"}
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                                required />
                            <Form.Label>New Password</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control
                                type={"password"}
                                name={"confirmPassword"}
                                placeholder={"Type here"}
                                value={values.confirmPassword}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Label>Re-type New Password</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Button type={'submit'} variant={"secondary w-100"}>Create New Password</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default NewPassword;