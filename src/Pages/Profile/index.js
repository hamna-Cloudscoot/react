import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import classes from "./index.module.scss";
import PageTitle from "../../Components/PageTitle";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import starRatingImg from "../../Images/starRatingImg.svg";
import ReviewsList from "../../Components/ReviewsList";
import SectionTitle from "../../Components/SectionHeader";
import UserLandingPageListCard from "Components/UserLandingPageListCards";
import png from "../../Images/doc-basic.png";
import pdf from "../../Images/doc-basic.png";
import ContactPopup from "./ContactPopup";
import UserAPIs from 'APIs/user';
import Loader from "Components/Loader";


const Profile = (props) => {
    let { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);

    const [user, setUser] = useState({});
    const [founders, setFounders] = useState([]);
    const [lawyer, setLawyer] = useState([]);
    const [accountants, setAccountants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setdata] = useState([]);

    const getOneUser = async (id) => {
        const user = await UserAPIs.getOneUser(id);
        if (user) {
            setUser(user.data.data);
        }
        setIsLoading(false)
    }
    const getLawyersAndFounders = async (designation) => {
        setIsLoading(true)
        if (user.designation == 'founder') {
            const founder = await UserAPIs.getFounders();
            if (founder) {
                setFounders(founder.data.data);
            }
        } else if (user.designation == 'lawyer') {
            const lawyer = await UserAPIs.getLawyers();
            if (lawyer) {
                setLawyer(lawyer.data.data)
            }
        } else if (user.designation == "accountant") {
            const accountant = await UserAPIs.getAccountant();
            if (accountant) {
                setAccountants(accountant.data.data);
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getOneUser(id);

    }, [])

    const checkFileType = (file) => {
        if (file?.mimeType === "application/pdf" || file?.mimeType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return pdf
        }
        if (file?.mimeType === "image/jpeg" || file?.mimeType === "image/png" || file?.mimeType === "text/plain") {
            return png
        }
        return null;
    }

    useEffect(() => {
        getLawyersAndFounders(user.designation);
    }, [user])

    useEffect(() => {
        if (user.designation == 'founder') {
            setdata([
                {
                    category: "RelatedFounders",
                    categoryTitle: `Related Founders`,
                    buttonText: 'View All Professionals',
                    buttonUrl: 'all-profession',
                    categoryDescription: "Interesting and informative reading about entrepreneurship, advisors and startups.",
                    childData: founders
                },
            ])
        } else if (user.designation == 'lawyer') {
            setdata([
                {
                    category: "Relatedlawyers",
                    categoryTitle: `Related Lawyer`,
                    buttonText: 'View All Lawyers',
                    buttonUrl: 'all-founders',
                    categoryDescription: "Interesting and informative reading about entrepreneurship, advisors and startups.",
                    childData: lawyer
                },
            ])
        } else if (user.designation == "accountant") {
            setdata([
                {
                    category: "RelatedAccountants",
                    categoryTitle: `Related Accountants`,
                    buttonText: 'View All Accountants',
                    buttonUrl: 'all-founders',
                    categoryDescription: "Interesting and informative reading about entrepreneurship, advisors and startups.",
                    childData: accountants
                },
            ])
        }
    }, [user, accountants, founders, lawyer])



    return (
        <>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <>
                    <PageTitle title={`${user.firstName} ${user.lastName}`} backBtnUrl={'/All-profession'} />
                    <section className={"p-0"}>
                        <Container>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <div className={classes.imgBox}>
                                                {user.profilePic ? <img src={user.profilePic?.path} alt={user.firstName} /> : ''}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <ul className={'dataList'}>
                                                <li>
                                                    <div className={"text-muted"}>Phone</div>
                                                    <div className={"fw-semibold"}>{user.phoneNumber}</div>
                                                </li>
                                                <li>
                                                    <div className={"text-muted"}>Email</div>
                                                    <div className={"fw-semibold"}>{user.email}</div>
                                                </li>
                                                <li>
                                                    <div className={"text-muted"}>DOB</div>
                                                    <div className={"fw-semibold"}>Mar. 10. 1989</div>
                                                </li>
                                                <li>
                                                    <div className={"text-muted"}>Country of Operation</div>
                                                    <div className={"fw-semibold"}>{user.country ? user.country : "N/A"}</div>
                                                </li>
                                                <li>
                                                    <div className={"text-muted"}>PitchDeck</div>
                                                    <div className={classes.fileImg}>
                                                        {
                                                            checkFileType ? <>
                                                                <img style={{ width: "100px" }} src={checkFileType(user.pitchDeck)} alt={"N/A"} />
                                                                <p>{user.pitchDeck?.fileName}</p>
                                                            </>
                                                                : "N/A"

                                                        }
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={"text-muted"}>Business plan</div>
                                                    <div className={classes.fileImg}>
                                                        {
                                                            user.businessPlan ?
                                                                <>
                                                                    <img style={{ width: "100px" }} src={checkFileType(user.businessPlan)} />
                                                                    <p>{user.businessPlan?.fileName}</p>
                                                                </>
                                                                : "N/A"
                                                        }

                                                    </div>
                                                </li>
                                            </ul>
                                            <div className={"dividerText font-16 fw-semibold pb-3"}><span>Other Documents</span></div>
                                            {user.otherDocuments?.length ?
                                                user.otherDocuments?.map((data) => {
                                                    return (
                                                        <>
                                                            <div className={classes.fileImg}>
                                                                {checkFileType(data) ?
                                                                    <>
                                                                        <img style={{ width: "100px" }} src={checkFileType(data) || "N/A"} alt={"N/A"} />
                                                                        <p>{data?.fileName}</p>
                                                                    </>
                                                                    : "N/A"}

                                                            </div>
                                                        </>
                                                    )
                                                }) :
                                                <div className={classes.fileImg}>
                                                    <p>No Other Documents Available</p>
                                                </div>
                                            }
                                            <Button variant={"secondary w-100"} onClick={() => setModalShow(true)}>Contact</Button>
                                        </Col>
                                    </Row>
                                    <div className={"dividerText font-24 fw-bold py-4"}><span>Reviews (34) <img width={"100"} src={starRatingImg} alt={"#"} /> 4.7</span></div>
                                    <ReviewsList noPaging />
                                </Card.Body>
                            </Card>
                        </Container>
                    </section>
                    <>
                        {data.map((data) => (
                            <section className={"section"}>
                                <Container>
                                    <SectionTitle title={data.categoryTitle} description={data.categoryDescription} />
                                    <UserLandingPageListCard
                                        slidesScroll={1}
                                        arrows={true}
                                        dots={false}
                                        slidesShow={3}
                                        buttonText={data.buttonText}
                                        btnUrl={data.buttonUrl}
                                        data={data.childData.filter(data => (data.id !== user.id))}
                                    />
                                </Container>
                            </section>
                        ))}
                    </>

                    <ContactPopup
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        professionalId={id}
                        designation={user?.designation}
                    /></>}

        </>
    )
}

export default Profile;