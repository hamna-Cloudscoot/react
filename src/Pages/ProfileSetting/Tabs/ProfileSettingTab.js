import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import SelectDropDown from "../../../Components/SelectDropDown";
import AvailabilityAPIs from "APIs/availability/index";
import UploadProfilePicture from "../../../Components/UploadProfilePicture";
import ProfileAPIs from "APIs/profile/index";
import { Formik } from "formik";
import * as yup from "yup";
import png from "Images/f2.png";
import pdf from "Images/f3.png";
import baseDocImg from "Images/doc-basic.png";
import FileAPIs from "APIs/file/index";
import enums from "config/enums";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { useDispatch, useSelector } from "react-redux";
import { userSuccess } from "redux/reducers/user";
import { convert_to_12_hour, flattenArr } from "GlobalHelperFunctions";

const FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const professions = [
  { type: "Founder", value: "founder" },
  { type: "CoFounder", value: "co_founder" },
  { type: "Lawyer", value: "lawyer" },
  { type: "Accountant", value: "accountant" },
];

const ProfileSettingTab = ({ userData, setUserData }) => {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user);

  const [daysState, setDaysState] = useState([]);
  const [timeSlotsState, setTimeSlotsState] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedChip, setSelectedChip] = useState([]);

  const lookingForArr = (e, setFieldValue) => {
    let looking = userData.lookingFor || [];
    if (e.target.checked) {
      looking.push(e.target.id);
    } else {
      looking.splice(looking.indexOf(e.target.id), 1);
    }
    setUserData({ ...userData, lookingFor: looking });
    setFieldValue("lookingFor", looking);
  };

  const timeSlotsArr = (e, setFieldValue) => {
    let timeSlots = userData.availableTimeSlots;
    if (e.target.checked) {
      timeSlots.push(e.target.id);
    } else {
      timeSlots.splice(timeSlots.indexOf(e.target.id), 1);
    }
    setUserData({ ...userData, availableTimeSlots: timeSlots });
    setFieldValue("availableTimeSlots", timeSlots);
  };

  const availableDays = (e, setFieldValue) => {
    let days = userData.availableDays;
    if (e.target.checked) {
      days.push(e.target.id);
    } else {
      days.splice(days.indexOf(e.target.id), 1);
    }
    setUserData({ ...userData, availableDays: days });
    setFieldValue("availableDays", days);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const getAvailableDays = async () => {
    try {
      const res = await AvailabilityAPIs.getAvailableDays();
      if (res) {
        setDaysState(res.data.data);
      }
    } catch (error) { }
  };

  const getAvailableTimeSlots = async () => {
    try {
      const res = await AvailabilityAPIs.getAvailableTimeSlots();
      if (res) {
        setTimeSlotsState(res.data.data);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getAvailableDays();
    getAvailableTimeSlots();
    setSkills(userData.skills);
  }, [userData]);

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().required(),
    linkedInProfile: yup.string().required(),
    skills: yup.array().of(yup.string()).required(),
    city: yup.string().required(),
    country: yup.string().required(),
    pitchDeckDocument: yup.mixed().test("fileSize", "File too large or not present", function (value) {
      if (!value || (value && !value.size)) {
        return this.createError({ message: "A file is required" });
      }
      if (value.size > FILE_SIZE) {
        return this.createError({ message: "File size too large" });
      }
      return true;
    }),
    businessProfileDocument: yup
      .mixed()
      .test("fileSize", "The file is too large", (value) => {
        if (!value || !value.length) return true; // attachment is optional
        return value[0].size <= 2000000;
      })
      .optional()
      .nullable(),
    otherDocuments: yup
      .array()
      .of(
        yup.mixed().test("fileSize", "The file is too large", (value) => {
          if (!value.length) return true; // attachment is optional
          return value[0].size <= 2000000;
        })
      )
      .optional(),
    availableDays: yup.array().min(1).of(yup.string().required()).required(),
    availableTimeSlots: yup.array().min(1).of(yup.string().required()).required(),
    areYou: yup.string().required(),
    lookingFor: yup.array().min(1).of(yup.string().required()).required(),
  });

  const convertFileToUrl = (file) => {
    return URL.createObjectURL(file);
  };
  const getPitchDocument = (e, setFieldValue) => {
    setUserData({ ...userData, pitchDeckDocument: e.target.files[0] });
    setFieldValue("pitchDeckDocument", e.target.files[0]);
  };

  const getBusinessDocument = (e, setFieldValue) => {
    setUserData({ ...userData, businessProfileDocument: e.target.files[0] });
    setFieldValue("businessProfileDocument", e.target.files[0]);
  };

  const getOtherDocuments = (e, setFieldValue) => {
    let files = e.target.files;
    setUserData({ ...userData, otherDocuments: [...files] });
    setFieldValue("otherDocuments", [...files]);
  };

  const removeThisDocumentFromOtherDocuments = (document, setFieldValue) => {
    userData.otherDocuments.splice(userData.otherDocuments.indexOf(document), 1);
    setUserData({ ...userData, otherDocuments: [...userData.otherDocuments] });
    setFieldValue("otherDocuments", [...userData.otherDocuments]);
  };

  const handleCommaSeparatedSkills = (value) => {
    const skills = value?.toString().split(",") || [];
    const skillsArr = [];
    skills.forEach((element) => {
      if (element && element.length && !skillsArr.includes(element.trim())) skillsArr.push(element.trim());
    });
    setUserData({ ...userData, skills: skillsArr });
    return skillsArr;
  };

  const shortenName = (name) => {
    if (name.length > 10) {
      const startStr = name.substr(0, 5);
      const endStr = name.substring(name.length - 5);
      return `${startStr}...${endStr}`;
    }
    return name;
  };

  const checkFileType = (file) => {
    switch (file?.mimeType || file?.type) {
      case "application/pdf":
        return { src: baseDocImg, fileType: "pdf", fileName: shortenName(file.fileName || file.name) };
      case "image/jpeg":
        return { src: baseDocImg, fileType: "jpg", fileName: shortenName(file.fileName || file.name) };
      case "image/png":
        return { src: baseDocImg, fileType: "png", fileName: shortenName(file.fileName || file.name) };
      case "text/plain":
        return { src: baseDocImg, fileType: "docs", fileName: shortenName(file.fileName || file.name) };
      default:
        return { src: baseDocImg, fileType: "docs", fileName: shortenName(file.fileName || file.name) };
    }
    return null;
  };

  const [disabled, setDisabled] = useState(true);
  const [isActive, setActive] = useState(false);

  function toggleFormDisable() {
    handleCommaSeparatedSkills(skills);
    setDisabled(!disabled);
    setActive(!isActive);
  }

  const uploadPitchDocument = async (file) => {
    try {
      const dataArray = new FormData();
      dataArray.append("file", file);
      const res = await FileAPIs.uploadFile(dataArray);
      setUserData({ ...userData, pitchDeckDocumentId: res.data.data.id });
      return res.data.data;
    } catch (error) { }
  };

  const uploadBusinessDocument = async (file) => {
    try {
      const dataArray = new FormData();
      dataArray.append("file", file);
      const res = await FileAPIs.uploadFile(dataArray);
      setUserData({ ...userData, businessProfileDocumentId: res.data.data.id });
      return res.data.data;
    } catch (error) { }
  };

  const uploadOtherDocuments = async (files, userId) => {
    try {
      const dataArray = new FormData();
      dataArray.append("attachments", ...files);
      const res = await FileAPIs.uploadFiles(dataArray, userId, enums.AttachmentsTypeEnum.user);
    } catch (error) { }
  };
  const updateProfile = async (data) => {
    try {
      let pitchDeckDocument;
      if (data.pitchDeckDocument && data.pitchDeckDocument instanceof File) {
        pitchDeckDocument = await uploadPitchDocument(data.pitchDeckDocument);
      }

      let businessDocument;
      if (data.businessProfileDocument && data.businessProfileDocument instanceof File) {
        businessDocument = await uploadBusinessDocument(data.businessProfileDocument);
      }

      if (data.otherDocuments.length > 0 && data.otherDocuments[0] instanceof File) {
        await uploadOtherDocuments(data.otherDocuments, userData.id);
      }

      if (userData.profilePicId !== data.profilePicId) {
        data.profilePicId = userData.profilePicId;
      }
      await updateProfileAPI(data, pitchDeckDocument?.id, businessDocument?.id);
    } catch (error) { }
  };

  const getUserProfileData = async () => {
    const response = await ProfileAPIs.getProfile();

    const profile = response.data.data;

    const mappedUser = {
      id: profile.id,
      profilePic: profile?.profilePic,
      profilePicId: profile?.profilePic?.id,
      profilePicSrc: profile?.profilePic?.path,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      password: '',
      repeatPassword: '',
      phoneNumber: profile.phoneNumber,
      linkedInProfile: profile.linkedinProfile,
      skills: profile.skills ? profile.skills.split(',') : [],
      city: profile.city,
      country: profile.country,
      pitchDeckDocument: profile.pitchDeck,
      pitchDeckDocumentId: profile?.pitchDeck?.id,
      pitchDeckDocumentSrc: profile?.pitchDeck?.path,
      businessProfileDocument: profile.businessPlan,
      businessProfileDocumentId: profile?.businessPlan?.id,
      businessProfileDocumentSrc: profile?.businessPlan?.path,
      otherDocuments: profile.otherDocuments,
      otherDocumentSrc: [],
      availableDays: flattenArr(profile?.availability_days, 'day'),
      availableTimeSlots: flattenArr(profile?.availability_slots, 'timeSlot'),
      areYou: profile.designation,
      lookingFor: profile.lookingFor,
      hasErrors: false,
      errors: {}
    }
    dispatch(userSuccess({
      user: mappedUser
    }))
    setUserData(mappedUser)
  };

  const updateProfileAPI = async (user, pitchDeckDocumentId, businessDocument) => {
    try {
      let profileUpdatePayload = {
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        linkedinProfile: user.linkedInProfile,
        skills: user.skills?.length > 0 ? skills.toString() : "",
        city: user.city,
        country: user.country,
        designation: user.areYou === "CoFounder" ? "co_founder" : user.areYou.toLowerCase(),
        lookingFor: user.lookingFor.map((val) => (val.trim() === "CoFounder" ? "co_founder" : val.toLowerCase())),
        pitchDeck: user.pitchDeckDocumentId || pitchDeckDocumentId,
        businessPlan: user.businessProfileDocumentId || businessDocument,
        availibility_days: user.availableDays,
        availibility_time: user.availableTimeSlots,
      };
      if (user.profilePicId) {
        profileUpdatePayload.profilePic = user.profilePicId;
      }
      const res = await ProfileAPIs.updateProfile(profileUpdatePayload);
      toggleFormDisable();
      if (res) {
        getUserProfileData();
        toast.success("Profile updated successfully.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) { }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(data) => {
          updateProfile(data);
        }}
        initialValues={userData}
        enableReinitialize={true}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setFieldValue }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className={`${classes.summeryDetail} ${isActive ? "" : `${classes.disabled}`}`}>
              <Card>
                <Card.Body>
                  <UploadProfilePicture
                    userState={userData}
                    setUserState={setUserData}
                    signUp={false}
                    disabled={disabled}
                  />
                  <Card.Title className={classes.formTitle}>Your Information</Card.Title>
                  <Row>
                    <Col md={4}>
                      <Form.Group className={"form-group"}>
                        <Form.Control
                          type={"text"}
                          placeholder={"N/A"}
                          className={"fw-semibold font-16"}
                          name={"firstName"}
                          value={values.firstName}
                          onChange={handleChange}
                          required
                          isInvalid={!!errors.firstName}
                          disabled={disabled}
                        />
                        <Form.Label>First Name </Form.Label>
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className={"form-group"}>
                        <Form.Control
                          type={"text"}
                          placeholder={"N/A"}
                          className={"fw-semibold font-16"}
                          name={"lastName"}
                          value={values.lastName}
                          onChange={handleChange}
                          required
                          isInvalid={!!errors.lastName}
                          disabled={disabled}
                        />
                        <Form.Label>Last Name </Form.Label>
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className={"form-group"}>
                        <Form.Control
                          type={"text"}
                          placeholder={"N/A"}
                          className={"fw-semibold font-16"}
                          name={"phoneNumber"}
                          value={values.phoneNumber}
                          onChange={handleChange}
                          required
                          isInvalid={!!errors.phoneNumber}
                          disabled={disabled}
                        />
                        <Form.Label>Phone Number </Form.Label>
                        <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className={"form-group"}>
                        <Form.Control
                          type={"text"}
                          placeholder={"N/A"}
                          className={"fw-semibold font-16"}
                          name={"email"}
                          value={values.email}
                          onChange={handleChange}
                          required
                          isInvalid={!!errors.email}
                          disabled={true}
                        />
                        <Form.Label>Email Address </Form.Label>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className={"form-group"}>
                        <Form.Control
                          type={"text"}
                          placeholder={"N/A"}
                          className={"fw-semibold font-16"}
                          name={"linkedInProfile"}
                          value={values.linkedInProfile}
                          onChange={handleChange}
                          required
                          isInvalid={!!errors.linkedInProfile}
                          disabled={disabled}
                        />
                        <Form.Label>LinkedIn Profile </Form.Label>
                        <Form.Control.Feedback type="invalid">{errors.linkedInProfile}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className={"form-group"}>
                        {disabled ? (
                          <>
                            <ul className={classes.tagList}>
                              {skills?.map((current, ind) => {
                                return (
                                  <li key={ind}>
                                    <Link to={"#"}>{current}</Link>
                                  </li>
                                );
                              }) || <b>N/A</b>}
                            </ul>
                          </>
                        ) : (
                          // <Form.Control
                          //   type={"text"}
                          //   className={"fw-semibold font-16"}
                          //   placeholder={"Type here, separate using comma"}
                          //   value={skills}
                          //   name={"skills"}
                          //   onChange={(e) => {
                          //     setSkills(e.target.value);
                          //   }}
                          //   onBlur={() => {
                          //     setFieldValue(handleCommaSeparatedSkills(skills));
                          //   }}
                          //   disabled={disabled}
                          //   required
                          //   isInvalid={!!errors.skills}
                          // />
                          <TagsInput value={skills} onChange={setSkills} onBlur={() => { setFieldValue('skills', skills) }} placeHolder="Enter skill and press enter" />
                        )}
                        <Form.Label>Skills</Form.Label>
                        <Form.Control.Feedback type="invalid">{errors.skills}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className={"form-group"}>
                        <Form.Control
                          type={"text"}
                          placeholder={"Type here"}
                          className={"fw-semibold font-16"}
                          name={"city"}
                          value={values.city}
                          onChange={handleChange}
                          required
                          isInvalid={!!errors.city}
                          disabled={disabled}
                        />
                        <Form.Label>City </Form.Label>
                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className={"form-group"}>
                        <Form.Control
                          type={"text"}
                          placeholder={"N/A"}
                          className={"fw-semibold font-16"}
                          name={"country"}
                          value={values.country}
                          onChange={handleChange}
                          required
                          isInvalid={!!errors.country}
                          disabled={disabled}
                        />
                        <Form.Label>Country </Form.Label>
                        <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className={classes.formTitle}>Your Resources</Card.Title>
                  <Row>
                    <Col md={2}>
                      <Form.Group className={"mb-3"}>
                        <Form.Label>Pitch Deck</Form.Label>
                        <div className={classes.fileUpload}>
                          {/* <Form.Label htmlFor={"fileUpload"}> */}
                          {userData?.pitchDeckDocument &&
                            (Object.keys(userData?.pitchDeckDocument).length > 0 ||
                              userData?.pitchDeckDocument instanceof File) ? (
                            <>
                              <div className={`${classes.fileImg} ${classes.file_box}`}>
                                <img src={checkFileType(userData?.pitchDeckDocument).src} alt={"N/A"} />
                                <div className={classes.textBox}>
                                  <p>{checkFileType(userData?.pitchDeckDocument).fileType}</p>
                                  <p>{checkFileType(userData?.pitchDeckDocument).fileName}</p>
                                </div>
                                <Button
                                  variant={"delete"}
                                  disabled={disabled}
                                  onClick={(e) => {
                                    setFieldValue("pitchDeckDocument", {});
                                    setUserData({ ...userData, pitchDeckDocument: {} });
                                  }}
                                >
                                  <i className={"fal fa-times"}></i>{" "}
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={classes.fileUpload}>
                                <Form.Label htmlFor={"fileUpload"}>
                                  <input
                                    type="file"
                                    id={"fileUpload"}
                                    onChange={(e) => {
                                      getPitchDocument(e, setFieldValue);
                                    }}
                                    disabled={disabled}
                                  />

                                  <p>No document</p>
                                </Form.Label>
                              </div>
                            </>
                          )}
                          {/* </Form.Label> */}
                          <Form.Control.Feedback type="invalid">{errors.pitchDeckDocument}</Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group className={"mb-3"}>
                        <Form.Label>Business Plan</Form.Label>
                        <div className={classes.fileUpload}>
                          <Form.Label htmlFor={"fileUpload1"}>
                            {userData?.businessProfileDocument &&
                              (Object.keys(userData?.businessProfileDocument).length > 0 ||
                                userData?.businessProfileDocument instanceof File) ? (
                              <>
                                <div className={`${classes.fileImg} ${classes.file_box}`}>
                                  <img src={checkFileType(userData?.businessProfileDocument).src} alt={"N/A"} />
                                  <div className={classes.textBox}>
                                    <p>{checkFileType(userData?.businessProfileDocument).fileType}</p>
                                    <p>{checkFileType(userData?.businessProfileDocument).fileName}</p>
                                  </div>
                                  <Button
                                    variant={"delete"}
                                    disabled={disabled}
                                    onClick={(e) => {
                                      setFieldValue("businessProfileDocument", {});
                                      setUserData({ ...userData, businessProfileDocument: {} });
                                    }}
                                  >
                                    <i className={"fal fa-times"}></i>{" "}
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <>
                                <input
                                  type="file"
                                  id={"fileUpload1"}
                                  onChange={(e) => {
                                    getBusinessDocument(e, setFieldValue);
                                  }}
                                  disabled={disabled}
                                />

                                <p>No document</p>
                              </>
                            )}
                          </Form.Label>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group className={"mb-3"}>
                        <Form.Label>Other Documents</Form.Label>
                        {userData?.otherDocuments && userData?.otherDocuments?.length ? (
                          userData.otherDocuments?.map((data) => {
                            return (
                              <>
                                <div className={`${classes.fileImg} ${classes.file_box}`}>
                                  <img src={checkFileType(data).src} alt={"N/A"} />
                                  <div className={classes.textBox}>
                                    <p>{checkFileType(data).fileType}</p>
                                    <p>{checkFileType(data)?.fileName}</p>
                                  </div>
                                  <Button
                                    variant={"delete"}
                                    disabled={disabled}
                                    onClick={(e) => {
                                      removeThisDocumentFromOtherDocuments(document, setFieldValue);
                                    }}
                                  >
                                    <i className={"fal fa-times"}></i>{" "}
                                  </Button>
                                </div>
                              </>
                            );
                          })
                        ) : (
                          <>
                            <div className={classes.fileUpload}>
                              <Form.Label htmlFor={"fileUpload2"}>
                                <input
                                  type="file"
                                  multiple
                                  id={"fileUpload2"}
                                  onChange={(e) => {
                                    getOtherDocuments(e, setFieldValue);
                                  }}
                                  disabled={disabled}
                                />

                                <p>No document</p>
                              </Form.Label>
                            </div>
                          </>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className={"mb-3"}>
                <Card.Body>
                  <Card.Title className={classes.formTitle}>Your availability</Card.Title>
                  <Form.Group className={"form-group"}>
                    <div>Selected days</div>
                    <ul className={`${classes.checkBoxList} d-flex`}>
                      {daysState.map((day) => (
                        <li>
                          <Form.Check
                            className={classes.formCheck}
                            label={capitalizeFirstLetter(day.name)}
                            name="days"
                            type={"checkbox"}
                            id={day.id}
                            disabled={disabled}
                            checked={userData?.availableDays?.includes(day.id)}
                            onChange={(e) => availableDays(e, setFieldValue)}
                            required
                            isInvalid={errors.availableDays}
                          />
                        </li>
                      ))}
                    </ul>
                    <Form.Control.Feedback type="invalid">{errors.availableDays}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className={"form-group"}>
                    <div>Selected times</div>
                    <ul className={`${classes.checkBoxList} d-flex`}>
                      {timeSlotsState.map((timeSlot) => (
                        <li>
                          <Form.Check
                            className={`form-check-inline ${classes.formCheck}`}
                            label={`${convert_to_12_hour(timeSlot.start_time)} - ${convert_to_12_hour(
                              timeSlot.end_time
                            )}`}
                            name="timeSlot"
                            type={"checkbox"}
                            id={timeSlot.id}
                            disabled={disabled}
                            checked={userData?.availableTimeSlots?.includes(timeSlot.id) || false}
                            onChange={(e) => timeSlotsArr(e, setFieldValue)}
                            required
                            isInvalid={errors.availableTimeSlots}
                          />
                        </li>
                      ))}
                    </ul>
                    <Form.Control.Feedback type="invalid">{errors.availableTimeSlots}</Form.Control.Feedback>
                  </Form.Group>
                </Card.Body>
              </Card>
              <Card className={"mb-3"}>
                <Card.Body>
                  <Card.Title className={classes.formTitle}>You are a</Card.Title>
                  <ul className={`${classes.checkBoxList} d-flex`}>
                    {professions.map((profession) => (
                      <li>
                        <Form.Check
                          className={classes.formCheck}
                          label={profession.type}
                          name="areYou"
                          type={"radio"}
                          id={profession.value}
                          disabled={disabled}
                          checked={values.areYou === profession.value}
                          onChange={() => {
                            setFieldValue("areYou", profession.value);
                          }}
                          required
                          isInvalid={errors.areYou}
                        />
                      </li>
                    ))}
                  </ul>
                  <Form.Control.Feedback type="invalid">{errors.areYou}</Form.Control.Feedback>
                </Card.Body>
              </Card>
              <Card className={"mb-3"}>
                <Card.Body>
                  <Card.Title className={classes.formTitle}>Are you looking for a</Card.Title>
                  <ul className={`${classes.checkBoxList} d-flex`}>
                    {professions.map((profession) => (
                      <li>
                        <Form.Check
                          className={classes.formCheck}
                          label={profession.type}
                          name="lookingFor"
                          type={"checkbox"}
                          id={profession.value}
                          disabled={disabled}
                          checked={userData?.lookingFor?.includes(profession.value)}
                          onChange={(e) => lookingForArr(e, setFieldValue)}
                          required
                          isInvalid={errors.lookingFor}
                        />
                      </li>
                    ))}
                  </ul>
                  <Form.Control.Feedback type="invalid">{errors.lookingFor}</Form.Control.Feedback>
                </Card.Body>
              </Card>

              <div className={classes.btnRow}>
                <Button variant={"outline-dark m-2"} onClick={toggleFormDisable}>
                  Edit Details
                </Button>
                <Button
                  type={"submit"}
                  variant={"secondary m-2"}
                  disabled={!disabled && Object.keys(errors).length > 0 ? true : false}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileSettingTab;
