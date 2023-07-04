import Footer from "Pages/OpenAdvice/Components/Footer";
import Header from "Pages/OpenAdvice/Components/Header";
import classes from "./index.module.scss";
const OpenAdviceMainLayout = ({ children }) => {
  return (
    <div id={classes.wrapper}>
      <Header />
      <main id={classes.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default OpenAdviceMainLayout;
