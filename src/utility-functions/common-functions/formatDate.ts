import type { Timestamp } from 'firebase/firestore';

import convertDate from './convertDate';

export default function formatDate(
    d: Date | Timestamp | null | undefined | number,
    time = false,
    fullYear = true
) {
    const newDate = convertDate(d);

    if (newDate === null) {
        return 'invalid date';
    }

    let month = '' + (newDate.getMonth() + 1),
        day = '' + newDate.getDate(),
        year = newDate.getFullYear();

    // Adjust for zero-padded formatting
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    // Show only the last two digits of the year if fullYear is false
    if (!fullYear) {
        year = parseInt(year.toString().substr(-2), 10);
    }

    // Format date
    const formattedDate = [year, month, day].join('-');

    if (time) {
        // Get hours, minutes, and AM/PM
        let hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        // Zero-pad minutes
        const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();

        // Format time
        const formattedTime = `${hours}:${minutesStr} ${ampm}`;

        return `${formattedDate} ${formattedTime}`;
    } else {
        return formattedDate;
    }
}
