import React, { useState, useEffect } from "react";
import classes from 'Pages/Auth/index.module.scss'
import { Button, Form, } from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";
import AuthAPIs from 'APIs/auth/index'


import { Formik } from 'formik';
import * as yup from 'yup';
import isEmailValidator from 'validator/lib/isEmail';

const phoneRegExp = /^(?:(?:\+|00)(\d{1,3})[\s.-]?)?((?:\(\d{1,}\))|(?:\d{1,}[\s.-]?\d{1,})|(?:\(\d{3}\)[\s.-]?\d{3}[\s.-]?\d{4}))[\s.-]?((?:x|ext\.?|\#)(\d+))?$/
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const supportedPhoneFormats = `
+61 1 2345 6789
+61 01 2345 6789
01 2345 6789
01-2345-6789
(01) 2345 6789
(01) 2345-6789
`

const PersonalDetails = ({
    currentStep,
    setCurrentStep,
    userState,
    setUserState
}) => {

    let user = {
        profilePic: null,
        profilePicId: null,
        profilePicSrc: null,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        phoneNumber: '',
        linkedInProfile: '',
        skills: null,
        city: '',
        country: '',
        pitchDeckDocument: {},
        pitchDeckDocumentId: '',
        pitchDeckDocumentSrc: null,
        businessProfileDocument: {},
        businessProfileDocumentId: '',
        businessProfileDocumentSrc: null,
        otherDocuments: [],
        otherDocumentSrc: [],
        availableDays: [],
        availableTimeSlots: [],
        areYou: null,
        lookingFor: null,
        hasErrors: false,
        errors: {}
    }

    const schema = yup.object().shape({
        firstName: yup.string().matches(/^[a-zA-Z\s]+$/, 'The first name should only contain alphabetic letters.').required('First name is required.').min(3, 'First name should be at least 3 characters').max(15, 'First name should not exceed 15 characters'),
        lastName: yup.string().matches(/^[a-zA-Z\s]+$/, 'The last name should only contain alphabetic letters.').required('Last name is required.').min(3, 'Last name should be at least 3 characters').max(15, 'Last name should not exceed 15 characters'),
        // phoneNumber: yup.string().mob(`Phone number is not valid, please see this for supported phone formats.`).required(),
        phoneNumber: yup.string().matches(phoneRegExp, `Phone number is not valid.`).required('Phone number is required.').min(3, 'Phone number should be at least 3 digits').max(20, 'Phone number should not exceed 20 digits'),
        email: yup.string().email('Invalid email format').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format').required('Email is required').test('Unique Email', 'Email already registered', // <- key, message
            async (value) => {
                try {
                    if (!isEmailValidator(value)) {
                        return true
                    }
                    const emailExists = await AuthAPIs.emailAlreadyExist(value)
                    return emailExists.data.data ? false : true
                } catch (error) {
                    console.log(error)
                    return true
                }
            }
        ),
        password: yup.string()
            .min(8, 'Password is too short - should be of minimum 8 characters.')
            .max(64, 'Password is too long - should be less than 64 chars maximum.')
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/, 'Password should contains capital letter, small letter, special character and number.').required(),
        repeatPassword: yup.string().required('Re-type Password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const moveToNextPage = (data) => {
        setUserState({ ...userState, ...data })
        setCurrentStep(2)
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { moveToNextPage(data) }}
                initialValues={userState}
                validateOnChange={false}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    setFieldValue,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <h1 className={classes.formTitle}>Sign Up to Open Founder</h1>
                        <p>We need your personal details</p>
                        <p>Information About You</p>
                        <Form.Group className={"form-group invalid"}>
                            <Form.Control
                                type={"text"}
                                placeholder={"Type here"}
                                name={'firstName'}
                                value={values.firstName}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Label>First Name</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control type={"text"} placeholder={"Type here"} name={'lastName'} value={values.lastName} onChange={handleChange} required isInvalid={!!errors.lastName} />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control type={"tel"} placeholder={"Type here"} name={'phoneNumber'} value={values.phoneNumber} onChange={handleChange} required isInvalid={!!errors.phoneNumber} />
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.phoneNumber}
                                {/* {errors.phoneNumber ? <p>{supportedPhoneFormats}</p> : <></>} */}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control type={"email"} placeholder={"Type here"} name={'email'} value={values.email} onChange={handleChange} required isInvalid={!!errors.email} />
                            <Form.Label>Email</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <div className={"font-16"}>Create Your Password</div>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control type={"password"} placeholder={"Type here"} name={'password'} value={values.password} onChange={handleChange} required isInvalid={!!errors.password} />
                            <Form.Label>Password</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {console.log("Password Errors =  -", errors.password)}
                                {errors.password == 'password is a required field' ? 'Password is required' : errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control type={"password"} placeholder={"Type here"} name={'repeatPassword'} value={values.repeatPassword} onChange={handleChange} required isInvalid={!!errors.repeatPassword} />
                            <Form.Label>Re-type Password</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.repeatPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Button type={"submit"} variant={"secondary w-100"}>Next</Button>
                        </Form.Group>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default PersonalDetails;