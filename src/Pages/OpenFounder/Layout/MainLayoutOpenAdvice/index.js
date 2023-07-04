import Footer from "Pages/OpenFounder/Components/Footer";
import Header from "Pages/OpenFounder/Components/Header";
import classes from "./index.module.scss";
const OpenFounderMainLayout = ({ children }) => {
  return (
    <div id={classes.wrapper}>
      <Header />
      <main id={classes.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default OpenFounderMainLayout;
