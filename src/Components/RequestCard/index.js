import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Card } from "react-bootstrap";
import Index from "../UserList";
import img1 from "../../Images/img14.jpg";
import UserList from "../UserList";
import ContactAPIs from 'APIs/contact-requests'
import RequestList from "Components/RequestList";
import { useNavigate } from "react-router-dom";

const RequestCard = (props) => {

    const [requests, setRequests] = useState([]);

    const getReceivedRequests = async () => {
        const requests = await ContactAPIs.getReceivedRequests()
        if (requests) {
            setRequests(requests.data.data)
        }
    }
    useEffect(() => {
        getReceivedRequests();
    }, [])

    const data = [
        {
            name: 'Zain Lubin',
            designation: 'Accountant',
            imgUrl: img1,
            timeSlot: '9:00 AM - 10:00 AM',
        },
        {
            name: 'Zain Lubin',
            designation: 'Accountant',
            imgUrl: img1,
            timeSlot: '9:00 AM - 10:00 AM',
        },
        {
            name: 'Zain Lubin',
            designation: 'Accountant',
            imgUrl: img1,
            timeSlot: '9:00 AM - 10:00 AM',
        },
        {
            name: 'Zain Lubin',
            designation: 'Accountant',
            imgUrl: img1,
            timeSlot: '9:00 AM - 10:00 AM',
        },

    ]
    return (
        <>
            <Card className={classes.card}>
                <Card.Header className={classes.header}>
                    <Card.Title>
                        <h1>{requests.length}</h1>
                    </Card.Title>
                    <div>New Requests</div>
                </Card.Header>
                <Card.Body className={'px-0'}>
                    <RequestList
                        request
                        data={requests}
                        setData={setRequests}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

export default RequestCard;