import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import PageTitle from "../../Components/PageTitle";
import { Container, Tabs, Tab } from "react-bootstrap";
import ProfileSettingTab from "./Tabs/ProfileSettingTab";
import AccountSetting from "./Tabs/AccountSetting";
import PaymentSetting from "./Tabs/PaymentSetting";
import Documents from "./Tabs/Documents";
import PlanSetting from "./Tabs/PlanSetting";

import ProfileAPIs from "APIs/profile/index";
import { useDispatch, useSelector } from "react-redux";
import { userSuccess } from "redux/reducers/user";
import { flattenArr } from "GlobalHelperFunctions";


const ProfileSetting = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user);


    const [userData, setUserData] = useState({});

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
        setUserData(mappedUser);
    };

    useEffect(() => {
        if (!user) {
            getUserProfileData();
        }
        else {
            setUserData(user)
        }
    }, [user]);

    return (
        <>
            <PageTitle
                title={"Profile"}
                bgWhite
                onlyTitle
            />
            <section className={`${classes.profileSetting} section`}>
                <Container>
                    <Tabs
                        className={classes.settingTabs}
                    >
                        <Tab eventKey="profilesetting" title="Profile Setting">
                            <ProfileSettingTab userData={userData} setUserData={setUserData} />
                        </Tab>
                        <Tab eventKey="AccountSetting" title="Account Setting">
                            <AccountSetting userData={userData} setUserData={setUserData} />
                        </Tab>                       
                        <Tab eventKey="Documents" title="Documents">
                            <Documents />
                        </Tab>
                        <Tab eventKey="PlanSetting" title="Plan Setting">
                            <PlanSetting />
                        </Tab>
                    </Tabs>
                </Container>
            </section>
        </>
    )
}

export default ProfileSetting;