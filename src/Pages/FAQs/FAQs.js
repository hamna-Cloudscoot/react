import React, { useState, useEffect } from "react";
import Banner from "../../Components/Banner";
import { Accordion, Container } from "react-bootstrap";
import GuidelineAPIs from 'APIs/guidelines'

const FAQs = () => {

    const [description, setDescription] = useState('');

    const getFaqs = async () => {
        const res = await GuidelineAPIs.getGuidelineByType('faq')
        if (res) {
            setDescription(res.data.data.description);
        }
    }
    useEffect(() => {
        getFaqs();
    }, []);


    return (
        <>
            <Banner
                dots
                title={"FAQ"}
                description={"If you have questions that can be answered by our FAQ, \n" +
                    "read down below to know more."}
            />
            <section className={"section"}>
                <Container>
                    <div className="faqs" dangerouslySetInnerHTML={{ __html: description }} />
                </Container>
            </section>
        </>
    )
}

export default FAQs;