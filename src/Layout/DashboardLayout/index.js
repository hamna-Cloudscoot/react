import React from "react";
import classes from "./index.module.scss";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const DashboardLayout = ({ children }) => {
    return(
        <>
            <div id={classes.wrapper}>
                <Header dashboard />
                <main id={classes.main}>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default DashboardLayout;