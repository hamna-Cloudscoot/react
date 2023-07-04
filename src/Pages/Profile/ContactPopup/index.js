import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ProfessionalContactAPIs from "APIs/professional-contact"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ContactPopup = (props) => {

    const { user } = useSelector((state) => state.user);

    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [validated, setValidated] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const data = {
            professional: props.professionalId,
            name: name,
            email: email,
            message: message
        }
        const res = await ProfessionalContactAPIs.sendProfessionalRequest(data);
        if (res) {
            props.onHide()
            toast.success("Request Submitted Successfully", {
                position: "top-right",
                autoClose: 2000,
            });
        }
        props.onHide()
        setMessage("");
    }

    useEffect(() => {
        if (user) {
            setDisabled(true);
            setName(`${user.firstName} ${user.lastName}`)
            setEmail(user.email)
        }
    }, [])

    function capitalizeFirstLetter(string) {
        return string?.charAt(0)?.toUpperCase() + string?.slice(1);
    }

    return (
        <>
            <Modal
                {...props}
                size="md"
                centered
            >
                <Modal.Header className={"border-0"} closeButton>
                    <Modal.Title>
                        Do you want to contact this {capitalizeFirstLetter(props?.designation)}??
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="contact-modal">
                    <Form noValidate validated={validated} onSubmit={submitHandler}>
                        <Form.Group className={"form-group"}>
                            <Form.Control type={'text'} placeholder={"Type here"} value={name} onChange={(e) => { setName(e.target.value) }} required disabled={disabled} />
                            <Form.Label>Name</Form.Label>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control type={'email'} placeholder={"Type here"} value={email} onChange={(e) => { setEmail(e.target.value) }} required disabled={disabled} />
                            <Form.Label>Email</Form.Label>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Form.Control as={"textarea"} placeholder={"Type here"} value={message} onChange={(e) => { setMessage(e.target.value) }} required />
                            <Form.Label>Message</Form.Label>
                        </Form.Group>
                        <Form.Group className={"form-group"}>
                            <Button type={"submit"} variant={"secondary w-100"}>Submit</Button>
                        </Form.Group>
                    </Form>
                    {/* <Button variant={"secondary w-100 mb-5"} onClick={props.onHide}>Submit</Button> */}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ContactPopup;