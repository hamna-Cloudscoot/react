
import Loader from "Components/Loader";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContactSidebar from "../../Components/ContactSidebar";
import PageTitle from "../../Components/PageTitle";
import ViewRequest from "../../Components/ViewRequest";

const Request = (props) => {

    const request = useSelector((state) => state.common);

    const [requestId, setRequestId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRequestId(request.requestId)
    }, [request]);

    useEffect(() => {
        // setIsLoading(true)
    }, []);


    return (
        <>
            <section className={"section p-0"}>
                <Container>
                    <ContactSidebar selectedId={requestId} setSelectedId={setRequestId} className={"m-0"} isRequest={true} />
                    <Row>
                        <Col md={12} className={'p-0'}>
                            <PageTitle title={"Requests"} bgWhite onlyTitle />
                            <ViewRequest setIsLoading={setIsLoading} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Loader isLoading={isLoading} />
        </>
    )
}

export default Request;