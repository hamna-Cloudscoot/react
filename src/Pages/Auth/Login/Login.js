import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import AuthAPIs from "APIs/auth"
import { Link, useNavigate } from "react-router-dom";
import { authSuccess } from "redux/reducers/auth";
import { toast } from "react-toastify";
import ProfileAPIs from "APIs/profile/index";

import { Formik } from "formik";
import * as yup from "yup";
import validator from 'validator';
import { flattenArr } from "GlobalHelperFunctions";
import { userSuccess } from "redux/reducers/user";
import { setEmail } from "redux/reducers/signupEmail";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        password: yup.string().required('Password is required')
    });

    const getUserProfileData = async () => {
        const response = await ProfileAPIs.getProfile();

        const profile = response.data.data;

        const mappedUser = {
            id: profile.id,
            profilePic: profile?.profilePic,
            profilePicId: profile?.profilePic?.id,
            profilePicSrc: profile?.profilePic?.path,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            password: '',
            repeatPassword: '',
            phoneNumber: profile.phoneNumber,
            linkedInProfile: profile.linkedinProfile,
            skills: profile.skills ? profile.skills.split(',') : [],
            city: profile.city,
            country: profile.country,
            pitchDeckDocument: profile.pitchDeck,
            pitchDeckDocumentId: profile?.pitchDeck?.id,
            pitchDeckDocumentSrc: profile?.pitchDeck?.path,
            businessProfileDocument: profile.businessPlan,
            businessProfileDocumentId: profile?.businessPlan?.id,
            businessProfileDocumentSrc: profile?.businessPlan?.path,
            otherDocuments: profile.otherDocuments,
            otherDocumentSrc: [],
            availableDays: flattenArr(profile?.availability_days, 'day'),
            availableTimeSlots: flattenArr(profile?.availability_slots, 'timeSlot'),
            areYou: profile.designation,
            lookingFor: profile.lookingFor,
            hasErrors: false,
            paymentVerified: profile.paymentVerified,
            subscriptionId: profile.subscriptionId,
            errors: {}
        }
        dispatch(userSuccess({
            user: mappedUser
        }))
    };

    const loginRes = async (data) => {

        try {
            const res = await AuthAPIs.login(data.email, data.password)
            if (res) {
                if (res.data.data.user.role !== 'user') {
                    toast.error("Unauthorized", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                    navigate('/login')
                    return
                }

                dispatch(authSuccess({
                    userId: JSON.stringify(res.data.data.user.id),
                    accessToken: JSON.stringify(res.data.data.tokens.accessToken),
                    refreshToken: JSON.stringify(res.data.data.tokens.refreshToken),
                    user: JSON.stringify(res.data.data.user)
                }))
                getUserProfileData()
                localStorage.setItem("accessToken", JSON.stringify(res.data.data.tokens.accessToken));
                localStorage.setItem("refreshToken", JSON.stringify(res.data.data.tokens.refreshToken));
                dispatch(
                    setEmail({
                        email: res.data.data.user.email
                    })
                )
                if (res.data.data.user.paymentVerified === false) {
                    navigate('/subscription-payment');
                    return
                }
                navigate('/dashboard');
                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.log(error);
            // toast.error("Incorrect Login Details", {
            //     position: "top-right",
            //     autoClose: 2000,
            // });
        }
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { console.log(data); loginRes(data) }}
                initialValues={{
                    email: '',
                    password: ''
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
                        <h1 className={classes.formTitle}>Login to Open Founder</h1>
                        <p>Enter your details below</p>
                        <Form.Group className={"form-group"}>
                            <Form.Control
                                type={"email"}
                                name={"email"}
                                placeholder={"Type here"}
                                value={values.email}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.email}
                            />
                            <Form.Label>Email</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control
                                type={"password"}
                                name={"password"}
                                placeholder={"Type here"}
                                value={values.password}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.password}
                            />
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Link to={"/forgetpassword"} className={"text-orange text-decoration-none"}>Forgot Password</Link>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Button type={'submit'} variant={"secondary w-100"}>Log In</Button>
                        </Form.Group>
                        <Form.Group className={"mb-3 text-center"}>
                            Don’t have an account yet? <Link to={"/signup"} className={"text-orange"}>Sign Up</Link>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default Login;