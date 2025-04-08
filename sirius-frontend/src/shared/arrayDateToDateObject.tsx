import {DateObject} from "react-multi-date-picker";

export const arrayDateToDateObject = (arrayDate: number[]): DateObject => {
    return new DateObject({year: arrayDate[0], month: arrayDate[1] + 1, day: arrayDate[2]})
}
