import React, { useEffect, useState } from 'react'
import classes from "./index.module.scss";
import SearchBar from 'Components/SearchBar';
import { useSelector } from 'react-redux';
import MeetingAPIs from 'APIs/meetings/index'
import SelectDropDown from "Components/SelectDropDown";
import { toast } from 'react-toastify';
import Loader from 'Components/Loader';



const Invitation = () => {

    const [meeting, setMeeting] = useState({})
    const [options, setOptions] = useState();
    const [participants, setParticipants] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const common = useSelector((state) => state.common);
    const contactsList = useSelector((state) => state.contactList);
    const user = useSelector((state) => state.user);

    const meetingDetail = async (id) => {
        setIsLoading(true);
        const res = await MeetingAPIs.getMeetingDetails(id)
        if (res) {
            if (user.user?.id == res.data.data?.organizer) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setMeeting(res.data.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        //get meeting detail
        if (common.meetingId) {
            meetingDetail(common.meetingId)
        }
    }, [common.meetingId])

    useEffect(() => {
        if (contactsList.contacts.length) {
            const arr = contactsList.contacts.map((obj) => {
                return ({
                    value: `${obj.name}`,
                    label: `${obj.name}`,
                    id: `${obj.id}`
                })
            })
            setOptions(arr)
        }
    }, [contactsList])


    const sendInvitation = async () => {
        const update = await MeetingAPIs.updateParticipants({ id: meeting?.id, participants: participants })
        if (update) {
            toast.success(`${update.data.message}`, {
                position: "top-right",
                autoClose: 2000,
            });
        }
    }

    const startMeeting = async () => {
        if (user?.id == meeting?.organizer) {
            window.open(meeting.organizerStartMeetingUrl, '_blank');
        } else {
            window.open(meeting.participantJoinMeetingUrl, '_blank');
        }
    }

    const copyInvitation = async () => {
        if (user?.id == meeting?.organizer) {
            navigator.clipboard.writeText(meeting.organizerStartMeetingUrl);
        } else {
            navigator.clipboard.writeText(meeting.participantJoinMeetingUrl);
        }
        toast.success(`Copied to clipboard`, {
            position: "top-right",
            autoClose: 2000,
        });
    }

    return (
        <>
            {isLoading ? "" :
                <div className={classes.invitationCard}>
                    <div className={`${classes.title} py-3`}>
                        <h6 className='my-4'>My virtual boardroom</h6>
                    </div>
                    <div className={`${classes.boardRoomId} mb-3`}>
                        <p className='mb-4'>My Boardroom ID</p>
                        <h5 className='mb-4'>{meeting.id}</h5>
                    </div>
                    <SelectDropDown
                        className={classes.selectDropdown}
                        isSearchable
                        isMulti
                        placeHolder="Search People"
                        options={options}
                        onChange={(value) => { setParticipants([...participants, value[0].id]) }}
                    />
                    <div className='btn-group justify-content-between w-100 mb-5 flex-wrap'>
                        {meeting?.id && participants[0] ?
                            <button className={"btn btn-secondary m-1"} onClick={sendInvitation} >Send Invitation</button>
                            :
                            <button className={"btn btn-secondary m-1"} onClick={sendInvitation} disabled >Send Invitation</button>
                        }
                        {meeting?.id ?
                            <button className={"btn btn-primary m-1"} onClick={copyInvitation}>Copy Invitation</button>
                            :
                            <button className={"btn btn-primary m-1"} disabled>Copy Invitation</button>
                        }
                    </div>
                    {meeting?.id ?
                        <button className={"btn btn-secondary m-1 w-100"} onClick={startMeeting}>{isAdmin ? `Start Meeting` : "Join Meeting"}</button>
                        :
                        <button className={"btn btn-secondary m-1 w-100"} onClick={startMeeting} disabled>{isAdmin ? `Start Meeting` : "Join Meeting"}</button>
                    }
                </div>
            }
        </>
    )
}

export default Invitation