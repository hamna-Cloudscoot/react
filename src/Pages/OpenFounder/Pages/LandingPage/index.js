import Banner from "Pages/OpenFounder/Components/Banner";
import PostSection from "Pages/OpenFounder/Components/PostSection";
import React, { useState } from "react";
import SupportAPIs from "APIs/support";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import classes from "./index.module.scss";
import SectionHeading from "Pages/OpenFounder/Components/SectionHeading";
import LogoSlider from "Pages/OpenFounder/Components/LogoSlider";
import AboutUs from "Pages/OpenFounder/Components/AboutUs";

const OpenFounderLandingPage = () => {
  // Support APIs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [validated, setValidated] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const data = {
      name: name,
      email: email,
      message: message,
    };
    try {
      const res = await SupportAPIs.sendSupportRequest(data);
      if (res) {
        toast.success("Request Submited Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log("error");
      toast.error("Something Went Wrong", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setEmail("");
    setMessage("");
    setName("");
  };
  return (
    <>
      <Banner
        HomerBanner
        title={"Find your Strategic Advisor"}
        description={
          "Open Advisor helps early and mid stage startups from around the world find strategic mentors, who impart the wisdom and guidance of years spent transforming industries."
        }
      />
      <LogoSlider />
      <AboutUs />
      <PostSection />
    </>
  );
};

export default OpenFounderLandingPage;
