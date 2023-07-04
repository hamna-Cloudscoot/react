import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import footerLogo from "../../Images/smallLogo.svg";
import classes from "./index.module.scss";
import NewsleterSubscriberAPIs from 'APIs/newsletter'
import { toast } from "react-toastify";

const SubscribeForm = () => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        function validateEmail(email2) {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(email2);
        }

        if (validateEmail(email)) {
        } else {
            toast.error("Email is invalid", {
                position: "top-right",
                autoClose: 2000,
            });
            setIsLoading(false);
            return;
        }

        const data = { email: email };
        const res = await NewsleterSubscriberAPIs.subscribeNewsletter(data);
        if (res) {
            setEmail('')
            toast.success("Subscribed for Newsletter Successfully", {
                position: "top-right",
                autoClose: 2000,
            });
        }
        setIsLoading(false)
    }

    return (
        <>
            <Form className={classes.form} onSubmit={submitHandler}>
                <Form.Group className={classes.formGroup}>
                    <div className={classes.logo}>
                        <Link to={"#"}>
                            <img src={footerLogo} alt={"#"} />
                        </Link>
                    </div>
                    <Form.Control type={"email"} placeholder={"Email address"} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {isLoading ?
                        <Button variant={"white"} type={"submit"} disabled>Subscribe To  Our Newsletter</Button>
                        :
                        <Button variant={"white"} type={"submit"}>Subscribe To  Our Newsletter</Button>
                    }
                </Form.Group>
            </Form>
        </>
    )
}

export default SubscribeForm;