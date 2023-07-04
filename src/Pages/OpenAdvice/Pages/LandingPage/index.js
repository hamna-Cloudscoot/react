import Banner from "Pages/OpenAdvice/Components/Banner";
import PostSection from "Pages/OpenAdvice/Components/PostSection";
import React, { useState } from "react";
import SupportAPIs from "APIs/support";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import classes from "./index.module.scss";
import SectionHeading from "Pages/OpenAdvice/Components/SectionHeading";

const OpenAdviceLandingPage = () => {
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
        Stitle={"Sample"}
        Mtitle={"Heading"}
        Etitle={"Goes Here"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id rutrum nulla. Duis feugiat purus a libero scelerisque, ut imperdiet eros facilisis. Donec id ornare lorem, "
        }
        buttonText={"find a lawyer"}
        buttonUrl={"#"}
      />
      <PostSection />
      <section className={`section ${classes.contact_section}`}>
        <Container>
          <SectionHeading
            heading={"Contact Us"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id rutrum nulla. Duis feugiat purus a libero scelerisque, ut imperdiet eros facilisis."
            }
          />
          <Row>
            <Col md={6} className={"offset-md-3"}>
              <Form noValidate validated={validated} onSubmit={submitHandler}>
                <Form.Group className={"form-group"}>
                  <Form.Control
                    type={"text"}
                    placeholder={"Type here"}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                  <Form.Label>Name</Form.Label>
                </Form.Group>
                <Form.Group className={"form-group"}>
                  <Form.Control
                    type={"email"}
                    placeholder={"Type here"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <Form.Label>Email</Form.Label>
                </Form.Group>
                <Form.Group className={"form-group"}>
                  <Form.Control
                    as={"textarea"}
                    placeholder={"Type here"}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    required
                  />
                  <Form.Label>Message</Form.Label>
                </Form.Group>
                <Form.Group className={"form-group"}>
                  <Button type={"submit"} variant={"light-bluedark  w-100"}>
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default OpenAdviceLandingPage;
