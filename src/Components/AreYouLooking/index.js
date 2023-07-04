import React, { useState, useEffect } from "react";
import classes from 'Pages/Auth/index.module.scss'
import { Button, Form, } from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";

import { Formik } from 'formik';
import * as yup from 'yup';

const AreYouLooking = ({
    currentStep,
    setCurrentStep,
    userState,
    setUserState
}) => {

    let user = {
        lookingFor: userState.lookingFor,
    }

    const schema = yup.object().shape({
        lookingFor: yup.array().min(1).of(yup.string().required()).required()
    });

    const [lookingFor, setLookingFor] = useState([])

    const areYouLooking = [
        { type: "Founder", value: 'founder' },
        { type: "CoFounder", value: 'co_founder' },
        { type: "Lawyer", value: 'lawyer' },
        { type: "Accountant", value: 'accountant' },
    ]


    const lookingForArr = (e, setFieldValue) => {
        let looking = lookingFor
        if (e.target.checked) {
            looking.push(e.target.id)
        }
        else {
            looking.splice(looking.indexOf(e.target.id), 1)
        }
        setLookingFor(looking)
        setFieldValue('lookingFor', looking)
        // props.setUserState({ ...props.userState, lookingFor: looking })
    }

    const moveToNextPage = (data) => {
        setUserState({ ...userState, ...data })
        setCurrentStep(8)
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { moveToNextPage(data) }}
                initialValues={user}
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
                        <h1 className={classes.formTitle}>are you looking for a</h1>
                        <ul className={classes.checkBoxList}>
                        {errors.lookingFor ? <p style={{ color: 'red' }}>Please provide what people you are looking for</p> : <></>}
                            {areYouLooking.map((areYouLooking) => (
                                <li>
                                    <Form.Check
                                        className={classes.formCheck}
                                        label={areYouLooking.type}
                                        name="AreYouLooking"
                                        type={"checkbox"}
                                        id={areYouLooking.value}
                                        onChange={((e) => lookingForArr(e, setFieldValue))}
                                        isInvalid={!!errors.lookingFor}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lookingFor}
                                    </Form.Control.Feedback>
                                </li>
                            ))}
                        </ul>

                        <Form.Group className={"mb-3"}>
                            <Button type={"submit"} variant={"secondary w-100"}>Next</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default AreYouLooking