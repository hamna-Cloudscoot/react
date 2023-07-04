import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import avatar from "Images/avatar.png";
import { useDispatch } from "react-redux";
import { requestSuccess } from "redux/reducers/common";
import ContactRequestAPIs from 'APIs/contact-requests/index'
import Enums from 'config/enums'
import { toast } from "react-toastify";
import { setAccepted } from "redux/reducers/requestAccepted";

const RequestList = ({ data = "", setData, meeting = "", request = "", chat = "" }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const goToRequest = (id) => {
    dispatch(
      requestSuccess({
        requestId: id,
      })
    );
    navigate(`/request`);
  }

  const changeContactRequestStatus = async (contactId, status) => {
    const res = await ContactRequestAPIs.changeStatusOfContactRequest(contactId, status)
    if (res) {
      setData(data.filter(obj => (obj.fromOrSender.id !== contactId)))
      if (status === Enums.ContactRequestStatusEnum.ACCEPTED) {
        toast.success("Request accepted successfully.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      else {
        toast.success("Request cancelled successfully.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  }

  return (
    <>
      <ul className={`${classes.userList} ${chat ? `${classes.chatList}` : ""}`}>
        {data.map((data) => (
          <li>
            <div onClick={() => { goToRequest(data.fromOrSender?.id) }}>
              <div className={classes.iconBox}>
                <img src={data.fromOrSender?.profilePic || avatar} alt={data.name} />
              </div>
              <div className={classes.description}>
                <h2 className={classes.name}>
                  {data.fromOrSender?.fistName && capitalizeFirstLetter(data.fromOrSender?.fistName)}{" "}
                  {data.fromOrSender?.lastName && capitalizeFirstLetter(data.fromOrSender?.lastName)}
                </h2>
                <div className={"text-muted font-12"}>
                  {data.fromOrSender?.designation && capitalizeFirstLetter(data.fromOrSender?.designation)}
                </div>
              </div>
            </div>
            <div className={classes.btnList} >
              <Button variant={"secondary"} onClick={() => { changeContactRequestStatus(data.fromOrSender?.id, Enums.ContactRequestStatusEnum.ACCEPTED); dispatch(setAccepted({ id: data.fromOrSender?.id })) }}>Accept</Button>
              <Button variant={"light"} onClick={() => { changeContactRequestStatus(data.fromOrSender?.id, Enums.ContactRequestStatusEnum.CANCELED) }}>Ignore</Button>
            </div>
          </li>
        ))}
        {data.length > 0 ? 
        <div className={`${classes.btnList} justify-content-end`}>
          <Link to={`/request`}
            className={"btn btn-link text-dark"}>
            View all Requests
            <i className="far fa-long-arrow-right fa-fw"></i>
          </Link>

        </div>
       : 
        <p className="mb-5 text-center">No Request Found</p>
      }
      </ul>
    </>
  );
};

export default RequestList;
