import React, { useState } from "react";
import classes from "./index.module.scss";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StripeAPIs from 'APIs/stripe'
import Loader from "Components/Loader";
import { useSelector } from 'react-redux';

const Packages = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { email } = useSelector((state) => state.signupEmail);


    const handleClick = async (id, planId) => {       
        setIsLoading(true);
        console.log("Session checkout id = ", id);
        console.log("Session checkout email = ", email);
        const res = await StripeAPIs.sessionCheckout({ productId: id, email: email, subscriptionId: planId });
        if (res) {
            console.log("Session checkout res = ", res.data.data);
            window.open(res.data.data?.url, '_blank');
        }
        setIsLoading(false);
    }


    return (
        <>
            <Loader isLoading={isLoading} />
            <Card className={classes.card}>
                <Card.Header className={classes.cardHeader}>
                    <Card.Title className={classes.cardtTitle}>Subscribe</Card.Title>
                    <div className={classes.price}>
                        <div className={classes.priceTitle}>
                            <sub>$</sub>
                            {props.data.price}
                        </div>
                        Per {props.data?.duration === 'yearly' ? 'Year' : 'Month'}
                    </div>
                    <h2>{props.data.text}</h2>
                </Card.Header>
                <Card.Body className={classes.cardBody}>
                    <ul>
                        {props.data.childData.map((item) => (
                            <li>{item.option}</li>
                        ))}
                    </ul>
                    <Button variant={`secondary ${classes.fixBtn}`} onClick={() => { handleClick(props.data?.stripeId, props.data.id) }}>Subscribe</Button>
                </Card.Body>
            </Card>

        </>
    )
}

export default Packages;