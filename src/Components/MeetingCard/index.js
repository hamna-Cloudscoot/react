import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Card } from "react-bootstrap";
import Index from "../UserList";
import img1 from "../../Images/img14.jpg";
import UserList from "../UserList";
import MeetingsAPIs from 'APIs/meetings/index'
import { convert_to_12_hour } from "GlobalHelperFunctions";
import * as moment from 'moment';
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePickerInput = ({ value, onClickPrev, onClickNext }) => {
    return (
        <div className={classes.navButton}>
            <button onClick={onClickPrev} className={classes.prev}>
                <i class="fas fa-chevron-left"></i>
            </button>
            <input type="text" value={value} readOnly />
            <button onClick={onClickNext} className={classes.next}>
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

const MeetingCard = (props) => {

    const [meetingsByDate, setMeetingsByDate] = useState([])

    const [allMeetings, setAllMeetings] = useState([])
    const meeting = useSelector(state => state.boardroomCreated);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredMeetings, setFilteredMeetings] = useState([]);

    const handleChange = (date) => {
        setSelectedDate(date);
    };

    const formatDate = (date) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    const getMeetingsByDate = async () => {
        const startDate = moment().format('YYYY-MM-DD')
        const endDate = moment().add(1, 'd').format('YYYY-MM-DD')
        const res = await MeetingsAPIs.getMeetings(startDate, endDate)
        if (res) {
            const data = [];
            res.data.data.forEach(element => {
                let obj = {
                    meetingId: element.id,
                    name: `${element?.participants[0]?.firstName} ${element?.participants[0]?.lastName}`,
                    timeSlot: `${convert_to_12_hour(element?.timeSlot?.start_time)} - ${convert_to_12_hour(element?.timeSlot?.end_time)}`,
                    imgUrl: element?.participants[0]?.profilePic?.path || null,
                    day: element?.day?.name,
                    designation: element?.participants[0]?.designation
                }
                data.push(obj)
            });
            setMeetingsByDate(data)
        }
    }

    const getAllUpcomingMeetings = async () => {
        const res = await MeetingsAPIs.getMeetings()
        if (res) {
            const data = [];
            res.data.data.forEach(element => {
                let obj = {
                    meetingId: element.id,
                    name: `${element?.participants[0]?.firstName} ${element?.participants[0]?.lastName}`,
                    title: element?.meetingAgenda,
                    timeSlot: `${convert_to_12_hour(element?.timeSlot?.start_time)} - ${convert_to_12_hour(element?.timeSlot?.end_time)}`,
                    imgUrl: element?.participants[0]?.profilePic?.path || null,
                    day: element?.day?.name,
                    designation: element?.participants[0]?.designation,
                    meetingDate: element?.meetingDate
                }
                data.push(obj)
            });

            /**
             * To Set Meeting of Current Date
             * On Page Load.
             */
            const crrDate = moment().format('YYYY-MM-DD');
            const filteredMeetings = data.filter(m => {
                return (m.meetingDate.toLowerCase().includes(crrDate.toLowerCase()))
            })         
            setFilteredMeetings(filteredMeetings);            
            setAllMeetings(data)
        }
    }

    useEffect(() => {
        getMeetingsByDate()
        getAllUpcomingMeetings()
    }, [])

    useEffect(() => {
        getMeetingsByDate()
        getAllUpcomingMeetings()
    }, [meeting])

    const filterMeetingsByDate = (date) => {
        const filteredMeetings = allMeetings.filter(m => {
            return (m.meetingDate.toLowerCase().includes(date.toLowerCase()))
        })
        setFilteredMeetings(filteredMeetings);
    }



    return (
        <>
            {props.meetingRoom ? "" :
                <div className={classes.datePicker}>
                    <ReactDatePicker
                        customInput={
                            <CustomDatePickerInput
                                value={formatDate(selectedDate)}
                                onClickPrev={() =>
                                    setSelectedDate((prevDate) => {
                                        const prevDay = new Date(prevDate);
                                        prevDay.setDate(prevDay.getDate() - 1);
                                        const singleDate = moment(prevDay).format('YYYY-MM-DD')
                                        filterMeetingsByDate(singleDate)
                                        return prevDay;
                                    })
                                }
                                onClickNext={() =>
                                    setSelectedDate((prevDate) => {
                                        const nextDay = new Date(prevDate);
                                        nextDay.setDate(nextDay.getDate() + 1);
                                        const singleDate = moment(nextDay).format('YYYY-MM-DD')
                                        filterMeetingsByDate(singleDate)
                                        return nextDay;
                                    })
                                }
                            />
                        }
                        selected={selectedDate}
                        onChange={handleChange}
                        dateFormat={"dd. MMM. yyyy"}
                    />
                </div>}
            <Card className={classes.card}>
                {props.meetingRoom ? "" : <Card.Header className={classes.header}>
                    <Card.Title>
                        <h1>{meetingsByDate.length}</h1>
                    </Card.Title>
                    <div>Meetings today</div>
                </Card.Header>}

                <Card.Body className={'px-0'}>
                    {props.meetingRoom ? <div className={`${classes.title} py-3`}>
                        <h6 className='my-4'>Upcoming Meeting</h6>
                    </div>
                        : ""}
                    {

                        props.meetingRoom ? <UserList
                            meetingRoom
                            data={allMeetings}

                        /> :
                            <UserList
                                meeting
                                data={filteredMeetings}
                            />
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default MeetingCard;