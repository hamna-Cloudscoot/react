import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Dropdown } from "react-bootstrap";
import img01 from "../../Images/img14.jpg";
import { Link } from "react-router-dom";
import NotificationAPIs from 'APIs/notification'
import { useSelector } from "react-redux";
import ChatPop from "Components/ContactSidebar/ChatPop";
import moment from 'moment';
import { useRef } from 'react';


const Notifications = () => {

    const [allNotifications, setAllNotifications] = useState([]);
    const { user } = useSelector((state) => state.user);
    const [notificationCount, setNotificationCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedContact, setSelectedContact] = useState();
    const [className, setClassName] = useState("");
    const dropdownRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const data = [
        {
            name: "Harry Bill",
            text: "Harry bill has accepted your request. ",
            imgUrl: img01,
            time: "12h",
            linkText: "Start coversation",

        },
        {
            name: "Alena Torff",
            text: "Alena Torff has sent you a request",
            imgUrl: img01,
            time: "2 Days",
            linkText: "View Alena’s Profile",

        },
    ]

    const calculateOnlineStatus = (lastSeen) => {
        const tenMinutesAgo = moment().subtract(30, 'minutes');
        const lastSeenMoment = moment(lastSeen);
        if (lastSeenMoment.isAfter(tenMinutesAgo)) {
            return true
        } else {
            return false
        }
    }

    function getTimeDifference(timestamp) {
        const currentTime = new Date(); // Get the current time
        const previousTime = new Date(timestamp); // Convert the given timestamp to a Date object

        const timeDifference = Math.abs(currentTime - previousTime); // Calculate the time difference in milliseconds

        // Define the conversion values in milliseconds
        const oneMinute = 60 * 1000;
        const oneHour = 60 * oneMinute;
        const oneDay = 24 * oneHour;

        // Calculate the respective time units
        const numDays = Math.floor(timeDifference / oneDay);
        const numHours = Math.floor((timeDifference % oneDay) / oneHour);
        const numMinutes = Math.floor((timeDifference % oneHour) / oneMinute);

        // Return the formatted result
        if (numDays > 0) {
            if (numDays == 1) {
                return numDays + " day";
            }
            return numDays + " days";
        } else if (numHours > 0) {
            return numHours + "h ago";
        } else if (numMinutes > 0) {
            return numMinutes + " min ago";
        } else {
            return "Just now";
        }
    }


    const getNotifications = async () => {
        setIsLoading(true);
        const allNotifications = await NotificationAPIs.getNotifications();
        if (allNotifications) {
            var arr = [];
            const apiArr = [...allNotifications.data.data];

            apiArr.forEach((obj) => {
                const text = obj.category === 'requestAccepted' ? "Start coversation" : `View ${obj.from?.firstName} Profile`
                const link = obj.category === 'requestAccepted' ? "chat" : `profile`
                const data = {
                    id: obj.from?.id,
                    name: obj.from?.fullName || `${obj.from?.firstName} ${obj.from?.lastName}`,
                    text: `${obj.from?.firstName} ${obj.from?.lastName} ${obj.message}`,
                    imgUrl: obj.from?.profilePic?.path || img01,
                    designation: obj.from?.designation,
                    timeSlot: Date.now(),
                    time: getTimeDifference(obj.createdAt),
                    linkText: text,
                    link: link,
                    isOnline: calculateOnlineStatus(obj?.from?.lastSeen),
                    roomId: obj.roomId
                }
                arr.push(data);
            });
            setAllNotifications(arr);
            getNotificationCount();
        }
        setIsLoading(false);
    }


    const getNotificationCount = async () => {
        if (user) {
            const notCount = await NotificationAPIs.getNotificationCount();
            if (notCount) {
                setNotificationCount(notCount.data.data);
            }
        }
    }

    const openChat = async (data) => {
        console.log("open chat ==", data);
        setDropdownOpen(false);
        if (data) {
            setClassName("ssd");
        }
        else {
            setClassName("ssd")
        }
        setSelectedContact(data);
    }

    // useEffect(() => {
    //     getNotifications();
    // }, [])

    useEffect(() => {
        getNotificationCount();
    }, [user])

    const handleClick = (key) => {
        console.log("Key == ", key);
        if (key) {
            setClassName("");
        }
        else {
            setClassName("ssd")
        }
        goToTop();
    };

    const goToTop = () => {
        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        });
    };

    const [isActive, setActive] = useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };

    const handleDropdownToggle = (isOpen) => {
        setDropdownOpen(isOpen);
    };

    return (
        <>
            <Dropdown
                align={'end'}
                className={`${classes.notification} notification`}
                show={dropdownOpen}
                onToggle={handleDropdownToggle}
            >
                {notificationCount == '0' ? '' : <span className={classes.counter}>{notificationCount}</span>}
                <Dropdown.Toggle>
                    <i className={"bell"} style={{ width: "50px", height: "50px" }} onClick={getNotifications} ></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className={`${classes.dropDownMenuNoti} dropDownMenuNoti`}>
                    <h5>Recent Notification</h5>
                    {isLoading ? <p>Loading...</p> :
                        <>
                            {allNotifications[0] ?
                                <ul>
                                    {allNotifications.map((data, index) => (
                                        <li key={index}>
                                            <Link to={'#'} className={classes.imgBox}>
                                                <img src={data.imgUrl} alt={"#"} />
                                                {data.isOnline ? <span className={classes.status}></span> : ''}
                                            </Link>
                                            <h6>{data.name}</h6>
                                            <p>{data.text}</p>
                                            <time>{data.time}</time>
                                            {data.link == 'chat' ? <Link to={'#'} onClick={() => { openChat(data) }} className={'text-orange'}>{data.linkText}</Link> : <Link to={`/all-profession/profile/${data?.id}`} className={'text-orange'}>{data.linkText}</Link>}
                                        </li>
                                    ))}
                                </ul> :
                                <p className="text-center p-2">No Notifications to show</p>
                            } </>
                    }
                    <Link to={"#"} className={'text-muted text-decoration-underline d-inline-block m-3'}>See All</Link>
                </Dropdown.Menu>
            </Dropdown>
            <aside
                id={classes.chatSidebar}
                className={`
                  
                     ${className ? "openChatPopup" : ""}
                     ${isActive ? `${classes.sidebarActive}` : ""}
                     ${classes.contactSidebar}
                     contactSidebar
                 `}
            >
                <ChatPop handleClick={handleClick} selectedContact={selectedContact} userId={user?.id} />
            </aside >
        </>
    )
}

export default Notifications;