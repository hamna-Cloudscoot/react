import React from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import footerLogo from "../../../../Images/openfounder.png";
import classes from "./index.module.scss";

const SubscribeForm=()=>{
    return(
        <>
            <Form className={classes.form}>
                <Form.Group className={classes.formGroup}>
                    <div className={classes.logo}>
                        <Link to={"#"}>
                            <img src={footerLogo} alt={"#"} />
                        </Link>
                    </div>
                    <Form.Control type={"text"} placeholder={"Email address"} />
                    <Button variant={"white"} type={"submit"}>Subscribe To  Our Newsletter</Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default SubscribeForm;