import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import avatar from "../../Images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { requestSuccess, selectedMeeting } from "redux/reducers/common";
import ContactRequestAPIs from 'APIs/contact-requests/index';
import Enums from 'config/enums';
import { setCount } from '../../redux/reducers/messageNotification'
import MessageAPIs from '../../APIs/chat/index'
import SearchBar from "Components/SearchBar";
import { setAccepted } from "redux/reducers/requestAccepted";

const UserList = ({ handleClick = "", data = "", meeting = "", request = "", chat = "", setRequestId = "", setSelectedContact = () => { }, setIsClicked = () => { }, meetingRoom = "" }) => {

  const [myc, setMyc] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchedValue, setSearchedValue] = useState('');
  const [contactsData, setContactsData] = useState([]);
  const [afterSearchData, setAfterSearchData] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const filteredState = contactsData.filter(obj => {
      return (obj.name.toLowerCase().includes(searchedValue.toLowerCase()))
    })
    if (searchedValue.length > 0) {
      setContactsData(filteredState);
    } else {
      setContactsData(data);
    }
  }, [searchedValue])

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    if (data) {
      setContactsData(data)
    }
  }, [data])

  const navigateToRequestPage = () => {
    navigate(`/request`)
  }

  const setSelectedRequestId = (id) => {
    dispatch(
      requestSuccess({
        requestId: id,
      })
    );
  }

  const setSelectedMeetingId = (id) => {
    dispatch(
      selectedMeeting({
        meetingId: id,
      })
    );
  }


  const changeContactRequestStatus = async (contactId, status) => {
    console.log("contactId", contactId, status)
    dispatch(
      setAccepted({
        id: contactId
      })
    )
    return await ContactRequestAPIs.changeStatusOfContactRequest(contactId, status)
  }

  const handleCustomClick = (data) => {
    if (meetingRoom) {
      setSelectedMeetingId(data.meetingId)
      return
    }
    if (request) {
      setSelectedRequestId(data.id)
      setRequestId(data.id);
      navigateToRequestPage()
      return
    }

    handleClick()

    // if (!request) {
    //   handleClick()
    // }
    // else {
    //   setSelectedRequestId(data.id)
    //   setRequestId(data.id);
    //   navigateToRequestPage()
    // }
  }


  const getCount = async () => {
    const count = await MessageAPIs.getUnreadMessageCount();
    if (count) {
      dispatch(
        setCount({
          count: count.data.data,
        })
      );
    }
  }

  useEffect(() => {
    getCount();
  }, [data, setIsClicked])

  //Meeting
  return (
    <>
      {chat ? <SearchBar custClass={`${classes.search} my-3`} setSearchedValue={setSearchedValue} placeholder={"Search People..."} /> : ''}
      {/* {meetingRoom ? <h6 className={`${meetingRoom ? `${classes.mainTitle} my-4` : "my-4"}`}>{meetingRoom ? "Upcoming Meeting" : ""}</h6> : ""} */}
      {/* {!meetingRoom && */}
      <ul className={`${classes.userList} ${chat ? `${classes.chatList}` : ""} ${meetingRoom ? `${classes.meetingRoom}` : ""} ${meeting ? classes.meetingList : ""}`}>
        {
          meetingRoom ? ""
            :
            <li className="py-3 px-0"> <h6>{meeting ? "Upcoming Meeting" : "Contact List"}</h6></li>
        }
        {contactsData[0] && contactsData.map((data, index) => (
          <>
            <li className={`${active === index ? classes.active : ""} ${meetingRoom ? classes.meetingRoomList : ""} ${meeting ? "mb-4" : ""}`} key={data.id} onClick={() => {
              setIsClicked(false)
              setSelectedContact(data);
              setActive(index)
              handleCustomClick(data)
            }} >
              {meetingRoom ? <p className={classes.title}>{data.title}</p> : ""}

              <div
                className={`${classes.detailList} d-flex justify-content-between align-items-center`}
              >
                <div className={meetingRoom ? `${classes.iconBox} ${classes.meetingIcon}` : classes.iconBox}>
                  <img src={data.imgUrl || avatar} alt={data.name} />
                </div>
                <div className={classes.description}>
                  <h2 className={classes.name}>{data.name}</h2>

                  <div className={"text-muted font-12"}>{capitalizeFirstLetter(data.designation ? data.designation : '')}</div>
                </div>
                {meetingRoom ? <time className={`${classes.timeSlot} ${classes.custTime}`} > {data.timeSlot}</time> : ""}
                {meetingRoom ? <p>Business Development</p> : ""}
              </div>
              {meeting ? <time className={classes.timeSlot} > {data.timeSlot}</time> : ""}
              {request ? (
                <div className={classes.btnList}>
                  <Button variant={"secondary"} onClick={() => { changeContactRequestStatus(data.id, Enums.ContactRequestStatusEnum.ACCEPTED) }}>Accept</Button>
                  <Button variant={"light"} onClick={() => { changeContactRequestStatus(data?.id, Enums.ContactRequestStatusEnum.CANCELED) }}>Ignore</Button>
                </div>
              ) : (
                ""
              )}
              {chat ? (
                <div className={classes.statusBar}>
                  {data.unSeenMsgs > 0 ? <span className={classes.counter}>{data.unSeenMsgs}</span> : ''}
                  {data.isOnline ? <span className={classes.status}></span> : ''}
                </div>
              ) : (
                ""
              )}
            </li>
          </>
        ))
        }
        {data.length < 1 && meeting && <>
          <p>No meetings exist at this date</p>
        </>}
      </ul >


      {/* {meetingRoom && <>
        <h6 className={`${classes.mainTitle} my-4`}>Upcoming Meeting</h6>
        <ul className={`${classes.userList} ${classes.meetingRoom}`}>

          {contactsData[0] && contactsData.map((data) => (
            <>
              <li className={classes.meetingRoomList} key={data.id} onClick={() => {
                // setIsClicked(false)
                setSelectedContact(data);
              }} >
                <p className={classes.title}>Meeting Title goes here</p>

                <div
                  className={`${classes.detailList} d-flex justify-content-between`}
                  onClick={() => {
                    handleCustomClick(data)
                  }}
                >
                  <div className={`${classes.iconBox} ${classes.meetingIcon}`}>
                    <img src={data.imgUrl || avatar} alt={data.name} />
                  </div>
                  <div className={classes.description}>
                    <h2 className={classes.name}>{data.name}</h2>

                    <div className={"text-muted font-12"}>{data.designation}</div>
                  </div>
                  <time className={`${classes.timeSlot} ${classes.custTime}`} > {data.timeSlot}</time>
                  <p>Business Development</p>
                </div>
              </li>
            </>
          ))
          }
          {data.length < 1 && meeting && <>
            <p>No meetings exist at this date</p>
          </>}
        </ul >
      </>} */}

      {
        meeting ? (
          <div className={classes.btnList} >
            <Link to={"/meeting_room"} className={"btn btn-link text-dark"}>
              Go to Boardroom
              <i className="far fa-long-arrow-right fa-fw"></i>
            </Link>
            <Link to={"/schedules"} className={"btn btn-link text-dark"}>
              View Calendar
              <i className="far fa-long-arrow-right fa-fw"></i>
            </Link>
          </div>
        ) : (
          ""
        )
      }
    </>
  );
};

export default UserList;
