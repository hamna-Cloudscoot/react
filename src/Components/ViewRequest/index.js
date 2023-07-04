import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.png";
import { Button, Col, Form } from "react-bootstrap";
import baseDocImg from "../../Images/pdfDownload.png";
import { Link } from "react-router-dom";
import UserAPIs from "APIs/user";
import { useDispatch, useSelector } from "react-redux";
import { convert_to_12_hour, flattenArr, flattenArrWithObj } from "GlobalHelperFunctions";
import ContactRequestAPIs from 'APIs/contact-requests/index';
import Enums from 'config/enums';
import Loader from "Components/Loader";
import { setAccepted } from "redux/reducers/requestAccepted";
import { toast } from "react-toastify";

const ViewRequest = (props) => {

  const request = useSelector((state) => state.common);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(null);
  const dispatch = useDispatch();
  const isAcceptedRedux = useSelector((state) => state.requestAccepted);



  const [user, setUser] = useState({});

  const getOneUser = async (requestId) => {
    console.log("Get one user on view request === ", requestId);
    setIsLoading(true);
    const res = await UserAPIs.getOneUser(requestId);
    if (res) {
      setUser(res.data.data);
      props.setIsLoading(false);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (request?.requestId) {
      getOneUser(request?.requestId);
    }
    else {
      props.setIsLoading(false);
    }
  }, [request, isAccepted, isAcceptedRedux]);

  const shortenName = (name) => {
    if (name.length > 15) {
      const startStr = name.substr(0, 5);
      const endStr = name.substring(name.length - 5);
      return `${startStr}...${endStr}`;
    }
    return name;
  };

  const checkFileType = (file) => {
    switch (file?.mimeType || file?.type) {
      case "application/pdf":
        return { src: baseDocImg, fileType: "pdf", fileName: shortenName(file.fileName || file.name) };;
      case "image/jpeg":
        return { src: baseDocImg, fileType: "jpg", fileName: shortenName(file.fileName || file.name) };
      case "image/png":
        return { src: baseDocImg, fileType: "png", fileName: shortenName(file.fileName || file.name) };
      case "text/plain":
        return { src: baseDocImg, fileType: "docs", fileName: shortenName(file.fileName || file.name) };
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return { src: baseDocImg, fileType: "docs", fileName: shortenName(file.fileName || file.name) };
    }
    return null;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const sortedDays = (daysArr) => {
    const days = flattenArrWithObj(daysArr, 'day')
    const sorted = days.sort((a, b) => {
      return a.sorting_id - b.sorting_id;
    })
    return sorted
  }

  const changeContactRequestStatus = async (contactId, status) => {

    try {
      setIsLoading(true);
      console.log("contactId", contactId, status)
      const accepted = await ContactRequestAPIs.changeStatusOfContactRequest(contactId, status);
      if (accepted) {
        setIsLoading(false);
        dispatch(setAccepted({ id: accepted?.fromOrSender?.id }))
        setIsAccepted(status);
        toast.success(`${capitalizeFirstLetter(status?.toLowerCase())} Successfully`, {
          position: "top-right",
          autoClose: 2000,
        });
        return accepted;
      }
    } catch (e) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }
  return (
    <>
      <Loader isLoading={isLoading} />
      {Object.keys(user).length > 0 ? <div className={classes.viewRequest}>
        <div className={classes.requestHeader}>
          <div className={classes.imgBoxHolder}>
            <div className={classes.imgBox}>
              <img src={user.profilePic?.path || avatar} alt={"#"} />
              <span className={classes.status}></span>
            </div>
          </div>
          <div className={classes.description}>
            <div className={classes.text}>
              <h2 className={classes.title}>{`${user?.firstName} ${user?.lastName}`}</h2>
              <p className={"text-muted fw-semibold"}>{capitalizeFirstLetter(user?.designation)}</p>
              <p className={"fw-semibold"}>Availability</p>
              <p className={"text-yellow text-capitalize"}>
                {
                  sortedDays(user.availability_days)?.map((currn, ind) => {
                    return `${currn.name}` + (ind + 1 === user.availability_days?.length ? "" : ", ");
                  }) || "N/A"
                }
              </p>
              <p className={"text-yellow text-capitalize"}>
                {user.availability_slots?.map((currn, ind) => {
                  return (
                    `${convert_to_12_hour(currn.timeSlot.start_time)} to ${convert_to_12_hour(
                      currn.timeSlot.end_time
                    )}` + (ind + 1 === user.availability_slots?.length ? "" : ", ")
                  );
                }) || "N/A"}
              </p>
            </div>
            <div className={classes.btnRow}>
              {isAccepted ? '' :
                <><Button variant={"secondary"} onClick={() => { changeContactRequestStatus(user?.id, Enums.ContactRequestStatusEnum.ACCEPTED) }}>Accept</Button>
                  <Button variant={"light"} onClick={() => { changeContactRequestStatus(user?.id, Enums.ContactRequestStatusEnum.CANCELED) }}>Ignore</Button> </>
              }
              {isAccepted == 'ACCEPTED' && <Button variant={"secondary"} disabled>Accepted</Button>}
              {isAccepted == 'CENCELLED' && <Button variant={"light"} disabled>Ignored</Button>}
            </div>
          </div>
        </div>
        <div className={classes.requestBody}>
          <Col className={classes.col}>
            <ul className={"dataList w-100"}>
              <li>
                <div className={"text-muted"}>Email</div>
                <div className={"fw-semibold"}>{user.email || "N/A"}</div>
              </li>
              <li>
                <div className={"text-muted"}>Phone</div>
                <div className={"fw-semibold"}>{user.phoneNumber}</div>
              </li>
              <li>
                <div className={"text-muted"}>LinkedIn Profile</div>
                <div className={"fw-semibold"}>{user.linkedinProfile || "N/A"}</div>
              </li>
              <li>
                <div className={"text-muted"}>Location</div>
                <div className={"fw-semibold"}>{`${user.city || "N/A"}, ${user.country || "N/A"}`}</div>
              </li>
            </ul>
          </Col>
          <Col className={classes.col}>
            <div className={"mb-3"}>
              <div className={"text-muted"}>Resources</div>
            </div>
            <div className={"mb-3"}>
              <ul className={"downLoadFileList"}>
                <li>
                  <p>Pitch Deck</p>
                  {/* <input type="file" id={"fileUpload"} onChange={getPitchDocument} disabled={disabled} /> */}
                  {console.log("Type   - - - -", checkFileType(user?.pitchDeck)?.src)}
                  {console.log("REsourcce   - - - -", user?.pitchDeck)}
                  {user?.pitchDeck ? (
                    <>
                      <div className={`${classes.fileImg} ${classes.file_box}`}>
                        <img src={checkFileType(user?.pitchDeck)?.src} alt={"N/A"} />
                        <div className={classes.textBox}>
                          <p>{checkFileType(user?.pitchDeck)?.fileType}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={classes.fileUpload}>
                        <Form.Label htmlFor={"fileUpload2"}>
                          <p>No document</p>
                        </Form.Label>
                      </div>
                    </>
                  )}
                </li>
                <li>
                  <p>Business Plan</p>
                  {user?.businessPlan ? (
                    <>
                      <div className={`${classes.fileImg} ${classes.file_box}`}>
                        <img src={checkFileType(user?.businessPlan)?.src} alt={"N/A"} />
                        <div className={classes.textBox}>
                          <p>{checkFileType(user?.businessPlan)?.fileType}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={classes.fileUpload}>
                        <Form.Label htmlFor={"fileUpload2"}>
                          <p>No document</p>
                        </Form.Label>
                      </div>
                    </>
                  )}
                </li>
                <li>
                  <p>Certificates</p>
                  {user?.otherDocuments && user?.otherDocuments?.length ? (
                    user.otherDocuments?.map((data) => {
                      return (
                        <>
                          <div className={`${classes.fileImg} ${classes.file_box}`}>
                            <img src={checkFileType(data)?.src} alt={"N/A"} />
                            <div className={classes.textBox}>
                              <p>{checkFileType(data)?.fileType}</p>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div className={classes.fileUpload}>
                        <Form.Label htmlFor={"fileUpload2"}>
                          <p>No document</p>
                        </Form.Label>
                      </div>
                    </>
                  )}
                </li>
              </ul>
            </div>
            <div className={"mb-3"}>
              <div className={"text-muted"}>Skills</div>
              <ul className={"tagList"}>
                {user.skills?.split(",").map((currn, ind) => {
                  return (
                    <li>
                      <Link to={"#"}>{currn}</Link>
                    </li>
                  );
                }) || "N/A"}
              </ul>
            </div>
          </Col>
        </div>
      </div> :
        <p className={"p-3"}>No Request Exist</p>
      }
    </>
  );
};

export default ViewRequest;
