import React, { useState, useEffect } from "react";
import Banner from "../../Components/Banner";
import { Container } from "react-bootstrap";
import GuidelineAPIs from 'APIs/guidelines'

const TermsConditions = () => {

    const [description, setDescription] = useState('');

    const getTerms = async () => {
        const res = await GuidelineAPIs.getGuidelineByType('termsOfUse')
        if (res) {
            setDescription(res.data.data.description);
        }
    }
    useEffect(() => {
        getTerms();
    }, []);

    return (
        <>
            <Banner
                termCondition
                dots
                title={"Terms & Conditions"}
                description={"These are the general terms and conditionsssss on which we supply all our services. If you use our services, you agree to abide by these terms."}
            />
            <section className={"section"}>
                <Container>
                    <h4 className={"fontfamily-popins"}>Terms and condition of our web services</h4>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </Container>
            </section>
        </>
    )
}

export default TermsConditions;