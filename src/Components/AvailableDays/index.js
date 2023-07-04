import React, { useState, useEffect } from "react";
import classes from 'Pages/Auth/index.module.scss'
import { Button, Form, } from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";
import AvailabilityAPIs from 'APIs/availability/index'

import { Formik } from 'formik';
import * as yup from 'yup';

const AvailableDays = ({
    currentStep,
    setCurrentStep,
    userState,
    setUserState
}) => {

    let user = {
        availableDays: userState.availableDays,
    }

    const schema = yup.object().shape({
        availableDays: yup.array().min(1).of(yup.string().required()).required()
    });

    const [daysState, setDaysState] = useState([])

    const [selectedDays, setSelectedDays] = useState([])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getAvailableDays = async () => {
        try {
            const res = await AvailabilityAPIs.getAvailableDays()
            if (res) {
                setDaysState(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const availableDays = (e, setFieldValue) => {
        let days = selectedDays
        if (e.target.checked) {
            days.push(e.target.id)
        }
        else {
            days.splice(days.indexOf(e.target.id), 1)
        }
        setSelectedDays(days)
        setFieldValue('availableDays', days)
        // props.setUserState({ ...props.userState, availableDays: days })
    }

    useEffect(() => {
        getAvailableDays()
    }, [])

    const moveToNextPage = (data) => {
        setUserState({ ...userState, ...data })
        setCurrentStep(5)
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
                        <h1 className={classes.formTitle}>set your availability</h1>
                        <p>You need to setup your availability</p>
                        <p className={'fw-semibold'}>Select Days</p>
                        {errors.availableDays ? <p style={{ color: 'red' }}>Please select at least one day as availability</p> : <></>}
                        <ul className={classes.checkBoxList}>
                            {daysState.map((days) => (
                                <li>
                                    <Form.Check
                                        className={classes.formCheck}
                                        label={capitalizeFirstLetter(days.name)}
                                        name="days"
                                        type={"checkbox"}
                                        id={days.id}
                                        onChange={((e) => availableDays(e, setFieldValue))}
                                        required
                                        isInvalid={!!errors.availableDays}
                                    />
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

export default AvailableDays