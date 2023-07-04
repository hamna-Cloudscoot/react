import React from "react";
import classes from "./index.module.scss";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div id={classes.wrapper}>
      <Header />
      <main id={classes.main}>
          {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
