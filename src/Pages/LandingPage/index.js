import React, { useEffect } from "react";
import Banner from "../../Components/Banner";
import LogoSlider from "../../Components/LogoSlider";
import AboutUs from "../../Components/AboutUs";
import Blogs from "../../Components/Blogs";
import PostSection from "../../Components/PostSection";
import SliderSection from "../../Components/SliderSection";
import UserAPIs from 'APIs/user'
import { VisibilitySharp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setAllProfessionalPageActiveTab } from "redux/reducers/professionalPage";



const LandingPage = (props) => {

  const dispatch = useDispatch()

  const getIPv4 = async () => {
    const e = await UserAPIs.getIPv4();
    if (e) {
      const data = {
        userIp: e.data.IPv4
      }
      await UserAPIs.createVisitor(data);
    }

  }

  const clearProfessionalsActiveTab = () => {
    dispatch(
      setAllProfessionalPageActiveTab({
        activeTab: null,
      })
    );
  }

  useEffect(() => {
    clearProfessionalsActiveTab()
    // getIPv4();
  }, [])

  return (
    <>
      <Banner
        HomerBanner
        title={"Find your Strategic Advisor"}
        description={"Open Founder helps early and mid stage startups from around the world find strategic mentors, who impart the wisdom and guidance of years spent transforming industries."}
        buttonText={"Sign in"}
        buttonUrl={"/login"}
      />
      <LogoSlider />
      <AboutUs />
      <SliderSection />
      <PostSection />
      <Blogs />

    </>
  );
};

export default LandingPage;
