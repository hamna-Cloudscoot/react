import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Button, Card, Col, Row } from "react-bootstrap";
import SubscriptionAPIs from 'APIs/subscriptions';
import { useSelector } from "react-redux";
import StripeAPIs from 'APIs/stripe'
import Loader from "Components/Loader";
import UserAPIs from 'APIs/user'

const PlanSetting = () => {

    const [allPlans, setAllPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ updatedUser , setUpdatedUser ] = useState();
    const { user } = useSelector((state) => state.user);
    const { email } = useSelector((state) => state.signupEmail);

    const handleClick = async (id, planId) => {
        setIsLoading(true);
        const res = await StripeAPIs.sessionCheckout({ productId: id, email: email, subscriptionId: planId });
        if (res) {
            window.open(res.data.data?.url, '_blank');
        }
        setIsLoading(false);
    }

    const getUpdatedUser = async() =>{
        if(user){
            const updated = await UserAPIs.getOneUser(user?.id);
            if(updated){
                setUpdatedUser(updated.data.data)
            }
        }
    }

    const getSubscriptions = async () => {
        const subs = await SubscriptionAPIs.getAllSubscriptions();
        if (subs) {
            setAllPlans(subs.data.data);
        }
    }

    useEffect(() => {
        getSubscriptions();
        getUpdatedUser();
    }, [])


    return (
        <>
            <Loader isLoading={isLoading} />
            <Card>
                <Card.Body>
                    <Card.Title className={classes.cardTitle}>Current Subscription</Card.Title>

                    {allPlans.map((element) => {
                        return (<Card className={'border border-light mb-3 rad'}>
                            <Card.Header className={"border-0"}>
                                <div className={"font-16 fw-semibold"}>{element?.planType}</div>
                            </Card.Header>
                            <Card.Body>
                                <Row className={'align-items-center flex-md-row-reverse'}>
                                    <Col md={7} className={'d-md-flex justify-content-md-between'}>
                                        <div>
                                            <h3 className={'fontfamily-popins fw-semibold'}>${element.amount}/{element.tenure}</h3>
                                            <div className={'text-muted'}>( {element.tenure} recurring plan unless cancelled )</div>
                                        </div>
                                        {element?.id === updatedUser?.subscriptionId ?
                                            <Button variant={'secondary round-50 my-3'}>Current Plan</Button>
                                            :
                                            <Button variant={'dark rounded my-3'} onClick={() => { handleClick(element?.stripeSubscriptionPriceId, element?.id) }}>Update to this Plan</Button>
                                        }
                                    </Col>
                                    <Col md={5}>
                                        <div className={"fw-semibold mb-3"}>Access to:</div>
                                        <ul className={"arrowList"}>
                                            {
                                                element?.features?.accessToAllLegalDocuments == true ?
                                                    <li>Access to all legal documents</li> : ''
                                            }
                                            {
                                                element?.features?.downloadInDocFormat == true ?
                                                    <li>Download in .DOC format</li> : ''
                                            }
                                            {
                                                element?.features?.helpWithDraftingBespokeLegalDocuments == true ?
                                                    <li>Help with drafting bespoke legal documents</li> : ''
                                            }
                                            {
                                                element?.features?.lawyerService == true ?
                                                    <li>Lawyer services</li> : ''
                                            }
                                            {
                                                element?.features?.twoLegalCounselWithACertifiedLawyer == true ?
                                                    <li>2 legal counsel with a certified lawyer</li> : ''
                                            }

                                        </ul>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>)
                    })}



                    {/* <Card className={'border border-light mb-3'}>
                        <Card.Header className={"border-0"}>
                            <div className={"font-16 fw-semibold"}>Legal Documents Only Plan</div>
                        </Card.Header>
                        <Card.Body>
                            <Row className={'align-items-center flex-md-row-reverse'}>
                                <Col md={7} className={'d-md-flex justify-content-md-between'}>
                                    <div>
                                        <h3 className={'fontfamily-popins fw-semibold'}>$30/month</h3>
                                        <div className={'text-muted'}>(monthly recurring plan unless cancelled)</div>
                                    </div>
                                    <Button variant={'dark rounded my-3'}>Update to this Plan</Button>
                                </Col>
                                <Col md={5}>
                                    <div className={"fw-semibold mb-3"}>Access to:</div>
                                    <ul className={'arrowList'}>
                                        <li>Access to all legal documents</li>
                                        <li>Download in .DOC format</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card> */}
                </Card.Body>
            </Card>
        </>
    )
}

export default PlanSetting;