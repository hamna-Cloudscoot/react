import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import classes from "../index.module.scss"
import MeetingAPIs from 'APIs/meetings/index';
import { toast } from "react-toastify";
import { setNoteAdded } from "redux/reducers/noteadded";
import { useDispatch } from "react-redux";



const ScheduleNotePopup = (props) => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { value } = event.target;
        if (value.length <= 30) {
            setValue(value);
        }
    };

    const addNote = async () => {
        props.onHide(false);
        const res = await MeetingAPIs.addMeetingNote({
            meetingId: props.meetingId,
            note: value
        })
        if (res) {
            dispatch(
                setNoteAdded({
                    isNoteAdded: true
                }))
                
            toast.success("Note Added Successfully", {
                position: "top-right",
                autoClose: 2000,
            });
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
                        Add a Note
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="contact-modal">
                    <Form noValidate >
                        <Form.Group className={`${classes.formGroup} form-group`}>
                            <Form.Label>Note</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={value}
                                onChange={handleChange}
                                maxLength={30}
                                placeholder="Add note here"
                            />
                            <Form.Text className={`${classes.characterText} text-muted`}>
                                {value.length}/30
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <Button variant={"secondary w-100 mb-5"} onClick={addNote}>Add Note</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ScheduleNotePopup;