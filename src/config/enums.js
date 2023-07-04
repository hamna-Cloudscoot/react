const AttachmentsTypeEnum = {
    blog: 'blog',
    user: "user"
}

const ProfessionalTabsEventKeyNameEnum = {
    founder: "Founder",
    coFounder: "Co-Founder",
    lawyer: "Lawyer",
    accountant: "Accountant"
}

const ContactRequestStatusEnum = {
    REQUESTED: 'REQUESTED',
    ACCEPTED: 'ACCEPTED',
    // BLOCKED = 'BLOCKED', // we will turn it on only if we have any scenarios related to blocking of the requests
    // DENIED = 'DENIED',
    CANCELED: 'CANCELED',
    REMOVED: 'REMOVED',
}

export default {
    AttachmentsTypeEnum: Object.freeze(AttachmentsTypeEnum),
    ProfessionalTabsEventKeyNameEnum: Object.freeze(ProfessionalTabsEventKeyNameEnum),
    ContactRequestStatusEnum: Object.freeze(ContactRequestStatusEnum),
};