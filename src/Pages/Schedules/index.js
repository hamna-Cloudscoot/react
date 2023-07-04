import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth'
import { Col, Container, Row } from "react-bootstrap";
import PageTitle from "../../Components/PageTitle";
import MeetingsAPIs from 'APIs/meetings/index'
import { convert_to_12_hour } from "GlobalHelperFunctions";
import * as moment from 'moment';
import Loader from 'Components/Loader';
import classes from "./index.module.scss"
import ScheduleList from 'Components/SchedulesList';
import { useDispatch, useSelector } from 'react-redux';
import { setNoteAdded } from 'redux/reducers/noteadded';


const Schedules = () => {
    const [events, setEvents] = useState([]);
    const [uniqueEvents, setUniqueEvents] = useState({});
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [calender2Data, setCalender2Data] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(`Today - ${new Date().toLocaleDateString()}`)
    const dispatch = useDispatch()

    const meeting = useSelector(state => state.boardroomCreated);
    const { isNoteAdded } = useSelector(state => state.noteAdded);

    useEffect(() => {
        console.log("Is Note Added from Scheduals  = ", isNoteAdded);

    }, [isNoteAdded])

    const getMeetingsByDate = async (startDate, endDate) => {
        setIsLoading(true)
        const res = await MeetingsAPIs.getMeetings(startDate, endDate)
        if (res) {
            let apiArr = [...res.data.data];
            let myEvents = [];
            apiArr.forEach((data, index) => {
                /**
                 * Get Single Meeting and Filter all meetings on same 
                 * Date and Pushing Them in an Array
                 */
                const filteredState = apiArr.filter(m => {
                    return (m.meetingDate.toLowerCase().includes(data.meetingDate.toLowerCase()))
                })
                const obj = {
                    id: data.id,
                    title: filteredState.length,
                    start: data.meetingDate,
                    end: data.meetingDate,
                    organizer: data?.organizer?.firstName,
                    designation: data?.organizer?.designation,
                    meetingTitle: data?.meetingAgenda,
                    meetingStart: data.timeSlot?.start_time,
                    meetingEnd: data.timeSlot?.end_time,
                    img: data?.organizer?.profilePic?.path,
                    note: data?.note,
                    className: "dummy",
                }
                myEvents.push(obj);
            })

            /**
             * To remove duplicate Meetings with same start and End date 
             */
            let uniqueArr = myEvents.filter((value, index, self) => {
                return (
                    self.findIndex((obj) => {
                        return obj.start === value.start && obj.end === value.end;
                    }) === index
                );
            });

            /*
             * Set Unique Array for Calender to Show Single Buble 
             * And Events Array for Meeting Detail Calender to show All Meetings  
             */
            setUniqueEvents(uniqueArr);
            setEvents(myEvents);

            /**
             * Setting Current Date Meeting Details for Right Side Calender 
             * To Show all today's meeting details on Page load 
             */
            const currentDate = moment().format("DD");
            const filteredState = myEvents.filter(m => {
                return (m.start.toLowerCase().includes(currentDate.toLowerCase()))
            })
            setCalender2Data(filteredState);
        }
        dispatch(
            setNoteAdded({
                isNoteAdded: false
            })
        )
        setIsLoading(false);

    }

    useEffect(() => {
        getMeetingsByDate(startDate, endDate);
    }, [startDate, endDate, meeting, isNoteAdded])


    const setDateFormate = (inputDateStr) => {
        // Parse input date string into a Date object
        const inputDate = new Date(inputDateStr);
        // Extract year, month, and day values from input date
        const year = inputDate.getFullYear();
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);  // add leading zero if necessary
        const day = ('0' + inputDate.getDate()).slice(-2);  // add leading zero if necessary
        // Construct output date string in desired format
        const outputDateStr = `${year}-${month}-${day}`;
        return outputDateStr;
    }

    function handleDayClick(info) {
        info.el.style.backgroundColor = 'black';
    }

    return (
        <>
            {isLoading ? <Loader isLoading={isLoading} /> : ''}
            <PageTitle
                title={"Schedule"}
                bgWhite
                withBtn
                onlyTitle
            />
            <section className={"section p-0"}>
                <Container>
                    <Row>
                        <Col lg={6} className={'py-lg-5 py-0 my-lg-0 my-5'}>
                            <FullCalendar
                                headerToolbar={{
                                    left: 'prev,next,title',
                                    center: '',
                                    right: 'dayGridMonth,multiMonthYear'
                                }}
                                selectable={true}
                                plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
                                initialView="dayGridMonth"
                                events={uniqueEvents}
                                eventClick={(eventInfo) => {

                                    // Remove class from all elements except the clicked cell
                                    const allFahadElements = document.querySelectorAll('.cellBg');
                                    allFahadElements.forEach((element) => {
                                        if (element !== eventInfo.el.parentElement.parentElement.parentElement) {
                                            element.classList.remove('cellBg');
                                        }
                                    });
                                    const date = eventInfo.event.start.toISOString().split('T')[0];
                                    // Add class to clicked cell if it has a different date
                                    if (date !== selectedDate) {
                                        eventInfo.el.parentElement.parentElement.parentElement.classList.add('cellBg');
                                    } else {
                                        eventInfo.el.parentElement.parentElement.parentElement.classList.remove('cellBg');
                                    }

                                    setSelectedDate(date)
                                    const filteredState = events.filter(m => {
                                        return (m.start.toLowerCase().includes(date.toLowerCase()))
                                    })
                                    console.log("filteredState = ", filteredState);
                                    setCalender2Data(filteredState);
                                }}
                                datesSet={(startDate, endDate) => {
                                    setStartDate(setDateFormate(startDate.start));
                                    setEndDate(setDateFormate(startDate.end));
                                }}
                            />
                        </Col>
                        <Col lg={6} className={'py-lg-5 py-0 mb-lg-0 mb-5'}>
                            <div className={classes.dayGrid}>
                                <div className={classes.gridHead}>
                                    <p>{selectedDate}</p>
                                </div>
                                <ScheduleList
                                    Schedules
                                    meetingRoom
                                    data={calender2Data}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >
        </>
    )
}

export default Schedules;