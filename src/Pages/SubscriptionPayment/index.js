import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Packages from "../../Components/Packages";
import SubscriptionAPIs from 'APIs/subscriptions';
import Loader from "Components/Loader";

const SubscriptionPayment = (props) => {

    const [allPlans, setAllPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getSubscriptions = async () => {
        setIsLoading(true);
        const res = await SubscriptionAPIs.getAllSubscriptions();
        const resArr = [];
        if (res) {
            const arr = [...res.data.data];
            arr?.forEach((element) => {
                const childData = [];
                const data = {
                    id : element?.id,
                    price: element?.amount,
                    duration: element?.tenure,
                    text: element?.planType,
                    stripeId: element?.stripeSubscriptionPriceId
                }

                if (element?.features?.accessToAllLegalDocuments == true) {
                    const obj = {
                        option: 'Access to all legal documents'
                    }
                    childData.push(obj);
                }
                if (element?.features?.downloadInDocFormat == true) {
                    const obj = {
                        option: 'Download in .DOC format'
                    }
                    childData.push(obj);
                }
                if (element?.features?.helpWithDraftingBespokeLegalDocuments == true) {
                    const obj = {
                        option: 'Help with drafting bespoke legal documents'
                    }
                    childData.push(obj);
                }
                if (element?.features?.lawyerService == true) {
                    const obj = {
                        option: 'Lawyer services'
                    }
                    childData.push(obj);
                }
                if (element?.features?.twoLegalCounselWithACertifiedLawyer == true) {
                    const obj = {
                        option: '2 legal counsel with a certified lawyer'
                    }
                    childData.push(obj);
                }
                data['childData'] = childData;
                resArr.push(data);
            })
            setAllPlans(resArr)
        }
        setIsLoading(false);
    }



    useEffect(() => {
        getSubscriptions();
    }, [])

    const data = [
        {
            price: "30",
            duration: "Per Month",
            text: "Legal Documents Only Plan ",
            childData: [
                {
                    option: "Access to all legal documents",
                },
                {
                    option: "Download in .DOC format",
                }
            ]
        },
        {
            price: "200",
            duration: "Per Month",
            text: "Legal Services & Legal Documents️",
            childData: [
                {
                    option: "All legal documents",
                },
                {
                    option: "Lawyer services",
                },
                {
                    option: "Help with drafting bespoke legal documents",
                },
                {
                    option: "2 legal counsel with a certified lawyer",
                }
            ]
        }
    ]


    return (
        <>
            <Loader isLoading={isLoading} />
            <section>
                <Container>
                    <Row>
                        {allPlans?.map((data) => (
                            <Col md={6}>
                                <Packages data={data} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SubscriptionPayment;