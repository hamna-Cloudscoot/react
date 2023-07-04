import React, { useEffect, useState } from "react";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
import classes from "../index.module.scss"
import SelectDropDown from "Components/SelectDropDown";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import AvailabilityAPIs from 'APIs/availability/index'
import MeetingAPIs from 'APIs/meetings/index'
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import { convert_to_12_hour } from "GlobalHelperFunctions";
import { toast } from "react-toastify";
import { setMeeting } from "redux/reducers/boardroomCreated";

const MeetingPopup = (props) => {

    const contactsList = useSelector((state) => state.contactList);

    const dispatch = useDispatch()

    const [options, setOptions] = useState()

    const [daysState, setDaysState] = useState([])

    const [timeSlotsState, setTimeSlotsState] = useState([])


    const schema = yup.object().shape({
        // participants: '',
        // day: '',
        // timeSlot: '',
        // meetingAgenda: '',
        // meetingDate: '',
    });

    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    useEffect(() => {
        if (contactsList.contacts.length) {
            const arr = contactsList.contacts.map((obj) => {
                return ({
                    value: `${obj.name}`,
                    label: `${obj.name}`,
                    id: `${obj.id}`
                })
            })
            setOptions(arr)
        }
    }, [contactsList])

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

    useEffect(() => {
        getAvailableDays()
        getAvailableTimeSlots()
    }, [])

    const formatPayload = async (dataPayload) => {

        const date = moment(dataPayload.meetingDate)
        const isoStringDate = moment(dataPayload.meetingDate).format('YYYY-MM-DD')
        const dayIndex = date.day();
        const day = daysState[dayIndex]
        const participants = dataPayload.participants.map(o => o.id)

        const meetingApiPayload = {
            day: day?.id,
            timeSlot: dataPayload.timeSlot,
            meetingDate: isoStringDate,
            meetingAgenda: dataPayload.meetingAgenda,
            participants: participants
        }
        if (!participants[0] || dataPayload.meetingAgenda.length <= 0 || !isoStringDate ||  !dataPayload.timeSlot) {
            toast.error("Please fill all feilds", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }
        const res = await MeetingAPIs.createMeeting(meetingApiPayload)
        if (res) {
            props.onHide()
            toast.success("Meeting Added Successfully", {
                position: "top-right",
                autoClose: 2000,
            });
            dispatch(
                setMeeting({
                    meeting: res.data
                })
            )
        }
    }

    return (
        <>
            <Modal
                {...props}
                size="md"
                centered
                className={classes.modal}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">
                        Create Meeting
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="contact-modal">
                    <Formik
                        validationSchema={schema}
                        onSubmit={(data) => { formatPayload(data) }}
                        initialValues={{
                            participants: [],
                            day: '',
                            timeSlot: '',
                            meetingAgenda: '',
                            meetingDate: '',
                        }}
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
                                <Form.Group className={`${classes.formGroup} form-group`}>
                                    <Form.Label>Select Connection</Form.Label>
                                    <SelectDropDown
                                        className={classes.selectDropdown}
                                        isSearchable
                                        isMulti
                                        placeHolder="Search name"
                                        options={options}
                                        onChange={(value) => { setFieldValue('participants', value) }}
                                    />
                                </Form.Group>
                                <Form.Group className={`${classes.formGroup} form-group`}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name={'meetingAgenda'}
                                        placeholder={"Add meeting title"}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className={`${classes.formGroup} form-group`}>
                                            <Form.Label>Select Date</Form.Label>
                                            <DatePicker
                                                showIcon
                                                minDate={new Date()} // set minimum date to today
                                                name={"meetingDate"}
                                                selected={values.meetingDate}
                                                onChange={(date) => { setFieldValue('meetingDate', date) }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className={`${classes.formGroup} form-group`}>
                                            <Form.Label>Set Time</Form.Label>
                                            {/* <DatePicker
                                                className={classes.timePicker}
                                                name={"timeSlot"}
                                                selected={values.timeSlot}
                                                onChange={(time) => setFieldValue('timeSlot', time)}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={60}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                            /> */}
                                        </Form.Group>
                                        <div className={classes.selectMenu}>
                                            <div className={classes.scroller}>
                                                {timeSlotsState?.map((timeSlot) => (
                                                    <Form.Check
                                                        className={classes.formCheck}
                                                        label={`${convert_to_12_hour(timeSlot.start_time)} - ${convert_to_12_hour(timeSlot.end_time)}`}
                                                        name="timeSlot"
                                                        type={"radio"}
                                                        id={timeSlot.id}
                                                        onChange={(e) => setFieldValue('timeSlot', e.target.id)}
                                                        required
                                                        isInvalid={!!errors.availableTimeSlots}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Form.Group className={`${classes.formGroup} ${classes.ZoomLink} form-group mb-4`}>
                                    <Form.Label>Zoom link</Form.Label>
                                    <div className={classes.zoomTitle}>Generate Link</div>
                                    <Form.Control value={`${"zoom meeting url will appear here."}` || `${" www.zoom.com/23dwcecw443892234252ewdftgy"}`} />
                                </Form.Group>
                                <Form.Group className={`${classes.formGroup} ${classes.ZoomLink} form-group`}>
                                    <Row className={"flex-wrap align-items-center"}>
                                        <Col md={6}>
                                            <Button className={classes.btn}><i class="far fa-link me-3"></i>Copy Invitation Link</Button>
                                        </Col>
                                        <Col md={6} className={"text-end"}>
                                            <button className={"btn btn-secondary m-1"}>Done</button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        )}
                    </Formik>
                    {/* <Button variant={"secondary w-100 mb-5"} onClick={props.onHide}>Submit</Button> */}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MeetingPopup;