let apiUrl = process.env.REACT_APP_DEV_API_URL
console.log('apiUrl', apiUrl, 'it is a check deployment')
switch (process.env.REACT_APP_ENVIRONMENT) {
    case 'local':
        apiUrl = process.env.REACT_APP_LOCAL_API_URL;
        break;
    case 'staging':
        apiUrl = process.env.REACT_APP_STG_API_URL;
        break;
    case 'dev':
        apiUrl = process.env.REACT_APP_DEV_API_URL;
        break;
    case 'live':
        apiUrl = process.env.REACT_APP_DEV_API_URL;
        break;
    default:
        apiUrl = process.env.REACT_APP_DEV_API_URL;
        break;
}
export const API_URL = apiUrl;
export const KEY =
    "YW1Gb1lXNTZZV2xpTG1GemJHRnRMbTFsYUdGeVFHZHRZV2xzTG1OdmJUb3lZV2RoYVc0PQ==";

export const ENDPOINT = {

    auth: {
        login: `${API_URL}/auth/login`,
        signUp: `${API_URL}/auth/sign-up`,
        forgetPassword: `${API_URL}/auth/forgot-password`,
        verifyResetPasswordCode: `${API_URL}/auth/verify-reset-password-code`,
        changePassword: `${API_URL}/auth/reset-password`,
        emailExist: `${API_URL}/auth/email-exist`,
    },

    profile: {
        updateProfile: `${API_URL}/user/update`,
        me: `${API_URL}/profile`,
        myProfile: `${API_URL}/auth/me`
    },
    user_me: `${API_URL}/auth/me`,

    file: {
        upload: `${API_URL}/files/upload`,
        uploadMultiple: {
            preUrl: `${API_URL}/files/`,
            postUrl: `upload-attachments`
        },
    },

    blogs: {
        getMany: `${API_URL}/blog`,
        getOne: `${API_URL}/blog`,
    },

    availability: {
        getDays: `${API_URL}/availability/days`,
        getTimeSlots: `${API_URL}/availability/time-slots`,
    },
    support: {
        create: `${API_URL}/support/send-request`
    },

    user: {
        getLawyers: `${API_URL}/user/professionals/lawyer`,
        getFounders: `${API_URL}/user/professionals/founder`,
        getAccountants: `${API_URL}/user/professionals/accountant`,
        getCo_Founder: `${API_URL}/user/professionals/co_founder`,
        getOneUser: `${API_URL}/user`
    },

    contact_requests: {
        received: `${API_URL}/contact-requests/received`,
        changeContactRequestStatus: `${API_URL}/contact-requests/change-status`,
    },
    contacts: {
        getContacts: `${API_URL}/contacts`,
    },

    newsletter_subscriber: {
        subscribe: `${API_URL}/newsletter-subscriber`
    },

    IPv4: {
        get: 'https://geolocation-db.com/json'
    },

    guidelines: {
        getBytype: `${API_URL}/guideline`
    },

    visitor: {
        createVisitor: `${API_URL}/visitor`
    },

    professionalContact: {
        sendRequest: `${API_URL}/professional-contact`
    },

    messages: {
        getChatMessages: `${API_URL}/messages`,
        deleteAllMessages: `${API_URL}/messages/delete`,
        unreadCount: `${API_URL}/messages/unreadCount`,
    },

    meetings: {
        getMeetings: `${API_URL}/meetings`,
        createMeeting: `${API_URL}/meetings`,
        updateParicipants: `${API_URL}/meetings/update-participants`,
        addNote: `${API_URL}/meetings/add-note`
    },

    subscription: {
        getAllSubscriptions: `${API_URL}/subscriptions`
    },

    stripe: {
        sessionCheckout: `${API_URL}/stripe-setup-intent/create-checkout-session`
    },

    notification: {
        count: `${API_URL}/notifications/count`,
        get: `${API_URL}/notifications`,
    }

};