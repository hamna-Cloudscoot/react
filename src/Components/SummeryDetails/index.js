import React, { useState, useEffect } from "react";
import classes from "./index.module.scss";
import { Button, Card, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import SelectDropDown from "../SelectDropDown";
import f1 from "../../Images/f1.png";
import f2 from "../../Images/f3.png";
import f3 from "../../Images/f3.png";
import Cards from "react-credit-cards";
import UploadProfilePicture from "../UploadProfilePicture";
import { Link, useNavigate } from "react-router-dom";
import authLogo from "../../Images/authLogo.svg";
import AvailabilityAPIs from 'APIs/availability/index'
import AuthAPIs from 'APIs/auth/index'
import ProfileAPIs from 'APIs/profile/index'
import FileAPIs from 'APIs/file/index'
import { useDispatch } from "react-redux";
import { authSuccess } from "redux/reducers/auth";
import Enums from 'config/enums'
import { toast } from "react-toastify";
import baseDocImg from 'Images/doc-basic.png'
import { Formik } from 'formik';
import * as yup from 'yup';
import { TagsInput } from "react-tag-input-component/dist";
import { convert_to_12_hour, flattenArr } from "GlobalHelperFunctions";
import { userSuccess } from "redux/reducers/user";
import { setEmail } from "redux/reducers/signupEmail";
import Loader from "Components/Loader";

const FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const options = [
    { value: "Skills1", label: "Skills1" },
    { value: "Skills2", label: "Skills2" },
    { value: "Skills3", label: "Skills3" },
];


const professions = [
    { type: "Founder", value: 'founder' },
    { type: "CoFounder", value: 'co_founder' },
    { type: "Lawyer", value: 'lawyer' },
    { type: "Accountant", value: 'accountant' },
]


const SummeryDetails = ({ userState, setUserState }) => {

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phoneNumber: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
        repeatPassword: yup.string().required(),
        linkedInProfile: yup.string().required(),
        skills: yup.array().of(yup.string()).required(),
        city: yup.string().required(),
        country: yup.string().required(),
        pitchDeckDocument: yup.mixed()
            .test('fileSize', 'File too large or not present', function (value) {
                if (!value || (value && !value.size)) {
                    return this.createError({ message: 'A file is required' });
                }
                if (value.size > FILE_SIZE) {
                    return this.createError({ message: 'File size too large' });
                }
                return true;
            }),
        businessProfileDocument: yup.mixed().test("fileSize", "The file is too large", (value) => {
            if (!value.length) return true // attachment is optional
            return value[0].size <= 2000000
        }).optional(),
        otherDocuments: yup.array().of(yup.mixed().test("fileSize", "The file is too large", (value) => {
            if (!value.length) return true // attachment is optional
            return value[0].size <= 2000000
        })).optional(),
        availableDays: yup.array().min(1).of(yup.string().required()).required(),
        availableTimeSlots: yup.array().min(1).of(yup.string().required()).required(),
        areYou: yup.string().required(),
        lookingFor: yup.array().min(1).of(yup.string().required()).required()
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [disabled, setDisabled] = useState(true);
    const [isActive, setActive] = useState(false);

    const [daysState, setDaysState] = useState([])
    const [timeSlotsState, setTimeSlotsState] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [skills, setSkills] = useState(userState.skills);


    function handleFormDisable() {
        setDisabled(!disabled);
        setActive(!isActive);
    }
    const [filePitch, setFilePitch] = useState();
    function handleChange1(e) {
        setFilePitch(URL.createObjectURL(e.target.files[0]));
    }

    const convertFileToUrl = (file) => {
        return (URL.createObjectURL(file))
    }
    const [month, SetMonth] = useState("");
    const [focus, SetFocus] = useState("");


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
            paymentVerified: profile.paymentVerified,
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
        setUserState(mappedUser)
    };

    const userSignUp = async () => {
        try {
            setIsLoading(true)
            let user = userState;
            let signUpPayload = {
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
                firstName: user.firstName,
                lastName: user.lastName,
            }
            if (user.profilePicId) {
                signUpPayload.profilePic = user.profilePicId
            }
            const res = await AuthAPIs.signUp(signUpPayload)
            let userFromDb = res.data.data;
            dispatch(authSuccess({
                accessToken: JSON.stringify(res.data.data.tokens.accessToken),
                refreshToken: JSON.stringify(res.data.data.tokens.refreshToken),
                userId: JSON.stringify(res.data.data.id)
            }))
            localStorage.setItem('userId', JSON.stringify(userFromDb.id))
            localStorage.setItem('accessToken', JSON.stringify(userFromDb.tokens.accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(userFromDb.tokens.refreshToken))

            let pitchDocument;
            if (Object.keys(user.pitchDeckDocument).length > 0 || (user.pitchDeckDocument instanceof File)) {
                pitchDocument = await uploadPitchDocument(user.pitchDeckDocument)
            }
            let businessDocument;
            if (Object.keys(user.businessProfileDocument).length > 0 || (user.businessProfileDocument instanceof File)) {
                businessDocument = await uploadBusinessDocument(user.businessProfileDocument)
            }
            if (user.otherDocuments.length > 0 && (user.otherDocuments[0] instanceof File)) {
                await uploadOtherDocuments(user.otherDocuments, userFromDb.id)
            }
            await updateProfile(user, pitchDocument?.id, businessDocument?.id)
            dispatch(
                setEmail({
                    email: user.email
                })
            )
            // navigate('/dashboard');
            navigate('/subscription-payment');
            getUserProfileData()
            toast.success("Signed Up Successfully", {
                position: "top-right",
                autoClose: 2000,
            });
            return;

        } catch (error) {
            console.log('sign-up error', error);
            setIsLoading(false)
            // toast.error(`${error.message} || Form is not accurate`, {
            //     position: "top-right",
            //     autoClose: 2000,
            // });
        }
        setIsLoading(false);
    }

    const uploadPitchDocument = async (file) => {
        try {
            const dataArray = new FormData();
            dataArray.append("file", file);
            const res = await FileAPIs.uploadFile(dataArray)
            setUserState({ ...userState, pitchDeckDocumentId: res.data.data.id })
            return res.data.data
        } catch (error) {
            console.log('uploadPitchDocument error', error)
        }
    }

    const uploadBusinessDocument = async (file) => {
        try {
            const dataArray = new FormData();
            dataArray.append("file", file);
            const res = await FileAPIs.uploadFile(dataArray)
            setUserState({ ...userState, businessProfileDocumentId: res.data.data.id })
            return res.data.data
        } catch (error) {
            console.log('uploadBusinessDocument error', error)
        }
    }

    const uploadOtherDocuments = async (files, userId) => {
        try {
            const dataArray = new FormData();
            dataArray.append("attachments", ...files);
            const res = await FileAPIs.uploadFiles(dataArray, userId, Enums.AttachmentsTypeEnum.user)
        } catch (error) {
            console.log('uploadOtherDocuments error', error)
        }
    }

    const updateProfile = async (user, pitchDocumentId, businessDocumentId) => {
        try {
            let profileUpdatePayload = {
                linkedinProfile: user.linkedInProfile,
                skills: user.skills?.length > 0 ? skills.toString() : '',
                city: user.city,
                country: user.country,
                designation: user.areYou === 'CoFounder' ? 'co_founder' : user.areYou.toLowerCase(),
                lookingFor: user.lookingFor.map(val => val.trim() === 'CoFounder' ? 'co_founder' : val.toLowerCase()),
                pitchDeck: user.pitchDeckDocumentId || pitchDocumentId,
                businessPlan: user.businessProfileDocumentId || businessDocumentId,
                availibility_days: user.availableDays,
                availibility_time: user.availableTimeSlots
            }
            const res = await ProfileAPIs.updateProfile(profileUpdatePayload)
        } catch (error) {
            console.log('update profile error', error)
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleCommaSeparatedSkills = (value) => {
        const skills = value.split(',')
        const skillsArr = []
        skills.forEach(element => {
            if (element && element.length && !skillsArr.includes(element.trim())) skillsArr.push(element.trim())
        });
        setUserState({ ...userState, skills: skillsArr })
        return skillsArr
    }

    const shortenName = (name) => {
        if (name.length > 15) {
            const startStr = name.substr(0, 5)
            const endStr = name.substring(name.length - 5)
            return `${startStr}...${endStr}`
        }
        return name
    }

    const checkFileType = (file) => {
        switch (file?.mimeType || file?.type) {
            case 'application/pdf':
                return { src: baseDocImg, fileType: 'pdf', fileName: shortenName(file.fileName || file.name) }
            case 'image/jpeg':
                return { src: baseDocImg, fileType: 'jpg', fileName: shortenName(file.fileName || file.name) }
            case 'image/png':
                return { src: baseDocImg, fileType: 'png', fileName: shortenName(file.fileName || file.name) }
            case 'text/plain':
                return { src: baseDocImg, fileType: 'docs', fileName: shortenName(file.fileName || file.name) }
        }
        return { src: baseDocImg, fileType: 'pdf', fileName: shortenName(file.fileName || file.name) }
    }

    const availableDays = (e, setFieldValue) => {
        let days = userState.availableDays
        if (e.target.checked) {
            days.push(e.target.id)
        }
        else {
            days.splice(days.indexOf(e.target.id), 1)
        }
        setUserState({ ...userState, availableDays: days })
        setFieldValue('availableDays', days)
    }

    const timeSlotsArr = (e, setFieldValue) => {
        let timeSlots = userState.availableTimeSlots
        if (e.target.checked) {
            timeSlots.push(e.target.id)
        }
        else {
            timeSlots.splice(timeSlots.indexOf(e.target.id), 1)
        }
        setUserState({ ...userState, availableTimeSlots: timeSlots })
        setFieldValue('availableTimeSlots', timeSlots)
    }

    const lookingForArr = (e, setFieldValue) => {
        let looking = userState.lookingFor
        if (e.target.checked) {
            looking.push(e.target.id)
        }
        else {
            looking.splice(looking.indexOf(e.target.id), 1)
        }
        setUserState({ ...userState, lookingFor: looking })
        setFieldValue('lookingFor', looking)
    }

    const getPitchDocument = (e, setFieldValue) => {
        setUserState({ ...userState, pitchDeckDocument: e.target.files[0] })
        setFieldValue('pitchDeckDocument', e.target.files[0])
    }

    const getBusinessDocument = (e, setFieldValue) => {
        setUserState({ ...userState, businessProfileDocument: e.target.files[0] })
        setFieldValue('businessProfileDocument', e.target.files[0])
    }

    const getOtherDocuments = (e, setFieldValue) => {
        let files = e.target.files
        setUserState({ ...userState, otherDocuments: [...files] })
        setFieldValue('otherDocuments', [...files])
    }

    const removeThisDocumentFromOtherDocuments = (document, setFieldValue) => {
        userState.otherDocuments.splice(userState.otherDocuments.indexOf(document), 1)
        setUserState({ ...userState, otherDocuments: [...userState.otherDocuments] })
        setFieldValue('otherDocuments', [...userState.otherDocuments])
    }

    useEffect(() => {
        getAvailableDays()
        getAvailableTimeSlots()
    }, [])

    return (
        <>
            <Loader isLoading={isLoading} />
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { userSignUp(data) }}
                initialValues={userState}
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
                        <div className={`${classes.summeryDetail} ${isActive ? '' : `${classes.disabled}`}`}>
                            <Container className={'p-0'}>
                                <div className={classes.summerHeader}>
                                    <div className={classes.logo}>
                                        <Link to={"/"}>
                                            <img src={authLogo} alt={"open advisor"} />
                                        </Link>
                                    </div>
                                    <h1 className={classes.formTitle}>Summary</h1>
                                    <UploadProfilePicture userState={userState} setUserState={setUserState} />
                                </div>

                                <Card className={"mb-3"}>
                                    <Card.Body>
                                        <Card.Title className={classes.formTitle}>Your Information</Card.Title>
                                        <Row>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    <Form.Control
                                                        type={"text"}
                                                        placeholder={"Type here"}
                                                        className={"fw-semibold font-16"}
                                                        name={'firstName'}
                                                        value={values.firstName}
                                                        onChange={handleChange}
                                                        required
                                                        isInvalid={!!errors.firstName}
                                                    />
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control.Feedback type="invalid">
                                                        First Name is required.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    <Form.Control
                                                        type={"text"}
                                                        className={"fw-semibold font-16"}
                                                        placeholder={"Type here"}
                                                        name={'lastName'}
                                                        value={values.lastName}
                                                        onChange={handleChange}
                                                        required
                                                        isInvalid={!!errors.lastName}
                                                    />
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control.Feedback type="invalid">
                                                        Last Name is required.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    <Form.Control
                                                        type={"tel"}
                                                        className={"fw-semibold font-16"}
                                                        placeholder={"Type here"}
                                                        name={'phoneNumber'}
                                                        value={values.phoneNumber}
                                                        onChange={handleChange}
                                                        required
                                                        isInvalid={!!errors.phoneNumber}
                                                    />
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control.Feedback type="invalid">
                                                        Phone Number is required.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    <Form.Control
                                                        type={"email"}
                                                        className={"fw-semibold font-16"}
                                                        placeholder={"Type here"}
                                                        name={'email'}
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        required
                                                        isInvalid={!!errors.email}
                                                    />
                                                    <Form.Label>Email Address</Form.Label>
                                                    <Form.Control.Feedback type="invalid">
                                                        Email is required.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    <Form.Control
                                                        type={"text"}
                                                        className={"fw-semibold font-16"}
                                                        name={'linkedInProfile'}
                                                        placeholder={"Paste link here"}
                                                        value={values.linkedInProfile}
                                                        onChange={handleChange}
                                                        required
                                                        isInvalid={!!errors.linkedInProfile}
                                                    />
                                                    <Form.Label>LinkedIn Profile</Form.Label>
                                                    <Form.Control.Feedback type="invalid">
                                                        LinkedIn profile url is required.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    {/* <Form.Control
                                                        type={"text"}
                                                        className={"fw-semibold font-16"}
                                                        placeholder={"Type here, separate using comma"}
                                                        value={skills}
                                                        name={'skills'}
                                                        onChange={(e) => { setSkills(e.target.value); }}
                                                        onBlur={() => { setFieldValue(handleCommaSeparatedSkills(skills)) }}
                                                        required
                                                        isInvalid={!!errors.skills}
                                                    /> */}
                                                    <TagsInput value={skills} onChange={setSkills} onBlur={() => { setFieldValue('skills', skills) }} placeHolder="Enter skill and press enter" />
                                                    <Form.Label>Skills</Form.Label>
                                                    <Form.Control.Feedback type="invalid">
                                                        Skills is required.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    <Form.Control
                                                        type={"text"}
                                                        className={"fw-semibold font-16"}
                                                        name={'city'}
                                                        placeholder={"Type here"}
                                                        value={values.city}
                                                        onChange={handleChange}
                                                        required
                                                        isInvalid={!!errors.city}
                                                    />
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control.Feedback type="invalid">
                                                        City is required.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    <Form.Control
                                                        type={"text"}
                                                        className={"fw-semibold font-16"}
                                                        name={'country'}
                                                        value={values.country}
                                                        onChange={handleChange}
                                                        required={true}
                                                        isInvalid={!!errors.country}
                                                    />
                                                    <Form.Label>Country </Form.Label>
                                                    <Form.Control.Feedback type="invalid">
                                                        Country is required.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                {/**
                     * Resources Card
                    */}

                                <Card className={"mb-3"}>
                                    <Card.Body>
                                        <Card.Title className={classes.formTitle}>Your Resources</Card.Title>
                                        <Row>
                                            <Col md={2}>
                                                <Form.Group className={"mb-3"}>
                                                    <Form.Label>Pitch Deck</Form.Label>
                                                    <div>
                                                        {/* <Form.Label htmlFor={"fileUpload"}> */}
                                                        {userState?.pitchDeckDocument?.name ?
                                                            <>
                                                                <div className={`${classes.fileUpload}`}>
                                                                    <img src={checkFileType(userState?.pitchDeckDocument).src} alt={"N/A"} />
                                                                    <div className={classes.textBox}>
                                                                        <p>{checkFileType(userState?.pitchDeckDocument).fileType}</p>
                                                                        <p>{checkFileType(userState?.pitchDeckDocument).fileName}</p>
                                                                    </div>
                                                                    {!disabled ? <>
                                                                        <Button variant={"delete"} disabled={disabled} onClick={(e) => { setFieldValue('pitchDeckDocument', {}); setUserState({ ...userState, pitchDeckDocument: {} }) }}><i className={"fal fa-times"}></i> </Button>
                                                                    </> : <></>}
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className={classes.fileUpload}>
                                                                    <Form.Label htmlFor={"fileUpload"}>
                                                                        <input type="file" id={"fileUpload"} onChange={(e) => { getPitchDocument(e, setFieldValue) }} disabled={disabled} />

                                                                        <p>No document</p>
                                                                    </Form.Label>
                                                                </div>
                                                            </>
                                                        }
                                                        {/* </Form.Label> */}
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.pitchDeckDocument}
                                                        </Form.Control.Feedback>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group className={"mb-3"}>
                                                    <Form.Label>Business Plan</Form.Label>
                                                    <div>
                                                        {/* <Form.Label htmlFor={"fileUpload1"}> */}
                                                        {userState?.businessProfileDocument?.name ?
                                                            <>
                                                                <div className={`${classes.fileUpload}`}>
                                                                    <img src={checkFileType(userState?.businessProfileDocument).src} alt={"N/A"} />
                                                                    <div className={classes.textBox}>
                                                                        <p>{checkFileType(userState?.businessProfileDocument).fileType}</p>
                                                                        <p>{checkFileType(userState?.businessProfileDocument).fileName}</p>
                                                                    </div>
                                                                    {!disabled ? <>
                                                                        <Button variant={"delete"} disabled={disabled} onClick={(e) => { setFieldValue('businessProfileDocument', {}); setUserState({ ...userState, businessProfileDocument: {} }) }}><i className={"fal fa-times"}></i> </Button>
                                                                    </> : <></>}
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className={classes.fileUpload}>
                                                                    <Form.Label htmlFor={"fileUpload1"}>
                                                                        <input type="file" multiple id={"fileUpload1"} onChange={(e) => { getBusinessDocument(e, setFieldValue) }} disabled={disabled} />

                                                                        <p>No document</p>
                                                                    </Form.Label>
                                                                </div>
                                                            </>
                                                        }
                                                        {/* </Form.Label> */}
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group className={"mb-3"}>
                                                    <Form.Label>Other Documents</Form.Label>
                                                    {userState.otherDocuments?.length ?
                                                        userState.otherDocuments.map(document => {
                                                            return (
                                                                <>
                                                                    <div className={`${classes.fileUpload}`}>
                                                                        <img src={checkFileType(document).src} alt={"N/A"} />
                                                                        <div className={classes.textBox}>
                                                                            <p>{checkFileType(document).fileType}</p>
                                                                            <p>{checkFileType(document).fileName}</p>
                                                                        </div>
                                                                        {!disabled ? <>
                                                                            <Button variant={"delete"} disabled={disabled} onClick={(e) => { removeThisDocumentFromOtherDocuments(document, setFieldValue) }}><i className={"fal fa-times"}></i> </Button>
                                                                        </> : <></>}
                                                                    </div>
                                                                </>
                                                            )
                                                        }) :
                                                        <>
                                                            <div className={classes.fileUpload}>
                                                                <Form.Label htmlFor={"fileUpload2"}>
                                                                    <input type="file" multiple id={"fileUpload2"} onChange={(e) => { getOtherDocuments(e, setFieldValue) }} disabled={disabled} />

                                                                    <p>No document</p>
                                                                </Form.Label>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                {/**
                     * Availability Card
                    */}

                                <Card className={"mb-3"}>
                                    <Card.Body>
                                        <Card.Title className={classes.formTitle}>Your availability</Card.Title>
                                        <Form.Group className={"form-group"}>
                                            <div>Selected days</div>
                                            <ul className={`${classes.checkBoxList} d-flex`}>
                                                {daysState.map((day) => (
                                                    <li>
                                                        <Form.Check
                                                            className={classes.formCheck}
                                                            label={capitalizeFirstLetter(day.name)}
                                                            name="days"
                                                            type={"checkbox"}
                                                            id={day.id}
                                                            disabled={disabled}
                                                            checked={userState?.availableDays?.includes(day.id)}
                                                            onChange={((e) => availableDays(e, setFieldValue))}
                                                            required
                                                            isInvalid={!!errors.availableDays}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.availableDays}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className={"form-group"}>
                                            <div>Selected times</div>
                                            <ul className={`${classes.checkBoxList} d-flex`}>
                                                {timeSlotsState.map((timeSlot) => (
                                                    <li>
                                                        <Form.Check
                                                            className={`form-check-inline ${classes.formCheck}`}
                                                            label={`${convert_to_12_hour(timeSlot.start_time)} - ${convert_to_12_hour(timeSlot.end_time)}`}
                                                            name="timeSlot"
                                                            type={"checkbox"}
                                                            id={timeSlot.id}
                                                            disabled={disabled}
                                                            checked={userState?.availableTimeSlots?.includes(timeSlot.id) || false}
                                                            onChange={((e) => timeSlotsArr(e, setFieldValue))}
                                                            required
                                                            isInvalid={!!errors.availableTimeSlots}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.availableTimeSlots}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                                <Card className={"mb-3"}>
                                    <Card.Body>
                                        <Card.Title className={classes.formTitle}>You are a</Card.Title>
                                        <ul className={`${classes.checkBoxList} d-flex`}>
                                            {professions.map((profession) => (
                                                <li>
                                                    <Form.Check
                                                        className={classes.formCheck}
                                                        label={profession.type}
                                                        name="Profession"
                                                        type={"radio"}
                                                        id={profession.value}
                                                        disabled={disabled}
                                                        defaultChecked={userState?.areYou?.includes(profession.value)}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.areYou}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.areYou}
                                        </Form.Control.Feedback>
                                    </Card.Body>
                                </Card>
                                <Card className={"mb-3"}>
                                    <Card.Body>
                                        <Card.Title className={classes.formTitle}>Are you looking for a</Card.Title>
                                        <ul className={`${classes.checkBoxList} d-flex`}>
                                            {professions.map((profession) => (
                                                <li>
                                                    <Form.Check
                                                        className={classes.formCheck}
                                                        label={profession.type}
                                                        name="lookingFor"
                                                        type={"checkbox"}
                                                        id={profession.value}
                                                        disabled={disabled}
                                                        checked={userState?.lookingFor?.includes(profession.value)}
                                                        onChange={((e) => lookingForArr(e, setFieldValue))}
                                                        isInvalid={!!errors.lookingFor}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lookingFor}
                                        </Form.Control.Feedback>
                                    </Card.Body>
                                </Card>
                                {/* <Card className={"mb-3"}>
                                    <Card.Body>
                                        <Card.Title className={classes.formTitle}>Subscription</Card.Title>
                                        <Row>
                                            <Col md={4}>
                                                <Form.Group className={"form-group"}>
                                                    <Dropdown className={classes.dropDown}>
                                                        <Dropdown.Toggle className={classes.button}>
                                                            <div className={classes.text}><div className={"text-orange d-flex"}><sub className={"font-16"}>$</sub><div className={"font-40 fw-bold"}>30</div></div>/Per Month<div></div></div>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className={classes.dropDownMenu}>
                                                            <Dropdown.Item href="#/action-1">$ 30 / Per Month</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2">$ 40 / Per Month</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3">$ 50 / Per Month</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Form.Group>
                                                <Form.Group className={'form-group'}>
                                                    <Form.Label className={"text-dark fw-semibold position-static p-0 mb-3"}>Access to:</Form.Label>
                                                    <ul className={"arrowList"}>
                                                        <li>Access to all legal documents</li>
                                                        <li> Download in .DOC format</li>
                                                    </ul>
                                                </Form.Group>
                                            </Col> */}
                                {/*<Col md={12}>
                                  <Row>
                                      <Col md={4}>
                                          <div className={classes.cardImg}>
                                              <Cards
                                                  number={number}
                                                  name={name}
                                                  expiry={expiry}
                                                  cvc={cvc}
                                                  focused={focus}
                                              />
                                          </div>
                                      </Col>
                                      <Col md={8}>
                                          <Row>
                                              <Col md={6}>
                                                  <Form.Group className={"form-group"}>
                                                      <Form.Label>Card Number</Form.Label>
                                                      <Form.Control
                                                          type="tel"
                                                          className="form-control"
                                                          value={number}
                                                          name="number"
                                                          maxlength="16"
                                                          pattern="[0-9]+"
                                                          onChange={(e) => {
                                                              SetNumber(e.target.value);
                                                          }}
                                                          onFocus={(e) => SetFocus(e.target.name)}
                                                          disabled={disabled}

                                                      />
                                                  </Form.Group>
                                              </Col>
                                              <Col md={6}>
                                                  <Form.Group className={"form-group"}>
                                                      <Form.Label>Name</Form.Label>
                                                      <Form.Control
                                                          type="text"
                                                          className="form-control"
                                                          value={name}
                                                          name="name"
                                                          onChange={(e) => {
                                                              SetName(e.target.value);
                                                          }}
                                                          onFocus={(e) => SetFocus(e.target.name)}
                                                          disabled={disabled}

                                                      />
                                                  </Form.Group>
                                              </Col>
                                              <Col md={4}>
                                                  <Form.Group className={"form-group"}>
                                                      <Form.Label>Expiry Date</Form.Label>
                                                      <select
                                                          className="form-selectm "
                                                          name="expiry"
                                                          onChange={handleDate}
                                                          disabled={disabled}

                                                      >
                                                          <option value=" ">Month</option>
                                                          <option value="01">Jan</option>
                                                          <option value="02">Feb</option>
                                                          <option value="03">Mar</option>
                                                          <option value="04">April</option>
                                                          <option value="05">May</option>
                                                          <option value="06">June</option>
                                                          <option value="07">July</option>
                                                          <option value="08">Aug</option>
                                                          <option value="09">Sep</option>
                                                          <option value="10">Oct</option>
                                                          <option value="11">Nov</option>
                                                          <option value="12">Dec</option>
                                                      </select>
                                                  </Form.Group>
                                              </Col>
                                              <Col md={4}>
                                                  <Form.Group className={"form-group"}>
                                                      <Form.Label>Expiry Date</Form.Label>
                                                      <select
                                                          className="form-select"
                                                          name="expiry"
                                                          onChange={handleExpiry}
                                                          disabled={disabled}

                                                      >
                                                          <option value=" ">Year</option>
                                                          <option value="21">2021</option>
                                                          <option value="22">2022</option>
                                                          <option value="23">2023</option>
                                                          <option value="24">2024</option>
                                                          <option value="25">2025</option>
                                                          <option value="26">2026</option>
                                                          <option value="27">2027</option>
                                                          <option value="28">2028</option>
                                                          <option value="29">2029</option>
                                                          <option value="30">2030</option>
                                                      </select>
                                                  </Form.Group>
                                              </Col>
                                              <Col md={4}>
                                                  <Form.Group className={"form-group"}>
                                                      <Form.Label>CVV</Form.Label>
                                                      <Form.Control
                                                          type="tel"
                                                          name="cvc"
                                                          maxLength="3"
                                                          className=" form-control card"
                                                          value={cvc}
                                                          pattern="\d*"
                                                          onChange={(e) => {
                                                              SetCvc(e.target.value);
                                                          }}
                                                          onFocus={(e) => SetFocus(e.target.name)}
                                                          disabled={disabled}

                                                      />
                                                  </Form.Group>
                                              </Col>
                                          </Row>
                                      </Col>
                                  </Row>
                              </Col>*/}
                                {/* <Col md={12}>
                                                <Row>
                                                    <Col lg={3}>
                                                        <Form.Group className={"form-group"}>
                                                            <SelectDropDown
                                                                //isSearchable
                                                                //isMulti
                                                                placeHolder="Debit Card"
                                                                className={'fw-bold'}
                                                                options={options}
                                                                onChange={(value) => console.log(value)}
                                                                disabled={disabled}
                                                            />
                                                            <Form.Label>Payment Method</Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={3}>
                                                        <Form.Group className={'form-group'}>
                                                            <Form.Control type={"text"} className={"fw-semibold font-16 visacard"} defaultValue={"2890 2190 2800 1229 "} disabled={disabled} />
                                                            <Form.Label>Card Number</Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={3}>
                                                        <Form.Group className={'form-group'}>
                                                            <Form.Control type={"text"} className={"fw-semibold font-16"} defaultValue={"10/22"} disabled={disabled} />
                                                            <Form.Label>Expiry Date</Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={3}>
                                                        <Form.Group className={'form-group'}>
                                                            <Form.Control type={"text"} className={"fw-semibold font-16"} defaultValue={"120"} disabled={disabled} />
                                                            <Form.Label>CVV</Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card> */}

                                <div className={classes.btnRow}>
                                    <Button variant={"primary m-2"} onClick={handleFormDisable}>Edit Details</Button>
                                    <Button type={'submit'} variant={"secondary m-2"} disabled={(!disabled && Object.keys(errors).length > 0) ? true : false}>Submit </Button>
                                </div>
                            </Container>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SummeryDetails;