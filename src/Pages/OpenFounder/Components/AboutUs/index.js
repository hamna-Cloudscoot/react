import React from "react";
import {Container} from "react-bootstrap";
import classes from "./index.module.scss";
import SectionTitle from "../SectionHeader";
import openadvisor from "../../../../Images/about01.png";
import openadvice from "../../../../Images/about02.png";
import openfounder from "../../../../Images/about03.png";

const AboutUs = (props) => {
    return(
        <>
            <section>
                <Container>
                    <SectionTitle
                        title={"Accessing Strategic Advisors has never been simpler."}
                    />
                    <div className={classes.colList}>
                        <div className={classes.col}>
                            <div className={`bg-pink ${classes.box}`}>
                                <div className={classes.iconBox}>
                                    <img src={openadvisor} />
                                </div>
                                <h3 className={`font-18 ${classes.title}`}>Open Advisor</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis</p>
                            </div>
                        </div>
                        <div className={classes.col}>
                            <div className={`bg-organge-light ${classes.box}`}>
                                <div className={classes.iconBox}>
                                    <img src={openadvice} />
                                </div>
                                <h3 className={`font-18 ${classes.title}`}>Open Advisor</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis</p>
                            </div>
                        </div>
                        <div className={classes.col}>
                            <div className={`bg-blue-light ${classes.box}`}>
                                <div className={classes.iconBox}>
                                    <img src={openfounder} />
                                </div>
                                <h3 className={`font-18 ${classes.title}`}>Open Advisor</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
export default AboutUs;