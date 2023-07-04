import React, { useState, useEffect } from "react";
import classes from 'Pages/Auth/index.module.scss'
import { Button, Form, } from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";
import AvailabilityAPIs from 'APIs/availability/index'

import { Formik } from 'formik';
import * as yup from 'yup';
import { convert_to_12_hour } from "GlobalHelperFunctions";

const AvailableTime = ({
    currentStep,
    setCurrentStep,
    userState,
    setUserState
}) => {

    let user = {
        availableTimeSlots: userState.availableTimeSlots,
    }

    const schema = yup.object().shape({
        availableTimeSlots: yup.array().min(1).of(yup.string().required()).required()
    });

    const [timeSlotsState, setTimeSlotsState] = useState([])

    const [selectedTimeSlots, setSelectedTimeSlots] = useState([])

    const getAvailableTimeSlots = async () => {
        try {
            const res = await AvailabilityAPIs.getAvailableTimeSlots()
            if (res) {
                setTimeSlotsState(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const timeSlotsArr = (e, setFieldValue) => {
        let timeSlots = selectedTimeSlots
        if (e.target.checked) {
            timeSlots.push(e.target.id)
        }
        else {
            timeSlots.splice(timeSlots.indexOf(e.target.id), 1)
        }
        setSelectedTimeSlots(timeSlots)
        setFieldValue('availableTimeSlots', timeSlots)
        // props.setUserState({ ...props.userState, availableTimeSlots: timeSlots })
    }

    useEffect(() => {
        getAvailableTimeSlots()
    }, [])

    const moveToNextPage = (data) => {
        setUserState({ ...userState, ...data })
        setCurrentStep(6)
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
                        <p className={'fw-semibold'}>Select Time</p>
                        {errors.availableTimeSlots ? <p style={{ color: 'red' }}>Please select at least one time as availability</p> : <></>}
                        <ul className={classes.checkBoxList}>
                            {timeSlotsState.map((timeSlot) => (
                                <li>
                                    <Form.Check
                                        className={classes.formCheck}
                                        label={`${convert_to_12_hour(timeSlot.start_time)} - ${convert_to_12_hour(timeSlot.end_time)}`}
                                        name="timeSlot"
                                        type={"checkbox"}
                                        id={timeSlot.id}
                                        onChange={((e) => timeSlotsArr(e, setFieldValue))}
                                        required
                                        isInvalid={!!errors.availableTimeSlots}
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

export default AvailableTime