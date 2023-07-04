import { combineReducers } from "redux"
import authReducer from "./auth"
import userReducer from "./user"
import signUpReducer from "./signup"
import commonReducer from './common'
import professionalLandingPageReducer from './professionalPage';
import contactListReducer from "./contactList"
import messageNotification from "./messageNotification"
import requestAccepted from './requestAccepted'
import boardroomCreated from './boardroomCreated'
import noteadded from "./noteadded"
import signupEmail from "./signupEmail"
import paymentVerified from "./paymentVerified"

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    signUp: signUpReducer,
    common: commonReducer,
    contactList: contactListReducer,
    professionalLandingPage: professionalLandingPageReducer,
    messageNotification: messageNotification,
    requestAccepted: requestAccepted,
    boardroomCreated: boardroomCreated,
    noteAdded: noteadded,
    signupEmail: signupEmail,
    paymentVerified: paymentVerified
})