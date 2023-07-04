import React, { useState, useEffect } from "react";
import classes from 'Pages/Auth/index.module.scss'
import { Button, Form, } from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";
import { Country, State, City } from "country-state-city";

import { Formik } from 'formik';
import * as yup from 'yup';
import { TagsInput } from "react-tag-input-component/dist";

// const urlRegex = /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
const urlRegex = /^(https?:\/\/)?([a-z]{2,3}\.)?(linkedin\.com\/)(in\/)?([a-zA-Z0-9-_.]+\/?)$/;
// const urlRegex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const MoreInfo = ({
    currentStep,
    setCurrentStep,
    userState,
    setUserState
}) => {

    let user = {
        linkedInProfile: userState.linkedInProfile,
        skills: userState.skills,
        city: userState.city,
        country: userState.country
    }

    const schema = yup.object().shape({
        linkedInProfile: yup.string().matches(urlRegex, 'Linkedin URL is not valid').required(),
        skills: yup.array().of(yup.string()).required(),
        city: yup.string().matches(/^[a-zA-Z\s]+$/, 'The city name should only contain alphabetic letters.').required('City is required.'),
        country: yup.string().required(),
    });

    const [skills, setSkills] = useState([]);

    const handleCommaSeparatedSkills = (value) => {
        console.log(value)
        const skills = value.split(',')
        const skillsArr = []
        skills.forEach(element => {
            if (element && element.length && !skillsArr.includes(element.trim())) skillsArr.push(element.trim())
        });
        console.log('killsArr', skillsArr)
        return skillsArr
        // props.setUserState({ ...props.userState, skills: skillsArr })
    }

    const moveToNextPage = (data) => {
        setUserState({ ...userState, ...data })
        setCurrentStep(3)
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { moveToNextPage(data) }}
                initialValues={user}
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
                        <h1 className={classes.formTitle}>More info about you</h1>
                        <p>We need additional details about you</p>
                        <p>Fill in</p>
                        <Form.Group className={"form-group"}>
                            <Form.Control
                                type={"text"}
                                name={'linkedInProfile'}
                                placeholder={"Paste link here"}
                                value={values.linkedInProfile}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.linkedInProfile}
                            />
                            <Form.Label>LinkedIn Profile</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.linkedInProfile == 'linkedInProfile is a required field' ? 'LinkedIn Profile is required' : errors.linkedInProfile}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            {/* <Form.Control
                                type={"text"}
                                name={'skills'}
                                placeholder={"Type here, separate using comma"}
                                value={skills}
                                onChange={(e) => { setSkills(e.target.value); }}
                                onBlur={() => { setFieldValue('skills', handleCommaSeparatedSkills(skills)) }}
                                required
                                isInvalid={!!errors.skills}
                            /> */}
                            <TagsInput value={skills} onChange={setSkills} onBlur={() => { setFieldValue('skills', skills) }} placeHolder="Enter skill and press enter" />
                            <Form.Label>Skills</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                Skills are required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control
                                type={"text"}
                                name={'city'}
                                placeholder={"Type here"}
                                value={values.city}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.city}
                            />
                            <Form.Label>City</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Select
                                options={Country.getAllCountries()}
                                getOptionLabel={(options) => {
                                    return options["name"];
                                }}
                                getOptionValue={(options) => {
                                    return options["name"];
                                }}
                                value={values.country}
                                onChange={(item) => {
                                    setFieldValue('country', item.target.value)
                                    // props.setUserState({ ...props.userState, country: item.target.value })
                                }}
                                required
                            >
                                <option selected>Choose here</option>
                                {Country.getAllCountries().map((e, key) => {
                                    return <option key={key} value={e.value}>{e.name}</option>;
                                })}
                            </Form.Select>
                            <Form.Label>Country</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                Country is required.
                            </Form.Control.Feedback>
                            {errors.country && touched.country && (
                                <div className="countryerror">Country is required</div>
                            )}
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

export default MoreInfo