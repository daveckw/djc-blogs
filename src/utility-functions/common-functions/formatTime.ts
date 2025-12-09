function formatTime(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '';
    }

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();

    const formattedTime = hours + ':' + formattedMinutes + ' ' + ampm;
    return formattedTime;
}

export default formatTime;
