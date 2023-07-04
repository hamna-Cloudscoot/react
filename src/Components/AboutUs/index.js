import React from "react";
import {Container} from "react-bootstrap";
import classes from "./index.module.scss";
import SectionTitle from "../SectionHeader";
import openadvisor from "../../Images/openadvisor.png";
import openadvice from "../../Images/openadvice.png";
import openfounder from "../../Images/openfounder.png";
import {Link} from "react-router-dom";

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
                            <div className={`bg-light-yellow ${classes.box}`}>
                                <div className={classes.iconBox}>
                                    <img src={openadvisor} />
                                </div>
                                <h3 className={`font-18 ${classes.title}`}>Open Advisor</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis</p>
                            </div>
                        </div>
                        <div className={classes.col}>
                            <Link to={"/open-advice"} className={`bg-light-blue ${classes.box}`}>
                                <div className={classes.iconBox}>
                                    <img src={openadvice} />
                                </div>
                                <h3 className={`font-18 ${classes.title}`}>Open Advice</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis</p>
                            </Link>
                        </div>
                        <div className={classes.col}>
                            <Link to={"/open-founder"} className={`bg-light-green ${classes.box}`}>
                                <div className={classes.iconBox}>
                                    <img src={openfounder} />
                                </div>
                                <h3 className={`font-18 ${classes.title}`}>Open Founder</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis</p>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
export default AboutUs;