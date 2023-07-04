import React, { useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import classes from "./index.module.scss";
import UploadProfilePicture from "../../../Components/UploadProfilePicture";
import ProfileAPIs from "APIs/profile/index";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { flattenArr } from "GlobalHelperFunctions";
import { userSuccess } from "redux/reducers/user";
import AuthAPIs from 'APIs/auth/index'
import isEmailValidator from 'validator/lib/isEmail';

const phoneRegExp = /^(?:(?:\+|00)(\d{1,3})[\s.-]?)?((?:\(\d{1,}\))|(?:\d{1,}[\s.-]?\d{1,})|(?:\(\d{3}\)[\s.-]?\d{3}[\s.-]?\d{4}))[\s.-]?((?:x|ext\.?|\#)(\d+))?$/

const AccountSetting = ({ userData, setUserData }) => {
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        firstName: yup.string().matches(/^[a-zA-Z\s]+$/, 'The first name should only contain alphabetic letters.').required('First name is required.').min(3, 'First name should be at least 3 characters').max(15, 'First name should not exceed 15 characters'),
        lastName: yup.string().matches(/^[a-zA-Z\s]+$/, 'The last name should only contain alphabetic letters.').required('Last name is required.').min(3, 'Last name should be at least 3 characters').max(15, 'Last name should not exceed 15 characters'),
        phoneNumber: yup.string().matches(phoneRegExp, `Phone number is not valid.`).required('Phone number is required.').min(3, 'Phone number should be at least 3 digits').max(20, 'Phone number should not exceed 20 digits'),
        email: yup.string(),
        password: yup.string()
            .min(8, 'Password is too short - should be of minimum 8 characters.')
            .max(64, 'Password is too long - should be less than 64 chars maximum.')
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/, 'Password should contains capital letter, small letter, special character and number.').required('Password is required.'),
        repeatPassword: yup.string().required('Confirm password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match')
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
            errors: {}
        }
        dispatch(userSuccess({
            user: mappedUser
        }))
        setUserData(mappedUser)
    };

    const updateProfile = async (user) => {
        try {
            let profileUpdatePayload = {
                phoneNumber: user.phoneNumber,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePic: user.profilePicId ? user.profilePicId : user.profilePic
            };
            if (userData.profilePicId !== user.profilePicId) {
                user.profilePicId = userData.profilePicId
            }
            if (user.password.length > 5) {
                profileUpdatePayload.password = user.password
            }
            const res = await ProfileAPIs.updateProfile(profileUpdatePayload);
            if (res) {
                getUserProfileData()
                toast.success("Profile updated successfully.", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.log("update profile error", error);
        }
    };

    useEffect(() => {
    }, [userData]);

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { updateProfile(data) }}
                initialValues={userData}
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
                        <Card>
                            <Card.Body>
                                <Card.Title className={`${classes.cardTitle} ${classes.cardTitleLine}`}>Account Information</Card.Title>
                                <UploadProfilePicture userState={userData} setUserState={setUserData} />
                                <Row>
                                    <Col md={6} className={'offset-md-3'}>
                                        <Form.Group className={'form-group'}>
                                            <Form.Control
                                                type={"text"}
                                                placeholder={"Type here"}
                                                className={'fw-bold'}
                                                name={'firstName'}
                                                value={values.firstName}
                                                onChange={handleChange}
                                                isInvalid={!!errors.firstName}
                                            />
                                            <Form.Label>First Name </Form.Label>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.firstName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={'form-group'}>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                className={'fw-bold'}
                                                value={values.lastName}
                                                onChange={handleChange}
                                                isInvalid={!!errors.lastName}
                                            />
                                            <Form.Label>Last Name </Form.Label>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lastName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={'form-group'}>
                                            <Form.Control
                                                type="tel"
                                                name={"phoneNumber"}
                                                className={'fw-bold'}
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                                isInvalid={!!errors.phoneNumber}
                                            />
                                            <Form.Label>Phone Number </Form.Label>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phoneNumber}
                                            </Form.Control.Feedback>

                                        </Form.Group>
                                        <Form.Group className={'form-group'}>
                                            <Form.Control
                                                type="email"
                                                name={"email"}
                                                className={'fw-bold'}
                                                value={values.email}
                                                onChange={handleChange}
                                                isInvalid={!!errors.email}
                                                disabled={true}
                                            />
                                            <Form.Label>Email Address </Form.Label>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={'form-group'}>
                                            <Form.Control
                                                type="password"
                                                name={"password"}
                                                className={'fw-bold'}
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Label>Password </Form.Label>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={'form-group'}>
                                            <Form.Control
                                                type="password"
                                                name={"repeatPassword"}
                                                className={'fw-bold'}
                                                onChange={handleChange}
                                                isInvalid={!!errors.repeatPassword}
                                            />
                                            <Form.Label>Confirm Password </Form.Label>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.repeatPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={`form-group ${classes.btnRow}`}>
                                            <Button variant={'light'}>Cancel</Button>
                                            <Button variant={'secondary'} type={'submit'}>Update Details</Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AccountSetting;