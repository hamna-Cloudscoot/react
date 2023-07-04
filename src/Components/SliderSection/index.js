import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SectionTitle from "../SectionHeader";
import UserAPIs from 'APIs/user'
import UserLandingPageListCard from "Components/UserLandingPageListCards";

const SliderSection = (props) => {
    const [lawyers, setLawyers] = useState([]);
    const [founders, setFounders] = useState([]);
    const [accountants, setAccountants] = useState([]);

    const getLawyersAndFounders = async () => {
        const lawyer = await UserAPIs.getLawyers()
        if (lawyer) {
            setLawyers(lawyer.data.data);
        }
        const founder = await UserAPIs.getFounders();
        if (founder) {
            setFounders(founder.data.data);
        }
        const accountant = await UserAPIs.getAccountant();
        if (accountant) {
            setAccountants(accountant.data.data);
        }
    }

    useEffect(() => {
        getLawyersAndFounders();
    }, [])


    const data = [
        {
            category: "Founders",
            categoryTitle: "Recommended Founders",
            buttonText: 'View All Professionals',
            buttonUrl: 'All-profession',
            categoryDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id rutrum nulla.",
            childData: founders
        },
        {
            category: "Lawyers",
            categoryTitle: "Recommended Lawyers",
            buttonText: 'View All Professionals',
            buttonUrl: 'All-profession',
            categoryDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id rutrum nulla.",
            childData: lawyers
        },
        {
            category: "Accountants",
            categoryTitle: "Recommended Accountants",
            buttonText: 'View All Professionals',
            buttonUrl: 'All-profession',
            categoryDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id rutrum nulla.",
            childData: accountants
        }
    ]

    return (
        <>
            {data.map((data, index) => (
                data.childData.length ?
                    <section className={"section"} key={index}>
                        <Container>
                            <SectionTitle title={data.categoryTitle} description={data.categoryDescription} />
                            <UserLandingPageListCard
                                slidesScroll={1}
                                arrows={true}
                                dots={false}
                                slidesShow={3}
                                buttonText={data.buttonText}
                                btnUrl={data.buttonUrl}
                                data={data.childData}
                            />
                        </Container>
                    </section>
                    : <></>
            ))}

        </>
    )
}

export default SliderSection;