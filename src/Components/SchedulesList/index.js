import React, { useEffect, useRef, useState } from 'react'
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.png";
import img1 from "../../Images/img14.jpg";
import { Dropdown } from 'react-bootstrap';
import ScheduleNotePopup from './ScheduleNotePopup';

const ScheduleList = ({ Schedules = "", meetingRoom = "", setSelectedContact = "", data = "" }) => {
    const [contactsData, setContactsData] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [noteId, setNoteId] = useState();
    const ref = useRef(null);

    function handleClick() {
        setIsClicked(true);
    }

    function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsClicked(false);
        }
    }

    const className = isClicked ? classes.activeBorder : "";

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const dayTiming = [
        {
            time: "6:00 AM",
            data: [


            ]
        },
        {
            key: 7,
            time: "7:00 AM",
            data: [

            ]
        },
        {
            key: 8,
            time: "8:00 AM",
            data: [

            ]
        },
        {
            key: 9,
            time: "9:00 AM",
            data: [

            ]
        },
        {
            key: 10,
            time: "10:00 AM",
            data: [

            ]
        },

        {
            key: 11,
            time: "11:00 AM",
            data: [

            ]
        },

        {
            key: 0,
            time: "12:00 AM",
            data: [
            ]
        },

        {
            key: 13,
            time: "1:00 PM",
            data: [

            ]
        },

        {
            key: 14,
            time: "2:00 PM",
            data: [

            ]
        },

        {
            key: 15,
            time: "3:00 PM",
            data: [

            ]
        },

        {
            key: 16,
            time: "4:00 PM",
            data: [

            ]
        },

        {
            key: 17,
            time: "5:00 PM",
            data: [

            ]
        },

        {
            key: 18,
            time: "6:00 PM",
            data: [

            ]
        },
        {
            key: 19,
            time: "7:00 PM",
            data: [

            ]
        },
        {
            key: 20,
            time: "8:00 PM",
            data: [

            ]
        },
        {
            key: 21,
            time: "9:00 PM",
            data: [

            ]
        },
        {
            key: 22,
            time: "10:00 PM",
            data: [

            ]
        },
        {
            key: 23,
            time: "11:00 PM",
            data: [

            ]
        },
        {
            key: 24,
            time: "12:00 PM",
            data: [

            ]
        },
        {
            key: 1,
            time: "1:00 AM",
            data: [

            ]
        },
        {
            key: 2,
            time: "2:00 AM",
            data: [

            ]
        },
        {
            key: 3,
            time: "3:00 AM",
            data: [

            ]
        },
        {
            key: 4,
            time: "4:00 AM",
            data: [

            ]
        },
        {
            key: 5,
            time: "5:00 AM",
            data: [

            ]
        },
        {
            key: 6,
            time: "6:00 AM",
            data: [

            ]
        },
    ]

    useEffect(() => {
        var customeArray = [];
        for (let i = 0; i < dayTiming.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (dayTiming[i].key == data[j]?.meetingStart) {
                    const arr = []
                    let start;
                    let end;
                    // To Formate the Time in 12 Hour Formate
                    if (data[j]?.meetingStart > 12) {
                        start = `${(data[j]?.meetingStart - 12)}:00 PM`
                    } else {
                        start = `${data[j]?.meetingStart}:00 AM`
                        if (start == '0:00 AM') {
                            start = '12:00 AM'
                        }
                    }
                    if (data[j]?.meetingEnd > 12) {
                        end = `${(data[j]?.meetingEnd - 12)}:00 PM`;
                    } else {
                        end = `${data[j]?.meetingEnd} : 00 AM`
                    }
                    const obj = {
                        name: data[j]?.organizer,
                        designation: data[j].designation,
                        imgUrl: img1,
                        timeSlot: `${start} - ${end}`,
                        time: dayTiming[i].time,
                        active: true,
                        business: data[j].designation,
                        title: data[j].meetingTitle,
                        img: data[j]?.img,
                        meetingId: data[j]?.id,
                        note: data[j].note
                    }

                    dayTiming[i].data.push(obj)
                }
            }
            customeArray.push(dayTiming[i]);
        }

        setContactsData(customeArray);
    }, [data])


    return (
        <div className={classes.scroller}>
            <div className={classes.SchedulesDayGraph}>
                {
                    contactsData.map((current, ind) => {
                        return (
                            <>
                                <div className='d-flex'>
                                    <span className={classes.timeTable} key={ind}>{current.time}</span>
                                    <ul className={`${classes.userList} ${meetingRoom ? `${classes.meetingRoom}` : ""}`}>

                                        {current?.data?.length > 0 ?
                                            current.data?.map(data => (
                                                <>
                                                    <li className={`${data.active ? classes.active : ""} ${meetingRoom ? classes.meetingRoomList : ""} ${className}`} ref={ref} key={data.id} onClick={handleClick} >

                                                        <div className={classes.activeList}>
                                                            {meetingRoom ? <p className={classes.title}>{data?.title}</p> : ""}

                                                            <div
                                                                className={`${classes.detailList} d-flex justify-content-between align-items-center`}
                                                            >
                                                                <div className={classes.box}>
                                                                    <div className={meetingRoom ? `${classes.iconBox} ${classes.meetingIcon}` : classes.iconBox}>
                                                                        <img src={data?.img || avatar} alt={data?.name} />
                                                                    </div>
                                                                    <div className={classes.description}>
                                                                        <h2 className={classes.name}>{data.name}</h2>
                                                                        <div style={{textTransform: "capitalize"}} className={"text-muted font-12"}>{data.designation}</div>
                                                                    </div>
                                                                    <time className={`${classes.timeSlot} ${classes.custTime}`} > {data.timeSlot}</time>
                                                                </div>
                                                                <p className={classes.businessText}>{data?.note}</p>
                                                                <Dropdown className={classes.dropdown}>
                                                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className={classes.modalOpener}>
                                                                        <i class="fas fa-ellipsis-v"></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => { setModalShow(true); setNoteId(data.meetingId) }}>Add a Notes</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </li >
                                                </>
                                            ))
                                            : <p className={"p-3"}></p>
                                        }

                                    </ul >
                                </div >
                                <ScheduleNotePopup
                                    meetingId={noteId}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </>
                        )
                    })
                }

            </div >
        </div>
    )
}

export default ScheduleList