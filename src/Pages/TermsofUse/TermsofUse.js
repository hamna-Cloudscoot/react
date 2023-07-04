import React, { useEffect, useState } from "react";
import Banner from "../../Components/Banner";
import { Container } from "react-bootstrap";
import GuidelineAPIs from 'APIs/guidelines'

const TermsofUse = () => {

    const [description, setDescription] = useState('');

    const getTerms = async () => {
        const res = await GuidelineAPIs.getGuidelineByType('termsAndCondition')
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
                title={"Terms of Use"}
                description={"These are the general terms of use on which we supply all our services. If you use our services, you agree to abide by these terms."}
            />
            <section className={"section"}>
                <Container>
                    <h4 className={"fontfamily-popins"}>Terms for use of our web services</h4>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </Container>
            </section>
        </>
    )
}

export default TermsofUse;