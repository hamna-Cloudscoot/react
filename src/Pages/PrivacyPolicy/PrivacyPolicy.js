import React, { useEffect, useState } from "react";
import Banner from "../../Components/Banner";
import { Container } from "react-bootstrap";
import GuidelineAPIs from 'APIs/guidelines'

const PrivacyPolicy = () => {

    const [description, setDescription] = useState('');

    const getTerms = async () => {
        const res = await GuidelineAPIs.getGuidelineByType('privacyPolicy')
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
                dots
                title={"Privacy Policy"}
                description={"These are the general privacy policy on which we supply all our services. If you use our services, you agree to abide by these terms."}
            />
            <section className={"section"}>
                <Container>
                    <h4 className={"fontfamily-popins"}>Privacy Policy of our web services</h4>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </Container>
            </section>
        </>
    )
}

export default PrivacyPolicy;