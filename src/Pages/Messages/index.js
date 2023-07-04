import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ContactSidebar from "../../Components/ContactSidebar";
import PageTitle from "../../Components/PageTitle";
import Chat from "../../Components/Chat";

const Messages = (props) => {
    
    return (
        <>
            <section className={"section p-0"}>
                <Container>
                    <ContactSidebar className={"m-0"} type={"MessagesPage"} />
                </Container>
            </section>
        </>
    )
}

export default Messages;