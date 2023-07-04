import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import UserList from "../UserList";
import img1 from "../../Images/img14.jpg";
import ChatPop from "./ChatPop";
import { Button, Col, Row } from "react-bootstrap";
import ContactRequestAPIs from "APIs/contact-requests";
import ContactList from "Components/ContactList";
import { useDispatch, useSelector } from "react-redux";
import { contactsState } from 'redux/reducers/contactList'
import common, { requestSuccess } from "redux/reducers/common";
import ContactAPIs from "APIs/contacts";
import Socket from '../../config/socket'
import Chat from "Components/Chat";
import PageTitle from "Components/PageTitle";
import { setAccepted } from "redux/reducers/requestAccepted";


const ContactSidebar = (props) => {

  const dispatch = useDispatch()
  const [socket, setSocket] = useState();
  const request = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.user);
  const [isClickes, setIsClicked] = useState(true);
  const [socketChange, setSocketChange] = useState();
  const [requestsData, setRequestsData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [className, setClassName] = useState("");
  const [selectedContact, setSelectedContact] = useState({});
  const [showTopBtn, setShowTopBtn] = useState(false);

  const isAccepted = useSelector((state) => state.requestAccepted);

  useEffect(() => {
    if (isAccepted) {     
      getUserContacts();
      getReceivedRequests()
    }
    dispatch(
      setAccepted({
        id: null
      })
    )
    dispatch(
      requestSuccess({
        requestId: null,
      })
    );
  }, [isAccepted])

  useEffect(() => {
    if (user && Object.keys(user).length) {
      Socket.on('incomingMessage', () => {
        getUserContacts();
      })
    }
  }, [user, socket])

  const handleClick = (key) => {
    if (key) {
      setClassName("");
    }
    else {
      setClassName("ssd")
    }
    // else{
    //   setClassName("d-none")
    // }
    goToTop();
  };
  const goToTop = () => {
    window.scrollTo({
      top: 400,
      behavior: 'smooth',
    });
  };

  const getReceivedRequests = async () => {
    const contact = await ContactRequestAPIs.getReceivedRequests();
    if (contact) {
      const contactList = [];
      contact.data.data.map((currn, ind) => {
        const obj = {
          id: currn.fromOrSender.id,
          name: `${currn.fromOrSender.fistName} ${currn.fromOrSender.lastName}`,
          designation: currn.fromOrSender.designation,
          imgUrl: currn.fromOrSender?.profilePic,
          timeSlot: Date.now(),
        };
        contactList.push(obj);
      });
      setRequestsData(contactList);
      if (contactList.length) {
        if (!props.selectedId && !request.requestId) {
          dispatch(
            requestSuccess({
              requestId: contactList[0].id,
            })
          );
          props.setSelectedId(contactList[0].id)
        }
      }
    }
  };

  useEffect(() => {
    if (user && Object.keys(user).length) {
      setIsClicked(true);
      getUserContacts();
      Socket.emit('unreadChatsCount', user?.id);
    }
  }, [user, isClickes])



  const getUserContacts = async () => {
    const res = await ContactAPIs.getUserContacts();
    if (res) {
      const contacts = res.data.data
      const contactList = []
      contacts.forEach((currn, ind) => {
        let obj;
        if (currn.toOrReceiver?.id === user?.id) {
          obj = {
            id: currn.fromOrSender?.id,
            name: `${currn.fromOrSender?.fistName} ${currn.fromOrSender?.lastName}`,
            designation: currn.fromOrSender?.designation,
            imgUrl: currn.fromOrSender?.profilePic,
            roomId: currn.fromOrSender?.roomId,
            timeSlot: Date.now(),
            unSeenMsgs: currn.unSeenMsgs,
            isOnline: currn.fromOrSender?.isOnline,
          };
        }
        else {
          obj = {
            id: currn.toOrReceiver?.id,
            name: `${currn.toOrReceiver?.fistName} ${currn.toOrReceiver?.lastName}`,
            designation: currn.toOrReceiver?.designation,
            imgUrl: currn.toOrReceiver?.profilePic,
            roomId: currn.toOrReceiver?.roomId,
            timeSlot: Date.now(),
            unSeenMsgs: currn.unSeenMsgs,
            isOnline: currn.toOrReceiver?.isOnline,
          };

        }
        contactList.push(obj);
      });
      const sorted = contactList?.sort((a, b) => b.unSeenMsgs - a.unSeenMsgs);
      setContactData(sorted)

      dispatch(
        contactsState({
          contacts: contactList,
        })
      )
    }
  }

  useEffect(() => {
    if (user && Object.keys(user).length) {
      if (props.isRequest) {
        getReceivedRequests();
      }
      else {
        getUserContacts()
      }
    }
  }, [user]);

  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  const data = [
    {
      name: "Zain Lubin",
      designation: "Founder",
      imgUrl: img1,
      timeSlot: "9:00 AM - 10:00 AM",
    },
    {
      name: "Alena Torff",
      designation: "Lawyer",
      imgUrl: img1,
      timeSlot: "9:00 AM - 10:00 AM",
    },
    {
      name: "Jordyn Geidt",
      designation: "Accountant",
      imgUrl: img1,
      timeSlot: "9:00 AM - 10:00 AM",
    },
    {
      name: "Randy Carder",
      designation: "Accountant",
      imgUrl: img1,
      timeSlot: "9:00 AM - 10:00 AM",
    },
  ];
  return (
    <>

      <aside
        id={classes.chatSidebar}
        className={`
                    
                     ${props.className ? `${props.className}` : ""} 
                     ${className ? "openChatPopup" : ""}
                     ${isActive ? `${classes.sidebarActive}` : ""}
                     ${classes.contactSidebar}
                     contactSidebar
                 `}
      >
        {props.isRequest ? (
          <UserList title={"Contact List"} request setRequestId={props.setSelectedId} data={requestsData} />
        ) : (
          <UserList title={"Contact List"} chat data={contactData} selectedContact={selectedContact} setSelectedContact={setSelectedContact} handleClick={handleClick} setIsClicked={setIsClicked} type={props.type} />
        )}
        <Button variant={"userSidebarOpener"} onClick={toggleClass}>
          <i className={"fal fa-comment-dots fa-fw"}></i>{" "}
        </Button>
        {props.type !== "MessagesPage" ?
          <ChatPop handleClick={handleClick} selectedContact={selectedContact} userId={user?.id} isClicked={isClickes} setSocketChange={setSocketChange} />
          : ''
        }


      </aside>
      {props.type === "MessagesPage" ?
        <Row>
          <Col md={12} className={'p-0'}>
            <PageTitle title={"Messages"} bgWhite onlyTitle />
            <Chat message selectedContact={selectedContact} userId={user?.id} isClicked={isClickes} setSocketChange={setSocketChange} />
          </Col>
        </Row> :
        ''
      }
    </>
  );
};

export default ContactSidebar;
