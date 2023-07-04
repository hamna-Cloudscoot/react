import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MeetingCard from "../../Components/MeetingCard";
import RequestCard from "../../Components/RequestCard";
import { Link, useNavigate } from "react-router-dom";
import ContactSidebar from "../../Components/ContactSidebar";
import classes from "./index.module.scss";
import MeetingPopup from "Pages/MeetingRoom/MeetingPopup";
import { useSelector } from "react-redux";
import UserAPIs from 'APIs/user'
import { toast } from "react-toastify";

const Dashboard = (props) => {
    const [selectedId, setSelectedId] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const getUpdatedUser =async()=>{        
        const updatedUser = await UserAPIs.getOneUser(user.id);
        if(updatedUser){
            if(updatedUser.data.data?.paymentVerified === false){
                toast.error("Subscription Required to Access Dashboard", {
                    position: "top-right",
                    autoClose: 2000,
                  });
                navigate('/subscription-payment')
            } 
        }
    }

    useEffect(()=>{
        getUpdatedUser();
    },[])

    return (
        <>
            <section className={classes.section}>
                <Container>
                    <ContactSidebar selectedId={selectedId} setSelectedId={setSelectedId} className={"m-0"} isRequest={false} />
                    <Row>
                        <Col xl={6}>
                            <MeetingCard />
                            <Link to={"#"} onClick={() => setModalShow(true)} className={"btn btn-secondary my-5"}><i className={"fal fa-plus"}></i> Create boardroom</Link>
                        </Col>
                        <Col xl={6}>
                            <RequestCard />
                        </Col>
                    </Row>
                </Container>
            </section>
            <MeetingPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Dashboard;