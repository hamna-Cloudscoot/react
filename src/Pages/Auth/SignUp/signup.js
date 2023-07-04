import React, { useState, useEffect } from "react";
import "react-credit-cards/es/styles-compiled.css";
import SummeryDetails from "../../../Components/SummeryDetails";
import UploadProfilePicture from "../../../Components/UploadProfilePicture";
import PersonalDetails from "Components/PersonalDetails";
import MoreInfo from "Components/MoreInfo";
import YourResources from "Components/YourResources";
import AvailableDays from "Components/AvailableDays";
import AvailableTime from "Components/AvailableTime";
import AreYou from "Components/AreYou";
import AreYouLooking from "Components/AreYouLooking";

const SignUp = () => {

    let user = {
        profilePic: {},
        profilePicId: '',
        profilePicSrc: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        phoneNumber: '',
        linkedInProfile: '',
        skills: null,
        city: '',
        country: '',
        pitchDeckDocument: {},
        pitchDeckDocumentId: '',
        pitchDeckDocumentSrc: null,
        businessProfileDocument: {},
        businessProfileDocumentId: '',
        businessProfileDocumentSrc: null,
        otherDocuments: [],
        otherDocumentSrc: [],
        availableDays: [],
        availableTimeSlots: [],
        areYou: '',
        lookingFor: [],
        hasErrors: false,
        errors: {}
    }

    const [userState, setUserState] = useState(user);
    const [currentStep, setCurrentStep] = useState(0);

   
    return (
        <>
            {currentStep === 0 && (
                <UploadProfilePicture
                    skip={true}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
            {currentStep === 1 && (
                <PersonalDetails
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
            {currentStep === 2 && (
                <MoreInfo
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
            {currentStep === 3 && (
                <YourResources
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
            {currentStep === 4 && (
                <AvailableDays
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
            {currentStep === 5 && (
                <AvailableTime
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
            {currentStep === 6 && (
                <AreYou
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
            {currentStep === 7 && (
                <AreYouLooking
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
            {currentStep === 8 && (
                <SummeryDetails
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    userState={userState}
                    setUserState={setUserState}
                />
            )}
        </>
    )
}

export default SignUp;