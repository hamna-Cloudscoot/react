export const flattenArr = (arr, key) => {
    return arr.map(ele => ele[key].id)
}

export const flattenArrWithObj = (arr, key) => {
    return arr.map(ele => ele[key])
}

const MAX_TEXT_LENGTH = 200;


export const isTextLong = (text) => {
    if (text?.length > MAX_TEXT_LENGTH) return true
    return false
}

export const sliceLongText = (text) => {
    if (isTextLong(text)) {
        return `${text.slice(0, MAX_TEXT_LENGTH)}...`
    }
    return text
}

const MAX_TEXT_LENGTH_TITLE = 25;

export const isTitleLong = (text) => {
    if (text?.length > MAX_TEXT_LENGTH_TITLE) return true
    return false
}

export const sliceLongTitle = (text) => {
    if (isTitleLong(text)) {
        return `${text.slice(0, MAX_TEXT_LENGTH_TITLE)}...`
    }
    return text
}

export function convert_to_12_hour(hour) {
    if (hour === 0) {
        return "12:00 AM";
    } else {
        if (hour < 12) {
            return hour > 9 ? `${hour}:00 AM` : `0${hour}:00 AM`;
        } else {
            const remainingHour = hour - 12 === 0 ? 12 : hour - 12;
            return remainingHour > 9 ? `${remainingHour}:00 PM` : `0${remainingHour}:00 PM`;
        }
    }
}