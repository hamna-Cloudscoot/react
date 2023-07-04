import React from "react";
import classes from 'Pages/Auth/index.module.scss'
import { Form, Button } from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";

import { Formik } from 'formik';
import * as yup from 'yup';

const AreYou = ({
    currentStep,
    setCurrentStep,
    userState,
    setUserState
}) => {

    let user = {
        areYou: userState.areYou || '',
    }

    const schema = yup.object().shape({
        areYou: yup.string().required()
    });

    const professions = [
        { type: "Founder", value: 'founder' },
        { type: "CoFounder", value: 'co_founder' },
        { type: "Lawyer", value: 'lawyer' },
        { type: "Accountant", value: 'accountant' },
    ]

    const moveToNextPage = (data) => {
        setUserState({ ...userState, ...data })
        setCurrentStep(7)
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
                        <h1 className={classes.formTitle}>Are you a</h1>
                        {errors.areYou ? <p style={{ color: 'red' }}>Please provide your profession</p> : <></>}
                        <ul className={classes.checkBoxList}>
                            {professions.map((profession) => (
                                <li>
                                    <Form.Check
                                        className={classes.formCheck}
                                        label={profession.type}
                                        name="areYou"
                                        type={"radio"}
                                        id={profession.value}
                                        value={profession.value}
                                        onChange={handleChange}
                                        isInvalid={!!errors.areYou}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.areYou}
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

export default AreYou